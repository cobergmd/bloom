var test = require('tape');
var bloom = require('./bloom');

let dict = new bloom();

test('add a word to the dictionary', function (t) {
    dict.add('apple');
    t.equal(dict.exists('apple'), true);
    t.end();
});