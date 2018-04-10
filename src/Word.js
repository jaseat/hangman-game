var Letter = require('./Letter');

var Word = function(word){
    this.word = [];
    for(let i = 0; i < word.length; i++)
        this.word.push(new Letter(word[i]));
}

Word.prototype.toString = function(){
    var str = '';
    this.word.forEach(w => {
        str += w + ' ';
    })
    return str;
}

Word.prototype.guess = function(c){
    var correct = false;
    this.word.forEach(w => {
        if(w.guess(c))
            correct = true;
    })
    return correct;
}

Word.prototype.complete = function(){
    var complete = true;
    this.word.forEach(w => {
        if(!w.guessed)
            complete = false;
    })
    return complete;
}

module.exports = Word;