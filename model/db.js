var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'irlelection2024',
  multipleStatements: true
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Successfully connected to MySQL database irlelection2024...`);
});

exports.getSummary = function(req,res){

    connection.query("SELECT * FROM nationalsummary", function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));        
    });
	
}

exports.getParties = function(req,res){
  connection.query("SELECT * FROM parties", function(err, rows, fields){
    if (err) throw err;
        res.send(JSON.stringify(rows));     
  });
}

exports.getCandidates = function(req,res){
  connection.query("SELECT * FROM candidates", function(err,rows,field){
    if (err) throw err;
    res.send(JSON.stringify(rows));
  });
}

exports.getCandidatesMN = function(req,res){
  const partyMN = req.params.PARTY_MNEMONIC;
  connection.query("SELECT * FROM candidates WHERE party_mnemonic = ?", [partyMN], function(err,rows,field){
    if (err) throw err;
    res.send(JSON.stringify(rows));
  });
}

exports.getCandidatesCons = function(req,res){
  const cons = req.params.CONSTITUENCY;
  connection.query("SELECT * FROM candidates WHERE constituency = ?", [cons], function(err,rows,field){
    if (err) throw err;
    res.send(JSON.stringify(rows));
  });
}