import { useState, useEffect } from 'react';
import axios from 'axios';
import ClientList from './ClientList';

interface Client {
  ID: number;
  First_name: string;
  Last_name: string;
  email: string;
}

function ClientManagement() {
  const [data, setData] = useState<Client[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get<Client[]>('http://localhost:8080/clients').then((res) => {
      setData(res.data);
    });
  };

  return (
    <div className="container-fluid p-0">
      <div className="container my-4">
        <h1 className="display-4" style={{ fontFamily: 'Arial, sans-serif', color: '#ff6600', textAlign: 'center' }}>Client List</h1>

        <div className="card mt-4" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '15px' }}>
          <div className="card-body">
            <ClientList data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientManagement;
