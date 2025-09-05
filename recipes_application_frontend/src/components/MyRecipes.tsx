import { useContext, useEffect, useState } from "react";
import {api} from "../services/API.ts";
import { UserContext } from "../services/UserContext.tsx";
import{ Row} from "react-bootstrap";
import { RecipeCard } from "./RecipeCard.tsx";

export const MyRecipes = () => {

    const token = localStorage.getItem("token");
    const [user, setUser] = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await api.get(`/recipesByUsername/${user}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            }
        }
        fetchRecipes();
      }, []);
    
    return (
        <div>
            <h2>My Recipes</h2>
            {recipes.map((r) => (
                    <Row key={r.id}>
                        <RecipeCard prop={r}/>
                    </Row>
            ))}
        </div>
    );
}