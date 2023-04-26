  
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
var scoreSpanDiv = document.querySelector('#scoreSpan');
var initialDiv = document.querySelector('.initial');
var initBtn = document.querySelector('#initBtn');
var initialMessageDiv = document.querySelector('.initialMessage');
    //high scores
var quizResetConDiv = document.querySelector('#quizResetCon');
var highScoreOl = document.querySelector('#highScore');
var retunBtn = document.querySelector('#retunBtn');
var resetBtn = document.querySelector('#resetBtn');
    
var score = 0;
var timeLeft = 100;
var timer = 0;
var scoreSaveArray=[];
var questionNumber = 0;
    //quiz object with questions and answers
var quiz ={
    question:["Where do we style our web page mostly?","Which of these is not an element?","Wich one of these is the best syntax?"],
    option1:["HTML","<id>","="],
    option2:["JS","<h4>","= ="],
    option3:["CSS","<button>","= = ="],
    option4:["Console","<meta>","= = = ="],
    correct:["CSS","<id>","= = ="]
};
//startQuizBtn.addEventListener("click")


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
changePage(1);

function renderQuestions(indy){
    questionDiv.textContent = quiz.question[indy];
   optionli[0].textContent = " " + quiz.option1[indy];
   optionli[1].textContent = " " + quiz.option2[indy];
   optionli[2].textContent = " " + quiz.option3[indy];
   optionli[3].textContent = " " + quiz.option4[indy];
}
    // testing renderquestion function
//renderQuestions(0);

quizQuestinConDiv.addEventListener("click",(event)=>{
    var holder = event.target;

    if(holder.textContent.slice(3) === quiz.correct[questionNumber]){
        console.log("correct");
    }else{
        console.log("incorrect");
        timeLeft -= 10;
        timerDiv.textContent = "Time Left: " + timeLeft;
    }
    if (questionNumber < (quiz.question.length - 1) && timeLeft > 0){
        questionNumber ++;
        renderQuestions(questionNumber);
    } else{
        score = timeLeft;
        changePage(3);
        scoreSpanDiv.textContent = score;
        clearInterval(timer);
        timerDiv.textContent = "Time: " + timeLeft;
    }
})


startQuizBtn.addEventListener("click",(event)=>{
    event.preventDefault;
    questionNumber = 0;
    timeLeft = 100;
    renderQuestions(questionNumber);
    initialDiv.value = "";
    changePage(2);

    timer = setInterval(function() {
        timeLeft--;
        if(timeLeft < 1 ) {
          clearInterval(timer);
          scoreSpanDiv.textContent=score;
          changePage(3); 
        }
        timerDiv.textContent="Time: " + timeLeft;
      }, 1000);
});


    //function that is used to save score and initals
function saveScore(initial) {
        scoreSaveArray.unshift(initial + ":" + score);
            //Use .setItem() to store array in locasl storage and JSON.stringify to convert it as a string
        localStorage.setItem("scoreSaveArray", JSON.stringify(scoreSaveArray));
};

function renderScore(){
    var scoreStore = JSON.parse(localStorage.getItem("scoreSaveArray"));
    highScoreOl.innerHTML="";
    if (scoreStore !== null){
        scoreSaveArray = scoreStore;
        var displayScoreLength = scoreSaveArray.length;
        for (var i = 0; i < displayScoreLength; i ++){
            var list = document.createElement("li");
            list.textContent = scoreSaveArray[i];
            highScoreOl.appendChild(list);
        }
    }
}

initBtn.addEventListener("click", function(event){
    event.preventDefault();
    scoreSaveArray=[];
    var inital = initialDiv.value.trim();
    if(inital){
        initialMessageDiv.textContent = "";
        var storeScore = JSON.parse(localStorage.getItem('scoreSaveArray'));
        if(storeScore !==  null){
            scoreSaveArray = storeScore;
        }
        saveScore(inital);
        changePage(4);
        renderScore();
    }
});

retunBtn.addEventListener("click", function(event){
    event.preventDefault();
    timeLeft = 100;
    timerDiv.textContent = "Time: " + timeLeft;
    changePage(1);
});

resetBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    localStorage.removeItem("scoreSaveArray");
    highScoreOl = "";

})

