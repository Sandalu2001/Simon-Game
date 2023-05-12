var buttonColours =["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(event){
    if(!started){
        if(event.key == "a"){
            $('h1').html("Level "+level);
            nextSequence();
            started = true;
        }
        
    }  
});


$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    console.log("userClicked "+userClickedPattern);
    console.log("random "+gamePattern);
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        const audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
        
        
        
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $('h1').html("Level "+level); 
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);     
}

function playSound(btn){
    const audio = new Audio('sounds/'+btn+'.mp3');
    audio.play();
}


function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");   
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

    $("h1").html("Press A Key to Start");
}









