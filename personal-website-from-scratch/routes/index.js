var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fjord', function(req, res, next) {
  res.render('fjord', { title: 'Fjord' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

module.exports = router;
