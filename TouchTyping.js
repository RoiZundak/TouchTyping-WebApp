/*----------------------------Ex2-JavaScript------------------------
	
	Authors:				 Roi Cohen 			 301063814
						 Yuval Tzidkiyahu    302909460

----------------------------------------------------------
js-
var textArray: array that handle all the quats.
function clickListener():
	function that handle what happaned when the user click Start 
	update all the statistics,and that start the Timer with startTimer()
	method.
	
function pauseListener():
	function that handle pause the game button, first we change the 
	button to resume if the button is on "Pause" o.w->the oposite.
	dont forget-->when press Resume-->start the timer

function wpm():
		function that calculate the wpm.
function charTyped():
		function that increas the types to show how much the user type.
function handleErr():
		function that calculate the numbers of the error.
function gameOver():
		function that do the output when the game is over.
function msg():
		function that do red output.
function keyPressed(e):
		handle no backspace
function startTimer():
		function that start the timer.s

-----------------------------------------------------------------------*/

var textArray = [
    'Be happy for this moment This moment is your life',
    'I wish you a very good day',
    'think about tommorow',
	'abra cadabra',
	'Happiness depends upon ourselves',
	'you make the right choices every time',
	'die bitch',
	'Weakness',
    'Somebody out there loves you very much',
	'Its easy if you try',
	'The only source of knowledge is experience',
	'touch typing',
	'you are a valuable person with many good qualities',
    'Dont let the world change your smile',
	'bla bla uga',
	'j j j r r r f g t d q w e',
	'q q w w e e r r t t y y u u d f d f d f'
];

var m = 0;
var s = 0;
var t;
var calWPM=0.0;
var randomNumber;
var countErr;
document.getElementById("mytext").disabled = true;

function clickListener() {
	document.getElementsByClassName("myButton")[1].innerHTML = "new";
	document.getElementById("mytext").value = "";
	randomNumber = Math.floor(Math.random()*textArray.length);
	document.getElementById("nav").innerHTML = textArray[randomNumber];
	document.getElementById("mytext").disabled = false;
	$("#wpm").text("00"+" wpm");
	m = 0;
	s = -1;
	clearTimeout(t);
	document.getElementsByClassName("myButton")[0].innerHTML = "Pause";
	$("#charT").text("0");
	$("#err").text("00");
	$("#report").text("");
	$("#mytext").focus();
	startTimer();
	
}	
function pauseListener() {
	
	if(document.getElementsByClassName("myButton")[0].innerHTML == "Pause"){
		clearTimeout(t);
		document.getElementsByClassName("myButton")[0].innerHTML = "Resume";
		document.getElementById("mytext").disabled = true;
	}
	else{
		
		document.getElementsByClassName("myButton")[0].innerHTML = "Pause";
		document.getElementById("mytext").disabled = false;
		startTimer();
	}
}

function wpm(){
	var i=0
	var myLength = $("#mytext").val().length;
	var minute=m;
	var seconed=s;
	if(minute<1)
		calWPM=(myLength*60)/(4*seconed);
	else
		calWPM=(myLength*60)/(4*(seconed+60*minute));
	$("#wpm").text(calWPM.toFixed(2)+" wpm");
	
}
function charTyped(){
	var myLength = $("#mytext").val().length;
	if(myLength!=0)
		$("#charT").text(myLength);	
	else
		$("#charT").text("0");
}

function handleErr(){
		var quotes=textArray[randomNumber];
		var userTxt=$("#mytext").val();
		var quotesTmp=quotes.substr(0,userTxt.length);
		countErr=0;
		var res;
		var i=0;
		var s;
		$("#report").text("");
		for(i=0;i<userTxt.length;i++){
			if(userTxt[i]!=quotesTmp[i])
			{
     			countErr++;
				$(this).css('color', 'red');
				$("#report").append("<span id = 'incorrect'>"+ userTxt[i]  + "</span>");
			}
			else{
			$("#report").append("<span id = 'correct'>"+ userTxt[i] + "</span>");		
			}
		}
		if(userTxt.length == quotes.length){
			clearTimeout(t);
			document.getElementById("mytext").disabled = true;
			gameOver();
			countErr = 0;
			$("#time").text("00:00");
			$("#charT").text("0");
			$("#wpm").text("0.00");
			document.getElementsByClassName("myButton")[1].innerHTML = "Start";
			document.getElementById("nav").innerHTML = "Press start to play again";
			document.getElementById("mytext").value = "Write here without looking on the keyboard!";
			$("#report").text("");
        }
		if(userTxt.length!=0)
			$("#err").text((((countErr/userTxt.length))*100).toFixed(2)+ " %");
		
		else
			$("#err").text("00");
}	
function gameOver(){
	if(countErr==0){
		alert("You're awesome!!\n"+
			  "0 mistakes\n "+
			  "Speed: "+calWPM.toFixed(2)+" wpm\n\n\n"+
		"For another game click- Start");


	return;
		
	}
	if(countErr==textArray[randomNumber].length){
		alert("What's wrong with you?\n"+
			  "Error's: "+countErr+"\n"+
			  "Speed: "+calWPM.toFixed(2)+" wpm\n\n\n"+
			"For another game click- Start");
	return;
	}
	alert("Game Over!\n"+
		  "Error's: "+countErr+"\n"+
		   "Speed: "+calWPM.toFixed(2)+" wpm\n\n\n"+
			"For another game click- Start");
	return;
}

function msg(){
	$("#freeow").freeow("My Title", "Here's a message");
	
	$("#freeow").freeow("Another Title", "One more message", {
    classes: ["gray", "error"],
    autoHide: false
});

}

/*
When user  press on keboard start 
the functions and disable backspace(keboard=8) 
*/

function keyPressed(e) {
	wpm();
	charTyped();
	handleErr();	
        var evt = e || window.event;
        if (evt) {
            var keyCode = evt.charCode || evt.keyCode;
            if (keyCode === 8) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false;
                }
            }
        }
	
}
function startTimer(){	
	if(m < 10){
		if(s < 9)
			time= "0" +m+":"+ "0" +(s+1);
		else        
			time = "0"+m+":"+(s+1);
		}
		else{
			if(s < 9)
				time = m+":"+ "0" +(s+1);
			else        
				time = m+":"+(s+1);		
		}
        if(s == 59){
			m++;
			s = 0;
		}
		else
			s++;
		$("#time").text(time);	
		t = setTimeout(function(){startTimer()},1000);	
}

