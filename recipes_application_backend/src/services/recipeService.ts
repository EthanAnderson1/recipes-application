import {create, getById,getAll,getByUsername,update,remove,getReviews,createReview}  from '../repositories/RecipeRepo.ts';
import {Recipe} from '../models/Recipe.ts';
import {Review} from '../models/Review.ts';



export const createRecipe = async (title: string, cookingTime: number, instructions: string, ingredients: string[], createdBy: string) :Promise<Recipe> =>{
    return create(title, cookingTime, instructions, ingredients, createdBy);
}

export const getRecipe =  async (id: number): Promise<Recipe> => {
    const recipe = await getById(id);
    if (!recipe) throw { status: 404, message: 'Recipe not found' };
    return recipe;
}

export const getAllRecipes = () : Promise<Recipe[]> => {
    return getAll();
}

export const getRecipeByUsername = (username: string) : Promise<Recipe[]> => {
    return getByUsername(username);
}

export const updateRecipe = async (id:number, title: string, cookingTime: number, instructions: string, ingredients: string[]) =>{
    return update(id,title, cookingTime, instructions, ingredients);
}

export const deleteRecipe = (id: number)=>{
    return remove(id);
}

export const getRecipeReviews = async (recipeId: number) : Promise<Review[]> =>{
    const reviews :Review[] = await getReviews(recipeId);
    return reviews;
}

export const addRecipeReview = async (recipeId: number, createdBy: string, comment: string, rating: number) : Promise<Review> =>{
    return createReview( recipeId, createdBy, comment, rating);
}