/**
 * Runs on form submit trigger. Sends an auto-reply email to the respondent.
 * Form question titles must be either English ("Name", "Email address", "App", "Inquiry")
 * or Japanese ("お名前", "メールアドレス", "アプリ", "お問い合わせ内容").
 *
 * Do not run from the Run button; set a trigger: Form > On form submit.
 */
function onFormSubmit(e) {
  if (!e || !e.namedValues) {
    Logger.log('Run this function from a form submit trigger, not from the Run button.');
    return;
  }

  var getVal = function (names) {
    for (var i = 0; i < names.length; i++) {
      var v = e.namedValues[names[i]];
      if (v && v[0]) return v[0];
    }
    return '';
  };

  var timestamp = getVal(['タイムスタンプ', 'Timestamp']);
  var name = getVal(['Name', 'お名前']);
  var email = getVal(['Email address', 'メールアドレス']);
  var app = getVal(['App', 'アプリ']);
  var inquiry = getVal(['Inquiry', 'お問い合わせ内容']);

  var userLocale = Session.getActiveUserLocale();
  var subject;
  var body;

  if (userLocale === 'ja') {
    subject = '【自動返信】' + name + ' 様 お問合せありがとうございます';

    body =
      name +
      ' 様' +
      '\n' +
      '\n' +
      'この度は、お問い合わせいただき、誠にありがとうございます。' +
      '\n' +
      'このメールは自動返信でございます。' +
      '\n' +
      '\n' +
      '〜お問合せ内容〜' +
      '\n' +
      'お名前：' +
      name +
      ' 様' +
      '\n' +
      'メールアドレス：' +
      email +
      '\n' +
      'アプリ：' +
      app +
      '\n' +
      'お問合せ内容詳細：' +
      inquiry +
      '\n' +
      'フォーム送信日時：' +
      timestamp +
      '\n' +
      '\n' +
      'お問い合わせいただいた内容につきましては、担当者より改めてご連絡を差し上げますので、今しばらくお待ちください。' +
      '\n' +
      'お問い合わせいただいた内容によっては、回答までにお時間をいただく場合がございます。予めご了承ください。' +
      '\n' +
      '\n' +
      '今後とも、何卒よろしくお願いいたします。' +
      '\n';
  } else {
    subject = '【Auto-reply】 Thank you for your inquiry, ' + name;

    body =
      'Dear ' +
      name +
      ',' +
      '\n' +
      '\n' +
      'Thank you for reaching out to us. This is an automated response.' +
      '\n' +
      '\n' +
      '～Inquiry Details～' +
      '\n' +
      'Name: ' +
      name +
      '\n' +
      'Email: ' +
      email +
      '\n' +
      'App: ' +
      app +
      '\n' +
      'Inquiry Details: ' +
      inquiry +
      '\n' +
      'Form submission date and time: ' +
      timestamp +
      '\n' +
      '\n' +
      'We have received your inquiry and one of our representatives will get back to you shortly.' +
      '\n' +
      'Please allow some time for us to respond, as the nature of your inquiry may require additional attention.' +
      '\n' +
      '\n' +
      'Thank you for your patience and understanding.' +
      '\n' +
      '\n' +
      'Best regards,' +
      '\n';
  }

  var options = {
    name: 'Nakajima Masao App Studio',
    from: 'letselevator@gmail.com',
    bcc: 'letselevator@gmail.com',
    replyTo: 'letselevator@gmail.com',
  };
  GmailApp.sendEmail(email, subject, body, options);
}
