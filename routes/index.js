var express = require('express');
var download = require('../utils/stream');
var router = express.Router();
req1 = require('request');
qs = require('querystring');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'KM youtube download'
  });
});

router.post('/', (req, res) => {
  var url3 = req.body.link;
  if (url3.includes('youtube') && url3.includes('http')) {
    download.download(res, req1, qs, req.body.link);
  }
  // res.render('notWorking');
});

module.exports = router;