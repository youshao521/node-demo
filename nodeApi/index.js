var express = require('express');
var router = express.Router();

router.get('/api/demo1', function(req, res, next) {
  console.log(req.query)
  res.send({test: 'success'});
});

router.post('/api/demo2', function(req, res, next) {
  console.log(66666);
  console.log(req.body);
  res.send({test: 'success'})
});

module.exports = router;
