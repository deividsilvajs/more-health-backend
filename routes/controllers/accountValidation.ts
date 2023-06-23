import bcrypt from 'bcryptjs'
import { Response } from 'express'

export function encryptionGenerator(password: string) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export function passwordChecker(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
}

export function weightFormatChecker(weight: string) {
    if (weight.includes(',')) {
        return parseFloat(weight.replace(',', '.'))
    } else {
        return parseFloat(weight)
    }
}

export function heightFormatChecker(res: Response, height: string) {
    if (height.includes(',') || height.includes('.')) {
        return res.status(409).send('A altura precisa ser em centímetros (Ex: 170cm)')
    } else {
        return parseInt(height)
    }
}