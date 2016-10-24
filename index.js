var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bloom = require('./bloom/bloom');
var dict = new bloom();

app.set('port', (process.env.PORT || 9292));
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/add', function(request, response) {
    dict.add(request.body.word);
    response.send(dict.toString());
});

app.post('/exists', function(request, response) {
    response.send(dict.exits(request.body.value));
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
})