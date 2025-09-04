import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { useState } from 'react';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import NavBar from './components/NavBar.tsx';
import { UserContext } from './services/UserContext.tsx';
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
    <Router>
      {user&& <NavBar/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
    </UserContext.Provider>
  )
}

export default App
