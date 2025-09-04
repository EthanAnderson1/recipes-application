import {create, findByUsername} from '../repositories/UserRepo.ts';
import User from '../models/User.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (username: string, password: string): Promise<User> =>{
    const hash = await bcrypt.hash(password, 10);
    const user = await create(username, hash);
    return user;
}

export const verifyUser = async (username: string, password: string): Promise<string> =>{
    const user = await findByUsername(username);
    if (!user) throw { status: 400, message: 'Invalid credentials' };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 400, message: 'Invalid credentials' };
    //1 day expiration
    const exp = Math.floor(Date.now() / 1000)+parseInt(process.env.JWT_EXPIRES as string);
    const token = jwt.sign({data:{username: user.username},exp: exp}, process.env.JWT_SECRET as string);
    return token ;
}