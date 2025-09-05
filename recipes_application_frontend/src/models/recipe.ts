import type review from "./review.ts";
export default interface Recipe {
    id: number;
    title: string;
    cookingTime: number;
    ingredients: string[];
    instructions: string;
    reviews: review[];
    createdBy: string;
}