/*
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 8001;
io.on("connection", socket => {
  console.log("a user connected :D");
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});
var http = require('http');
const port = 8001;
var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }));
});
app.listen(port, '192.168.43.168', () => console.log("server running on port:" + port));
*/
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "augustinjose",
  password: "",
  database: "thcet"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

    //console.log("Result: " + result);

  con.query("select * from userdetails", function (err, results, fields) {
    if (err) throw err;
    console.log("DeviceId: " + results[0].deviceId + " Username: " + results[0].username);
    });
});

var express = require('express');

var app = express();
const port = 8001;
app.use(express.json());

app.post('/', function(request, response){
  console.log(request.body);      // your JSON
   response.send(JSON.stringify({ a: 1 }));    // echo the result back
});
app.listen(8001,'192.168.43.168', () => console.log("server running on port:" + port));
