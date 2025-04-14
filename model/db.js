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

exports.getConstituencyCounts = function(req, res){
  const cons = req.params.CONSTITUENCY;
  console.log("Requested constituency:", cons);
  const sql =`SELECT 
  Party,
  Votes,
  ROUND(Votes / TotalVotes * 100, 2) AS Percentage
FROM (
  SELECT 
    candidates.PARTY_MNEMONIC AS Party,
    SUM(counts.NOVOTES) AS Votes,
    (SELECT SUM(NOVOTES) 
     FROM counts 
     WHERE CONSTITUENCY = ? AND COUNTNUMBER = 1) AS TotalVotes
  FROM counts
  JOIN candidates 
    ON counts.CONSTITUENCY = candidates.CONSTITUENCY 
    AND counts.CANDIDATE_ID = candidates.CANDIDATE_ID
  WHERE counts.CONSTITUENCY = ? AND counts.COUNTNUMBER = 1
  GROUP BY candidates.PARTY_MNEMONIC
) AS result
ORDER BY Votes DESC`;
    connection.query(sql, [cons, cons], function(err, rows, fields){
      if (err) throw err;
      res.json(rows)
    })
}

exports.getCandidatesCounts = function(req,res){
  const cons = req.params.CONSTITUENCY;
  connection.query(`SELECT * FROM counts
JOIN candidates ON counts.CANDIDATE_ID = candidates.CANDIDATE_ID
WHERE counts.CONSTITUENCY = ?
AND counts.COUNTNUMBER = (
  SELECT MAX(coun.COUNTNUMBER)
  FROM counts coun
  WHERE coun.CANDIDATE_ID = counts.CANDIDATE_ID
  AND coun.CONSTITUENCY = counts.CONSTITUENCY
);`,
     [cons], function(err, rows, fields){
    if (err) throw err;
    res.json(rows);
  });
}

exports.updatePartyName = function(req, res) {
  const { PARTY_MNEMONIC, PARTYNAME } = req.body;

  connection.query(
    "UPDATE parties SET PARTYNAME = ? WHERE PARTY_MNEMONIC = ?",
    [PARTYNAME, PARTY_MNEMONIC],
    function(err, result) {
      if (err) {
        console.error("Error updating party name:", err);
        return res.json({ success: false });
      }
      res.json({ success: true });
    }
  );
};

exports.loginAdmin = function(req,res){
  const {email, password} = req.body;
  connection.query("SELECT * FROM admin WHERE email = ?", [email], function(err, results) {
    if (err || results.length === 0 || results[0].password !== password) {
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
};