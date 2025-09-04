import { Request, Response } from 'express';
import { createUser, verifyUser, addfavouriteRecipe, removefavouriteRecipe} from '../services/UserService.ts';

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

export const favouriteRecipe = async (req: Request, res: Response) =>{
    const { id } = req.body;
    // eslint-disable-next-line
    await addfavouriteRecipe((req as any).user.data.username, id);
    res.status(201).json({ favourited: true });
}

export const unfavouriteRecipe = async (req: Request, res: Response) =>{
    const id  =  Number(req.params.id);
    // eslint-disable-next-line
    await removefavouriteRecipe((req as any).user.data.username, id);
    res.status(204).send();
}