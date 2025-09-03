import { Request, Response } from 'express';
import { createUser } from '../services/AuthService.ts';

export const signup = async (req: Request, res: Response)=>{
    const { username, password } = req.body;
    const result = await createUser(username, password);
    res.status(201).json(result);
}