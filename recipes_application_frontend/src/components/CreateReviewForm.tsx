import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import {api} from "../services/API.ts";
import { useContext } from "react";
import { RecipeContext } from "../services/RecipeContext.tsx";

export const ReviewForm = () =>{
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number>(5);
    const [message, setMessage] = useState("");
    const [recipe, setRecipe] = useContext(RecipeContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const token = localStorage.getItem("token");
        console.log("Submitting review for recipe ID:", recipe.id);
        const recipeId = recipe.id;
        await api.post(
            "/review",{recipeId,comment,rating},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Review added successfully!");
        window.setTimeout(()=>{
            setMessage("")
        },2000)
        setRecipe({...recipe});
        //eslint-disable-next-line
        } catch (err: any) {
        setMessage(err.response?.data?.message || "Failed to add review");
        window.setTimeout(()=>{
            setMessage("")
        },2000)
        }
    };

  return (
    <Container className="mt-4">
      <h4>Add a Review</h4>
      {message && <Alert>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating (1-5)</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit Review
        </Button>
      </Form>
    </Container>
  );
}
