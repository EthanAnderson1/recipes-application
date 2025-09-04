import { useContext, useEffect, useState } from "react";
import { UserContext } from "../services/UserContext.tsx";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {FavouriteRecipes} from "../components/FavouriteRecipes.tsx";
import {MyRecipes} from "../components/MyRecipes.tsx";
import {CurrentRecipe} from "../components/CurrentRecipe.tsx";
import { jwtDecode } from 'jwt-decode'

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [recipe, setRecipe] = useState(null);
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
        <Container className="main-content">
          <FavouriteRecipes />
          <MyRecipes />
          <CurrentRecipe recipe={recipe}/>
        </Container>
    </Container>
  );
}