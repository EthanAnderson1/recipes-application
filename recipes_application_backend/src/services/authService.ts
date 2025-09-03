import {create} from '../repositories/UserRepo.ts';
import User from '../models/User.ts';


export const createUser = async (username: string, password: string): Promise<User> =>{
    const user = await create(username, password);
    return user;
}