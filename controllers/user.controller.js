const FB = require('fb');
const User = require('../models/user.model');
const token = require('../middlewares/token.middleware');
const hash = require('../middlewares/hash.middleware');

module.exports = {
    signin: (req, res) => {
        if (req.headers.access_token) {
            FB.api('me', { fields: ['name', 'email'], access_token: req.headers.access_token }, (data) => {
                if (data.error) return res.status(500).send({ message: data.error });
                
                User.findOne({ email: data.email }, (err, user) => {
                    if (!user) {
                        let new_user = new User({
                            name: data.name,
                            email: data.email,
                        });

                        new_user.save(err => {
                            if (err) return res.status(500).send({ message: err });
                            return res.status(201).send({
                                message: 'signin success',
                                token: token.generate({ id: new_user._id, name: new_user.name, email: new_user.email })
                            });
                        })
                    }
                    
                    return res.status(200).send({
                        message: 'signin success',
                        token: token.generate({ id: user._id, name: user.name, email: user.email })
                    });
                })
            })
        }
        else {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (!user) return res.status(404).send({ message: 'Wrong Email' });

                if (!hash.compare(req.body.password, user.password)) return res.status(404).send({ message: 'Wrong Password' });
                
                return res.status(200).send({ 
                    message: 'signin success',
                    token: token.generate({ id: user._id, name: user.name, email: user.email })
                });
            })
        }
    },

    signup: (req, res) => {
        let new_user = new User(req.body);

        new_user.save(err => {
            if (err) return res.status(500).send({ message: err });

            return res.status(201).send({
                message: 'signup success',
                token: token.generate({ id: new_user._id, name: new_user.name, email: new_user.email })
            });
        })
    }
};