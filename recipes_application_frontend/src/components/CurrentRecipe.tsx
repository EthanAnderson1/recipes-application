import { useContext, useEffect,useState } from "react";
import { RecipeContext } from "../services/RecipeContext";
import { api } from "../services/API.ts";
import { ReviewForm } from "./CreateReviewForm.tsx";

export const CurrentRecipe = ()=>{

    const [recipe,setRecipe] = useContext(RecipeContext);
    const [reviews,setReviews] = useState([]);
    useEffect(() => {
        const fetchReviews = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const res = await api.get(`/reviews/${recipe.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                    });
                    setReviews(res.data);
                } catch (err) {
                    console.error("Failed to fetch reviews", err);
                }
            };
            fetchReviews();
    }, [recipe]);

    return (
        recipe?
        <div>
            <h1>{recipe.title}</h1>
            <br />
            <h3>Created By: {recipe.createdBy}</h3>
            <h3>Cooking Time: {recipe.cookingTime}</h3>
            <h3>Ingredients: {recipe.ingredients?.map(
                ingredient => <span>{ingredient} </span>
                )}
            </h3>
            <h3>Instructions: {recipe.instructions}</h3>
            <br />
            <ReviewForm />
            <br />
            <h3>Reviews:</h3>
            {reviews?.map(
                review => <div key={review?.id} className="mb-2 p-2 border rounded">
                    <p>Rating: {review?.rating} stars</p>
                    <p>Comment: {review?.comment}</p>
                    <p>By: {review?.createdBy}</p>
                </div>
            )}
        </div>:
        <div>
            <h2>No Recipe Selected</h2>
            <p>Please select a recipe to view its details.</p>
        </div>
    );
}