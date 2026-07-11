/**
 * On form submit (spreadsheet linked to Google Form): send auto-reply to respondent.
 *
 * Trigger: Function = onFormSubmit, Event = From spreadsheet → On form submit.
 *
 * Reply language: [[LANG_JA]] suffix on inquiry (added by /contact/ja on the site).
 */

var ADMIN_EMAIL = 'letselevator@gmail.com';
var SENDER_NAME = 'Nakajima Masao App Studio';
var LANG_MARKER_JA = '[[LANG_JA]]';
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {GoogleAppsScript.Events.SheetsOnFormSubmit} e
 */
function onFormSubmit(e) {
  if (!e || !e.namedValues) {
    Logger.log('onFormSubmit needs the form-submit trigger (function name: onFormSubmit). Do not use the Run button on this function.');
    return;
  }

  var row = extractFormRow(e);
  if (!row.email) {
    var keys = Object.keys(e.namedValues).join(', ');
    var msg =
      'Auto-reply skipped: could not read respondent email.\n' +
      'namedValues keys: ' +
      keys +
      '\n' +
      'values: ' +
      JSON.stringify(e.values || []);
    Logger.log(msg);
    notifyAdmin('[Contact Form] Auto-reply skipped (no email)', msg);
    return;
  }

  var parsed = parseInquiry(row.inquiry);
  var subject = parsed.useJapanese
    ? '【自動返信】' + row.name + ' 様 お問合せありがとうございます'
    : '【Auto-reply】 Thank you for your inquiry, ' + row.name;
  var body = buildBody(parsed.useJapanese, row, parsed.inquiry);

  var options = {
    name: SENDER_NAME,
    bcc: ADMIN_EMAIL,
    replyTo: ADMIN_EMAIL,
  };

  try {
    GmailApp.sendEmail(row.email, subject, body, options);
    Logger.log('Sent auto-reply to: ' + row.email);
  } catch (err) {
    var errMsg = 'GmailApp.sendEmail failed: ' + err + '\nTo: ' + row.email;
    Logger.log(errMsg);
    notifyAdmin('[Contact Form] Auto-reply failed', errMsg);
    throw err;
  }

  stripLangMarkerFromSheet(e, parsed.useJapanese, parsed.inquiry);
}

/**
 * @param {GoogleAppsScript.Events.SheetsOnFormSubmit} e
 * @return {{timestamp:string,name:string,email:string,app:string,inquiry:string}}
 */
function extractFormRow(e) {
  var nv = e.namedValues;
  var row = {
    timestamp: pickNamed(nv, ['タイムスタンプ', 'Timestamp']),
    name: pickNamed(nv, ['Name', 'お名前', '名前']),
    email: pickNamed(nv, ['Email address', 'メールアドレス', 'Email', 'E-mail', 'メール']),
    app: pickNamed(nv, ['App', 'アプリ']),
    inquiry: pickNamed(nv, ['Inquiry', 'お問い合わせ内容', 'お問合せ内容', 'Message', 'メッセージ']),
  };

  if (!row.email) {
    row.email = findEmailInNamedValues(nv);
  }

  var values = e.values;
  if (values && values.length) {
    if (!row.timestamp && values[0] != null) row.timestamp = String(values[0]);
    if (!row.name && values[1] != null) row.name = String(values[1]);
    if (!row.email && values[2] != null) {
      var maybeEmail = String(values[2]).trim();
      if (EMAIL_RE.test(maybeEmail)) row.email = maybeEmail;
    }
    if (!row.app && values[3] != null) row.app = String(values[3]);
    if (!row.inquiry && values[4] != null) row.inquiry = String(values[4]);
  }

  row.email = (row.email || '').trim();
  row.name = (row.name || '').trim() || 'Customer';
  row.app = (row.app || '').trim();
  row.inquiry = (row.inquiry || '').trim();
  row.timestamp = (row.timestamp || '').trim();

  return row;
}

/**
 * @param {Object<string, string[]>} namedValues
 * @param {string[]} candidates
 */
function pickNamed(namedValues, candidates) {
  var keys = Object.keys(namedValues);
  for (var c = 0; c < candidates.length; c++) {
    var want = normalizeKey(candidates[c]);
    for (var k = 0; k < keys.length; k++) {
      if (normalizeKey(keys[k]) === want) {
        var cell = namedValues[keys[k]];
        if (cell && cell[0] != null && String(cell[0]).trim() !== '') {
          return String(cell[0]).trim();
        }
      }
    }
  }
  for (var c2 = 0; c2 < candidates.length; c2++) {
    var fragment = normalizeKey(candidates[c2]);
    for (var k2 = 0; k2 < keys.length; k2++) {
      if (normalizeKey(keys[k2]).indexOf(fragment) >= 0) {
        var cell2 = namedValues[keys[k2]];
        if (cell2 && cell2[0] != null && String(cell2[0]).trim() !== '') {
          return String(cell2[0]).trim();
        }
      }
    }
  }
  return '';
}

