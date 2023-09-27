document.addEventListener("DOMContentLoaded", function () {

    // DOM elements
    const startButton = document.querySelector("#start-button");
    const timerDisplay = document.querySelector("#timerDisp");
    const initCard = document.querySelector("#init-card");
    const resultDisplay = document.querySelector("#result");


    // Quiz data
    const questions = [
        {
            question: "What does the acronym 'DOM' stand for in JavaScript?",
            answers: [
                "a) Document Object Model",
                "b) Data Object Model",
                "c) Dynamic Object Manipulation",
                "d) Document Order Model"
            ],
            correctAnswer: "a) Document Object Model"
        },
        {
            question: "Which of the following is not a valid way to declare a variable in JavaScript?",
            answers: [
                "a) let",
                "b) var",
                "c) const",
                "d) int"
            ],
            correctAnswer: "d) int"
        },
        {
            question: "Which function is used to add a new item to the end of an array in JavaScript?",
            answers: [
                "a) push()",
                "b) append()",
                "c) add()",
                "d) insert()"
            ],
            correctAnswer: "a) push()"
        },
        {
            question: "What is the purpose of the 'console.log()' function in JavaScript?",
            answers: [
                "a) To display a message in the browser's console",
                "b) To create a new HTML element",
                "c) To prompt the user for input",
                "d) To change the background color of a webpage"
            ],
            correctAnswer: "a) To display a message in the browser's console"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLimit = 60; // Set the time limit for the quiz

    startButton.addEventListener("click", function() {
        console.log("Start button clicked");
        startQuiz();
    });
    
    // Function to start the quiz
    function startQuiz() {
        console.log("Start button clicked");
        startButton.style.display = "none";
        initCard.textContent = "";
        displayQuestion(currentQuestionIndex);
        startTimer();
    }

    // Function to display a question
    function displayQuestion(index) {
        if (index < questions.length) {
            const questionData = questions[index];
            initCard.innerHTML = `<h3>${questionData.question}</h3>`;
            
            questionData.answers.forEach((answer, i) => {
                const answerButton = document.createElement("button");
                answerButton.textContent = answer;
                answerButton.addEventListener("click", () => checkAnswer(answer, questionData.correctAnswer));
                initCard.appendChild(answerButton);
            });
        } else {
            endQuiz();
        }
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            score++;
            resultDisplay.textContent = "Correct!";
        } else {
            resultDisplay.textContent = "Wrong!";
            // Subtract time for wrong answer (adjust the time penalty as needed)
            timeLimit -= 10; // Deduct 10 seconds for a wrong answer
            if (timeLimit < 0) {
                timeLimit = 0; // Ensure the timer doesn't go negative
            }
        }

        // Debugging: Log the current timeLimit
        console.log("Current timeLimit:", timeLimit);

        // Update the timer display
        timerDisplay.textContent = `Time: ${timeLimit}`;

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }


    // Function to start the timer
    function startTimer() {
        let timeLeft = timeLimit;
        timer = setInterval(() => {
            timerDisplay.textContent = `Time: ${timeLeft}`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    // Function to display scores
    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        const highScoresList = document.getElementById("high-scores");
    
        // Clear the existing list
        highScoresList.innerHTML = "";
    
        // Iterate through high scores and display them
        highScores.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
            highScoresList.appendChild(listItem);
        });
    }
    

    // Function to end the quiz
    function endQuiz() {
        clearInterval(timer);
        timerDisplay.textContent = "Time's Up!";
        initCard.textContent = `Your final score is ${score}`;
            
        // Ask for initials and save score (you can store it in localStorage)
        const initials = prompt("Enter your initials:");
        if (initials) {
            // Save the score and initials to localStorage
            const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highScores.push({ initials, score });
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }
            
        // Display high scores
        displayHighScores();
    }

    // Event listener for starting the quiz
    startButton.addEventListener("click", startQuiz);

    const viewScoresButton = document.getElementById("view-scores");
    viewScoresButton.addEventListener("click", displayHighScores);


    }

);
