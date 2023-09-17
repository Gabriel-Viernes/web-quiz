var currentQuestion = 0;
var time = 60;
var startBtn = $("#startBtn").on("click", () => {
    $("#startBtnCont").addClass("d-none");
    timer();
    displayQuestion(currentQuestion);
    $("#questionCont").removeClass("d-none");
})

function questTemplate(question,a,b,c,d,correct) {
    this.question = question;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.correct = correct;
    // correct will be a number from 1-4, corresponding with a-d
}

// initializes questions
const q1 = new questTemplate("What is used to apply styling to HTML?","HTML", "CSS", "Javascript", "Java", 2);
const q2 = new questTemplate("What does `=` mean in Javascript?","equals","is operator","assignment operator", "equals operator", 3);
const q3 = new questTemplate("What is your best resource for researching methods for a given API?","The API's documentation","Stack Overflow","Google","ChatAPT", 1);
const q4 = new questTemplate("What is KISS?", "A Band","Keep Infrastructure Solid State","Keep In Solid Snake","Keep It Simple Stupid",4);
const q5 = new questTemplate("Which of the following is used to make a webpage dynamic?", "Java", "Javascipt","C","BASIC", 1);
const questionList = [q1,q2,q3,q4,q5];

function displayQuestion(i) {
    let cur = questionList[i];
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
    }, 1000)
}