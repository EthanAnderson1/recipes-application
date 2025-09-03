import {create} from '../repositories/UserRepo.ts';
import User from '../models/User.ts';
import bcrypt from 'bcryptjs';

export const createUser = async (username: string, password: string): Promise<User> =>{
    const hash = await bcrypt.hash(password, 10);
    const user = await create(username, hash);
    return user;
}