import { useContext, useEffect } from "react";
import { UserContext } from "../services/UserContext.tsx";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {FavouriteRecipes} from "../components/FavouriteRecipes.tsx";
import {MyRecipes} from "../components/MyRecipes.tsx";
import {CurrentRecipe} from "../components/CurrentRecipe.tsx";
import { jwtDecode } from 'jwt-decode'
import { RecipeContext } from "../services/RecipeContext.tsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [recipe, setRecipe] = useContext(RecipeContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          setUser( jwtDecode(token).data.username);
        }
    if (!user) {
      navigate("/login");
    }
  },[user]);
  return (
    <Container className="text-center mt-5 page">
      <h1>Hello {user}</h1>
      <h1>🍲 Welcome to Recipe App</h1>
      <p className="lead">Discover, share and review amazing recipes.</p>
        <Row className="main-content">
          <Col className="content-section mb-3 p-3 border rounded">
            <FavouriteRecipes />
          </Col>
          <Col className="content-section mb-3 p-3 border rounded"> 
            
            <MyRecipes />
          </Col>
          <Col className="content-section mb-3 p-3 border rounded">
            <CurrentRecipe/>
          </Col>
        </Row>
    </Container>
  );
}