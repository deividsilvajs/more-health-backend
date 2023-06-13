const bcrypt = require('bcryptjs');

const functions = {

    encryptionGenerator(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    passwordChecker(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

}

module.exports = functions;