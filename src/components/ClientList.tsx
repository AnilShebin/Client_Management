interface Client {
  ID: number;
  First_name: string;
  Last_name: string;
  email: string;
}

interface ClientListProps {
  data: Client[];
}

function ClientList({ data }: ClientListProps) {
  return (
    <div>
      <h2 className="mt-4"></h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-info">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client: Client) => (
              <tr key={client.ID}>
                <td>{client.First_name}</td>
                <td>{client.Last_name}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientList;
