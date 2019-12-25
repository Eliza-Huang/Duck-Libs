window.onload = function () {
	console.log("window loaded")
	var textbox = document.getElementById("answer")
	var button = document.getElementById("step")

	// change the button to say something else
	updateButtonStatus(textbox, button)

	// var startButton = document.getElementById("startButton")
	// enterClick(textbox, startButton)

	// auto refreshes the page every minute
	// setInterval(function(){ location.reload(); }, 180000);


	// Enables button clicks via keyboard return key
	document.addEventListener("keyup", function(event) {
  	// Number 13 is the "Enter" key on the keyboard
  		if (event.keyCode === 13 && startPage) {
    	// Trigger the button element with a click
    		document.getElementById("startButton").click();
    		startPage = false;
  		} else if (event.keyCode === 13) {
    	// Trigger the button element with a click
    		if (!completed) {
    			document.getElementById("step").click();
    		} else if (printScreen) {
    			document.getElementById("view").click();
    		}
  		}
	});
}

var startPage = true
var completed = false
var printScreen = false
var currQuestion = 0
var questionList = ["name a past accomplishment", "name a past failure", "name something you want to work on",
"name an activity that you enjoy", "name someone you are grateful for", "name a community you are a part of"]
var hintList = ["(.ie running a marathon)", "(ie. bombing a test)", "(activity or skill)", "(verb ending in -ing)", "(person)",
"(noun or name)"]
var answerList = []
var madlib = ["Remember <>? ",
"Remember <>? All of these experiences have shaped who you are and you will grow from these failures and successes alike.",
"Take time to practice <>, but know that change can take time, and that&rsquo;s OK.",
"Take time for yourself. Hours spent <> will pay off just as much as time spent in the labs.",
"Whenever possible, remember how grateful you are for <>.",
"Just like bugs in your code, there will be bugs in life you&rsquo;ve got to solve.",
"But there&rsquo;s always the <> community to share your experiences with. Remember you don&rsquo;t have to debug alone."]

// Step for each question
function stepAnswer() {
	document.getElementsByTagName("body")[0].style.background = "white"
	// remove start blurb
	var blurb = document.getElementById("startBlurb")
	startBlurb.classList.add("hide")

	// shows the textbox where they can type their answer
	var textbox = document.getElementById("answer")
	textbox.classList.remove("hide")

	document.getElementById("progressBar").classList.remove("hide")

	document.getElementById("startButton").classList.add("hide")
	document.getElementById("continueButtons").classList.remove("hide")
	// change the button to say something else
	var button = document.getElementById("step") 
	button.innerHTML = "NEXT"

	var question = document.getElementById("question") // grabs the h1 that contains the current question
	question.classList.remove("startText")
	question.classList.add("promptText")
	question.innerHTML = questionList[currQuestion] // changes content inside h1 to the next question

	document.getElementById("madlibs").classList.add("prompting-position")

	// changes the hint to curQuestion's hint
	var hint = document.getElementById("hint")
	hint.classList.remove("hide")
	hint.innerHTML = hintList[currQuestion]

	document.querySelectorAll(".circuitDuck")[currQuestion].classList.remove("hide")
	if (currQuestion != 0) {
		document.querySelectorAll(".circuitDuck")[currQuestion - 1].classList.add("hide")
	}

	currQuestion++ // increments the next question's index
	startPage = false;
	document.getElementById("progressBar").innerHTML = currQuestion + "/6"

	var answer = document.getElementById("answer") // grabs the input textbox that contains what the user typed in
	console.log(answer.value)
	answerList.push(answer.value) // stores what the person typed in into an array answerlist
	answer.value = "" // changes the input textbox content to be empty
	answer.focus()

	if (currQuestion != 0) {
		button.disabled = true
	}

	if (currQuestion == questionList.length) { // if we run out of questions
		button = document.getElementById("step") // grab the button called "step"
		button.onclick = createMadlib // change the function run after click the button to "createMadlib" (from "stepMadlib()")
	}

}

function createMadlib() {
	completed = true
	// grab their last answer
	var answer = document.getElementById("answer") // grabs the input textbox that contains what the user typed in
	answerList.push(answer.value) // stores what the person typed in into an array answerlist
	answer.value = ""

	var madlibContainer = document.getElementById("madlibs")
	madlibContainer.classList.add("hide")

	displayEnding()
}

