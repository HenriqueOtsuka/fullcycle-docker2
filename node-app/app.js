const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const name = `Name ${Math.floor(Math.random() * 1000)}`;
  connection.query(`INSERT INTO people(name) VALUES ('${name}')`, (err) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.send('Error');
    }

    connection.query('SELECT * FROM people', (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.send('Error');
      }

      let namesList = '<ul>';
      results.forEach(person => {
        namesList += `<li>${person.name}</li>`;
      });
      namesList += '</ul>';

      res.send(`<h1>Full Cycle Rocks!</h1>${namesList}`);
    });
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
