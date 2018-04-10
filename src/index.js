var inquirer = require('inquirer');
var Word = require('./Word');

var words = [
    "Jurassic Park",
    "Jaws",
    "Poltergeist",
    "Gremlins",
    "Raiders of the Lost Ark",
    "Saving Private Ryan",
    "Schindlers List",
    "Minority Report",
    "Munich",
    "Lincoln",
    "Ready Player One",
];

var currentWord;
var guesses;
var count;

var validate = function(g){
    var re = /^[A-Z]$/;
    if(!re.test(g))
        return "Invalid Input";
    if(guesses.indexOf(g) !== -1)
        return "Already Guessed";
    return true;
}

var prompt = function(){
    console.log(currentWord + "\n");
    inquirer.prompt([
        {
            name: 'guess',
            message: "Guess a letter!",
            validate: validate,
            filter: g => g.toUpperCase(),
        }
    ])
    .then(({guess}) => {
        guesses.push(guess.toUpperCase());
        if(currentWord.guess(guess)){
            console.log("CORRECT!!!");
            if(currentWord.complete()){
                console.log(currentWord + "\n");
                console.log("YOU WIN!!!");
                console.log("\n");
                return gameStart();
            }
        }
        else{
            console.log("INCORRECT!!!");
            console.log("Guesses remaining: " + count);
            if(--count <= 0)
                return console.log("GAME OVER");
        }
        console.log("\n");
        prompt();
    })
}

var gameStart = function(){
    currentWord = new Word(words[Math.floor(Math.random() * words.length)]);
    guesses = [];
    count = 10;
    prompt();
}

gameStart();