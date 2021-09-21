require('dotenv').config();
const { User, Vendor } = require("../database/models")
const bcrypt = require("bcrypt")
const { new_account_email } = require('../utils/email-copy')
const { sendMail } = require("../services/email")

async function register(user){
    if (!user.email) {
        return console.log("Email is required")
    }

    const password = Math.random().toString(36).slice(-16);

    await bcrypt.hash(password, 8, function (err, hash) {
        if (err) {
            console.log(err) 
            return res.status(502).json({ type: 'error', message: 'There was an error, please contact support.' }) }
        if (hash) hash = hash

        User.create({...user, password: hash})
        .then(async (user) => {
            await sendMail({
                to: user.email,
                ...new_account_email(password)
            })
            return {status: "success", data: user}
        })
        .catch(err => {
            console.log(err)
            if (err.original && err.original.code == 23505) {
                return {status: "error", message: "email already exists"}
            } else {
                return {status: "error"}
            }
        })
    })
}

module.exports = {
    register
}