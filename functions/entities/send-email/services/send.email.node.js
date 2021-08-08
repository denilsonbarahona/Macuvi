const functions = require("firebase-functions");
const html = require("../html/send.invitation.node");
const mailgun = require("mailgun-js")({
  apiKey: functions.config().mailgun.key,
  domain: functions.config().mailgun.domain,
});

exports.sendInvitation = function(params) {
  const email = {
    from: "Macuvi <macuvi@macuvi.xyz>",
    to: params.PreLoginEmail,
    subject: `Hola ${params.PreLoginName}, 
      ${params.PreLoginHostName} te ha invitado a registrarte en MACUVI.`,
    html: html.invitation(params),
  };
  mailgun.messages().send(email);
};
