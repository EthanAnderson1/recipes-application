//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello, world!</h1>} /> 
      </Routes>
    </Router>
  )
}

export default App
