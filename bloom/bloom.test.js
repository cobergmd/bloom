var test = require('tape');
var bloom = require('./bloom');

let dict = new bloom();

test('add a word to the dictionary', function (t) {
    dict.add('apple');
    t.equal(dict.exists('apple'), true);
    t.end();
});

test('check that a word does not exist in the dictionary', function(t) {
    t.equal(dict.exists('xykadjsoinv'), false);
    t.end();
});

