import ClientItem from './ClientItem';

interface Client {
  ID: number;
  First_name: string;
  Last_name: string;
  email: string;
}

interface ClientListProps {
  data: Client[];
  handleDeleteClient: (id: number) => void;
  setSelectedClient: (client: Client | null) => void;
  handleEditClick: (client: Client) => void;
}

function ClientList({ data, handleDeleteClient, setSelectedClient, handleEditClick }: ClientListProps) {
  return (
    <div>
      <h2 className="mt-4">Client List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-info">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client: Client) => (
              <ClientItem
                key={client.ID}
                client={client}
                handleDeleteClient={handleDeleteClient}
                setSelectedClient={setSelectedClient}
                handleEditClick={handleEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientList;