var express = require('express');
var wechat = require('wechat');
var router = express.Router();
var movie = require("../controllers").movie

/* GET users listing. */



router.get('/', wechat("beimenwenhua",movie.renzheng));
router.post('/', wechat("beimenwenhua",movie.findByMoviesName));

module.exports = router;
