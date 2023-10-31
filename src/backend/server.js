const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo-db',
});

app.get('/', (req, res) => {
  return res.json('From the backend!');
});

app.get('/clients', (req, res) => {
  const sql_query = 'SELECT * FROM clients';
  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/addClient', (req, res) => {
  const insertScript = 'INSERT INTO clients (`First_name`, `Last_name`, `email`) VALUES (?, ?, ?)';
  const sqlValues = [req.body.First_name, req.body.Last_name, req.body.email];
  db.query(insertScript, sqlValues, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put('/updateClient/:id', (req, res) => {
  const updateScript = 'UPDATE clients SET `First_name` = ?, `Last_name` = ?, `email` = ? WHERE `ID` = ?';
  const sqlValues = [req.body.First_name, req.body.Last_name, req.body.email, req.params.id];
  db.query(updateScript, sqlValues, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete('/deleteClient/:id', (req, res) => {
  const deleteScript = 'DELETE FROM clients WHERE `ID` = ?';
  const sqlValues = [req.params.id];
  db.query(deleteScript, sqlValues, (err, data) => {
    if (err) return res.json(err);
    return res.json('Client deleted successfully!');
  });
});

app.listen(port, () => {
  console.log(`Connected to the server on port ${port}`);
});
