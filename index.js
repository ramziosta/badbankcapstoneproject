var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const jwt   = require("jsonwebtoken");
const res = require('express/lib/response');
const authorize = require('./authorization-middleware');
const path = require('path'); 
require('dotenv').config();
const Cookies = require('js-cookie');


app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password/:accnum', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.status(400).send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password,req.params.accnum).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});

// login user 
app.get('/account/login/:email/:password', function (req, res, next) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password & create JWT
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    const payload= user[0];
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'1h'});
                    const currUser = {...user[0], token};
                    // res.send(token);
                     res.send(currUser);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});



// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});



// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', authorize(), function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// get all accounts
app.get('/account/all', authorize(), function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

// Update - transaction 
app.get('/account/update/transaction/:email/:type/:transactionAmount/:date', authorize(), function (req, res) {


    dal.addTransaction(req.params.email, req.params.type, req.params.transactionAmount, req.params.date).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

var port = process.env.PORT || 4400;
app.listen(port);
console.log('Running on port: ' + port);