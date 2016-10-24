'use strict';

function Bloom(size, count) {
    this.filterSize = size || 128;
    this.hashCount = count || 5;
    this.bitArray = [];
    for (var i = 0; i < this.filterSize; i++) {
        this.bitArray[i] = false;
    }
}

Bloom.prototype.add = function (word) {
    var hash = this.hash(word);
    for (var i = 0; i < this.hashCount; i++) {
        this.bitArray[this.getSlot(i, hash)] = true;
    }
}

Bloom.prototype.exists = function (word) {
    var hash = this.hash(word);
    for (var i = 0; i < this.hashCount; i++) {
        if (this.bitArray[this.getSlot(i, hash)] === true) {
            return true;
        }
    }
    return false;
}

Bloom.prototype.toString = function () {
    var result = [];
    for (var i = 0; i < this.filterSize; i++) {
        if (this.bitArray[i] === true) {
            result[i] = 'x';
        } else {
            result[i] = '-';
        }
    }
    return result;
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

// Return the corresponding bloom filter slot for the hashed value 
Bloom.prototype.getSlot = function (count, hash) {
    // https://en.wikipedia.org/wiki/Double_hashing
    return (hash[0] + count * hash[1]) % this.filterSize;
}

module.exports = Bloom;
