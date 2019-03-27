let playerRight = 0;
let playerWrong = 0;
let currentQuestion = 0;
let clockRunning = false;
let questionClockTime;

// Trivia data is organized externally. See assets/javascript/trivia_data.js

let randomData = shuffleArray( questionData ); // Randomize questions.


function startScreen() { // Start screen. Initialize the game.

	playerWrong = 0;
	playerRight = 0;
	currentQuestion = 0;

	clearScreens();

	$("#start-screen").addClass( "displayed" );

	$("#start-screen button").on( 'click', function(){ 
		displayQuestion( randomData[currentQuestion] );
	});

}


function displayQuestion( question ) { // Question screen. Takes the next question from a randomized array and displays it, with four randomized answers.

	clearScreens();

	$("#question-screen h4").text( question[0] ); // Display current question from randomized array.
	$("#question-screen ul li").remove(); // Remove all previous displayed options.
	$("#display-clock").text("00:15");

	randomAnswer = shuffleArray( [0, 1, 2, 3] );
	for ( i = 0; i < 4; i++ ) {
		$("#question-screen ul").append( '<li value="' + randomAnswer[i] + '">' + question[1][randomAnswer[i]] + '</li>' );
	}

	if (!clockRunning) { // Set countdown timer.
		questionClockTime = 15;
		
		clockInterval = setInterval( function(){ 
			questionClockTime--; // Decrement time.

			if ( questionClockTime <= 0 ) { // If countdown timer reaches zero,
				displayAnswer( question, 0 ); // Display the answer.
			}

			var timeConverted = timeConverter( questionClockTime ); // Get the current time, pass that into the timeConverter function, and save the result in a variable.
			$("#display-clock").text( timeConverted ); // Use the variable we just created to show the converted time in the "display" div.
		}, 1000 );

		clockRunning = true;
	}

	$("#question-screen").addClass( "displayed" );

	$("#question-screen li").on( 'click', function(){
		if ( $(this).attr('value') == 0 ) { // If the correct answer is selected,
			displayAnswer( question, 2 );
		} else { // If an incorrect answer is selected,
			displayAnswer( question, 1 );
		}
	});

}


function displayAnswer( question, result ) { // Displays the correct answer for a limited time, with associated image.

	clearScreens();

	clearInterval( clockInterval ); // Reset question countdown timer.
	questionClockTime = 0;
	 $("#display-clock").text("00:00");
	clockRunning = false;

	if ( result === 0 ) {
		$("#answer-screen h4").text( "Oops! You ran out of time." );
		playerWrong++;
	} else if ( result === 1 ) {
		$("#answer-screen h4").text( "Sorry, that's incorrect!" );
		playerWrong++;
	} else if ( result === 2 ) {
		$("#answer-screen h4").text( "Congrats, that's correct!" );
		playerRight++;
	}

	$("#answer-screen h5").text( question[1][0] ); // Display correct answer.
	$("#answer-screen img").attr( "src", "assets/images/" + question[2][0] ); // Display matching image.

	$("#answer-screen").addClass( "displayed" );

	currentQuestion++; // Increment the currently presented random question.
	
	setTimeout(function(){ // Set countdown timer.
		if ( currentQuestion > ( questionData.length - 1 )) { // If we're out of questions,
			finalPage();
		} else {
			displayQuestion( randomData[currentQuestion] ); // If there's still more questions left,
		}
	}, 5000);

}


function finalPage() {

	clearScreens();

	$("#total-correct span").text( playerRight );
	$("#total-incorrect span").text( playerWrong );

	$("#final-page").addClass( "displayed" );

	$("#final-page button").on( 'click', function(){
		randomData = shuffleArray( questionData ); // Re-randomize the order of questions before running the game again.
		startScreen();
	});

}


// Clear all displayed screens in preparation for the next one.
function clearScreens() {
	$("#start-screen").removeClass( "displayed" );
	$("#question-screen").removeClass( "displayed" );
	$("#answer-screen").removeClass( "displayed" );
	$("#final-page").removeClass( "displayed" );
}


//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
function timeConverter(t) {
	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (minutes === 0) {
		minutes = "00";
	} else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}


// Shuffles an array and returns it. For randomizing questions and answers.
function shuffleArray(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) { // While there are elements in the array
        index = Math.floor(Math.random() * ctr); // Pick a random index
        ctr--; // Decrease ctr by 1
        temp = arra1[ctr]; // And swap the last element with it
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


startScreen(); // Functions are loaded; start the game!