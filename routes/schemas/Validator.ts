import Joi from 'joi';
import User from '../controllers/IUser';

function userValidator(user: Object) {

    const schema = Joi.object<User>({
        name: Joi.string().min(2).required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        weight: Joi.number().min(10).required(),
        height: Joi.number().min(100).required(),
    });

    return schema.validate(user);

};

export default userValidator;