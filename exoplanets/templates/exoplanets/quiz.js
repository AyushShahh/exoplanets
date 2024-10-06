// Sample Questions (Replace with data from Django backend)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: 0,
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
  {
    question: "What is the capital of Germany?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: 2,
  },
  // ...add more questions as needed
];

let index = 0;
let score = 0;
let lockAnswer = false;

const quizSection = document.getElementById("quizSection");
const termsModal = document.getElementById("termsModal");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const nextBtn = document.getElementById("nextBtn");
const quizProgress = document.getElementById("quizProgress");
const startQuizBtn = document.getElementById("startQuizBtn");
const acceptTerms = document.getElementById("acceptTerms");

// Accept Terms Logic
acceptTerms.addEventListener("change", function () {
  if (this.checked) {
    startQuizBtn.disabled = false;
    startQuizBtn.classList.remove(
      "cursor-not-allowed",
      "bg-gray-300",
      "text-gray-500"
    );
    startQuizBtn.classList.add("bg-blue-500", "text-white");
  } else {
    startQuizBtn.disabled = true;
    startQuizBtn.classList.add(
      "cursor-not-allowed",
      "bg-gray-300",
      "text-gray-500"
    );
    startQuizBtn.classList.remove("bg-blue-500", "text-white");
  }
});

// Start Quiz
startQuizBtn.addEventListener("click", function () {
  termsModal.classList.add("hidden");
  quizSection.classList.remove("hidden");
  loadQuestion();
});

// Load Questions
function loadQuestion() {
  lockAnswer = false;
  const currentQuestion = questions[index];
  quizQuestion.innerHTML = `${index + 1}. ${currentQuestion.question}`;
  quizOptions.innerHTML = "";

  currentQuestion.options.forEach((option, idx) => {
    const optionElement = document.createElement("li");
    optionElement.className = "border p-2 rounded-md ml-8 hover:cursor-pointer";
    optionElement.innerHTML = option;
    optionElement.addEventListener("click", () =>
      checkAnswer(idx, currentQuestion.correct, optionElement)
    );
    quizOptions.appendChild(optionElement);
  });

  nextBtn.classList.add("hidden");
  quizProgress.innerHTML = `${index + 1} of ${questions.length} questions`;
}

// Check Answer
function checkAnswer(selectedIdx, correctIdx, element) {
  if (!lockAnswer) {
    lockAnswer = true;
    if (selectedIdx === correctIdx) {
      element.classList.add("bg-green-500", "text-white");
      score++;
    } else {
      element.classList.add("bg-red-500", "text-white");
      quizOptions.children[correctIdx].classList.add(
        "bg-green-500",
        "text-white"
      );
    }
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("bg-blue-500", "text-white");
    nextBtn.disabled = false;
  }
}

// Next Question
nextBtn.addEventListener("click", function () {
  if (index < questions.length - 1) {
    index++;
    loadQuestion();
  } else {
    endQuiz();
  }
});

// End Quiz
function endQuiz() {
  quizSection.innerHTML = `<h2 class="text-2xl">You scored ${score} out of ${questions.length}</h2>`;
  saveQuizResult();
}

// Save Quiz Result (Mock)
function saveQuizResult() {
  // You can send the score and other details to Django backend for persistence
  console.log(
    `Score: ${score}, Quiz Completed at: ${new Date().toLocaleString()}`
  );
}
