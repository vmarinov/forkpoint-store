const express = require('express');

const router = express.Router();
const _ = require('underscore');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Forkpoint Store', _ });
});

module.exports = router;
