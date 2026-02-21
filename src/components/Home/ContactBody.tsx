'use client';

import { NextPage } from 'next';
import {
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Button, Snackbar, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '@/app/globals.css';
import AccountIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Edit from '@mui/icons-material/Edit';
import IoSquareOutline from '@mui/icons-material/CropSquare';
import Script from 'next/script';
import Link from 'next/link';
import { myForm, myApp, myAppNumber, isFormConfigured } from '@/utils/constants';

/** reCAPTCHA v2 site key (optional). Form uses v2 checkbox, so only RECAPTCHA_V2_SITE_KEY. */
const recaptchaSiteKey = (
  typeof process.env.RECAPTCHA_V2_SITE_KEY === 'string'
    ? process.env.RECAPTCHA_V2_SITE_KEY.trim()
    : ''
);
const isRecaptchaConfigured = recaptchaSiteKey.length > 0;

const isPC = (width: number) => width > 1024;

const FORM_MAX_WIDTH = 600;
const RECAPTCHA_WIDTH = 304;
const RECAPTCHA_GAP = 16;
/** Unified vertical gap between text fields */
const FIELD_GAP = 20;

interface Props {
  isJa: boolean;
  width: number;
}

const ContactBodyInner: NextPage<Props> = ({ isJa, width }) => {
  const formConfig = myForm(isJa)[0];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedApp, setSelectedApp] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [recaptchaPassed, setRecaptchaPassed] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedApp, setTouchedApp] = useState(false);
  const [touchedMessage, setTouchedMessage] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRendered = useRef(false);
  const expectingFormSubmitLoad = useRef(false);
  const pc = isPC(width);

  useLayoutEffect(() => {
    if (!isRecaptchaConfigured) return;
    (window as unknown as { onRecaptchaLoad?: () => void }).onRecaptchaLoad = () => {
      if (recaptchaRendered.current || !(window as unknown as { grecaptcha?: unknown }).grecaptcha || !recaptchaSiteKey)
        return;
      const container = document.getElementById('contact-recaptcha');
      if (!container || container.children.length > 0) return;
      try {
        (window as unknown as { grecaptcha: { render: (el: HTMLElement, opts: { sitekey: string; callback: () => void }) => void } }).grecaptcha.render(container, {
          sitekey: recaptchaSiteKey,
          callback: () => setRecaptchaPassed(true),
        });
        recaptchaRendered.current = true;
      } catch {
        // already rendered or container invalid
      }
    };
    return () => {
      delete (window as unknown as { onRecaptchaLoad?: () => void }).onRecaptchaLoad;
    };
  }, [isRecaptchaConfigured, recaptchaSiteKey]);

  useLayoutEffect(() => {
    if (!isRecaptchaConfigured || !recaptchaSiteKey) return;
    recaptchaRendered.current = false;
    const container = document.getElementById('contact-recaptcha');
    const g = (window as unknown as { grecaptcha?: { render: (el: HTMLElement, opts: { sitekey: string; callback: () => void }) => void } }).grecaptcha;
    if (container && container.children.length === 0 && typeof window !== 'undefined' && g) {
      try {
        g.render(container, {
          sitekey: recaptchaSiteKey,
          callback: () => setRecaptchaPassed(true),
        });
        recaptchaRendered.current = true;
      } catch {
        // ignore
      }
    }
  }, [pc, isRecaptchaConfigured, recaptchaSiteKey]);

  const handleRecaptchaScriptLoad = useCallback(() => {
    const w = window as unknown as { onRecaptchaLoad?: () => void };
    if (typeof window !== 'undefined' && w.onRecaptchaLoad) w.onRecaptchaLoad();
  }, []);

  const showError = (touched: boolean, invalid: boolean) => (touched || submitAttempted) && invalid;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value);
  const handleAppChange = (e: { target: { value: string } }) => setSelectedApp(e.target.value);
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setMessage(e.target.value);

  const canSubmit = useMemo(
    () =>
      name !== '' &&
      email !== '' &&
      validEmail.test(email) &&
      selectedApp !== '' &&
      message !== '',
    [name, email, selectedApp, message]
  );
  const submitAllowed = canSubmit && (!isRecaptchaConfigured || recaptchaPassed) && !submitting;
  const anyTouched = touchedName || touchedEmail || touchedApp || touchedMessage;

  const alertMessage = useMemo(() => {
    if (sentMessage) return formConfig.alert.success;
    if (!submitAttempted && !anyTouched) return '';
    if (isRecaptchaConfigured && canSubmit && !recaptchaPassed)
      return isJa ? '「私はロボットではありません」の確認を完了してください。' : 'Please complete the "I\'m not a robot" verification.';
    if (name === '') return formConfig.alert.name;
    if (email === '') return formConfig.alert.email;
    if (!validEmail.test(email)) return formConfig.alert.invalid;
    if (selectedApp === '') return formConfig.alert.app;
    if (message === '') return formConfig.alert.message;
    return formConfig.alert.submit;
  }, [formConfig, sentMessage, canSubmit, recaptchaPassed, submitAttempted, anyTouched, name, email, selectedApp, message, isJa]);

  // Append ASCII marker at end when Japanese so GAS can detect and strip it; English sends as-is.
  const LANG_MARKER_JA = '[[LANG_JA]]';
  const messageToSend = isJa ? message + LANG_MARKER_JA : message;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submitAllowed || !isFormConfigured) return;
    expectingFormSubmitLoad.current = true;
    const form = e.currentTarget;
    const messageField = form.querySelector<HTMLInputElement>(`input[name="${formConfig.number.message}"]`);
    if (messageField) messageField.value = messageToSend;
    form.submit();
    setSubmitAttempted(true);
    setSubmitting(true);
  };

  const handleIframeLoad = useCallback(() => {
    if (!expectingFormSubmitLoad.current) return;
    expectingFormSubmitLoad.current = false;
    setSubmitting(false);
    setSnackbarOpen(true);
    setName('');
    setEmail('');
    setSelectedApp('');
    setMessage('');
    setSentMessage(true);
    if (isRecaptchaConfigured) setRecaptchaPassed(false);
  }, [isRecaptchaConfigured]);

  const contactStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 8,
    paddingTop: 70,
    maxWidth: FORM_MAX_WIDTH,
    textAlign: 'center',
  };
  const titleStyle: CSSProperties = {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 0,
    marginBottom: FIELD_GAP,
  };
  const textFieldStyle: CSSProperties = {
    width: '100%',
    marginBottom: FIELD_GAP,
    backgroundColor: 'white',
    borderRadius: 5,
  };
  const labelStyle: CSSProperties = { fontSize: 20, margin: '0px 10px 4px 5px' };
  const buttonStyle: CSSProperties = {
    width:
      pc && isRecaptchaConfigured
        ? FORM_MAX_WIDTH - RECAPTCHA_WIDTH - RECAPTCHA_GAP
        : '60%',
    height: 40,
    marginTop: 0,
    marginBottom: FIELD_GAP,
    borderRadius: 25,
    fontSize: 18,
    backgroundColor: submitAllowed ? '#F7B249' : 'gray',
    color: submitAllowed ? 'black' : 'white',
  };
  const alertStyle: CSSProperties = {
    color: '#F7B249',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 0,
    lineHeight: 1,
  };
  const successGap = 24;
  const successMessageStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: successGap,
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: 16,
  };
  const homeButtonStyle: CSSProperties = {
    display: 'inline-block',
    marginTop: 0,
    padding: '12px 24px',
    backgroundColor: '#F7B249',
    color: 'black',
    textDecoration: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
  };

  const appList = myApp(1024, isJa).filter((_, index) => index !== myAppNumber.home);

  if (!isFormConfigured) {
    return (
      <div style={contactStyle}>
        <h2 style={titleStyle}>{formConfig.title}</h2>
        <p style={alertStyle}>{formConfig.alert.formNotConfigured}</p>
      </div>
    );
  }

  if (sentMessage) {
    const successTitleStyle: CSSProperties = { marginBottom: 0 };
    return (
      <div style={{ ...contactStyle, gap: successGap }}>
        <h2 style={{ ...titleStyle, ...successTitleStyle }}>{formConfig.title}</h2>
        <div style={successMessageStyle}>
          <p style={{ fontSize: 20, fontWeight: 'bold', color: '#F7B249', margin: 0 }}>
            {formConfig.alert.success}
          </p>
          <p style={{ margin: 0, fontSize: 18, color: 'white', whiteSpace: 'pre-line' }}>
            {isJa
              ? 'メールをご確認ください。\n担当者より改めてご連絡いたします。'
              : 'Please check your email.\nWe will get back to you.'}
          </p>
          <Link href={isJa ? '/ja' : '/'} style={homeButtonStyle}>
            {isJa ? 'ホームへ戻る' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={contactStyle}>
      <h2 style={titleStyle}>{formConfig.title}</h2>
      <form
        action={formConfig.url}
        method="POST"
        encType="application/x-www-form-urlencoded"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        style={{ marginTop: 0 }}
      >
        <input type="hidden" name="pageHistory" value="0" />
        <TextField
          style={textFieldStyle}
          type="text"
          required
          name={formConfig.number.name}
          color="warning"
          variant="filled"
          label={
            <>
              <AccountIcon style={labelStyle} />
              {formConfig.label.name}
            </>
          }
          value={name}
          onChange={handleNameChange}
          onBlur={() => setTouchedName(true)}
          error={showError(touchedName, name === '')}
          helperText={showError(touchedName, name === '') ? formConfig.alert.name : ''}
        />
        <TextField
          style={textFieldStyle}
          type="email"
          required
          name={formConfig.number.email}
          color="warning"
          variant="filled"
          label={
            <>
              <MailIcon style={labelStyle} />
              {formConfig.label.email}
            </>
          }
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTouchedEmail(true)}
          error={showError(touchedEmail, email === '' || !validEmail.test(email))}
          helperText={
            showError(touchedEmail, email === '')
              ? formConfig.alert.email
              : showError(touchedEmail, !validEmail.test(email))
                ? formConfig.alert.invalid
                : ''
          }
        />
        <FormControl
          style={textFieldStyle}
          variant="filled"
          color="warning"
          required
          error={showError(touchedApp, selectedApp === '')}
        >
          <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
            <IoSquareOutline style={labelStyle} />
            {formConfig.label.app}
          </InputLabel>
          <Select
            value={selectedApp}
            onChange={handleAppChange}
            onBlur={() => setTouchedApp(true)}
            name={formConfig.number.app}
            sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
          >
            <MenuItem value="">
              <em>{isJa ? 'アプリを選択してください' : 'Please select an app'}</em>
            </MenuItem>
            {appList.map((app, index) => (
              <MenuItem key={index} value={app.text.menu}>
                {app.text.menu}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          style={textFieldStyle}
          type="text"
          required
          multiline
          rows={5}
          name={formConfig.number.message}
          color="warning"
          variant="filled"
          label={
            <>
              <Edit style={labelStyle} />
              {formConfig.label.message}
            </>
          }
          value={message}
          onChange={handleMessageChange}
          onBlur={() => setTouchedMessage(true)}
          error={showError(touchedMessage, message === '')}
          helperText={showError(touchedMessage, message === '') ? formConfig.alert.message : ''}
        />
        {pc && isRecaptchaConfigured ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'nowrap',
              marginTop: 0,
              marginBottom: FIELD_GAP,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Button type="submit" style={buttonStyle} disabled={!submitAllowed}>
              {submitting ? (isJa ? '送信中…' : 'Sending…') : formConfig.submit}
            </Button>
            <div style={{ minHeight: 78, display: 'flex', alignItems: 'center' }}>
              <div id="contact-recaptcha" role="presentation" aria-label="reCAPTCHA" />
            </div>
            <Script
              src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
              strategy="afterInteractive"
              onLoad={handleRecaptchaScriptLoad}
            />
          </div>
        ) : (
          <>
            {isRecaptchaConfigured && (
              <>
                <div style={{ marginTop: 0, marginBottom: FIELD_GAP, minHeight: 78, display: 'flex', justifyContent: 'center' }}>
                  <div id="contact-recaptcha" role="presentation" aria-label="reCAPTCHA" />
                </div>
                <Script
                  src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
                  strategy="afterInteractive"
                  onLoad={handleRecaptchaScriptLoad}
                />
              </>
            )}
            <Button type="submit" style={buttonStyle} disabled={!submitAllowed}>
              {submitting ? (isJa ? '送信中…' : 'Sending…') : formConfig.submit}
            </Button>
          </>
        )}
        <p style={{ ...alertStyle, marginTop: 0, marginBottom: 0 }} id="form-alert" role="status" aria-live="polite">
          {alertMessage || '\u00A0'}
        </p>
      </form>
      <iframe
        name="hidden_iframe"
        style={{ display: 'none' }}
        onLoad={handleIframeLoad}
        title="form target"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={formConfig.alert.confirm}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

const ContactBody: NextPage<Props> = (props) => {
  return <ContactBodyInner {...props} />;
};

export default ContactBody;
