import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { useState } from 'react';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import {AppNavbar} from './components/NavBar.tsx';
import { UserContext } from './services/UserContext.tsx';
import RecipesPage from './pages/RecipePage.tsx';
import './App.css'
import { RecipeContext } from './services/RecipeContext.tsx';

function App() {

  const [user, setUser] = useState(null);
  const [recipe, setRecipe] = useState(null);
  
  return (
    <UserContext.Provider value={[user, setUser]}>
      <RecipeContext.Provider value={[recipe, setRecipe]}>
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
        </Routes>
      </Router>
      </RecipeContext.Provider>
    </UserContext.Provider>
  )
}

export default App
