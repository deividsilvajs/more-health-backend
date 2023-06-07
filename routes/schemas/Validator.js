const Joi = require('joi');

function userValidator(user) {

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        weight: Joi.number().min(10).required(),
        height: Joi.number().min(100).required(),
    });

    return schema.validate(user);

};

module.exports = userValidator;