/**
 * @param {Object<string, string[]>} namedValues
 */
function findEmailInNamedValues(namedValues) {
  var keys = Object.keys(namedValues);
  for (var i = 0; i < keys.length; i++) {
    var keyNorm = normalizeKey(keys[i]);
    if (keyNorm.indexOf('mail') < 0 && keyNorm.indexOf('メール') < 0) continue;
    var cell = namedValues[keys[i]];
    if (!cell || !cell[0]) continue;
    var s = String(cell[0]).trim();
    if (EMAIL_RE.test(s)) return s;
  }
  for (var j = 0; j < keys.length; j++) {
    var cellAll = namedValues[keys[j]];
    if (!cellAll || !cellAll[0]) continue;
    var s2 = String(cellAll[0]).trim();
    if (EMAIL_RE.test(s2)) return s2;
  }
  return '';
}

function normalizeKey(key) {
  return String(key || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * @param {string} inquiry
 * @return {{useJapanese:boolean,inquiry:string}}
 */
function parseInquiry(inquiry) {
  var text = (inquiry || '').trim();
  if (text.slice(-LANG_MARKER_JA.length) === LANG_MARKER_JA) {
    return { useJapanese: true, inquiry: text.slice(0, -LANG_MARKER_JA.length) };
  }
  return { useJapanese: false, inquiry: text };
}

/**
 * @param {boolean} useJapanese
 * @param {{timestamp:string,name:string,email:string,app:string}} row
 * @param {string} inquiry
 */
function buildBody(useJapanese, row, inquiry) {
  if (useJapanese) {
    return (
      row.name +
      ' 様\n\n' +
      'この度は、お問い合わせいただき、誠にありがとうございます。\n' +
      'このメールは自動返信でございます。\n\n' +
      '〜お問合せ内容〜\n' +
      'お名前：' +
      row.name +
      ' 様\n' +
      'メールアドレス：' +
      row.email +
      '\n' +
      'アプリ：' +
      row.app +
      '\n' +
      'お問合せ内容詳細：' +
      inquiry +
      '\n' +
      'フォーム送信日時：' +
      row.timestamp +
      '\n\n' +
      'お問い合わせいただいた内容につきましては、担当者より改めてご連絡を差し上げますので、今しばらくお待ちください。\n' +
      'お問い合わせいただいた内容によっては、回答までにお時間をいただく場合がございます。予めご了承ください。\n\n' +
      '今後とも、何卒よろしくお願いいたします。\n'
    );
  }

  return (
    'Dear ' +
    row.name +
    ',\n\n' +
    'Thank you for reaching out to us. This is an automated response.\n\n' +
    '～Inquiry Details～\n' +
    'Name: ' +
    row.name +
    '\n' +
    'Email: ' +
    row.email +
    '\n' +
    'App: ' +
    row.app +
    '\n' +
    'Inquiry Details: ' +
    inquiry +
    '\n' +
    'Form submission date and time: ' +
    row.timestamp +
    '\n\n' +
    'We have received your inquiry and one of our representatives will get back to you shortly.\n' +
    'Please allow some time for us to respond, as the nature of your inquiry may require additional attention.\n\n' +
    'Thank you for your patience and understanding.\n\n' +
    'Best regards,\n'
  );
}

/**
 * @param {GoogleAppsScript.Events.SheetsOnFormSubmit} e
 * @param {boolean} useJapanese
 * @param {string} inquiry
 */
function stripLangMarkerFromSheet(e, useJapanese, inquiry) {
  if (!useJapanese || !e.range) return;
  try {
    var sheet = e.range.getSheet();
    var row = e.range.getRow();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var col = -1;
    for (var i = 0; i < headers.length; i++) {
      var h = normalizeKey(headers[i]);
      if (h === 'inquiry' || h.indexOf('お問い合わせ') >= 0 || h.indexOf('お問合せ') >= 0) {
        col = i + 1;
        break;
      }
    }
    if (col > 0) sheet.getRange(row, col).setValue(inquiry);
  } catch (err) {
    Logger.log('Failed to update inquiry cell: ' + err);
  }
}

function notifyAdmin(subject, body) {
  try {
    GmailApp.sendEmail(ADMIN_EMAIL, subject, body, { name: SENDER_NAME });
  } catch (e) {
    Logger.log('notifyAdmin failed: ' + e);
  }
}
