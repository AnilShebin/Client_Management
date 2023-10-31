import { useState, useEffect } from 'react';
import axios from 'axios';

interface Client {
  ID: number;
  First_name: string;
  Last_name: string;
  email: string;
}

function AddUpdateClient() {
  const [data, setData] = useState<Client[]>([]);
  const [formData, setFormData] = useState<Client>({
    ID: 0,
    First_name: '',
    Last_name: '',
    email: '',
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Client>>({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get<Client[]>('http://localhost:8080/clients').then((res) => {
      setData(res.data);
    });
  };

  const isNameValid = (name: string) => /^[A-Z][a-zA-Z]{2,}$/.test(name);

  const validateForm = () => {
    const errors: Partial<Client> = {};

    if (!isNameValid(formData.First_name)) {
      errors.First_name = 'First name should start with a capital letter and contain at least 3 letters';
    }

    if (!isNameValid(formData.Last_name)) {
      errors.Last_name = 'Last name should start with a capital letter and contain at least 3 letters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:8080/addClient', formData).then(() => {
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

  const handleUpdateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClient) {
      if (validateForm()) {
        axios.put(`http://localhost:8080/updateClient/${selectedClient.ID}`, formData).then(() => {
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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, First_name: e.target.value });
    if (!isNameValid(e.target.value)) {
      setFormErrors({ ...formErrors, First_name: 'First name should start with a capital letter and contain at least 3 letters' });
    } else {
      const { First_name, ...rest } = formErrors;
      setFormErrors(rest);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, Last_name: e.target.value });
    if (!isNameValid(e.target.value)) {
      setFormErrors({ ...formErrors, Last_name: 'Last name should start with a capital letter and contain at least 3 letters' });
    } else {
      const { Last_name, ...rest } = formErrors;
      setFormErrors(rest);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
    if (!e.target.value.trim()) {
      setFormErrors({ ...formErrors, email: 'Email is required' });
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e.target.value)) {
      setFormErrors({ ...formErrors, email: 'Invalid email format' });
    } else {
      const { email, ...rest } = formErrors;
      setFormErrors(rest);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="display-4" style={{ fontFamily: 'Arial, sans-serif', color: '#ff6600', textAlign: 'center', fontSize: '24px' }}>
            Add/Update Client
          </h1>
          <form onSubmit={selectedClient ? handleUpdateClient : handleAddClient}>
            <div className="mb-3">
              <input
                required
                type="text"
                className={`form-control ${formErrors.First_name ? 'is-invalid' : ''}`}
                style={{ width: '80%', backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '15px' }}
                placeholder="First Name"
                value={formData.First_name}
                onChange={handleFirstNameChange}
              />
              <div className="invalid-feedback">{formErrors.First_name}</div>
            </div>
            <div className="mb-3">
              <input
                required
                type="text"
                className={`form-control ${formErrors.Last_name ? 'is-invalid' : ''}`}
                style={{ width: '80%', backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '15px' }}
                placeholder="Last Name"
                value={formData.Last_name}
                onChange={handleLastNameChange}
              />
              <div className="invalid-feedback">{formErrors.Last_name}</div>
            </div>
            <div className="mb-3">
              <input
                required
                type="email"
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                style={{ width: '80%', backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '15px' }}
                placeholder="Email"
                value={formData.email}
                onChange={handleEmailChange}
              />
              <div className="invalid-feedback">{formErrors.email}</div>
            </div>
            <button type="submit" className="btn btn-primary">
              {selectedClient ? 'Update Client' : 'Add Client'}
            </button>
          </form>
        </div>
        <div className="col-6">
          <h1 className="display-4" style={{ fontFamily: 'Arial, sans-serif', color: '#ff6600', textAlign: 'center', fontSize: '24px' }}>
            Client List
          </h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((client) => (
                <tr key={client.ID}>
                  <td>{client.First_name}</td>
                  <td>{client.Last_name}</td>
                  <td>{client.email}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleEditClick(client)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClient(client.ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddUpdateClient;