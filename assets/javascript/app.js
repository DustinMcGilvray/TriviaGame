//Global Variables
var gameTimer = 30;
var gameClock;
var incorrectAnswerCount = 0;
var correctAnswerCount = 0;
var unansweredCount = 0;
var gameScreen;
var startScreen;
var userChoice;

// Trivia Question Object Array
var triviaArray=[
    {
        question:"The head of Voltron is contained in what part of the black lion?",
        answerChoices: ["Chest", "Between its front paws", "Back", "Mouth"],
        correctAnswer: "Chest",
        image: "assets/images/black_lion_head.gif"
    }, 

    {
        question:"How many members of the team have ever piloted the Black Lion.",
        answerChoices:["1", "2", "3", "4"],
        correctAnswer: "2",
        image: "assets/images/sven_and_princess_allura.gif"
    },

    {
        question:"What character was part of the Voltron team at the beginning, but was later replaced?",
        answerChoices:["Sven", "Keith", "Princess Allura", "Pidge"],       
        correctAnswer: "Sven",
        image: "assets/images/sven.gif"
    },
    {
        question:"What is the name of the evil witch that serves Planet Doom?",
        answerChoices:["Hazel", "Heron", "Hilda", "Haggar"],       
        correctAnswer: "Haggar",
        image: "assets/images/haggar.gif"
    },
    {
        question:"What was the name of King Zarkon's son?",
        answerChoices:["Prince Rotol", "Prince Lotor", "Prince Trool", "Prince Charles"],       
        correctAnswer: "Prince Lotor",
        image: "assets/images/prince_lotor.gif"
    },
    {
        question:"What are the names of the mechanical monsters that Planet Doom constantly sends to fight Voltron?",
        answerChoices:["Cyborgs", "Roborgs", "Robeasts", "Cybeasts"],       
        correctAnswer: "Robeasts",
        image: "assets/images/robeast.jpg"
    },
    {
        question:"Although he pilots the red lion, what color is Lance's uniform?",
        answerChoices:["Red", "Blue", "Black", "Purple"],       
        correctAnswer: "Blue",
        image: "assets/images/lance.gif"
    },
    {
        question:" What color are the lions that form Voltron's arms?",
        answerChoices:["Blue and Yellow", "Purple and Orange", "Black and Red", "Red and Green"],       
        correctAnswer: "Red and Green",
        image: "assets/images/red_arm.gif"
    },
    {
        question:"Who is the youngest member of the Voltron force?",
        answerChoices:["Keith", "Princess Allura", "Lance", "Pidge"],       
        correctAnswer: "Pidge",
        image: "assets/images/pidge.gif"
    },
    {
        question:"Lion Voltron teamed up with which other Voltron against Planet Doom?",
        answerChoices:["Vehicle Voltron", "Tank Voltron", "Airplane Voltron", "Machine Voltron"],       
        correctAnswer: "Vehicle Voltron",
        image: "assets/images/vehicle_voltron.jpg"
    }
];

var currentQuestion = 0;

//Document Ready Function
$(document).ready(function () {

    //Beginning Screen Function
    function beginningScreen() {
        startScreen = "<div class = 'start_button'><a href='#' class='rainbow-button' alt='Start'></a></div>";
        $("#empty_div").html(startScreen);
    }
    beginningScreen();

    //Deploy Questions Function
    function deployQuestion() {
        $(".card-subtitle").show();
        gameClock = setInterval(timerFunction, 1000);

        $("#empty_div").html("<p id='triviaQuestion'>" + triviaArray[this.currentQuestion].question + "</p>");
        for (var i = 0; i < triviaArray[this.currentQuestion].answerChoices.length;i++){
            $("#empty_div").append("<p> <button type='button'id='answerButton' class='btn btn-outline-light btn"+i+"' >" +triviaArray[this.currentQuestion].answerChoices[i]+"</button></p>");
        }
        
    }
 
    //Wrong Answer Function
    function wrongAnswer() {
        incorrectAnswerCount++;
        clearInterval(gameClock);

        $("#empty_div").html("<h3>Incorrect!</h3>");
        $("#empty_div").append("<p>The Correct Answer is: " + triviaArray[this.currentQuestion].correctAnswer + "</p>");
        $("#empty_div").append('<img src="'+triviaArray[this.currentQuestion].image+'"/>');

        if (currentQuestion === triviaArray.length - 1){
           finalScreen();
           }
           else {
           setTimeout(nextQuestion, 1000*4);
           }

     }

    //Right Answer Function
     function rightAnswer() {
        correctAnswerCount++;
        clearInterval(gameClock);

        $("#empty_div").html("<h3>Correct!</h3>");
        $("empty_div").append("<img src="+triviaArray[this.currentQuestion].image+"/>");
        $("#empty_div").append('<img src="'+triviaArray[this.currentQuestion].image+'"/>');

        if (currentQuestion === triviaArray.length - 1){
           finalScreen();
           }
           else {
           setTimeout(nextQuestion, 1000*4);
           }
     }

    //No Answer or Time Up Function
     function noAnswer() {
         unansweredCount++;
         clearInterval(gameClock);

         $("#empty_div").html("<h3>Time's Up!</h3>");
         $("#empty_div").append("<p>The Correct Answer is: "+triviaArray[this.currentQuestion].correctAnswer+"</p>");
         $("#empty_div").append('<img src="'+triviaArray[this.currentQuestion].image+'"/>');

         if (currentQuestion === triviaArray.length - 1){
            finalScreen();
            }
            else {
            setTimeout(nextQuestion, 1000*4);
            }
     }

    //Next Question Function
     function nextQuestion() {
     gameTimer = 30;  
     $("#empty_div").html("<p>" + gameTimer + "</p>");
     currentQuestion++;
     deployQuestion();
     }

    //Timer Function for time alloted to player to choose an answer
    function timerFunction() {
        gameTimer--;
        $(".card-subtitle").html("<p>" + gameTimer + "</p>");
        
        if (gameTimer === 0) {
            console.log("timeUp");
            // clearInterval(gameClock);
            noAnswer();
        }
    }

    //End Screen Function
    function finalScreen() {
        $(".card-subtitle").hide();
        $("#empty_div").html("<p>Answers Correct: "+ correctAnswerCount + "</p>");
        $("#empty_div").append("<p>Wrong Answers: " + incorrectAnswerCount + "</p>");
        $("#empty_div").append("<p> Unanswered: " + unansweredCount + "</p>");
        // $("#empty_div").append("<img src=assets/images/voltron.gif/>");
        $("#empty_div").append("<button type='button' id='restart_button' class='btn btn-outline-light'>Play Again</button>");
    }
   
 //Reset Game Function
 function resetGame() {
    currentQuestion = 0;
    incorrectAnswerCount = 0;
    correctAnswerCount = 0;
    unansweredCount = 0;
    gameTimer = 30;
    clearInterval(gameClock);
    deployQuestion();
 }

//All On-Click Events

    //Start Button On-Click
    $(".start_button").on("click", function(){
        deployQuestion();
    });

     //Answer Chosen On-Click
     $("#empty_div").on("click", "#answerButton", function () {
        clearInterval(gameClock);
        userChoice = $(this).text();
        if(userChoice===triviaArray[currentQuestion].correctAnswer){
            rightAnswer();
        }
        else{
            wrongAnswer();
        }
        
    });

    //Re-Start On-Click
    $("#empty_div").on("click", "#restart_button", function(){
        resetGame();
    });
   

});