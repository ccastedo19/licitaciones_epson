// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginVisit } from './pages/LoginVisit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginVisit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
