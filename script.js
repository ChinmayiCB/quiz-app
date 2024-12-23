const questions =[
    {
        question: " What is my favourite animated cartoon character ?",
        answers: [
            {text:"Disgust", correct: false},
            {text:"Dory", correct: false},
            {text:"Olaf", correct: true},
            {text:"Baymax", correct: false},
        ]
    },
    {
        question: " Which is my favourite place to visit?",
        answers: [
            {text:"Paris", correct: true},
            {text:"New York", correct: false},
            {text:"Maldives", correct: false},
            {text:"Dubai", correct: false},
        ]  
    },
    {
        question: " What is my fav food ?",
        answers: [
            {text:"North Indian", correct: false},
            {text:"Biryani", correct: false},
            {text:"Chinese", correct: false},
            {text:"Akki Rotti", correct: true},
        ] 
    },
    {
        question: " What is my fav color?",
        answers: [
            {text:"Blue", correct: false},
            {text:"Lavender", correct: true},
            {text:"Rose gold", correct: false},
            {text:"Black", correct: false},
        ] 
    },
    {
        question: " What person am I ?",
        answers: [
            {text:"Heliophile (loves sun)", correct: false},
            {text:"Astrophile (loves stars)", correct: false},
            {text:"Selenophile (loves moon)", correct: true},
            {text:"Thalassophile (loves ocean)", correct: false},
        ] 
    },
    {
        question: " Am I more of a coffee or tea person ?",
        answers: [
            {text:"Coffee", correct: false},
            {text:"Tea", correct: true},
            {text:"Mix of both", correct: false},
            {text:"Depends on the mood", correct: false},
        ]
    },
    {
        question: " Which sport do I like ?",
        answers: [
            {text:"Volleyball", correct: true},
            {text:"Throwball", correct: false},
            {text:"Shotput", correct: false},
            {text:"Badminton", correct: false},
        ]
    },
    {
        question: " Am I more of an introvert, extrovert, or ambivert? ",
        answers: [
            {text:"Introvert", correct: false},
            {text:"Extrovert", correct: false},
            {text:"Ambivert", correct: true},
            {text:"Can't say", correct: false},
        ]
    },
    {
        question: " What genre of movies or TV shows do I enjoy the most? ",
        answers: [
            {text:"Mystery", correct: true},
            {text:"RomCom", correct: false},
            {text:"Horror", correct: false},
            {text:"Sci-Fi", correct: false},
        ]
    },
    {
        question: " What’s one activity I love doing while traveling?",
        answers: [
            {text:"Exploring local food", correct: false},
            {text:"Adventure sports", correct: false},
            {text:"Sightseeing", correct: false},
            {text:"Shopping", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"; //question ends
    showQuestion(); // one more func to display the questions
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + "." + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct; // will add true or false in the buttton dataset
        }
        button.addEventListener("click",selectAnswer); //function is called
    });
}


function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn =e.target; //stores the selected option
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); //classname is assigned based on the option
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true; // cant click on any other button
    });
    nextButton.style.display ="block"; // display the next button
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex <questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
