import { useEffect, useState, useContext } from "react";
import {api} from "../services/API.ts";
import{ Row} from "react-bootstrap";
import { FavouriteRecipeCard } from "./FavouriteRecipeCard.tsx";
import { RecipeContext } from "../services/RecipeContext.tsx";

export const FavouriteRecipes = () => {

    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useContext(RecipeContext);

    const fetchFavouriteRecipes = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await api.get(`/favouriteRecipes`, {
                headers: { Authorization: `Bearer ${token}` }
                });
                setRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            }
        };
    
    useEffect(() => {
        fetchFavouriteRecipes();
      }, [recipe]);
    return (
        <div>
            <h2>Favourite Recipes</h2>
            {recipes.map((r) => (
                <Row key={r.id}>
                    <FavouriteRecipeCard prop={r}/>
                </Row>
            ))}
        </div>
    );
}