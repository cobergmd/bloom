var test = require('tape');
var WordList = require('./wordList');

test('load dictionary from a word list', function(t) {
    let list = new WordList();
    var result = list.getWord("apple");
    t.notOk(result.falsePositive);
    t.end();
});
