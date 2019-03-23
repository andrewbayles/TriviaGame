// Use compound arrays to organize trivia data?
// Possible answers are displayed randomly, but in their array, index 0 is always correct.

let playerRight = 0;
let playerWrong = 0;
let currentQuestion = 0;

let questionData = [

	[ 'Which of the following game series was developed by Japanese company SquareSoft?', 
		[ 'Final Fantasy', 'Super Mario Bros.', 'The Legend of Zelda', 'Metroid' ] 
	],

	[ 'Which of the following characters was featured in a game produced for the original 8-bit Nintendo Entertainment System?', 
		[ 'Simon Belmont', 'Sonic the Hedgehog', 'Tony Stark', 'Captain EO' ]
	],

	[ 'The title of the first First Person Shooter published for home consoles was:',
		[ 'GoldenEye', 'Quake', 'Wolfenstein', 'Half-Life' ]
	]

];



function startScreen() {

	playerWrong = 0;
	playerRight = 0;
	currentQuestion = 0;

	$("#question-screen").css( "display", "none" );
	$("#answer-screen").css( "display", "none" );
	$("#final-page").css( "display", "none" );

	$("#start-screen").css( "display", "absolute" );

	$("#start-screen button").on( 'click', function(){ 
		displayQuestion( questionData[currentQuestion] );
	});

}


function displayQuestion( question ) {

	$("#start-screen").css( "display", "none" );
	$("#answer-screen").css( "display", "none" );

	$("#question-screen h4").text( question[0] );
	
	
	randomArray = shuffleArray( [0, 1, 2, 3] );
	

	for ( i = 0; i < 4; i++ ) {
		$("#question-screen ul").append( '<li value="' + randomArray[i] + '">' + question[1][randomArray[i]] + '</li>' );
	}

	$("#question-screen").css( "display", "absolute" );

	$("#question-screen li").on( 'click', function(){
		if ( $(this).attr('value') == 0 ) {
			displayAnswer( question, 2 );
		} else {
			displayAnswer( question, 1 );
		}
	});
	
	// Set countdown timer.

	// If countdown timer reaches zero,
		// displayAnswer( question, 0 );
	//

}


function displayAnswer( question, result ) {

	$("#start-screen").css( "display", "none" );
	$("#question-screen").css( "display", "none" );

	if ( result === 0 ) {
		$("#answer-screen h4").text( "You ran out of time!" );
		playerWrong++;
	} else if ( result === 1 ) {
		$("#answer-screen h4").text( "Sorry, that's incorrect!" );
		playerWrong++;
	} else if ( result === 2 ) {
		$("#answer-screen h4").text( "Congrats, you won!" );
		playerRight++;
	}

	$("#answer-screen h5").text( question[1][0] ); // Display correct answer.
	$("#answer-screen img").attr( "src", "assets/images/" + question[2][0] ); // Display matching image.

	$("#answer-screen").css( "display", "absolute" );

	currentQuestion++;
	
	// This will be timed. Set countdown timer here.
	if ( currentQuestion > ( questionData.length - 1 )) {
		finalPage();
	} else {
		displayQuestion( questionData[currentQuestion] );
	}

}


function finalPage() {

	$("#question-screen").css( "display", "none" );
	$("#answer-screen").css( "display", "none" );

	$("#final-page").css( "display", "absolute" );

	$("#final-page button").on( 'click', function(){ 
		startScreen();
	});

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


// Shuffles an array and returns it.
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


startScreen();