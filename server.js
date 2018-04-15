/**
 *  Author : Umar 
 *  Description : Simple app
*/
const express = require('express');
const bodyParser = require('body-parser');
const app  =   express();
const MongoDb = require('mongodb');
// Use app - pre set
app.use(bodyParser.urlencoded({extended:true}));
// Server & Mongodb Connection
let db;
MongoDb.connect('mongodb://localhost/my-app-umar', (err, client) => {
  if(err) return console.log(err);
  db = client.db('my-app-umar');
  app.listen(3090,() => {
    console.log('System working');
  });
});

/**
 *  Home Route 
 */
app.get('/',function(request,  response){
  response.sendFile(__dirname + '/view.html');
});
/**
 * Send Route - Post
 */
app.post('/send', (request, response) => {
    db.collection('quotes').insertOne(request.body, (err, result) => {
      if(err) return console.log(err);
      console.log('Saved Database');

      response.redirect('/');

    });
});

/*
get quotes
*/
app.get('/quotes', (request, response) => {
  db.collection('quotes').find({}).toArray((err, data) =>{
    if(err) console.log(err);

    response.send(data);
  });
})