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

// Naive 32 bit implementation of djb2 
// http://www.cse.yorku.ca/~oz/hash.html
// Returns two hashes seeded with different 32 bit primes
Bloom.prototype.hash = function (word) {
    var hashes = [];
    var hash1 = 5381;
    var hash2 = 31907;
    var wlen = word.length;

    for (var i = 0; i < wlen; i++) {
        var c = word.charCodeAt(i);
        hash1 = ((hash1 << 5) + hash1) + c;
        hash2 = ((hash2 << 5) + hash2) + c;
    }
    hashes.push(hash1 & hash1);  // bitwise ops return 32 bit numbers
    hashes.push(hash2 & hash2);  
    return hashes;
}

// https://en.wikipedia.org/wiki/Double_hashing
Bloom.prototype.doubleHash = function (count, hash1, hash2, size) {
    return (hash1 + count * hash2) % size;
}

module.exports = Bloom;
