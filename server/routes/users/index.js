require('dotenv').config();
const express = require("express");
const router = express.Router();
const { User } = require("../../database/models")
const sequelize = require('sequelize')
const {register} = require('../../services/auth')
const { isAdmin } = require('../../middleware/auth')

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
        // const user = await User.create(req.body, {raw: true})
        const user = register(req.body)
        res.status(200).send(user.data)
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