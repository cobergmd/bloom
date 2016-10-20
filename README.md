# bloom

An implementation of a bloom filter that provides methods for adding words to 
a dictionary and for checking if a word has already been added.  

# methods

```
var bloom = require('bloom')
```

## bloom.add(word)

Add a new word to the dictionary

## bloom.exists(word)

Returns true if the bloom filter determines that the word may have been added 