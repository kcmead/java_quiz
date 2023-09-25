const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Holy Troly Macky Lacky", "Hyper Text Markup Language", "Hitmen Trick Most Lawyers", "Highlighted Text Mid Layout"],
        correctAnswer: 1
    },
    {
        question: "How do you attach your CSS to HTML?",
        options: ["staple it to the bottom", "glue it to the back of the HTML document", "yell at the computer", "link the CSS doc as the style sheet in the HTML header"]
    },
    {
        question: ""
    }
];

const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let timerInterval;
let timeRemaining = 120;
let score = 0;

const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

function startQuiz()  {
    startButton.style.display = "none";
    displayNextQuestion();
    startTimer();
}

function displayNextQuestion() {
    if (currentQuestionIndex < totalQuestions) {
        const questionData = questions[currentQuestionIndex];
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}:</h2>
        <p>${questionData.question}</p>
        <ul>
          ${questionData.options.map((option, index) => `
            <li><button onclick="checkAnswer(${index})">${option}</button></li>
          `).join("")}
        </ul>
      `;
        quizContainer.innerHTML = "";
        quizContainer.appendChild(questionElement);
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    if (selectedIndex === questionData.correctAnswer) {
        score += 10;
    } else {
        timeRemaining -= 10;
    }
    currentQuestionIndex++;
    displayNextQuestion();
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            document.getElementById("timer-display").textContent = timeRemaining;
            timeRemaining--;
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    resultContainer.innerHTML = `
    <h2>Game Over</h2>
    <p>Your Score: $(score)</p>
    <label for="initials">enter your initials:</label>
    <input type="text" id="initials">
        <button onclick="saveScore()">Save Score</button>
        `;
}

function saveScore() {
    const initials = document.getElementById("initials").value;
}

startButton.addEventListener("click", startQuiz);

const highScores = [];

function saveScore() {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;

    if (initials.trim() === "")  {
        alert("please enter a value.");
        return;
    }

    const playerScore = {
        initials: initials,
        score: score,
    };

    highScores.push(playerScore);
    highScores.sort((a, b) => b.score - a.score);

    const maxHighScoresToShow = 5;
    highScores.splice(maxHighScoresToShow);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    initialsInput.value = "";

    displayHighScores();
}

function displayHighScores() {
    const highScoresList = document.getElementById("high-scores-list");
    highScoresList.innerHTML = "";

    highScores.forEach((scoreData, index) => {
        const scoreItem = document.createElement("li");
        scoreItem.textContent = `${index + 1}. ${scoreData.initials}: ${scoreData.score}`;
        highScoresList.appendChild(scoreItem);
    });
}

function loadHighScores() {
    const storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    if (storedHighScores) {
        highScores.push(...storedHighScores);
    }

    displayHighScores();
}

loadHighScores();
