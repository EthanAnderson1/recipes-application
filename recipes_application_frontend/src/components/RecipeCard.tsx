import { Button, Container, Row,Col } from "react-bootstrap";
import type Recipe from "../models/recipe";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../services/RecipeContext";
//eslint-disable-next-line
export const RecipeCard = (prop: any) => {

    const recipeProp: Recipe = prop.prop as Recipe;
    const [recipe, setRecipe] = useContext(RecipeContext);

    const handleSelect = (e) => {
        e.preventDefault();
        setRecipe(recipeProp);
    };

    return (
        <Container className="recipe-card mb-3 p-3 border rounded">   
            <h3>{recipeProp.title}</h3>
            <p>Created By: {recipeProp.createdBy}</p>
            <Row>
                <Col>
                    <p>Cooking Time: {recipeProp.cookingTime} minutes</p>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleSelect}>Select recipe</Button>
        </Container>
        );
}