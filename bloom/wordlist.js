'use strict';

var Bloom = require('./bloom');
var fs = require('fs');

// This node module loads a list of words and stores them in memory to 
// mimic some sort of cache and maps each one in a bloom filter.
// If no options are passed in the words.txt file is loaded with a 4MB filter.  
function WordList(opts) {
    this.words = {};
    this.wordFile = opts ? opts.wordFile : "./bloom/words.txt";
    this.filter = new Bloom(opts ? opts.filterSize : 4194304, opts ? opts.hashCount : 5);  
    this.count = 0;

    fs.readFileSync(this.wordFile)
        .toString()
        .split('\r\n')
        .forEach((line) => {
            this.filter.add(line);
            this.words[this.filter.hash(line).join('')] = line;
            this.count++;
        });
}

WordList.prototype.wordCount = function() {
    return this.count;
}

// Finds words in the list and confirms the positive hits are valid.
WordList.prototype.getWord = function(word) {
    var result = {
        value: word,
        inList: false,
        falsePositive: false
    };
    if (this.filter.exists(word)) {
        result.inList = true;
        // if the word is not in the "cache" then it's a false positive
        if (!this.words[this.filter.hash(word).join('')]) {
            result.falsePositive = true;
            // some "expensive" operation would happen here (ie load word from disk to cache)
        }
    } 
    return result;
}

module.exports = WordList; 