const sgMail = require('@sendgrid/mail')
const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send( {
    to: email,
    from: 'camille.breillot@gmail.com',
    subject: 'Thanks for joining us!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'camille.breillot@gmail.com',
    subject: 'Sorry to see you leave!',
    text: `We are sorry to see you leave ${name}. We hope to see you come back soon!`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
