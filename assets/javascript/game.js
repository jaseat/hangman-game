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

function stage(enemyObj, song){
	this.enemyObj = enemyObj;
	this.song = song;
}

var enemyObj, playerObj;

var game = {
	words: ["shinra",
			 "cloud",
			 "sephirot",
			 "meteor",
			 "huge materia",
			 "lifestream",
			 "omnislash",
			 "jenova",
			 "geostigma",
			 "soldier",
			 "barret",
			 "tifa",
			 "phoenix down"],
	currentWord: "",
	guessWord: [],
	winCount: 0,
	guesses: "",
	guessCount: 10,
	key: "",
	stage: [],
	currentStage: 0,

	begin: function(){
		document.getElementById("myCanvas").style.backgroundImage = "url(assets/images/battle_bg.png)";
		document.getElementById("word-box").style.display = "block";
		document.getElementById("guess-box").style.display = "block";
		document.getElementById("count-box").style.display = "block";
		this.currentStage = 0;
		enemyObj = this.stage[this.currentStage].enemyObj;
		playerObj = cloudObj;
		render.update();
		audioManager.switch(this.stage[this.currentStage].song);
		this.winCount = 0;
		this.setWord();
		document.onkeyup = interface.keyUp;
	},

	setWord: function(){
		this.currentWord = this.words[Math.floor(Math.random()*this.words.length)];
		console.log(this.currentWord);
		
		audioManager.switch(this.stage[this.currentStage].song);
		this.guessWord = [];
		this.guesses = ": ";
		this.guessCount = 10;
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
				this.guessCount -= enemyObj.dmg;
			while(index !== -1){
				this.guessWord[index] = this.key;
				index = this.currentWord.indexOf(this.key, index+1);
			}
		}
		

		if(this.guessWord.join("") == this.currentWord){
			this.winCount++;
			this.currentStage++;
			if(this.currentStage >= this.stage.length)
				this.currentStage = 0;
			enemyObj = this.stage[this.currentStage].enemyObj;
			render.update();
			this.setWord();
		}
		if(this.guessCount <= 0){
			document.onkeyup = null;
			audioManager.switch("gameover");
			interface.overlay();
		}
		this.print();
	},

	print: function(){
		interface.print(interface.word, this.guessWord.join(""));
		interface.print(interface.guesses, this.guesses);
		interface.print(interface.guessCount, this.guessCount+"/  10");
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
		var key = event.key.toLowerCase();
		if(event.keyCode < 65 || event.keyCode > 90){
			return 0;
		}
		//set game key; tell game to update
		else{
			game.key = key;
			game.update();
		}
	},

	overlay: function(){
		var el = document.getElementById("overlay");
   		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	}
 };

 var audioManager = {
	currentAudio: null,
	audio: [],

	play: function(){
		if(this.currentAudio == null)
			return 0;
		this.currentAudio.play();
	},
	playSE: function(sound){
		this.audio[sound].play();
	},
	stop: function(){
		if(this.currentAudio == null)
			return 0;
		this.currentAudio.pause();
		this.currentAudio.currentTime = 0;
	},
	switch: function(audio){
		if(this.currentAudio == this.audio[audio])
			return 0;
		this.stop();
		this.currentAudio = this.audio[audio];
		this.play();
	}
};

document.getElementById("play-again").addEventListener("click", function(){
    interface.overlay();
    game.begin();
}); 

document.getElementById("quit").addEventListener("click", function(){
    interface.overlay();
}); 

function cursorPlay(){
	audioManager.playSE("cursor");
}

audioManager.audio["prelude"] = document.createElement("audio");
audioManager.audio["prelude"].src = "assets/audio/prelude.mp3";
audioManager.audio["prelude"].volume = 0.4;
audioManager.audio["prelude"].loop = true;
audioManager.switch("prelude");

audioManager.audio["cursor"] = document.createElement("audio");
audioManager.audio["cursor"].src = "assets/audio/cursor_move1.mp3";
audioManager.audio["cursor"].volume = 0.3;

audioManager.audio["battle"] = document.createElement("audio");
audioManager.audio["battle"].src = "assets/audio/battle.mp3";
audioManager.audio["battle"].loop = true;
audioManager.audio["battle"].volume = 0.4;

audioManager.audio["boss"] = document.createElement("audio");
audioManager.audio["boss"].src = "assets/audio/boss.mp3";
audioManager.audio["boss"].loop = true;
audioManager.audio["boss"].volume = 0.4;

audioManager.audio["sephirot"] = document.createElement("audio");
audioManager.audio["sephirot"].src = "assets/audio/sephirot.mp3";
audioManager.audio["sephirot"].loop = true;
audioManager.audio["sephirot"].volume = 0.4;

audioManager.audio["gameover"] = document.createElement("audio");
audioManager.audio["gameover"].src = "assets/audio/gameover.mp3";
audioManager.audio["gameover"].volume = 0.4;

var cursorHover = document.getElementsByClassName("cursor-hover");
for(var i = 0; i < cursorHover.length; i++)
	cursorHover[i].onmouseover = cursorPlay;

var render = {
	canvas: document.getElementById("myCanvas"),
	objects: [],
	context: null,
	start: function(){
		this.canvas.width = 960;
		this.canvas.height = 540;
		this.context = this.canvas.getContext("2d");
	},
	clear: function(){
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	},
	update: function(){
		this.clear();
		enemyObj.update();
		playerObj.update();
	}
};

render.start();

var enemyPos = {
	x: 50,
	y: 150
};

var playerPos = {
	x: render.canvas.width -150,
	y: 250
};


function obj(img,update,dmg){
	this.img = img;
	this.update = update;
	this.dmg = dmg;
}

var soldier = document.createElement("img");
soldier.src = "assets/images/shinra_soldier.png";
var soldierObj = new obj(soldier, function(){render.context.drawImage(soldier, enemyPos.x, enemyPos.y);}, 1)

var sephirot = document.createElement("img");
sephirot.src = "assets/images/sephirot.png";
var sephirotObj = new obj(sephirot, function(){render.context.drawImage(sephirot, enemyPos.x, enemyPos.y);}, 5)

var rufus = document.createElement("img");
rufus.src = "assets/images/rufus.png";
var rufusObj = new obj(rufus, function(){render.context.drawImage(rufus, enemyPos.x, enemyPos.y);}, 4)

var cloud = document.createElement("img");
cloud.src = "assets/images/cloud_sprite.png";
var cloudObj = new obj(cloud, function(){render.context.drawImage(cloud, 0, 0, 95, 95, playerPos.x, playerPos.y, 95, 95);}, 0)

var soldierStage = new stage(soldierObj, "battle");
var sephirotStage = new stage(sephirotObj, "sephirot");
var bossStage = new stage(rufusObj, "boss");

game.stage.push(soldierStage);
game.stage.push(soldierStage);
game.stage.push(bossStage);
game.stage.push(soldierStage);
game.stage.push(soldierStage);
game.stage.push(sephirotStage);


render.canvas.style.backgroundImage = "url(assets/images/title.jpg)";

document.getElementById("start-btn").onclick = function(){
	document.getElementById("start-btn").style.display = "none";
	game.begin();
}



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
