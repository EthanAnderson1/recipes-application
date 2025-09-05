import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import{api} from "../services/API.ts";
import { useContext } from "react";
import { UserContext } from "../services/UserContext.tsx";
import { RecipeContext } from "../services/RecipeContext.tsx";
import type Recipe from "../models/recipe.ts";

export const RecipeForm = () =>{

    const [title, setTitle] = useState("");
    const [cookingTime, setCookingTime] = useState<number>(0);
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useContext(UserContext);
    const [recipe,setRecipe] = useContext(RecipeContext);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await api.post(
                "/recipe",
                {
                title,
                cookingTime,
                instructions,
                ingredients: ingredients.split(",").map((i) => i.trim()),
                createdBy: user
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Recipe created successfully!");
            window.setTimeout(()=>{
                setMessage("")
            },2000);
            setRecipe(res.data.recipe as Recipe);
        //eslint-disable-next-line
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Failed to create recipe");
            window.setTimeout(()=>{
                setMessage("")
            },2000)
        }
    };

  return (
    <Container className="mt-4">
      <h3>Create Recipe</h3>
      {message && <Alert>{message}</Alert>}
      <Form data-testid="createRecipeForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="cooking-time">Cooking Time (minutes)</Form.Label>
          <Form.Control
            id="cooking-time"
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(parseInt(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="ingredients">Ingredients (comma separated)</Form.Label>
          <Form.Control id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="instructions">Instructions</Form.Label>
          <Form.Control id="instructions" as="textarea" rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="success">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
}
