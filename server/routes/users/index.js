require('dotenv').config();
const express = require("express");
const router = express.Router();
const { User } = require("../../database/models")
const sequelize = require('sequelize')
const bcrypt = require("bcrypt")
const { new_account_email } = require('../../utils/email-copy')
const { sendMail } = require("../../services/email")

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'password_reset_token', 'password_reset_expires'],
                include: [
                    [sequelize.fn('DATE', sequelize.col('User.createdAt')), 'dateCreated'],
                    [sequelize.fn('concat', sequelize.col('User.last_name'), " ",sequelize.col('User.first_name')), 'full_name'],
                ],
            },
        })
        res.send(users)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

//Should be get one

router.get("/:id", async ( req, res ) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            include: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'DateOnly']
            ],
            exclude: [
                'password',
                'password_reset_token',
                'password_reset_expires',
            ]
        }})

    if(!user) return res.json({type: "error", text: "There is no account with such id"})
    res.json({type: "success", data: user})
})

router.post("/", async (req, res) => {
    try {
        const user = req.body
        if (!user.email) {
            return console.log("Email is required")
        }
    
        const password = Math.random().toString(36).slice(-16);
    
        bcrypt.hash(password, 8, function (err, hash) {
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
                res.send({status: "success", data: user})
            })
            .catch(err => {
                if (err.original && err.original.code == 23505) {
                    res.status(400).send({status: "error", message: "email already exists"})
                } else {
                    res.status(500).send({status: "error"})
                }
            })
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.patch("/", async ( req, res ) => {
    User.update(req.body, 
    {
        where: {
            id: req.body.id
        }
    })
    .then(response => {res.status(200).json({message: "success"})})
    .catch(error => res.status(400).json(error.errors[0]))
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router;