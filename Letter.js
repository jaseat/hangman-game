var Letter = function(letter){
    this.letter = letter;
    this.guessed = letter === ' ' ? true: false;
}

Letter.prototype.toString = function(){
    if(this.guessed)
        return this.letter;
    else   
        return '_';
}

Letter.prototype.guess = function(c){
    var correct = false;
    if(this.letter.toUpperCase() === c.toUpperCase()){
        this.guessed = true;
        correct = true;
    }
    return correct;
}

module.exports = Letter;