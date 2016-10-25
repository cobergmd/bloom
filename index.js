var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bloom = require('./bloom/bloom');
var WordList = require('./bloom/wordlist');
var dict = new Bloom();
var wordList = null; 

app.set('port', (process.env.PORT || 9292));
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/new', function(request, response) {
    dict = new Bloom(request.body.size, request.body.hashes);
    response.send(dict.toString());
});

app.post('/add', function(request, response) {
    dict.add(request.body.word);
    response.send(dict.toString());
});

app.post('/exists', function(request, response) {
    response.send(dict.exists(request.body.word));
});

app.post('/load', function(request, response) {
    wordList = new WordList();
    response.send("dict.exists(request.body.word)");
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
})