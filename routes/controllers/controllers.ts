import { Request, Response } from 'express'
import { encryptionGenerator, passwordChecker, 
    weightFormatChecker, heightFormatChecker } from './accountValidation'
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
                            .then((doc: User) => res.send(doc))
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
                        res.send(doc)
                    } else {
                        res.status(404).send('Senha incorreta')
                    }
                } else {
                    res.status(404).send('Email incorreto ou não cadastrado')
                }
            }).catch((err: Object) => res.send(err))
    },

    updateWeight(req: Request, res: Response) {
        let { id, newWeight } = req.body
        if (newWeight.includes(',')) {
            newWeight = parseFloat(newWeight.replace(',', '.'))
        } else {
            newWeight = parseFloat(newWeight)
        }
        Model.findByIdAndUpdate(id, { weight: newWeight })
            .then(() => {
                res.status(200).send()
            }).catch((err: Object) => res.send(err))
    }

}

export default controllers