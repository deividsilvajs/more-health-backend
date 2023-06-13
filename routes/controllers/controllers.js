const User = require('../schemas/User');
const validator = require('../schemas/Validator');
const { encryptionGenerator, passwordChecker } = require('./accountValidation');

const controllers = {

    signUp(req, res) {
        let user = req.body;
        const { weight, height } = user;
        if (weight.includes(',')) {
            user.weight = parseFloat(weight.replace(',', '.'));
        } else {
            user.weight = parseFloat(weight);
        };
        if (height.includes(',') || height.includes('.')) {
            res.status(409).send('A altura precisa ser em centímetros (Ex: 170cm)');
        } else {
            user.height = parseInt(height);
        };
        const { error } = validator(user);
        if (error) {
            res.status(400).send(error.message);
        } else {
            User.findOne({ email: user.email })
                .then(doc => {
                    if (doc) {
                        res.status(409).send('Email já cadastrado!');
                    } else {
                        user.password = encryptionGenerator(user.password);
                        user = new User(user);
                        user.save()
                            .then(doc => res.send(doc.id))
                            .catch(err => res.send(err));
                    };
                })
                .catch(err => res.send(err));
        };
    },

    login(req, res) {
        const user = req.body;
        User.findOne({ email: user.email })
            .then(doc => {
                if (doc) {
                    const password = passwordChecker(user.password, doc.password);
                    if (password) {
                        res.send(doc.id);
                    } else {
                        res.status(404).send('Senha incorreta');
                    }
                } else {
                    res.status(404).send('Email incorreto ou não cadastrado');
                };
            }).catch(err => res.send(err));
    },

    getUser(req, res) {
        const { id } = req.params;
        User.findById(id).select('name weight height')
            .then(doc => {
                let user = ({...doc})._doc;
                res.send(user);          
            })
            .catch(err => res.send(err));
    },

    updateWeight(req, res) {
        let { id, newWeight } = req.body;
        if (newWeight.includes(',')) {
            newWeight = parseFloat(newWeight.replace(',', '.'));
        } else {
            newWeight = parseFloat(newWeight);
        };
        User.findByIdAndUpdate(id, { weight: newWeight })
            .then(() => {
                res.status(200).send();
            }).catch(err => res.send(err));
    }

};

module.exports = controllers;