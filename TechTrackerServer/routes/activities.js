var express = require('express');
var router = express.Router();
var Uaa = require('../uaa/authorization');


router.get('/', Uaa.authenticate, function (req, res) {
    req.db.collection('activities').find({}).toArray().then(result => {
        console.log(result);
        res.json({ status: 'success', activities: result })
    }).catch(error => {
        res.json({ status: 'unsuccessful' })
    })
});

router.post('/', Uaa.authenticate, function (req, res) {
    req.db.collection('activities').findOne({ 'activityName': req.body.activityName }).then(result => {
        if (!result) {
            req.db.collection('activities').insertOne(req.body).then(result => {
                res.json({ status: 'success' })
            })
        } else {
            res.json({status: 'duplicate'})
        }

    }).catch(error => {
        res.json({ status: 'unsuccessful' })
    })
});

module.exports = router;