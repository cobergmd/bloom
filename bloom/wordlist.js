'use strict';

function WordList() {
    this.words = [];
}

WordList.prototype.contains = function(word) {
    return true;
}

module.exports = WordList; 