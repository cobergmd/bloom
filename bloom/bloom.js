'use strict';

function Bloom() {
    this.words = [];
}

Bloom.prototype.add = function (word) {
    this.words.push(word);
}

Bloom.prototype.exists = function (word) {
    return (this.words.includes(word) > 0);
}

// Naive implementation of djb2 
// http://www.cse.yorku.ca/~oz/hash.html
// Using 32 bit numbers where as above link is using 64 bits (unsigned long)
Bloom.prototype.hash = function (word) {
    var hash = 5381;
    var wlen = word.length;

    for (var i = 0; i < wlen; i++) {
        var c = word.charCodeAt(i);
        hash = ((hash << 5) + hash) + c;
    }
    return hash & hash;  // bitwise ops return 32 bit numbers
}



module.exports = Bloom;
