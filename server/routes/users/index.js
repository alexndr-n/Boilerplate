const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/UserController');
const userController = new UserController();

router.get('/', async (req, res) => {
  try{
    const user = await userController.getUser();
    res.send(user);
  }catch(err){
    return next(err);
  }
});

module.exports = router;