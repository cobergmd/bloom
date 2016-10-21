var test = require('tape');
var bloom = require('./bloom');

let dict = new bloom();

test('add a word to the dictionary', function(t) {
    dict.add('apple');
    t.equal(dict.exists('apple'), true);
    t.end();
});

test('check that a word does not exist in the dictionary', function(t) {
    t.equal(dict.exists('xykadjsoinv'), false);
    t.end();
});

test('hash a string value', function(t) {
    var hash1 = dict.hash('asdfqwerzxcv');
    var hash2 = dict.hash('Supercalifragilisticexpialidocious');
    var hash3 = dict.hash('TtUuOoMmDd');
    t.equal(dict.hash('asdfqwerzxcv'), hash1);
    t.equal(dict.hash('Supercalifragilisticexpialidocious'), hash2);
    t.equal(dict.hash('TtUuOoMmDd'), hash3);
    t.end();
})

