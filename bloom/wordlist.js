'use strict';

var Bloom = require('./bloom');
var fs = require('fs');

// This node module loads a large list of words into memory and maps each one
// in a bloom filter.  The getWord() method can be called to see if additional 
// words are in the list and checks if positive hits are valid.
function WordList() {
    this.words = {};
    this.wordFile = "./bloom/words.txt";
    this.filter = new Bloom();
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

WordList.prototype.getWord = function(word) {
    var result = {
        value: word,
        inList: false,
        falsePositive: false
    };
    if (this.filter.exists(word)) {
        result.inList = true;
        // confirm the word is in the "cache", else it's a false positive
        if (!this.words[this.filter.hash(word).join('')]) {
            result.falsePositive = true;
        }
    } 
    return result;
}

module.exports = WordList; 