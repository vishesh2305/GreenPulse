const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', 
  from: 'primoel968@proton.me', 
  subject: 'Your OTP for pulse plant',
  text: 'Your OTP is ',
  html: '<strong>OTP : </strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })