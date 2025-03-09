document.addEventListener("DOMContentLoaded", function() {
    const quizData = [
        {
            question: "What is the main focus of SDG 14?",
            choices: [
                "Reducing air pollution",
                "Conserving marine and coastal ecosystems",
                "Promoting land-based farming",
                "Protecting endangered land animals"
            ],
            answer: 1
        },
        {
            question: "What percentage of the Earth's surface is covered by oceans?",
            choices: ["50%", "60%", "70%", "80%"],
            answer: 2
        },
        {
            question: "Which of the following is a major threat to marine life?",
            choices: ["Overfishing", "Plastic pollution", "Climate change", "All of the above"],
            answer: 3
        },
        {
            question: "What is marine biodiversity?",
            choices: [
                "The number of fish species in a lake",
                "The variety of life in the ocean, including plants and animals",
                "A type of coral reef",
                "The amount of salt in seawater"
            ],
            answer: 1
        },
        {
            question: "What is the purpose of Marine Protected Areas (MPAs)?",
            choices: [
                "To allow unlimited fishing",
                "To protect marine species and habitats",
                "To build underwater cities",
                "To increase plastic production"
            ],
            answer: 1
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswers = new Array(quizData.length).fill(null);
    const quizContainer = document.getElementById("quizContainer");

    function loadQuestion() {
        quizContainer.innerHTML = "";
        let questionData = quizData[currentQuestionIndex];
        
        let questionElement = document.createElement("div");
        questionElement.classList.add("quiz-question");
        questionElement.innerHTML = `<p><strong>${currentQuestionIndex + 1}. ${questionData.question}</strong></p>`;

        let choicesContainer = document.createElement("div");
        choicesContainer.className = "choices-container";

        questionData.choices.forEach((choice, i) => {
            let label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="q${currentQuestionIndex}" value="${i}" ${selectedAnswers[currentQuestionIndex] === i ? "checked" : ""}> ${choice}`;
            choicesContainer.appendChild(label);
            choicesContainer.appendChild(document.createElement("br"));
        });

        questionElement.appendChild(choicesContainer);
        quizContainer.appendChild(questionElement);

        createNavigationButtons();
    }

    function createNavigationButtons() {
        let navContainer = document.createElement("div");
        navContainer.className = "nav-container";
        quizContainer.appendChild(navContainer);

        let prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.className = "nav-button";
        prevButton.disabled = currentQuestionIndex === 0;
        prevButton.onclick = function () {
            if (currentQuestionIndex > 0) {
                saveSelectedAnswer();
                currentQuestionIndex--;
                loadQuestion();
            }
        };
        navContainer.appendChild(prevButton);

        let nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.className = "nav-button";
        nextButton.disabled = selectedAnswers[currentQuestionIndex] === null; 
        nextButton.onclick = function () {
            if (currentQuestionIndex < quizData.length - 1) {
                saveSelectedAnswer();
                currentQuestionIndex++;
                loadQuestion();
            }
        };
        navContainer.appendChild(nextButton);

        let submitButton = document.createElement("button");
        submitButton.textContent = "Submit Quiz";
        submitButton.className = "submit-button";
        submitButton.onclick = function () {
            saveSelectedAnswer();
            checkAnswers();
        };
        navContainer.appendChild(submitButton);

        document.querySelectorAll(`input[name='q${currentQuestionIndex}']`).forEach(input => {
            input.addEventListener('change', function () {
                selectedAnswers[currentQuestionIndex] = Number(this.value);
                nextButton.disabled = false;
            });
        });
    }

    function saveSelectedAnswer() {
        let selected = document.querySelector(`input[name='q${currentQuestionIndex}']:checked`);
        if (selected) {
            selectedAnswers[currentQuestionIndex] = Number(selected.value);
        }
    }

    function checkAnswers() {
        score = 0;
        quizData.forEach((question, index) => {
            let selectedIndex = selectedAnswers[index];
            let correctAnswer = question.answer;

            console.log(`Q${index + 1}: Selected ${selectedIndex} | Correct ${correctAnswer}`);

            let labels = document.querySelectorAll(`input[name='q${index}']`);
            labels.forEach(label => {
                if (Number(label.value) === correctAnswer) {
                    label.parentNode.style.color = "green"; 
                } else if (Number(label.value) === selectedIndex) {
                    label.parentNode.style.color = "red";
                }
            });
            
            if (selectedIndex === correctAnswer) {
                score++;
            }
        });
        displayResults();
    }

    function displayResults() {
        quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score} out of ${quizData.length}</p>`;
    }

    loadQuestion();
});
