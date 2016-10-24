var test = require('tape');
var bloom = require('./bloom');

let dict = new bloom();

test('add a word to the dictionary', function(t) {
    dict.add('apple');
    t.comment('ARRAY: ' + dict.toString());
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
    t.equal(dict.hash('asdfqwerzxcv')[0], hash1[0]);
    t.equal(dict.hash('asdfqwerzxcv')[1], hash1[1]);
    t.notEqual(dict.hash('asdfqwerzxcv')[0], hash1[1]);
    t.equal(dict.hash('Supercalifragilisticexpialidocious')[0], hash2[0]);
    t.equal(dict.hash('Supercalifragilisticexpialidocious')[1], hash2[1]);
    t.notEqual(dict.hash('Supercalifragilisticexpialidocious')[0], hash2[1]);
    t.equal(dict.hash('TtUuOoMmDd')[0], hash3[0]);
    t.equal(dict.hash('TtUuOoMmDd')[1], hash3[1]);
    t.notEqual(dict.hash('TtUuOoMmDd')[0], hash3[1]);
    t.end();
});

test('get filter slot after double hashing values', function(t) {
    var hash = dict.hash('Supercalifragilisticexpialidocious');
    var dblHash1 = dict.getSlot(1, hash, 128);
    t.equal(dblHash1, dict.getSlot(1, hash, 128));
    var dblHash2 = dict.getSlot(2, hash, 128);
    t.equal(dblHash2, dict.getSlot(2, hash, 128));
    t.notEqual(dblHash1, dblHash2);
    t.end();
});

