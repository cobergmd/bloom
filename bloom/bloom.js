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

module.exports = Bloom;
