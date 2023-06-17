import { Schema, model } from 'mongoose';
import { User } from '../controllers/IUser';

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true }
});

export default model<User>('users', userSchema);