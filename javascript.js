
 var playing = false;
 var score;
 var trialsLeft;   
 var fruits = ["fruit1","fruit2","fruit3", "fruit4", "fruit5", "fruit6", "fruit7",];
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

            //Start sending fruits
            sendAction();
            }
        });


//Slice a fruit
//increase score
$("#picture1").mouseover(function(){ 
    score++;
    $("#scoreValue").html(score);
    //play sound
    $("#sliceSound")[0].play();
    //slice fruit
    $("#picture1").hide("explode", 500);
    //send new fruit
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


//send fruits
function sendAction(){
    $("#picture1").show();
    chooseFruit(); //random position
    $("#picture1").css({
        "left" : Math.round(550*Math.random()),
        "top"  : -50
    }); 
}

//generate a random fruit
function chooseFruit(){
    $("#picture1").attr("src", "images/" + fruits[Math.round(6*Math.random())] + ".png");
}

//generate a random step
step = 1 + Math.round(5*Math.random())

//stop game
function stopAction(){
    clearInterval(action);
}

//move fruit down by one step every 10ms
action = setInterval(function(){
    $("#picture1").css("top", $("#picture1").position().top + step);

    //check if the fruit is too low
    if($("#picture1").position().top > $("#fruitContainer").height()){

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