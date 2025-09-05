export interface Recipe {
    id: number;
    title: string;
    cookingTime: number;
    instructions: string;
    ingredients: string[];
    createdBy: string; 
}