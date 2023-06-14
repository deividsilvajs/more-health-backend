import { Request, Response } from 'express';

// Arquivos que preciso atualizar
const User = require('../schemas/User');
const validator = require('../schemas/Validator');
const { encryptionGenerator, passwordChecker } = require('./accountValidation');

interface Doc {
    id: string;
    name: string;
    email: string;
    weight: number;
    height: number;
    password: string;
    _doc?: Object
}

const controllers = {

    signUp(req: Request, res: Response) {
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
                .then((doc: Doc) => {
                    if (doc) {
                        res.status(409).send('Email já cadastrado!');
                    } else {
                        user.password = encryptionGenerator(user.password);
                        user = new User(user);
                        user.save()
                            .then((doc: Doc) => res.send(doc.id))
                            .catch((err: Object) => res.send(err));
                    };
                })
                .catch((err: Object) => res.send(err));
        };
    },

    login(req: Request, res: Response) {
        const user = req.body;
        User.findOne({ email: user.email })
            .then((doc: Doc) => {
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
            }).catch((err: Object) => res.send(err));
    },

    getUser(req: Request, res: Response) {
        const { id } = req.params;
        User.findById(id).select('name weight height')
            .then((doc: Doc) => {
                let user = ({...doc})._doc;
                res.send(user);          
            })
            .catch((err: Object) => res.send(err));
    },

    updateWeight(req: Request, res: Response) {
        let { id, newWeight } = req.body;
        if (newWeight.includes(',')) {
            newWeight = parseFloat(newWeight.replace(',', '.'));
        } else {
            newWeight = parseFloat(newWeight);
        };
        User.findByIdAndUpdate(id, { weight: newWeight })
            .then(() => {
                res.status(200).send();
            }).catch((err: Object) => res.send(err));
    }

};

export default controllers;