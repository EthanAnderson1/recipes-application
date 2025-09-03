import Review from './Review.ts';

export interface RecipeProps {
    id: number;
    title: string;
    cookingTime: number;
    instructions: string;
    ingredients: string[];
    createdBy: string; 
}

export class Recipe implements RecipeProps {
    id: number;
    title: string;
    cookingTime: number;
    instructions: string;
    ingredients: string[];
    createdBy: string;


constructor(
    id: number, 
    title: string, 
    cookingTime: number,
    instructions: string,
    ingredients: string[],
    createdBy: string,) {
        this.id = id;
        this.title = title;
        this.cookingTime = cookingTime;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.createdBy = createdBy;
}

    averageRating(reviews: Review[]): number {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return Number((sum / reviews.length).toFixed(2));
    }
}