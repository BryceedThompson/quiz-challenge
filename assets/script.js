  
// make object that stores high score 

// store high score in local memory, remember it only likes storing in strings

// make a timer that counts up or maybe down... could be cool to make a time multiplyer for counting scores

// create a function where you can input answers and ater answered askes another question

// make time subtract if the question is answered wrong

// when all questions are answered say game over 

// when game is over save initials and score

// create a function that compares user inputed answers vs a key 
   
   
   //header
var headerElement = document.querySelector("header");
var viewHighScoreJump = document.querySelector('#viewScore');
var timerDiv = document.querySelector('#timer');
    //quiz intro
var quizStartConDiv = document.querySelector('#quizStartCon');
var startQuizBtn = document.querySelector('#startQuizBtn')
    //quiz questions
var quizQuestinConDiv = document.querySelector('#quizQuestionCon');
var questionDiv = document.querySelector('#question');
var optionConOl = document.querySelector('.optionCon');
var optionli = document.querySelectorAll('.option');
var messageDiv = document.querySelector('.message');
    //quiz finish
var quizEndConDiv = document.querySelector('#quizEndCon');
var ScoreSpanDiv = document.querySelector('#ScoreSpan');
var initialDiv = document.querySelector('.initial');
var initBtn = document.querySelector('#initBtn');
var initialMessageDiv = document.querySelector('.initialMessage');
    //high scores
var quizResetConDiv = document.querySelector('#quizResetCon');
var highScoreOl = document.querySelector('#highScore');
var retunBtn = document.querySelector('#retunBtn');
var resetBtn = document.querySelector('#resetBtn');
    
var score = 0;
var  timeLeft = 75;
var timer = 0;
    //quiz object with questions and answers
var quiz ={
    question:["Where do style our web page mostly?","Which of these is not an element?","Wich one of these is the best syntax?"],
    option1:["HTML","<id>","="],
    option2:["JS","<h4>","=="],
    option3:["CSS","<button>","==="],
    option4:["Console","<meta>","===="]
};
    //removes or adds .hide css to divs, header is visiable on all
function changePage(event){
        //coding quiz intro
    if(event === 1){
        headerElement.classList.remove("hide");
        quizStartConDiv.classList.remove("hide");
        quizQuestinConDiv.classList.add("hide");
        quizEndConDiv.classList.add("hide");
        quizResetConDiv.classList.add("hide");
        //quiz questons
    } else if(event === 2){
        headerElement.classList.remove("hide");
        quizStartConDiv.classList.add("hide");
        quizQuestinConDiv.classList.remove("hide");
        quizEndConDiv.classList.add("hide");
        quizResetConDiv.classList.add("hide"); 
        //quiz finish 
    } else if(event === 3){
        headerElement.classList.remove("hide");
        quizStartConDiv.classList.add("hide");
        quizQuestinConDiv.classList.add("hide");
        quizEndConDiv.classList.remove("hide");
        quizResetConDiv.classList.add("hide"); 
        //high scores list
    } else if(event === 4){
        headerElement.classList.remove("hide");
        quizStartConDiv.classList.add("hide");
        quizQuestinConDiv.classList.add("hide");
        quizEndConDiv.classList.add("hide");
        quizResetConDiv.classList.remove("hide"); 
    }
}
//testing changePage function
changePage(2);

function renderQuestions(indy){
    questionDiv.textContent = quiz.question[indy];
   optionli[0].textContent = "1. " + quiz.option1[indy];
   optionli[1].textContent = "2. " + quiz.option2[indy];
   optionli[2].textContent = "3. " + quiz.option3[indy];
   optionli[3].textContent = "4. " + quiz.option4[indy];
}
    // testing renderquestion function
renderQuestions(0);



    //function that is used to score
function saveScore() {
        // save related data as an object 
    var playerScore = {
        playerInitals: playerInitals.value.trim(),
        score: score, // may need to change once var score is a function

    };
    //Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("playerScore", JSON.stringify(playerScore));
}

function renderLastScore(){

    var lastScore = JSON.parse(localStorage.getItem("playerScore"));
    
    if (lastScore !== null){
        document.getElementById("saved-score").innerHTML = lastScore.score;
        document.getElementById("saved-playerInitals").innerHTML = lastScore.playerInitals;
    } else {
        return;
    }
}

saveButton.addEventListener("click", function(event){
    event.preventDefault();
    saveScore();
    renderLastscore();
});

function init(){
    renderLastScore();
}
init();
