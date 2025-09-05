import { Button, Container, Row,Col } from "react-bootstrap";
import type Recipe from "../models/recipe";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../services/RecipeContext";
import { api } from "../services/API.ts";

//eslint-disable-next-line
export const FavouriteRecipeCard = (prop: any) => {

    const recipeProp: Recipe = prop.prop as Recipe;
    const [recipe, setRecipe] = useContext(RecipeContext);

    const handleSelect = (e) => {
        e.preventDefault();
        setRecipe(recipeProp);
    };

    const removeFavourite = async (e) =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.delete(
                `/unfavourite/${recipeProp.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRecipe({...recipe});
        }
        //eslint-disable-next-line
        catch (err: any) {
            console.error(err);
        }
    }

    return (
        <Container className="recipe-card mb-3 p-3 border rounded">   
            <h3>{recipeProp.title}</h3>
            <p>Created By: {recipeProp.createdBy}</p>
            <Row>
                <Col>
                    <p>Cooking Time: {recipeProp.cookingTime} minutes</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={handleSelect}>Select recipe</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={removeFavourite}>Remove from Favourites</Button>
                </Col>
            </Row>
            
        </Container>
    );
}