import { useEffect, useState, useContext} from "react";
import { Container, Form, Button, Alert} from "react-bootstrap";
import {api} from "../services/API.ts";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../services/UserContext.tsx";
import { jwtDecode } from 'jwt-decode'

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser( jwtDecode(token).data.username);
    }
    if (user) {
      navigate("/");
    }
  },[user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { username, password })
      localStorage.setItem("token", res.data);
      const decoded = jwtDecode(res.data)
      setUser(decoded.data.username);
      navigate("/");
      //eslint-disable-next-line
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="mt-5 page gap-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary">Login</Button>
      </Form>
      <Link to="/signup">
        <Button  variant="info">Create Account</Button>
      </Link>
      
    </Container>
  );
}
