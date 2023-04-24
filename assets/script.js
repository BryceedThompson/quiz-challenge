


var playerInitals = document.getElementById("msg");
var score = 4;    //document.getElementById("score");
var saveButton = document.getElementById("save");

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




// make object that stores high score 

// store high score in local memory, remember it only likes storing in strings

// make a timer that counts up or maybe down... could be cool to make a time multiplyer for counting scores

// create a function where you can input answers and ater answered askes another question

// make time subtract if the question is answered wrong

// when all questions are answered say game over 

// when game is over save initials and score

// create a function that compares user inputed answers vs a key