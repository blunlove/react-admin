var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  setTimeout(() => {
    res.json({ Result: 'code' });
  }, 1000);
});

module.exports = router;
