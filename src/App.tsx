import { useState, useEffect } from 'react';
import axios from 'axios';
import ClientList from './components/ClientList';
import './App.css';

interface Client {
  ID: number;
  First_name: string;
  Last_name: string;
  email: string;
}

function App() {
  const [data, setData] = useState<Client[]>([]);
  const [formData, setFormData] = useState<Client>({
    ID: 0,
    First_name: '',
    Last_name: '',
    email: '',
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get<Client[]>('http://localhost:8080/clients').then((res) => {
      setData(res.data);
    });
  };

  const handleAddClient = () => {
    axios.post('http://localhost:8080/addClient', formData).then(() => {
      getData();
      setFormData({
        ID: 0,
        First_name: '',
        Last_name: '',
        email: '',
      });
    });
  };

  const handleUpdateClient = () => {
    if (selectedClient) {
      axios
        .put(`http://localhost:8080/updateClient/${selectedClient.ID}`, formData)
        .then(() => {
          getData();
          setFormData({
            ID: 0,
            First_name: '',
            Last_name: '',
            email: '',
          });
          setSelectedClient(null);
        });
    }
  };

  const handleDeleteClient = (id: number) => {
    axios.delete(`http://localhost:8080/deleteClient/${id}`).then(() => {
      getData();
    });
  };

  const handleEditClick = (client: Client) => {
    setFormData(client);
    setSelectedClient(client);
  };

  return (
    <div className="container-fluid p-0">
      <div className="container my-4">
        <h1 className="display-4" style={{ fontFamily: 'Arial, sans-serif', color: '#ff6600', textAlign: 'center' }}>Client Management</h1>

        <div className="card" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '15px' }}>
          <div className="card-body" style={{ backgroundColor: '#444', opacity: 0.85, borderRadius: '15px' }}>
            <h2 className="card-title text-white">Add/Update Client</h2>
            <form onSubmit={selectedClient ? handleUpdateClient : handleAddClient}>
              <div className="mb-3">
                <input
                  required
                  type="text"
                  className="form-control bg-info text-white" 
                  placeholder="First Name"
                  value={formData.First_name}
                  onChange={(e) =>
                    setFormData({ ...formData, First_name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  required
                  type="text"
                  className="form-control bg-info text-white" 
                  placeholder="Last Name"
                  value={formData.Last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, Last_name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  required
                  type="email"
                  className="form-control bg-info text-white" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {selectedClient ? 'Update Client' : 'Add Client'}
              </button>
            </form>
          </div>
        </div>

        <div className="card mt-4" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '15px' }}>
          <div className="card-body">
            <ClientList
              data={data}
              setSelectedClient={setSelectedClient}
              handleDeleteClient={handleDeleteClient}
              handleEditClick={handleEditClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
