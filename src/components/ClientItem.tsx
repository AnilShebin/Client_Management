interface Client {
    ID: number;
    First_name: string;
    Last_name: string;
    email: string;
  }
  
  interface ClientItemProps {
    client: Client;
    handleDeleteClient: (id: number) => void;
    setSelectedClient: (client: Client | null) => void;
    handleEditClick: (client: Client) => void;
  }
  
  function ClientItem({ client, handleDeleteClient, handleEditClick }: ClientItemProps) {
    return (
      <tr>
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
    );
  }
  
  export default ClientItem;