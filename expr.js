var express = require('express');
var app = express();
var fs = require("fs");
var url = require('url');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dictionary"
});


app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/turkish.html', function (req, res) {
   res.sendFile( __dirname + "/" + "turkish.html" );
})
app.get('/add.html', function (req, res) {
   res.sendFile( __dirname + "/" + "add.html" );
}) 
app.get('/delete.html', function (req, res) {
   res.sendFile( __dirname + "/" + "delete.html" );
}) 

app.get('/englishtoturkish', function (req, res) {
    console.log(req.url);
	q=url.parse(req.url,true).query;
	console.log(q);
    con.query("SELECT * FROM words where english=?",[q.w], function (err, result, fields) {
    if (err) throw err;
		console.log(result);
		res.json(result);
		res.end();
    });

})

app.get('/turkishtoenglish', function (req, res) {
    console.log(req.url);
	q=url.parse(req.url,true).query;
	console.log(q);
    con.query("SELECT * FROM words where turkish=?",[q.w], function (err, result, fields) {
    if (err) throw err;
		console.log(result);
		res.json(result);
		res.end();
    });

});





app.get('/deleteword', function (req, res) {
var q = url.parse(req.url, true).query;
console.log(q);
  con.query("DELETE FROM words WHERE turkish = ?",[q.w], function (err, result) {
    if (err) throw err;
	console.log("Silinen sayısı: " + result.affectedRows);
	res.json(result);
	res.end()
  });
});








app.get('/addword', function (req, res) {
var q = url.parse(req.url, true).query;
console.log(q);
  con.query("Insert INTO words(english,turkish,note) values (?,?,?)",[q.english,q.turkish,q.note], function (err, result, fields) {
    if (err) throw err;
	if(result.length==0){
		res.sendFile( __dirname + "/" + "add.html" );
	}
	else
	    res.sendFile( __dirname + "/" + "add.html" );
    
  });
});



var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Dictionary app listening at http://%s:%s", host, port)
})