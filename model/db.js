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
        res.json(rows);     
    });
}

exports.getSummaryWithColour = function(req, res) {
  connection.query(`
      SELECT ns.*, p.PARTYCOLOUR
      FROM nationalsummary ns
      JOIN parties p ON ns.PARTY_MNEMONIC = p.PARTY_MNEMONIC
  `, function(err, rows) {
      if (err) throw err;
      res.json(rows);
  });
};

exports.getParties = function(req,res){
  connection.query("SELECT * FROM parties", function(err, rows, fields){
    if (err) throw err;
    res.json(rows);    
  });
}

exports.getPartiesOrdered = function(req, res) {
  connection.query("SELECT PARTY_MNEMONIC, PARTYNAME FROM parties ORDER BY PARTY_MNEMONIC ASC", function(err, rows) {
      if (err) throw err;
      res.json(rows);
  });
};

exports.getCandidates = function(req,res){
  connection.query("SELECT * FROM candidates", function(err,rows,field){
    if (err) throw err;
    res.json(rows);
  });
}

exports.getCandidatesMN = function(req,res){
  const partyMN = req.params.PARTY_MNEMONIC;
  connection.query("SELECT * FROM candidates WHERE party_mnemonic = ?", [partyMN], function(err,rows,field){
    if (err) throw err;
    res.json(rows);
  });
}

exports.getCandidatesCons = function(req,res){
  const cons = req.params.CONSTITUENCY;
  connection.query("SELECT * FROM candidates WHERE constituency = ?", [cons], function(err,rows,field){
    if (err) throw err;
    res.json(rows); 
  });
}

exports.getConstituencies = function(req, res){
  connection.query("SELECT * FROM constituencies", function(err, rows,field){
    if (err)throw err;
    res.json(rows)
  })
}

exports.loginAdmin = function(req,res){
  const {email, password} = req.body;
  connection.query("SELECT * FROM admin WHERE email = ?", [email], function(err, results) {
    if (err || results.length === 0 || results[0].password !== password) {
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
};