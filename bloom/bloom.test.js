var test = require('tape');
var bloom = require('bloom');

test('add a word to the dictionary', function (t) {
    bloom.addWord('apple');
    t.equal(bloom.wordCount() === 1);
});