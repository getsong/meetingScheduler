const express = require('express');
const mysql = require('mysql');
const parser = require('body-parser');

const app = express();
app.use(parser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'meetingscheduler'
});

// insert statement
let stmt = `INSERT INTO daily_records(date,0t)  VALUES ?  `;
let todos = [
  ['2018-05-08', false],
  ['2018-05-09', true]
];

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  console.log(req.body);

  // execute the insert statment
  connection.query(stmt, [req.body], (err, results) => {
    if (err) {
      console.error(err.message);
      res.send("error!");
      return;
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
    res.send('Row inserted:' + results.affectedRows);
  });
});

app.listen(8001, () => {
  console.log('Example app listening on port 8001!')
});