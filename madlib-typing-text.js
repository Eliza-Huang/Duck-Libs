// Text typing Library
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};


function addTyping() {
  var elements = document.getElementsByClassName('txt-rotate');
  console.log(elements)
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
}


// Custom Code
window.onload = function () {
	console.log("window loaded")

	// auto refreshes the page every minute
	//setInterval(function(){ location.reload(); }, 15000);
}

window.addEventListener('DOMContentLoaded', init)


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

var chosenMadlib = []

function init() {
	Tabletop.init( { key: publicSpreadsheetUrl,
                 callback: showInfo,
                 simpleSheet: true } )
}

function showInfo(data, tabletop) {
	processData(data);
	printMadlib();
}

function processData(data) {
	for (var i = data.length - 1; i >= 0; i--) {
		Object.keys(allData).forEach(function(key,index) {
			allData[key].push(data[i][key])			
		})
	}
}

function printMadlib() {
	var result = document.getElementById("madlibs")
	var curMadlib = 0;
	/*for (var m in allData) {
		var line = document.createElement("p")
		line.classList.add("madlibText")
		var answerIndex = Math.floor(Math.random() * allData[m].length)
		line.innerHTML = madlib[curMadlib].replace("<>", allData[m][answerIndex])
		curMadlib = curMadlib + 1
		result.appendChild(line)
		if (curMadlib == 5) {
			line = document.createElement("p")
			line.classList.add("madlibText")
			line.innerHTML = madlib[curMadlib]
			curMadlib = curMadlib + 1
			result.appendChild(line)
		}
	}*/

	for (var m in allData) {
		//var answerIndex = Math.floor(Math.random() * allData[m].length)
		//chosenMadlib.push(allData[m][answerIndex])
		var rotateString = "[\"" + allData[m][0] + "\""
		for (var i = 1; i < allData[m].length; i++) {
			rotateString += ",\"" + allData[m][i].replace("'", "&rsquo;") + "\""
		}
		rotateString += "]"
		var spanTag = "<span class=\"txt-rotate\" data-period=\"7000\" data-rotate='" + rotateString + "'</span>"
		console.log(spanTag)
		chosenMadlib.push(spanTag)

	}

	var line = document.createElement("p")
	var blinker = "<span class=\"blink\"'>|</span>"
	line.classList.add("madlibText")
	line.innerHTML = chosenMadlib[1] + blinker
	result.appendChild(line)

	/*for (var i = 0; i < chosenMadlib.length; i++) {
		var line = document.createElement("p")
		var blinker = "<span class=\"blink\"'>|</span>"
		line.classList.add("madlibText")
		if (i == 0) {
			line.innerHTML = madlib[curMadlib].replace("<>", chosenMadlib[i].bold() + blinker) + madlib[curMadlib + 1].replace("<>", chosenMadlib[i + 1].bold() + blinker)
			i = i + 1
			curMadlib = curMadlib + 1
		} else {
			line.innerHTML = madlib[curMadlib].replace("<>", chosenMadlib[i].bold() + blinker)
		}
		console.log(line.innerHTML)
		result.appendChild(line)
		curMadlib = curMadlib + 1
	}*/

	var line = document.createElement("p")
	line.classList.add("madlibText")
	line.innerHTML = "Everyone has their own story, but our shared experiences bring us together."
	result.appendChild(line)
	/*for (var i = 0; i < allData.length; i++) {
		var line = document.createElement("p")
		line.classList.add("madlibText")
		var answerIndex = Math.floor(Math.random() * );
		line.innerHTML = madlib[curMadlib] + answerList[i + 1] + madlib[curMadlib + 1]
		fullMadlib.push(answerList[i + 1])
		curMadlib = curMadlib + 2
		result.appendChild(line)
	}*/
	addTyping()
}
