import { Request, Response } from 'express';
import { createRecipe, getRecipe, getAllRecipes, deleteRecipe, updateRecipe,getRecipeByUsername,getRecipeReviews,addRecipeReview, getFavouriteRecipes} from '../services/RecipeService.ts';
import {Recipe} from '../models/Recipe.ts';

export const saveRecipe = async (req: Request, res: Response)=> {
    const { title, cookingTime, instructions, ingredients } = req.body;
    // eslint-disable-next-line
    const recipe = await createRecipe( title, cookingTime, instructions, ingredients, (req as any).user.data.username );
    res.status(201).json({ recipe });
}

export const findRecipe = async (req: Request, res: Response) =>{
    const id = Number(req.params.id);
    const recipe = await getRecipe(id);
    res.json(recipe);
}

export const findAllRecipes = async(_req: Request, res: Response) =>{
    const recipes = await getAllRecipes();
    res.json(recipes);
}

export const removeRecipe = async (req: Request, res: Response) =>{
    const id = Number(req.params.id);
    const affected = await deleteRecipe(id);
    if (!affected) return res.status(404).json({ error: 'Recipe not found' });
    res.status(204).send();
}


export const editRecipe = async (req: Request, res: Response)=> {
    const { id, title, cookingTime, instructions, ingredients} = req.body;
    const affected = await updateRecipe( id, title, cookingTime, instructions, ingredients );
    if (!affected) return res.status(404).json({ error: 'Recipe not found or no changes' });
    res.json({ updated: true });
}


export const usersRecipies = async (req: Request, res: Response) =>{
    const username = String(req.params.username);
    const recipes = await getRecipeByUsername(username);
    res.json(recipes);
}

export const leaveReview = async (req: Request, res: Response) =>{
    const {recipeId, comment, rating } = req.body;
    // eslint-disable-next-line
    const review = await addRecipeReview( recipeId, (req as any).user.data.username, comment, rating );
    res.status(201).json({ review });
}

export const getReviews = async (req: Request, res: Response) =>{
    const recipeId = Number(req.params.id);
    const reviews = await getRecipeReviews(recipeId);
    res.json(reviews);
}

export const favouriteRecipes = async (req: Request, res: Response) =>{
    // eslint-disable-next-line
    const recipes: Recipe[] = await getFavouriteRecipes((req as any).user.data.username);
    res.json(recipes);
}