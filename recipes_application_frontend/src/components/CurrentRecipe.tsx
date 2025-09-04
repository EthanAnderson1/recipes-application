import type Recipe from "../models/recipe";

//eslint-disable-next-line
export const CurrentRecipe = (props: any)=>{
    const recipe : Recipe|null = props?.recipe;
    return (
        recipe?
        <div>
            <h2>{recipe.title}</h2>
            <h3>Cooking Time: {recipe.cookingTime}</h3>
            <h3>Ingredients: {recipe.ingredients?.map(
                ingredient => <p>{ingredient}</p>
                )}
            </h3>
            <h3>Instructions: {recipe.instructions}</h3>
        </div>:
        <div>
            <h2>No Recipe Selected</h2>
            <p>Please select a recipe to view its details.</p>
        </div>
    );
}