import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import SlowLearners from './SlowLearners';


function App() {
  return (
    <Router>
      <div className="App">
        {/* We are not showing the navbar for now since login will come later */}

        {/* Main Content Area */}
        <div className="container mt-4">
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
