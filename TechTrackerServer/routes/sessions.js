var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    req.db.collection('sessions').insertOne(req.body).then(result => {
        res.json({ status: 'success' })
    }).catch(error => {
        res.json({ status: 'unsuccessful' })
    })
});

router.get('/:id', function (req, res) {

    const now = new Date().toISOString();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    req.db.collection('sessions').find({$and: [{'activity': req.params.id}, {'start_time': {
        '$gte': ISODate(weekAgo),
        '$lt': ISODate(now)
    }}]}).toArray().then(result => {
        res.json({ status: 'success', sessions: result })
    }).catch(error => {
        res.json({ status: 'unsuccessful' })
    })
});

module.exports = router;