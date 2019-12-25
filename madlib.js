window.onload = function () {
	// auto refreshes the page every minute
	//setInterval(function(){ location.reload(); }, 15000);
}

window.addEventListener('DOMContentLoaded', init)

// google sheets link where all the answers are stored
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10jQBC-TByII_Unur4eZy3YakFLIREGfvEcMLdWtNtb8/edit?usp=sharing';

var madlib = ["Remember <>? ",
"Remember <>? All of these experiences have shaped who you are and you will grow from these failures and successes alike.",
"Take time to practice <>, but know that change can take time, and that&rsquo;s OK.",
"Take time for yourself. Hours spent doing <> will pay off just as much as time spent in the labs.",
"Whenever possible, remember how grateful you are for <>.",
"Just like bugs in your code, there will be bugs in life you&rsquo;ve got to solve.<br/><br/>But there&rsquo;s always the <> community to share your experiences with. Remember you don&rsquo;t have to debug alone."]

var allData = {"name a past accomplishment" : [],
					"name a past failure" : [],
					"name something you want to work on" : [],
					"name an activity that you enjoy" : [],
					"name something or someone who makes you happy" : [],
					"name a community you're a part of" : []}

var questionList = ["name a past accomplishment", "name a past failure", "name something you want to work on",
"name an activity that you enjoy", "name something or someone who makes you happy", "name a community you're a part of"]

var titleList = ["We all have accomplishments...", "We've all experienced failures...",
"We all want to work on...", "We all enjoy something...", "We all feel happy...",
"We are all part of a community"]

var censoredList = ["anal","anus","arse","ass","ballsack","balls","bastard","bitch","biatch","bloody","blowjob","blow job","bollock","bollok","boner","boob","bum","butt","buttplug","clitoris","cock", "crap","cunt","damn","dick","dildo","dyke","fag","feck","fellate","fellatio","felching","fuck","f u c k","fudgepacker","fudge packer","flange","Goddamn","God damn","hell","homo","jerk","jizz","knobend","knob end","labia","lmao","lmfao","muff","nigger","nigga","omg","penis","piss","poop","prick","pube","pussy","queer","scrotum","sex","shit","s hit","sh1t","slut","smegma","spunk","tit","tosser","turd","twat","vagina","wank","whore","wtf"]

var chosenMadlib = []
var repeated = 0
var lookedAt = []
var chosenTopic = 1

var curText = 0;
var delText = 0;




function init() {
	Tabletop.init( { key: publicSpreadsheetUrl,
                 callback: showInfo,
                 simpleSheet: true } )
}

function showInfo(data, tabletop) {
	processData(data);

	// chosenTopic = 1 Math.floor(Math.random() * questionList.length)
	//document.getElementById("madlibs").children[0].innerHTML = titleList[chosenTopic]
	printResponses()
}

function processData(data) {
	for (var i = data.length - 1; i >= 0; i--) {
		Object.keys(allData).forEach(function(key,index) {
			var curResponse = data[i][key].split(" ")
			var censored = false
			for (var j = 0; j < curResponse.length; j++) {
				if (censoredList.includes(curResponse[j].toLowerCase())) {
					censored = true
				}
			}
			if (!censored) {
				allData[key].push(data[i][key])
			}
		})
	}
}

function erase(currLine) {
	console.log("erase")
	var line = document.getElementById("responses").children[currLine]
	var newLookedAt = lookedAt.filter(e => e !== allData[questionList[chosenTopic]].indexOf(line.innerHTML))
	console.log(newLookedAt)
	lookedAt = newLookedAt
	line.innerHTML = ""
	line.classList.remove("madlibText")
 	// document.getElementById("responses").innerHTML = '<p></p><p></p><p></p><p></p><p></p>'
 	if (repeated == 300) {
 		location.reload()
 	}
 	setTimeout(function(){createNewLine(currLine)}, 100)
}

function createNewLine(currLine) {
	var result = document.getElementById("responses")
	var line = result.children[currLine]

	console.log(currLine)
	line.classList.add("madlibText")
	var answerIndex = -1

	while (lookedAt.includes(answerIndex) || answerIndex == -1) {
		answerIndex = Math.floor(Math.random() * allData[questionList[chosenTopic]].length)
	}

	lookedAt.push(answerIndex)
	line.innerHTML = allData[questionList[chosenTopic]][answerIndex]

	setTimeout(function(){erase(currLine)}, 14000)

	repeated++
}

function doSetTimeout(i) {
	setTimeout(function(){ createNewLine(i);}, Math.floor(Math.random() * 55000)) // 55000
}

function printResponses() {
	console.log("here")
	lookedAt = []
	for (i = 0; i < 7; i++) {
		doSetTimeout(i)
	}
}
