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
var express = require('express');
var app = express();
const port = 8001;

var con = mysql.createConnection({
  host: "localhost",
  user: "augustinjose",
  password: "",
  database: "thcet"
});
/*
con.query("select * from userdetails", function (err, results, fields) {
  if (err) throw err;
  //console.log("DeviceId: " + results[0].deviceId + " Username: " + results[0].username + " Length :" + results.length);
  value =  results[0].deviceId;
});
*/
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select * from userdetails", function (err, results, fields) {
    if (err) throw err;
    console.log("DeviceId: " + results[0].deviceId + " Username: " + results[0].username + " Length :" + results.length);
    });
});

*/
//Make requests using curl -H "Content-Type: application/json" --data @request.json http://192.168.43.168:8001
app.use(express.json());
app.post('/', function(request, response){

    console.log("POST request recieved")
    var query = request.body.query;
    if (query=="Auth") {
      var res = ""
      //console.log("1");
      var deviceId = request.body.deviceId;      // your JSON
      con.query("select * from userdetails", function (err, results, fields) {
        if (err) throw err;
        //console.log("2");
        for (result of results) {
          if (result.deviceId == deviceId){
            //console.log("Match Found")
            res = JSON.stringify({ a:'True' });
            break;
          }
          else{
            //console.log("Match Not Found")
            res = JSON.stringify({ a:'False' });
          }
        }
        console.log("Response Send")

        response.send(res);
      });
    }

    else if (query=="Login") {
      var deviceId = request.body.deviceId;
      var username = request.body.username;
      con.query("select * from userdetails where username=?;", [username], function(err, results, fields){
        if (err) throw err;
        //console.log(results)
        if (results.length==0) {
          console.log("Adding new user")
          con.query("insert into userdetails(deviceid, username) values(?,?)",[deviceId, username])
          response.send(JSON.stringify({ a:'True' }));
        }
        else {
          console.log("Username Taken")
          response.send(JSON.stringify({ a:'False' }));
        }
      });

    }

    //response.send(JSON.stringify({ a:'True' }));    // echo the result back
});
app.listen(8001,'192.168.43.168', () => console.log("server running on port:" + port));
