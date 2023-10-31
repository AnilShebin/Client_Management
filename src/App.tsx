import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ClientManagement from './components/ClientManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-3">
            <Link to="/" className="btn btn-primary btn-lg mx-2">
              Home
            </Link>
            <Link to="/client-list" className="btn btn-primary btn-lg mx-2">
              Client List
            </Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client-list" element={<ClientManagement />} />
      </Routes>
    </Router>
  );
}

const Home = () => (
  <div className="container">
    <div className="my-4 text-center">
      <h2>Welcome to Client Management</h2>
    </div>
  </div>
);

export default App;