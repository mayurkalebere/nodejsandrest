const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'restful_db'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


//show all movies
app.get('/api/movies',(req, res) => {
  let sql = "SELECT * FROM movies";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show single movie
app.get('/api/movies/:movie_name',(req, res) => {
  let sql = "SELECT * FROM movies WHERE movies.movie_name='"+req.params.movie_name+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//add new movie
app.post('/api/movies',(req, res) => {
  let data = {movie_name: req.body.movie_name, movie_director: req.body.movie_director,movie_budget: req.body.movie_budget};
  let sql = "INSERT INTO movies SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});



//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});