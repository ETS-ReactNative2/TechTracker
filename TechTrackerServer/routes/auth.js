var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwtmanager = require('../jwt/jwtmanager');

router.post('/login', (req, res) => {
    req.db.collection('users').findOne({ "email": req.body.email })
        .then(doc => {
            if (bcrypt.compareSync(req.body.password, doc.password)) {
                const object = {
                    id: doc._id,
                    email: doc.email,
                    firstname: doc.firstname,
                };
                let token = jwtmanager.generate(object);
                res.json({ status: "success", token: token });

            } else {
                res.json({ status: "incorrect login", token: null });

            }
        }).catch(err => {
            res.json({ status: "no user", token: null });
        })
})


router.post('/signup', function (req, res, next) {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);

    req.db.collection('users').findOne({ 'email': email })
        .then(doc => {
            if (!doc) {
                req.db.collection('users').insertOne({ ...req.body, password: password }).then(data => {
                    res.json({ status: 'success' });
                }).catch(err => {
                    res.json({ status: 'error' });
                })
            } else {
                res.json({ status: 'already_added' });
            }
        });
});
module.exports = router;