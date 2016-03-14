var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//instance of admin router
var adminRouter = express.Router();

//route middleware that will happen on every request
adminRouter.use(function(req, res, next) {
  //log each request to the console
  console.log(req.method, req.url);

  next();
})

//route middleware to validate :name
adminRouter.param('name', function(req, res, next, name) {
  console.log('doing name validation on ' + name);

  //once validation is done, save the new item in the req
  req.name = name;
  next();
});

adminRouter.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.name + '!');
});

adminRouter.get('/', function(req, res) {
  res.send('I am the dashboard');
})

//user page
adminRouter.get('/users', function(req, res) {
  res.send('I show all the users!');
});

adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts!');
});

app.use('/admin', adminRouter);

app.listen(1337);
console.log('1337 is the magic port!');
