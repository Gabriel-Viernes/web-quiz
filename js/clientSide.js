var currentQuestion = 0;
var time = 60;
var chosenAnswers = [];
var startBtn = $("#startBtn").on("click", () => {
    $("#startBtnCont").addClass("d-none");
    timer();
    displayQuestion();
    // display inital question number, will be updated by recordAnswer
    $("#curr").text(currentQuestion+1);
    $("#questionCont").removeClass("d-none");
})

// event listeners for each answer choice
var a = $("#a").on("click", () => {
    let answerID = 1
    endTestCheck(answerID);
})
var b = $("#b").on("click", () => {
    let answerID = 2
    endTestCheck(answerID);
})
var c = $("#c").on("click", () => {
    let answerID = 3
    endTestCheck(answerID);
})
var d = $("#d").on("click", () => {
    let answerID = 4
    endTestCheck(answerID);
})

// This is the question object
function questionTemplate(question,a,b,c,d,correct) {
    this.question = question;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.correct = correct;
    // correct will be a number from 1-4, corresponding with a-d
}
// score object
function scoreObject(initials, score) {
    this.initials = initials;
    this.score = score;
}
// populate scoreboard with fake scores
const fake0 = new scoreObject("馬鹿", 5);
const fake1 = new scoreObject("ばか", 4);
const fake2 = new scoreObject("あほ", 5);
localStorage.setItem(0, JSON.stringify(fake0))
localStorage.setItem(1, JSON.stringify(fake1))
localStorage.setItem(2, JSON.stringify(fake2))

// initializes questions
const q1 = new questionTemplate("What is used to apply styling to HTML?","HTML", "CSS", "Javascript", "Java", 2);
const q2 = new questionTemplate("What does `=` mean in Javascript?","equals","is operator","assignment operator", "equals operator", 3);
const q3 = new questionTemplate("What is your best resource for researching methods for a given API?","The API's documentation","Stack Overflow","Google","ChatAPT", 1);
const q4 = new questionTemplate("What is KISS?", "A Band","Keep Infrastructure Solid State","Keep In Solid Snake","Keep It Simple Stupid",4);
const q5 = new questionTemplate("Which of the following is used to make a webpage dynamic?", "Java", "Javascipt","C","BASIC", 2);
const questionList = [q1,q2,q3,q4,q5];


function displayQuestion() {
    let cur = questionList[currentQuestion];
    $("#question").text(cur.question);
    $("#a").text(cur.a);
    $("#b").text(cur.b);
    $("#c").text(cur.c);
    $("#d").text(cur.d);
}

function timer() {
    $("#time").text(time);
    setInterval(() => {
        time--;
        $("#time").text(time);
        if (time <= 0) {
            endScreenDisplay();
        }
    }, 1000)
}

function nextQuestion() {
    currentQuestion++;
    displayQuestion(currentQuestion);
}

// adds answerID to chosenAnswers[], checks the answer, displays Correct/Wrong 
function recordAnswer(id) {
    chosenAnswers.push(id);
    console.log(chosenAnswers);
    if (id === questionList[currentQuestion].correct) {
        $("#curr").text("Correct!");
        setTimeout(() => {
            $("#curr").text(currentQuestion+1);
        }, 3000);
    } else {
        $("#curr").text("Wrong!");
        time = time-5;
        setTimeout(() => {
            $("#curr").text(currentQuestion+1);
        }, 3000);
    }
}
// Compares the current question to the amount of questions available, then advances to the next question or ends the quiz
function endTestCheck(id) {
    if(currentQuestion === (questionList.length - 1)) {
        recordAnswer(id);
        endScreenDisplay();
        console.log("oops")
    } else {
        recordAnswer(id);
        nextQuestion();
        displayQuestion();
    }
}
// checks user's answers against answer sheet and returns a score
function checkScore() {
    let score = 0;
    for (let i = 0; i < questionList.length; i++) {
        if(questionList[i].correct === chosenAnswers[i]) {
            score++;
        }
    }
    return score;
}
// displays endscreen and initializes input for user initials
function endScreenDisplay() {
    $("#questionCont").addClass("d-none");
    $("#score").text("You got " + checkScore() + " out of " + questionList.length + " right!")
    $("#endscreen").removeClass("d-none");  
    scoreDisplay();  
    $("#initialSubmit").on("click", () => {
        storeScore();
        $("#initials").val(``);
        scoreDisplay();
    })  
}
// checks user inputted initials to see if they're of appropriate length
function checkInitials() {
    console.log("checkInitials started")
    let initials = $("#initials").val();
    if(initials.length != 2){
        return false;
    }
    return true;
}

// adds a scoreObject to local storage based on user input
function storeScore() {
    console.log("storeScore started")
    if(checkInitials() === true) {
        let score = checkScore();
        let nextKey = localStorage.length;
        let tempInitials = $("#initials").val();
        tempInitials = tempInitials.toUpperCase();
        let store = new scoreObject(tempInitials, score);
        localStorage.setItem(nextKey, JSON.stringify(store));
    } else {
        alert("Please only use two characters when storing initials");
    }
}
// removes all child list items then reappends them
function scoreDisplay() {
    $("#scoreList").empty();
    $("#scoreListScores").empty();
    for (let i = 0; i < localStorage.length; i++) {
        let tempScoreObj = JSON.parse(localStorage.getItem(i))
        let tempInit = tempScoreObj.initials;
        let tempScore = tempScoreObj.score;
        $("#scoreList").append("<li>" + tempInit + "</li>")
        $("#scoreListScores").append("<li>" + tempScore + " points</li>")
    }
}

