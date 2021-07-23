var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    req.db.collection('sessions').insertOne(req.body).then(result => {
        res.json({ status: 'success' })
    }).catch(error => {
        res.json({ status: 'unsuccessful' })
    })
});

module.exports = router;