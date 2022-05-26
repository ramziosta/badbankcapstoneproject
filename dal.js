require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
let db            = null;
 
// connect to mongo
MongoClient.connect("mongodb+srv://ramziosta:uQNKxJYoX6SESpYx@cluster0.ec8ik.mongodb.net/BadBankDB?retryWrites=true&w=majority", {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to database
    db = client.db('bbbe');
});



// create user account
function create(name, email, password, accountChecking){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, accountChecking, transactions:[]};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}


// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}


// update - deposit/withdraw amount 
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}



function addTransaction(email, type, transactionAmount, date){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $push: { transactions: {type:type, transactionAmount:transactionAmount, date:date}}},
                {  returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}


module.exports = {create, findOne, find, update, all,  addTransaction};