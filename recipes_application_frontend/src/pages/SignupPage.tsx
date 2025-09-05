import { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import {api} from "../services/API.ts";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../services/UserContext.tsx";

export default function SignupPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  },[]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/signup", { username, password });
      navigate("/login");
    //eslint-disable-next-line
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container className="mt-5 page gap-5" style={{ maxWidth: "400px" }}>
      <h2>Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="success">Signup</Button>
      </Form>
      <Link to="/login">
        <Button variant="info">Login</Button>
      </Link>
      
    </Container>
  );
}
