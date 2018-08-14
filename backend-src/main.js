const express = require('express')
const app = express();
const mysql = require('mysql');
const parser = require('body-parser');

app.use(parser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'meetingscheduler'
});

// get event
let eventQuery = `SELECT EventName,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday FROM events WHERE EventId = ?`;
app.get('/event/:eventId', (req, res) => {
  connection.query(eventQuery, req.params.eventId, (err, results) => {
    if (err) {
      console.error(err.message);
      res.send(err.message);
      return;
    }
    console.log(results[0].Sunday.readInt8());
    res.send(results);
  })
});

// create event
let eventInsertion = `INSERT INTO events(EventName,EventPassword,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday) VALUES ?  `;

app.post('/event', (req, res) => {
  // execute the insert statment
  connection.query(eventInsertion, [req.body], (err, results) => {
    if (err) {
      console.error(err.message);
      res.send(err.message);
      return;
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
    res.send(results.insertId.toString());
  });
});

// create participant
let participantInsertion = `INSERT INTO participants(ParticipantName, ParticipantPassword, EventId) VALUES ?  `;

app.post('/participant', (req, res) => {
  // execute the insert statment
  connection.query(participantInsertion, [req.body], (err, results) => {
    if (err) {
      console.error(err.message);
      res.send(err.message);
      return;
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
    res.send(results.insertId.toString());
  });
});

// create schedule
let scheduleInsertion = `INSERT INTO dailyschedules(ParticipantId,DayOfWeek,0t,1t,2t,3t,4t,5t,6t,7t,8t,9t,10t,11t,12t,13t,14t,15t,16t,17t,18t,19t) VALUES ?  `;

app.post('/schedule', (req, res) => {
  // execute the insert statment
  connection.query(scheduleInsertion, [req.body], (err, results) => {
    if (err) {
      console.error(err.message);
      res.send("error!");
      return;
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
    res.send(results.insertId.toString());
  });
});

app.listen(8001, () => {
  console.log('Example app listening on port 8001!')
});