  
   
   //header 
var headerElement = document.querySelector("header");
var timerDiv = document.querySelector('#timer');

    //quiz intro
var quizStartConDiv = document.querySelector('#quizStartCon');
var startQuizBtn = document.querySelector('#startQuizBtn')

    //quiz questions
var quizQuestinConDiv = document.querySelector('#quizQuestionCon');
var questionDiv = document.querySelector('#question');
var optionli = document.querySelectorAll('.option');

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

    //timer
var score = 0;
var timeLeft = 0;
var timer = 100;
var scoreSaveArray=[];
var questionNumber = 0;

    //quiz object with questions, options, and answers
var quiz ={
    question:["Where do we style our web page mostly?","Which of these is not an element?","Wich one of these is the best syntax?","How would you target a 'p' element that is inside an element with an id tag of 'example' in CSS?"],
    option1:["HTML","<id>","=","#example p"],
    option2:["JS","<h4>","= =","p #example"],
    option3:["CSS","<button>","= = =",".example #p"],
    option4:["Console","<meta>","= = = =","#example #p"],
    correct:[" CSS"," <id>"," = = ="," #example p"]
};

    //removes or adds .hide css to different elements when we want them invisible 
function changePage(event){
        //coding quiz intro
    if(event === 1){
        headerElement.classList.add("hide");
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
        headerElement.classList.add("hide");
        quizStartConDiv.classList.add("hide");
        quizQuestinConDiv.classList.add("hide");
        quizEndConDiv.classList.remove("hide");
        quizResetConDiv.classList.add("hide"); 
        //high scores list
    } else if(event === 4){
        headerElement.classList.add("hide");
        quizStartConDiv.classList.add("hide");
        quizQuestinConDiv.classList.add("hide");
        quizEndConDiv.classList.add("hide");
        quizResetConDiv.classList.remove("hide"); 
    }
}
    // starts us on our 1s event which is the intro page 
changePage(1);

    // this renders our questions and options for our quiz
function renderQuestions(indy){
    questionDiv.textContent = quiz.question[indy];
   optionli[0].textContent = " " + quiz.option1[indy];
   optionli[1].textContent = " " + quiz.option2[indy];
   optionli[2].textContent = " " + quiz.option3[indy];
   optionli[3].textContent = " " + quiz.option4[indy];
}
    // testing renderquestion function
    //renderQuestions(0);

    //this adds an event listener for the question options in our quiz and checks if our selected option matches our correct one in the array
quizQuestinConDiv.addEventListener("click",(event)=>{
    var holder = event.target;
    console.log(holder.textContent); //test to see if button works
    console.log(quiz.correct[questionNumber]); //test to see if correct array is working

        //this checks the selected option against the correct one and subtracts 10 seconds from the timer if they do not match
    if(holder.textContent === quiz.correct[questionNumber]){
        console.log("correct"); //test to see if conparison works
    }else{
        console.log("incorrect"); ////test to see if conparison works
        timeLeft -= 10;
        timerDiv.textContent = "Time: " + timeLeft;
    }

        //if we have time left and there are more questions render the next question else update the score and go to quiz finish page
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

    //this adds an event listener for the start quiz button, after it is pressed it restets the question number, time, renders the questions, and finaly changes our page
startQuizBtn.addEventListener("click",()=>{
    questionNumber = 0;
    timeLeft = 100;
    renderQuestions(questionNumber);
    initialDiv.value = "";
    changePage(2);

        //this sets up our timer to count down to 0
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
    scoreSaveArray.unshift(score + ": " + initial);
    console.log(scoreSaveArray);// testing our saveScore
        //Use .setItem() to store array in locasl storage and JSON.stringify to convert it as a string
    localStorage.setItem("scoreSaveArray", JSON.stringify(scoreSaveArray));
};
    //this renders each li element we create and puts our local var in order from highest to lowest before we display the scores
function renderScore(){
    var scoreStore = JSON.parse(localStorage.getItem("scoreSaveArray"));
    scoreStore.sort();
    scoreStore.reverse();
    console.log(scoreStore);// testing order
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

    //this event listener takes our initials and saves them to our local storage array with our score
initBtn.addEventListener("click",(event)=>{
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

    //this event listener returns us to the first page and resets the timer
retunBtn.addEventListener("click", function(event){
    event.preventDefault();
    timeLeft = 100;
    timerDiv.textContent = "Time: " + timeLeft;
    changePage(1);
});
    // this event listener clears the scores and initials stored in our array
resetBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    localStorage.removeItem("scoreSaveArray");
    highScoreOl.innerHTML = "";

})

