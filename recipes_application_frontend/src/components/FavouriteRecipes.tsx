import { useEffect, useState } from "react";
import {api} from "../services/API.ts";
import{ Row} from "react-bootstrap";
import { RecipeCard } from "./RecipeCard.tsx";

export const FavouriteRecipes = () => {

    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
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
        fetchFavouriteRecipes();
      }, []);
    return (
        <div>
            <h2>Favourite Recipes</h2>
            {recipes.map((r) => (
                <Row key={r.id}>
                    <RecipeCard prop={r}/>
                </Row>
            ))}
        </div>
    );
}