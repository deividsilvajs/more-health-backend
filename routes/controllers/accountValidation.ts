import bcrypt from 'bcryptjs';

export function encryptionGenerator(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export function passwordChecker(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

export function weightFormatChecker(weight: string) {
    if (weight.includes(',')) {
        return parseFloat(weight.replace(',', '.'));
    } else {
        return parseFloat(weight);
    }
}