const express = require('express')
const app = express();
const mysql = require('mysql');
const parser = require('body-parser');

app.use(parser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'meetingscheduler'
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// create event
let eventInsertion = `INSERT INTO events(EVENT_NAME,SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY) VALUES ?  `;

app.post('/event', (req, res) => {
  console.log(req.body);

  // execute the insert statment
  connection.query(eventInsertion, [req.body], (err, results) => {
    if (err) {
      console.error(err.message);
      res.send(err.message);
      return;
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
    res.send('Row inserted:' + results.affectedRows);
  });
});

// create record
let recordInsertion = `INSERT INTO daily_records(date,0t)  VALUES ?  `;
let todos = [
  ['2018-05-08', false],
  ['2018-05-09', true]
];

app.post('/record', (req, res) => {
  console.log(req.body);

  // execute the insert statment
  connection.query(recordInsertion, [req.body], (err, results) => {
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