require('dotenv').config

const new_account_email = function(password){
    const subject =
    'Your RA Solutions Account Credentials'

    const text = 
    'You are receiving this because you or someone else requested an account at RA Solutions Web Portal.\n\n' +
    'You can now login with this email address and the following randomly generated password, which you can change at any time:\n\n' +
    password + '\n\n' +
    'If you did not request this, please ignore this email.\n'

    return {text, subject}
}

const reset_password_email = function(token){
    const subject =
    'RA Solutions Password Reset'

    const text = 
    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    process.env.SITE_URL + '/reset-password?token=' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

    return {text, subject}
}

module.exports = {
    reset_password_email,
    new_account_email,
}