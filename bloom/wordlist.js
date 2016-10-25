'use strict';

var Bloom = require('./bloom');
var readline = require('readline');
var fs = require('fs');

function WordList() {
    this.words = [];
    this.wordFile = "./bloom/words.txt";
    this.filter = new Bloom();

    var rdr = readline.createInterface({
        input: fs.createReadStream(this.wordFile)
    });
    var that = this;
    rdr.on('line', function(line) {
        that.filter.add(line);
        that.words[that.filter.hash(line)] = line;
    })
}

WordList.prototype.getWord = function(word) {
    var result = {
        word: word,
        inList: false,
        falsePositive: false
    };
    if (this.filter.exists(word)) {
        result.inList = true;
        // perform "expensive" lookup
        if (this.words[this.filter.hash(word)]) {
            // false positive
            result.falsePositive = true;
        }
    } 
    return result;
}

module.exports = WordList; 