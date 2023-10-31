interface Client {
    ID: number;
    First_name: string;
    Last_name: string;
    email: string;
  }
  
  interface ClientItemProps {
    client: Client;
  }
  
  function ClientItem({ client }: ClientItemProps) {
    return (
      <tr>
        <td>{client.First_name}</td>
        <td>{client.Last_name}</td>
        <td>{client.email}</td>
      </tr>
    );
  }
  
  export default ClientItem;