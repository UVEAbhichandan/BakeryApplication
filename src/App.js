import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddOrder from './components/AddOrder';
import Analytics from './components/Analytics';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" exact element={<AddOrder />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
    </div>
  );
}


export default App;