function displayEnding() {
	document.querySelectorAll(".circuitDuck")[currQuestion - 1].classList.add("hide")

	document.getElementById("submitContainer").classList.remove("hide")

	document.body.style.background = "url('images/anonymouslyshare.png') no-repeat center center fixed"
	document.body.style.backgroundSize = "104% 104%"


	var madLibDataFields = document.querySelectorAll(".madlib")
	// run it through a forloop, add the answer list to the madlibs (it's in the order of top down written in index.html)
	for (var i = 0; i < madLibDataFields.length; i++) {
		madLibDataFields[i].value = answerList[i + 1]
	}

}

function showPrintScreen() {
	printScreen = true
	document.getElementById("submitContainer").classList.add("hide")
	document.body.style.background = "white"
	document.getElementById("print").classList.remove("hide")
	document.querySelectorAll(".circuitDuck")[currQuestion].classList.remove("hide")
}

function printMadlib() {
	printScreen = false
	document.querySelectorAll(".circuitDuck")[currQuestion].classList.add("hide")
	document.getElementById("print").classList.add("hide")

	document.getElementById("printHeader").classList.remove("hide")
	// print our madlib to the screen
	var result = document.getElementById("result")
	var curMadlib = 0;
	result.classList.remove("hide")

	// change all the "my" to "your"
	for (var i = 0; i < answerList.length; i++) {
		answerList[i] = answerList[i].replace("my", "your")
	}

	for (var i = 0; i < answerList.length - 1; i++) {
		var line = document.createElement("p")
		line.classList.add("madlibText")
		if (i == 0) {
			line.innerHTML = madlib[curMadlib].replace("<>", answerList[i + 1]) + madlib[curMadlib + 1].replace("<>", answerList[i + 2])
			i = i + 1
			curMadlib = curMadlib + 1
		} else {
			line.innerHTML = madlib[curMadlib].replace("<>", answerList[i + 1])
		}
		document.getElementById("fullMadlibContainer").appendChild(line)
		curMadlib = curMadlib + 1
	}

	for (var i = 0; i < answerList.length; i++) {
		answerList[i] = answerList[i].replace("your", "my")
	}

	var line = document.createElement("p")
	line.classList.add("madlibText")
	line.innerHTML = madlib[curMadlib].replace("<>", answerList[answerList.length - 1])
	document.getElementById("fullMadlibContainer").appendChild(line)

	var submitButton = document.getElementById("submitButton")
	setTimeout(function() {
		window.print()
	 	document.getElementById("fullMadlibContainer").classList.add("hide")
	 	document.getElementById("printHeader").classList.add("hide")
	 	document.getElementById("share").classList.remove("hide")
	 	document.querySelectorAll(".circuitDuck")[currQuestion + 1].classList.remove("hide")
	}, 50)

}

function printSharedMadlib() {
	document.getElementById("share").classList.add("hide")
	document.querySelectorAll(".circuitDuck")[currQuestion + 1].classList.add("hide")
	document.getElementById("sharedMadlibContainer").classList.remove("hide")
	window.print()
	displayThanks()
}

function displayThanks() {
	document.getElementById("sharedMadlibContainer").classList.add("hide")
	document.getElementById("share").classList.add("hide")
	document.querySelectorAll(".circuitDuck")[currQuestion + 1].classList.add("hide")

	document.body.style.background = "url('images/endingscreen.png') no-repeat center center fixed"
	document.body.style.backgroundSize = "104% 104%"
	document.getElementById("thanks").classList.remove("hide")
	setTimeout(function() { location.reload(1); }, 5000);
}


function updateButtonStatus(textbox, button) {
	// Execute a function when the user releases a key on the keyboard
	textbox.addEventListener("keyup", function(event) {
  	// Number 13 is the "Enter" key on the keyboard
  		// if (event.keyCode === 13) {
    // 	// Trigger the button element with a click
    // 		button.click();
  		// }
  		// console.log(textbox.value === "")
		if (textbox.value === "") { 
        	button.disabled = true; 
    	} else { 
        	button.disabled = false;
    	}
	});
}
