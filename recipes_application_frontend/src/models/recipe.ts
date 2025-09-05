export default interface Recipe {
    id: number;
    title: string;
    cookingTime: number;
    ingredients: string[];
    instructions: string;
    createdBy: string;
}