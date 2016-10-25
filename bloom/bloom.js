'use strict';

// This node module is a simple bloom filter that can be used to maintain a 
// bitmap for determining if an entry already exists or not in a word list.
// This implementation is using a boolean array to respresent the bitmap.
// Parameters:
// size - The length of the filter, defaults to 128 bytes.
// count - The number of times the value will be hashed.
function Bloom(size, count) {
    this.filterSize = size || 128;
    this.hashCount = count || 5;
    this.bitArray = [];
    for (var i = 0; i < this.filterSize; i++) {
        this.bitArray[i] = false;
    }
}

// Add a string value to the filter
Bloom.prototype.add = function (word) {
    var hash = this.hash(word);
    for (var i = 0; i < this.hashCount; i++) {
        this.bitArray[this.getSlot(i, hash)] = true;
    }
}

// Determine if a string value has already been added.  
// False positives are possible but false negatives should not occur.
Bloom.prototype.exists = function (word) {
    var hash = this.hash(word);
    for (var i = 0; i < this.hashCount; i++) {
        if (this.bitArray[this.getSlot(i, hash)] === true) {
            return true;
        }
    }
    return false;
}

// Creates a string representation of the bloom filter bitmap.  
// Each false value is a dash and each true value is an x.
Bloom.prototype.toString = function () {
    var result = [];
    for (var i = 0; i < this.filterSize; i++) {
        if (this.bitArray[i] === true) {
            result[i] = 'x';
        } else {
            result[i] = '-';
        }
    }
    return result.join('');
}

// Naive 32 bit implementation of djb2 
// http://www.cse.yorku.ca/~oz/hash.html
// Returns two hashes seeded with different 32 bit primes
// to mimic a 64 bit response.
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
    // Math for generating additional hashes from two original hashes
    // https://en.wikipedia.org/wiki/Double_hashing
    return (hash[0] + count * hash[1]) % this.filterSize;
}

module.exports = Bloom;
