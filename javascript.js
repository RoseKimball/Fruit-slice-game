
//Click on start/reset button
// Are we already playing?
    //Yes
        //reload page
    //no
        //start game
            //Change button text to reset game
            //show trialsLeft box
            //generate random trumps
                //move trump down one step
                //Is it at the bottom of the page?
                    //yes
                        //any trials left?
                            //yes
                                //remove one heart (life) and continue loop
                            //no 
                                //show game over message
                                //Change button text to start game
                    //no
                        //move the trumps down one step and continue loop
//slice trump
    //play sound
    //increase score by one
    

 var playing = false;
 var score;
 var trialsLeft;   
 var trumps = ["fruit1","fruit2","fruit3", "fruit4", "fruit5", "fruit6", "fruit7",];
 var step;
 var action; //used for setInterval function
//click on start/reset button
    $("#startReset").click(function(){
        //Already playing.
        if(playing == true){
            location.reload();
            $("#gameOver").hide();

       //not playing yet
        }else{
            playing = true; 

            //set score to zero
            score = 0;
            $("#scoreValue").html(score);

            //hide game over box
            $("#gameOver").hide();
        
            //change button text to reset game
            $("#startReset").html("Reset Game");

            //Show trialsLeft box
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            //Start sending trumps
            sendAction();
            }
        });


//Slice a Trump
//increase score
$("#picture1").mouseover(function(){ 
    score++;
    $("#scoreValue").html(score);
    //play sound
    $("#sliceSound")[0].play();
    //slice trump
    $("#picture1").hide("explode", 500);
    //send new trump
    setTimeout(sendAction, 500);
 });



//Add hearts to trialsLeft
function addHearts(){
    $(".life").remove();
    for(i=0; i < trialsLeft; i++){
        // $("#trialsLeft").empty();
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}


//send trumps
function sendAction(){
    $("#picture1").show();
    chooseTrump(); //random position
    $("#picture1").css({
        "left" : Math.round(550*Math.random()),
        "top"  : -50
    }); 
}

//generate a random trump
function chooseTrump(){
    $("#picture1").attr("src", "images/" + trumps[Math.round(6*Math.random())] + ".png");
}

//generate a random step
step = 1 + Math.round(5*Math.random())

//stop game
function stopAction(){
    clearInterval(action);
}

//move Trump down by one step every 10ms
action = setInterval(function(){
    $("#picture1").css("top", $("#picture1").position().top + step);

    //check if the Trump is too low
    if($("#picture1").position().top > $("#trumpContainer").height()){

        //check if we have trials left
        if(trialsLeft > 1){  //yes

            //generate a random fruit
            sendAction();
            step = 1 + Math.round(5*Math.random())

            //reduce trials by 1
            trialsLeft --;

            // populate hearts
            addHearts();
            

        }else{ //game over
            playing = false;
            $("#startReset").html("Start Game");
            $("#gameOver").show();
            $("#gameOver").html("<p>Game Over!</p><p>Your score is "+ score +"</p>")
            $("#trialsLeft").hide();
            stopAction();
        }
    }
}, 10);