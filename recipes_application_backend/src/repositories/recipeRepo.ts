import { pool } from '../dbconfig.ts';
import { Recipe } from '../models/Recipe.ts';
import { Review } from '../models/Review.ts';

export const getAll= async()=> {
    // eslint-disable-next-line
    const [rows] = await pool.query<any[]>(
        `SELECT * FROM recipe`
    );
    return rows.map(row => ({
        id: row.id,
        title: row.title,
        cookingTime: row.cooking_time,
        instructions: row.instructions,
        ingredients: JSON.parse(row.ingredients),
        createdBy: row.created_by,
    } as Recipe));
}


export const getByUsername = async (username: string)=> {
    // eslint-disable-next-line
    const [rows] = await pool.query<any[]>(
    `SELECT * FROM recipe r INNER JOIN user u ON u.username = r.created_by WHERE u.username = ?`,
    [username]
    );
    return rows.map(row => ({
        id: row.id,
        title: row.title,
        cookingTime: row.cooking_time,
        instructions: row.instructions,
        ingredients: JSON.parse(row.ingredients),
        createdBy: row.created_by,
    } as Recipe));
}

export const getById = async (id: number)=> {
    // eslint-disable-next-line
    const [rows] = await pool.query<any[]>(
    `SELECT * FROM recipe WHERE id = ?`,
    [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as Recipe;
}


export const update = async (id: number, title?: string, cookingTime?: number, instructions?: string, ingredients?: string[]):Promise<number> =>{
    const recipe = await getById(id);
    if (!recipe) throw new Error('Recipe not found');
    if (title) recipe.title = title;
    if (cookingTime) recipe.cookingTime = cookingTime;
    if (instructions) recipe.instructions = instructions;
    if (ingredients) recipe.ingredients = ingredients;  
    
    // eslint-disable-next-line
    const [result] = await pool.query<any>(`UPDATE recipe SET title=?, cooking_time=?,instructions=?,ingredients=? WHERE id = ?`, [recipe.title, recipe.cookingTime, recipe.instructions, JSON.stringify(recipe.ingredients), id]);
    return result.affectedRows;
}

export const create = async (title: string, cookingTime: number, instructions: string, ingredients: string[], createdBy: string): Promise<Recipe> =>{
    const query = `INSERT INTO recipe (title, cooking_time, instructions, ingredients, created_by) VALUES (?, ?, ?, ?, ?)`;
    console.log(title, cookingTime, instructions, JSON.stringify(ingredients), createdBy)
    // eslint-disable-next-line
    const [result] = await pool.query<any>(query,[title, cookingTime, instructions, JSON.stringify(ingredients), createdBy]);
    return { id: result.insertId, title, cookingTime, instructions, ingredients, createdBy } as Recipe;
}

export const remove = async (id: number): Promise<number>=> {
    // eslint-disable-next-line
    const [result] = await pool.query<any>('DELETE FROM recipe WHERE id = ?', [id]);
    return result.affectedRows;
}

export const getReviews = async (recipeId: number) : Promise<Review[]> =>{
    // eslint-disable-next-line
    const [rows] = await pool.query<any[]>(`SELECT * FROM review WHERE recipe_id = ?`, [recipeId]);
    return rows.map(row => ({
        id: row.id,
        recipeId: row.recipe_id,
        comment: row.comment,
        rating: row.rating,
        createdBy: row.created_by,
    } as Review));;
}

export const createReview = async (recipeId: number, createdBy: string, comment: string, rating: number ):Promise<Review> =>{
    // eslint-disable-next-line
    const [result] = await pool.query<any>(`INSERT INTO review (recipe_id, created_by, comment, rating) VALUES (?, ?,?,?)`, [recipeId, createdBy, comment, rating]);
    return { id: result.insertId, recipeId, createdBy, comment, rating } as Review;
}

export const getFavourites = async (username: string): Promise<Recipe[]> =>{
    // eslint-disable-next-line
    const [rows] = await pool.query<any[]>(`SELECT r.* FROM recipe r INNER JOIN favourite f ON r.id = f.recipe_id WHERE f.username = ?`, [username]);
    return rows.map(row => ({
        id: row.id,
        title: row.title,
        cookingTime: row.cooking_time,
        instructions: row.instructions,
        ingredients: JSON.parse(row.ingredients),
        createdBy: row.created_by,
    } as Recipe));
}