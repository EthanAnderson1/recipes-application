import Review from './Review.ts';

export interface Recipe {
    id: number;
    title: string;
    cookingTime: number;
    instructions: string;
    ingredients: string[];
    createdBy: string; 
}

export const averageRating = (reviews: Review[]): number =>{
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return Number((sum / reviews.length).toFixed(2));
}
