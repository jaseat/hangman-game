// var words = ["test one",
// 			 "another test",
// 			 "second test",
// 			 "test",
// 			 "final test",];

// var currentWord;
// var guessWord = [];
// var winCount;
// var word = document.getElementById("word");
// var guessesHTML = document.getElementById("guesses");
// var guesses = [];
// var guessCount;
// var guessCountHTML = document.getElementById("guess-count");
// var winCountHTML = document.getElementById("win-count");

var game = {
	words: ["test one",
			 "another test",
			 "second test",
			 "test",
			 "final test",],
	currentWord: "",
	guessWord: [],
	winCount: 0,
	guesses: "",
	guessCount: 0,
	key: "",

	begin: function(){
		this.winCount = 0;
		this.setWord();
		document.onkeyup = interface.keyUp;
	},

	setWord: function(){
		this.currentWord = this.words[Math.floor(Math.random()*this.words.length)];


		this.guessWord = [];
		this.guesses = [];
		this.guessCount = 1;
		for(var i = 0; i < this.currentWord.length; i++){	
			if(this.currentWord[i] == " "){
				this.guessWord[i] = " ";
			}
			else{
				this.guessWord[i] = "_";
			}
		}
		this.print();
	},

	update: function(){

		if(this.guesses.indexOf(this.key) == -1){
			this.guesses += this.key + " ";
			var index = this.currentWord.indexOf(this.key);
			if(index == -1)
				this.guessCount--;
			while(index !== -1){
				this.guessWord[index] = this.key;
				index = this.currentWord.indexOf(this.key, index+1);
			}
		}
		this.print();

		if(this.guessWord.join("") == this.currentWord){
			this.winCount++;
			this.setWord();
		}
		if(this.guessCount == 0){
			interface.overlay();
		}
	},

	print: function(){
		interface.print(interface.word, this.guessWord.join(""));
		interface.print(interface.guesses, this.guesses);
		interface.print(interface.guessCount, this.guessCount);
		interface.print(interface.winCount, this.winCount);
	}


 };

 var interface = {
 	word: document.getElementById("word"),
	guesses: document.getElementById("guesses"),
	guessCount: document.getElementById("guess-count"),
	winCount: document.getElementById("win-count"),

	print: function(html, str){
		html.innerHTML = str;
	},

	keyUp: function(event){
		//check if the key pressed is an alphabet key
		//if it isn't return
		if(event.keyCode < 65 || event.keyCode > 90){
			return 0;
		}
		//set game key; tell game to update
		else{
			game.key = event.key;
			game.update();
		}
	},

	overlay: function(){
		var el = document.getElementById("overlay");
   		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	}
 };

document.getElementById("play-again").addEventListener("click", function(){
    overlay();
    game.begin();
}); 

document.getElementById("quit").addEventListener("click", function(){
    overlay();
    document.onkeyup = null;
}); 

game.begin();


// function setWord(){
// 	currentWord = words[Math.floor(Math.random()*words.length)];
// 	console.log(currentWord);
// 	word.innerHTML = "";
// 	guessWord = [];
// 	guesses = [];
// 	guessCount = 1;
// 	for(var i = 0; i < currentWord.length; i++){
// 		// word.innerHTML = word.innerHTML + "_";
// 		// word.innerHTML = word.innerHTML + " ";
// 		var newDiv = document.createElement('span');
// 		newDiv.setAttribute("id", i,);
		
// 		if(currentWord[i] == " "){
// 			newDiv.innerHTML = "   ";
// 			guessWord[i] = " ";
// 		}
// 		else{
// 			newDiv.setAttribute("class", "display");
// 			newDiv.innerHTML = "_";
// 		}
// 		word.appendChild(newDiv);
// 	}
// 	guessCountHTML.innerHTML = guessCount;
// }

// function begin(){
// 	winCount = 0;
// 	setWord();
// 	document.onkeyup = keyUp;
	
// }

// function keyUp(event){
// 	//check if the key pressed is an alphabet key
// 	//if it isn't return
// 	if(event.keyCode < 65 || event.keyCode > 90){
// 		return 0;
// 	}
// 	//check if key pressed has already been guessed
// 	//if it hasn't execute code
// 	if(guesses.indexOf(event.key) == -1){
// 		guesses += event.key + " ";
// 		guessesHTML.innerHTML = guesses;
// 		var index = currentWord.indexOf(event.key);
// 		if(index == -1)
// 			guessCount--;
// 		while(index !== -1){
// 			console.log(index);
// 			guessWord[index] = event.key;
// 			console.log("GW@"+index+": "+guessWord[index]);
// 			document.getElementById(index).innerHTML = event.key;
// 			document.getElementById(index).removeAttribute("class");
// 			index = currentWord.indexOf(event.key, index+1);
// 		}
// 	}
// 	guessCountHTML.innerHTML = guessCount;
// 	update();
// }

// function update(){
// 	console.log(guessWord.join(""));
// 	console.log(currentWord);
// 	if(guessWord.join("") == currentWord){
// 		winCount++;
// 		alert("You win");
// 		setWord();
// 	}
// 	if(guessCount == 0){
// 		alert("You lose");
// 		$("#loseModal").modal();
// 				overlay();
// 	}
// }
