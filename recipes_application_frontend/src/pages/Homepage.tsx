import { useEffect, useContext } from "react";
import { UserContext } from "../services/UserContext.tsx";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, []);

  return (
    <Container className="text-center mt-5 page">
      <h1>Hello {user}</h1>
      <h1>🍲 Welcome to Recipe App</h1>
      <p className="lead">Discover, share and review amazing recipes.</p>

    </Container>
  );
}