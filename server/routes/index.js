const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page');
});

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

module.exports = router;