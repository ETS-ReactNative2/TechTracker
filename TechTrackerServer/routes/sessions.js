var express = require('express');
var router = express.Router();
var Uaa = require('../uaa/authorization');


router.post('/', function (req, res) {

    req.body.start_time = new Date(req.body.start_time);

    let endDate = new Date();
    req.body.end_time = endDate;

    let start_time = req.body.start_time.getTime();
    let end_time = req.body.end_time.getTime();

    let duration = (end_time - start_time) / (1000 * 60 * 60)

    req.body.duration = duration;

    

    let hourOfDay = req.body.start_time.getHours()
    if (hourOfDay > 12) {
        hourOfDay = hourOfDay - 12 + 'PM'
    } else if (hourOfDay === 0) {
        hourOfDay = 12 + "AM"
    } else if (hourOfDay === 12) {
        hourOfDay = hourOfDay + "PM"
    } else {
        hourOfDay = hourOfDay + "AM"
    }
    req.body.hourOfDay = hourOfDay

    

    let dayOfWeek = req.body.start_time.getDay()
    if (dayOfWeek === 0) {
        dayOfWeek = 'Sunday'
    } else if (dayOfWeek === 1) {
        dayOfWeek = 'Monday'
    } else if (dayOfWeek === 2) {
        dayOfWeek = 'Tuesday'
    } else if (dayOfWeek === 3) {
        dayOfWeek = 'Wednesday'
    } else if (dayOfWeek === 4) {
        dayOfWeek = 'Thursday'
    } else if (dayOfWeek === 5) {
        dayOfWeek = 'Friday'
    } else if (dayOfWeek === 6) {
        dayOfWeek = 'Saturday'
    }
    req.body.dayOfWeek = dayOfWeek;


    req.db.collection('sessions').insertOne(req.body).then(result => {
        res.json({ status: 'success' })
    }).catch(error => {
        res.json({ status: 'unsuccessful' })
    })
});



router.get('/:id/:activity', function (req, res) {

    const now = new Date()
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    req.db.collection('sessions').find({
        $and: [{ 'activity': req.params.activity }, { 'user_id': req.params.id }, {
            'start_time': {
                '$gte': weekAgo,
                '$lt': now
            }
        }]
    }).toArray().then(result => {
        console.log(result)
        res.json({ status: 'success', sessions: result })
    }).catch(error => {

        res.json({ status: 'unsuccessful' })
    })
});

module.exports = router;