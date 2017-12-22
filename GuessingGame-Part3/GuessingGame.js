
/*
	function() to generate random winning number
*/

function generateWinningNumber(){
	
	var number = Math.random() // 0 - 0.99999
	var value100 = number * 100; 

	if(value100 % 1 ===0){ // Checks if value100 is a whole number
		return value100 + 1;
	}else{
		return Math.ceil(value100) //15.5 -> 16 (ceil) 
	}
} 

/*
	function() to shuffle elements in array using Fisher Yates Shuffle Algorithm
*/


function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}



function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}
 Game.prototype.difference =  function(){
  return Math.abs(this.playersGuess - this.winningNumber)
}
 Game.prototype.isLower = function(){
  if(this.playersGuess > this.winningNumber){
  	return false;
  }
   return true;              
}
 Game.prototype.playersGuessSubmission = function(num){
  
   
    if(isNaN(num)|| num < 1 || num > 100){
    	alert ("Invalid Guess.Allowed number between 1-100")
      throw "That is an invalid guess."
    } 
    this.playersGuess = num;
    return this.checkGuess()
 }


Game.prototype.checkGuess = function(){
  	if(this.playersGuess === this.winningNumber){
  		return 'You Win!'
  	}
  
  	else {
  		if(this.pastGuesses.indexOf(this.playersGuess) > -1){
  		return 'You have already guessed that number.'
  	    }
  	    else {
  	    	this.pastGuesses.push(this.playersGuess);
  	    	if(this.pastGuesses.length===5){
  	    		return "You Lose."
  	    	}
  	    
  	    else{
  	    		if(this.difference() < 10){
    				return 'You\'re burning up!'
   				}
   				else if(this.difference() < 25){
   					return 'You\'re lukewarm.'
   				}
   				else if( this.difference() < 50){
   					return 'You\'re a bit chilly.'
   				}
   				else return 'You\'re ice cold!'		
   				
  	    	}
  	    }
  	}
 }

function newGame (){
	return new Game()
}

Game.prototype.provideHint = function(){
	var arr=[this.winningNumber,generateWinningNumber(),generateWinningNumber()];
	return shuffle(arr)
}

//  $(document).ready(function() { 
//     var play = new Game();
//     $('#submit').on('click', function() {
//         var value = $('#players-input').val();
//         $('#players-input').text("");
//        var inputVal = play.playersGuessSubmission(parseInt(value));
//        console.log(inputVal);
//     });
//  });
// $("players-input").keypress(function(e){
//        if(e.which == 13);                    //“ENTER” key is represented by code “13”
//   var value = $('#players-input').val();
//         $('#players-input').text("");
//        var inputVal = play.playersGuessSubmission(parseInt(value));
//        console.log(inputVal);
// })
//if the player gusess index !==-1 then h1 =guess again.
//else add the guess to the guessul

 function dryCode(play){
        var value = $('#players-input').val();
        $('#players-input').text("");
        $('#players-input').val('');
        var inputVal = play.playersGuessSubmission(parseInt(value));
        if(inputVal === 'You have already guessed that number.'){
            $("h1").text("Please Guess Again");
          } 
         else if(inputVal === 'You Win!'){
           $("h1").text(inputVal);
           $("h3").text("Press the Reset button.");
            $('#hint, #submit').prop("disabled",true);
         }
         else if(inputVal === 'You Lose.'){
           $("h1").text(inputVal);
           $("h3").text("Press the Reset button.");
            $('#hint, #submit').prop("disabled",true);
            $(".guess5").text(play.pastGuesses[4]);
         }
         else{
          $("h3").text(inputVal);
          // Assign guessed numbers in spanned boxes
          
          
          $(".guess1").text(play.pastGuesses[0]);
          $(".guess2").text(play.pastGuesses[1]);
          $(".guess3").text(play.pastGuesses[2]);
          $(".guess4").text(play.pastGuesses[3]);
          // Last guess number to be displayed after player looses so , it is in else loop above
          
         
       }
 }

$(document).ready(function() { 
    var play = new Game();
    
    $('#submit').on('click', function() {
        dryCode(play);
    });
    
    $("players-input").keypress(function(e){
          if(e.which == 13){              
          dryCode(play);
          }
    });
    
      $('#hint').on('click', function() {
        var hintValue = play.provideHint();
        $("h1").text("Here you go!! One out of three is a winning number "+hintValue[0]+", "+hintValue[1]+", "+hintValue[2]+".")
    });
    
    $("#reset").click(function(){
      play = new Game();
      $("h1").text('Play the Guessing Game!');
       $("h3").text("Guess a number between 1-100!");
       $('#hint, #submit').prop("disabled",false);
       $('#guess-list').children().text("-");
       $('#players-input').val('');
    })
});


