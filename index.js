var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var db = require("./model/db.js");

var app = express();

app.use(cors());
app.use(express.static('public'));  //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


app.get("/summary", function(req,res){   
    db.getSummary(req,res);
});

app.get('/', (req,res)=> {
  res.sendFile(__dirname + '/public/routes.html');
});

app.get("/summary/withcolours", function(req,res){
   db.getSummaryWithColour(req,res);
  });

app.get("/parties", function(req,res){   
  db.getParties(req,res);
});

app.get("/parties/ordered", function(req,res){   
  db.getPartiesOrdered(req,res);
});

app.get("/candidates", (req, res) => {
  db.getCandidates(req,res);
});

app.get("/candidates/party/:PARTY_MNEMONIC", (req, res) => {
  db.getCandidatesMN(req,res);
});

app.get("/candidates/counts/:CONSTITUENCY", (req, res) => {
  db.getCandidatesCounts(req,res);
});

app.get("/constituency/:CONSTITUENCY", (req, res) => {
  db.getConstituencyCounts(req,res);
});

app.get("/candidates/constituency/:CONSTITUENCY", (req, res) => {
  db.getCandidatesCons(req,res);
});

app.get("/constituencies", (req, res) => {
  db.getConstituencies(req,res);
});

app.get("/")

app.post("/parties/update", function(req, res) {
  db.updatePartyName(req, res);
});

app.post("/login", function(req,res){
  db.loginAdmin(req,res);
});

var myServer = app.listen(3000, function() {
  console.log("IRLElection2024 Server listening on port 3000...");
});
