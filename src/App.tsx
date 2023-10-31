import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ClientManagement from './components/ClientManagement';
import AddUpdateClient from './components/AddUpdateClient';
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
            <Link to="/add-update-client" className="btn btn-primary btn-lg mx-2">
              Add/Update Client
            </Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client-list" element={<ClientManagement />} />
        <Route path="/add-update-client" element={<AddUpdateClient />} />
      </Routes>
    </Router>
  );
}

const Home = () => (
  <div className="container">
    <div className="my-4 text-center">
      <h1 style={{ color: 'blue', fontFamily: 'Verdana', fontSize: '60px' }}>
        Welcome to Client Management
      </h1>
    </div>
  </div>
);

export default App;
