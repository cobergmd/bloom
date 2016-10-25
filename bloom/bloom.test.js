var test = require('tape');
var bloom = require('./bloom');

let commonWords = ['time','person','year','way','day','thing','man','world','life',
    'hand','part','child','eye','woman','place','work','week','case','point',
    'government','company','number','group','problem','fact'] 
let moreWords = ['airplane','driver','throw','trail','understanding','plenty',
    'newspaper','chapter','Atlantic','Pacific','chapter','Chinese','Russian',
    'German','Dutch','grain','James','zoo','wealth','promised','damage','cookies',
    'brick','acres','arrangement'] 

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

test('simple check for false negatives with 128/5 filter', function(t) {
    var dict = new bloom();
    for (var i = 0; i < commonWords.length; i++) {
        dict.add(commonWords[i]);
    }
    for (var j = 0; j < commonWords.length; j++) {
        t.notEqual(dict.exists(commonWords[j]), false, commonWords[j]);
    }
    t.end();
})

test('simple check for false negatives with 50/3 filter', function(t) {
    var dict = new bloom(50,3);
    for (var i = 0; i < commonWords.length; i++) {
        dict.add(commonWords[i]);
    }
    for (var j = 0; j < commonWords.length; j++) {
        t.notEqual(dict.exists(commonWords[j]), false, commonWords[j]);
    }
    t.end();
})

test('test for an execessively high false positive count', function(t) {
    var dict = new bloom(512,3);  // a 512/3 filter was required to pass this test
    var hits = 0;
    for (var i = 0; i < commonWords.length; i++) {
        dict.add(commonWords[i]);
    }
    for (var j = 0; j < moreWords.length; j++) {
        if (dict.exists(moreWords[j]) === true) {
            hits++;
        }
    }
    var hitRate = hits / moreWords.length;
    t.ok(hitRate < .1, 'words:' + moreWords.length + ' hits:' + hits + ' = ' + hitRate);
    t.end();
})


