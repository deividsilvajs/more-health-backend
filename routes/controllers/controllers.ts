import { Request, Response } from 'express'
import {
    encryptionGenerator, passwordChecker,
    weightFormatChecker, heightFormatChecker
} from './accountValidation'
import Model from '../schemas/Model'
import { User } from './IUser'
import validator from '../schemas/Validator'

const controllers = {

    signUp(req: Request, res: Response) {
        let user = req.body
        const { weight, height } = user
        user.weight = weightFormatChecker(weight)
        user.height = heightFormatChecker(res, height)
        const { error } = validator(user)
        if (error) {
            res.status(400).send(error.message)
        } else {
            Model.findOne({ email: user.email })
                .then((doc: User | null) => {
                    if (doc) {
                        res.status(409).send('Email já cadastrado!')
                    } else {
                        user.password = encryptionGenerator(user.password)
                        user = new Model(user)
                        user.save()
                            .then((doc: User) => {
                                // Escolhendo apenas informações úteis ao frontend
                                const { id, name, weight, height } = doc
                                res.send({ id, name, weight, height })
                            })
                            .catch((err: Object) => res.send(err))
                    }
                })
                .catch((err: Object) => res.send(err))
        }
    },

    login(req: Request, res: Response) {
        const user = req.body
        Model.findOne({ email: user.email })
            .then((doc: User | null) => {
                if (doc) {
                    const password = passwordChecker(user.password, doc.password)
                    if (password) {
                        // Escolhendo apenas informações úteis ao frontend
                        const { id, name, weight, height } = doc
                        res.send({ id, name, weight, height })
                    } else {
                        res.status(404).send('Senha incorreta')
                    }
                } else {
                    res.status(404).send('Email incorreto ou não cadastrado')
                }
            }).catch((err: Object) => res.send(err))
    },

    update(req: Request, res: Response) {
        const user = req.body
        Model.findByIdAndUpdate(user.id, {
            name: user.name,
            weight: user.weight,
            height: user.height
        }).then(() => res.status(200).send())
    }

}

export default controllers