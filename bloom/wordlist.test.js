var test = require('tape');
var WordList = require('./wordList');

let someWords = ['time','person','year','way','day','thing','man','world','life',
    'hand','part','child','eye','woman','place','work','week','case','point',
    'government','company','number','group','problem','fact', 
    'airplane','driver','throw','trail','understanding','plenty',
    'newspaper','chapter','Atlantic','Pacific','chapter','Chinese','Russian',
    'German','Dutch','grain','James','zoo','wealth','promised','damage','cookies',
    'brick','acres','arrangement'] 

let list = null;

test('load wordlist and confirm count', function(t) {
    list = new WordList();
    t.ok(list !== null, 'wordlist was created');
    t.ok(list.wordCount() > 0, 'wordlist count is greater than zero');
    t.end();
});

test('confirm known word exists in word list', function(t) {
    var result = list.getWord('apple');
    t.ok(result.inList, 'word was in list');
    t.notOk(result.falsePositive, 'was not a false positive');
    t.end();
});

test('confirm unknown words do not exist in word list', function(t) {
    var result = list.getWord('dGqkobV');
    t.notOk(result.inList, 'word was not in list');
    t.notOk(result.falsePositive, 'word is not false positive');
    t.end();
});

test('testing for a false positive rate of less than 10 percent', function(t) {
    var hits = 0;
    for (var i = 0; i < someWords.length; i++) {
        var word = list.getWord(someWords[i]);
        if (word.falsePositive) { 
            t.comment('FALSE POSITIVE: ' + word.value);
            hits++; 
        }
    }
    var hitRate = hits / someWords.length;
    t.ok(hitRate < .1, 'words:' + someWords.length + ' hits:' + hits + ' = ' + hitRate);
    t.end();
});
