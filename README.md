bloom
=====

A little Node app that demonstrates how a bloom filter works by adding words to a customizable  
filter and checking if a word has already been added.  A second feature is a 225k+ dictionary that 
can be loaded and used to check for false positives by matching random strings.  

Install
-------

You'll need [Node.js](https://nodejs.org) installed on your computer in order to install and run this app.

```sh
git clone https://github.com/cobergmd/bloom
cd bloom
npm install
npm start 
```

You can run the tests with:
```sh
npm test
```

Usage
-----  

After you have started the Node app, open a browser and navigate to [http://localhost:9292](http://localhost:9292)

There are two features on the web page, the first allows you to test a configurable bloom filter by adding 
words and checking for others.  The second feature allows you to load a large word file and then check for 
false positive searches by generating gibberish words and seeing if they get positive hits on the filter.

Modules
-------

## bloom

```javascript
const bloom = require('./bloom');

let filter = new bloom();

filter.add('apple'); // add a word to the filter
var result = filter.exists('xykadjsoinv'); // returns true or false
```

### bloom.add(word)

Add a new word to the filter

### bloom.exists(word)

Returns true if the word hash is found in the filter  

## wordlist

```javascript
const WordList = require('wordlist')

var opts ={
    wordFile: "path/wordfile.txt",
    filterSize: 4096,
    hashCount: 5
}

let wordList = new WordList(opts);
```

### wordlist.getWord(word)

Returns an object containing the word value and properties that specify if the word
was a match and if it was a false positive match.

### wordlist.wordCount()

Returns the number of words in the list cache.
