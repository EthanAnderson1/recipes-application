import {  useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {RecipeCard} from "../components/RecipeCard";
import {api} from "../services/API.ts";
import type Recipe from "../models/recipe.ts";
import { UserContext } from "../services/UserContext.tsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import { RecipeForm } from "../components/CreateRecipeForm.tsx";
import { CurrentRecipe } from "../components/CurrentRecipe.tsx";
import { RecipeContext } from "../services/RecipeContext.tsx";

export default function RecipesPage() {
    
    const [recipe, setRecipe] = useContext(RecipeContext);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            setUser( jwtDecode(token).data.username);
            }
        if (!user) {
            navigate("/login");
        }
    },[]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await api.get("/recipes", {
                headers: { Authorization: `Bearer ${token}` }
                });
                setRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            }
        };
    fetchRecipes();
  }, [recipe]);

  return (
    <Container className=" mt-5 page">
        <h1>Recipes</h1> 
            <Row className="main-content">
                <Col> 
                <div>
                    <h2>All Recipes</h2>
                    {recipes.map((r) => (
                            <Row key={r.id}>
                                <RecipeCard prop={r}/>
                            </Row>
                    ))}
                </div>
               </Col>
               <Col className="content-section mb-3 p-3 border rounded">
                   <CurrentRecipe/> 
               </Col>
                <Col className="content-section mb-3 p-3 border rounded">
                    <RecipeForm/>
               </Col>
            </Row>
    </Container>
  );
}