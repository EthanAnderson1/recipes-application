export interface Review {
    id: number;
    recipeId: number;
    comment: string;
    rating: number; 
    createdBy: string;
}