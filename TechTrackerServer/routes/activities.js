var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  req.db.collection('activities').find().toArray().then(result => {
      res.json({status: 'success', activities: result})
  }).catch(error => {
      res.json({status: 'unsuccessful'})
  })
});

router.post('/', function(req, res) {
    req.db.collection('activities').insertOne(req.body).then(result => {
        res.json({status: 'success'})
    }).catch(error => {
        res.json({status: 'unsuccessful'})
    })
  });

module.exports = router;