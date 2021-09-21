const express = require("express");
const router = express.Router();
const { User } = require("../../database/models")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const { sendMail } = require("../../services/email")
const { reset_password_email } = require('../../utils/email-copy')

const jwtToken = process.env.JWT_TOKEN

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ type: 'error', message: 'Email and password fields are essential for authentication.' })
    }
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
        return res.status(403).json({ type: 'error', message: 'User with provided email not found in database.' })
    } else {
        bcrypt.compare(password, user.password, (error, result) => {
            if (error) res.status(400).json({ type: 'error', message: 'Invalid Password', error })
            if (result) {
                res.status(200).json({
                    type: 'success',
                    message: 'User logged in.',
                    user: { id: user.id, email: user.email, full_name: user.first_name + ' ' +  user.last_name, role: user.role },
                    token: jwt.sign({ id: user.id, email: user.email, full_name: user.first_name + ' ' +  user.last_name, role: user.role }, jwtToken)
                })
            } else {
                res.status(400).json({ type: 'error', message: 'Invalid Password', error })
            }
        })
    }
})

router.post("/check-email", async (req, res) => {
    let { email} = req.body;

    if (!email) {
        return res.status(200).json({ type: 'error', message: 'Email is essential for authentication.' })
    }

    try {
        const user = await User.findOne({ where: { email: email } })
        if (user === null) {
            return res.status(200).json({ type: 'success', message: 'User with provided email not found in database.' })
        } else {
            return res.status(200).json({ type: 'error', message: 'Email already exists' })
        }  
    } catch (error) {
        return res.status(200).json({ type: 'error', message: 'There was an error. Please contact support.' })
    }
})

router.post("/forgot-password", async (req, res) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}})
        if(!user) return res.json({type: "error", text: "There is no account with such email"})
        const token = crypto.randomBytes(20).toString("hex");
        await User.update({password_reset_token: token, password_reset_expires: Date.now() + 3600000}, { where: {email: req.body.email}})
        await sendMail({
            to: req.body.email, 
            ...reset_password_email(token)
        })
        return res.json({ type: 'success', message: 'An e-mail has been sent to ' + req.body.email + ' with further instructions.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({'message' : 'There was an error, please try again or contact support'})
    }
})

router.get("/verify-token", ( req, res ) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(400).json({ type: 'error', message: 'x-access-token header not found.' })
  
    jwt.verify(token, jwtToken, (error, result) => {
      if (error) return res.status(403).json({ type: 'error', message: 'Provided token is invalid.', error })
      return res.status(200).json({
        type: 'success',
        message: 'Provided token is valid.',
        result
      })
    })
})

router.post("/verify-reset-token", async ( req, res ) => {
    const user = await User.findOne({ where: { password_reset_token: req.body.token } })
    if(!user || user.password_reset_expires < Date.now()){
        return res.send("error")
    } else {
        return res.send("success")
    }
})

router.post("/reset-password", async ( req, res ) => {
    await bcrypt.hash(req.body.password, 8, function (err, hash) {
        if (err) res.send("error")
        if (hash) {
            User.update({password: hash}, {where: {password_reset_token: req.body.token}})
            .then(()=>{
                console.log("success")
                res.send("success")
            })
            .catch(error => {
                console.log(error)
                res.send("error")
            })
          }
        }
    )
})

module.exports = router;