'use client';

import { NextPage } from 'next';
import {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button, Snackbar, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '@/app/globals.css';
import AccountIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Edit from '@mui/icons-material/Edit';
import IoSquareOutline from '@mui/icons-material/CropSquare';
import Link from 'next/link';
import { myForm, myApp, myAppNumber, isFormConfigured } from '@/utils/constants';

/** reCAPTCHA v3 site key (optional). Matches keys from the legacy appstudio_next project. */
const recaptchaSiteKey = (
  typeof process.env.RECAPTCHA_V3_SITE_KEY === 'string'
    ? process.env.RECAPTCHA_V3_SITE_KEY.trim()
    : ''
);
const isRecaptchaConfigured = recaptchaSiteKey.length > 0;

const FORM_MAX_WIDTH = 600;
const FIELD_GAP = 20;

interface Props {
  isJa: boolean;
  width: number;
}

const ContactBodyInner: NextPage<Props> = ({ isJa }) => {
  const formConfig = myForm(isJa)[0];
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedApp, setSelectedApp] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedApp, setTouchedApp] = useState(false);
  const [touchedMessage, setTouchedMessage] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const expectingFormSubmitLoad = useRef(false);

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
  const submitAllowed = canSubmit && !submitting;
  const anyTouched = touchedName || touchedEmail || touchedApp || touchedMessage;

  const alertMessage = useMemo(() => {
    if (sentMessage) return formConfig.alert.success;
    if (!submitAttempted && !anyTouched) return '';
    if (recaptchaError)
      return isJa
        ? 'セキュリティ確認に失敗しました。しばらく経ってからもう一度お試しください。'
        : 'Security verification failed. Please try again later.';
    if (name === '') return formConfig.alert.name;
    if (email === '') return formConfig.alert.email;
    if (!validEmail.test(email)) return formConfig.alert.invalid;
    if (selectedApp === '') return formConfig.alert.app;
    if (message === '') return formConfig.alert.message;
    return formConfig.alert.submit;
  }, [formConfig, sentMessage, recaptchaError, submitAttempted, anyTouched, name, email, selectedApp, message, isJa]);

  const LANG_MARKER_JA = '[[LANG_JA]]';

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!submitAllowed || !isFormConfigured) return;

    setSubmitAttempted(true);
    setRecaptchaError(false);

    if (isRecaptchaConfigured) {
      if (!executeRecaptcha) return;

      try {
        const token = await executeRecaptcha('submit_form');
        const response = await fetch('/api/recaptcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          setRecaptchaError(true);
          return;
        }
      } catch {
        setRecaptchaError(true);
        return;
      }
    }

    expectingFormSubmitLoad.current = true;
    const valueToSend = isJa ? message + LANG_MARKER_JA : message;
    setMessage(valueToSend);
    const messageField = form.querySelector<HTMLTextAreaElement>(`textarea[name="${formConfig.number.message}"]`);
    if (messageField) messageField.value = valueToSend;
    form.submit();
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
    setRecaptchaError(false);
  }, []);

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
    width: '60%',
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
        <Button type="submit" style={buttonStyle} disabled={!submitAllowed}>
          {submitting ? (isJa ? '送信中…' : 'Sending…') : formConfig.submit}
        </Button>
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
  if (!isRecaptchaConfigured) {
    return <ContactBodyInner {...props} />;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey} language={props.isJa ? 'ja' : 'en'}>
      <ContactBodyInner {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default ContactBody;
