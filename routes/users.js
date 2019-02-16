const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
app.get('/getuser',(req,res) => {
	MongoClient.connect('mongodb+srv://admin:wegmansApp@wegmansapp-uin85.mongodb.net/users',(err,client) => {
		if (err) return console.log(err);
		console.log("CONNECTED!");
		let db = client.db('accounts');
		let cursor = db.collection('users').find();
		cursor.toArray(function(err,results) {
			if (err)
				return console.log(err);
			res.json(results);
		});
	})	
});

app.post('/signup',(req,res) => {
	MongoClient.connect('mongodb+srv://admin:wegmansApp@wegmansapp-uin85.mongodb.net/users',(err,client) => {
		console.log(req.body);
		let db = client.db('accounts');
		db.collection('users').insertOne(req.body, (err,result) => {
			if (err && err.code === 11000){
				res.json(err);
				return;
			}
			console.log('saved to database');
			res.json(
				{ 
					message: `User ${req.body._id} was successfully entered!`
				}
			);
		});
	});

});

module.exports = router;
