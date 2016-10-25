var test = require('tape');
var WordList = require('./wordList');

test('load dictionary from a word list', function(t) {
    let list = new WordList();
    t.ok(list.contains("apple"));
    t.end();
});
