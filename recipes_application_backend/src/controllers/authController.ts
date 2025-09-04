import { Request, Response } from 'express';
import { createUser, verifyUser } from '../services/AuthService.ts';

export const signup = async (req: Request, res: Response)=>{
    const { username, password } = req.body;
    const result = await createUser(username, password);
    res.status(201).json(result);
}

export const login = async( req:Request, res: Response)=>{
    const { username, password } = req.body;
    const result = await verifyUser(username, password);
    res.status(200).json(result)
}