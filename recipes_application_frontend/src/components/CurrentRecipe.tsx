import { useContext, useEffect,useState } from "react";
import { RecipeContext } from "../services/RecipeContext";
import { api } from "../services/API.ts";
import { ReviewForm } from "./CreateReviewForm.tsx";
import { ReviewCard } from "./ReviewCard.tsx";
import { Button, Alert} from "react-bootstrap";

export const CurrentRecipe = ()=>{

    const [recipe,setRecipe] = useContext(RecipeContext);
    const [reviews,setReviews] = useState([]);
    const [message,setMessage] = useState("");

    let rating = null;
    if (reviews && reviews.length > 0) {
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        rating = (total / reviews.length).toFixed(1);
    } else {
        rating = "No ratings yet";
    }

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

    const favouriteHandler = async (e) =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/favourite",{id:recipe.id},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRecipe({...recipe});
            setMessage("Recipe added to favourites!");
            window.setTimeout(()=>{ 
                setMessage("")
            },2000);
        //eslint-disable-next-line
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Failed to add to favourites");
            window.setTimeout(()=>{
                setMessage("")
            },2000)
        }
    }
    return (
        recipe?
        <div>
             {message && <Alert>{message}</Alert>}
            <h1>{recipe.title}</h1>
            <br />
            <h3>Created By: {recipe.createdBy}</h3>
            <h3>Cooking Time: {recipe.cookingTime} mins</h3>
            <h3>Ingredients: {recipe.ingredients?.map(
                ingredient => <span>{ingredient} </span>
                )}
            </h3>
            <h3>Instructions: {recipe.instructions}</h3>
            <h3>Rating: {rating}</h3>
            <br />
            <Button onClick={favouriteHandler} variant="primary">Favourite Recipe</Button>
            <br />
            <ReviewForm />
            <br />
            <h3>Reviews:</h3>
            {reviews?.map(
                review => <div key={review?.id} className="mb-2 border rounded">
                    <ReviewCard prop={review}/>
                </div>
            )}
        </div>:
        <div>
            <h2>No Recipe Selected</h2>
            <p>Please select a recipe to view its details.</p>
        </div>
    );
}