const state = {
  questions: [],
  currentIndex: 0,
  score: 0,
  timePerQuestion: 15,
  timeLeft: 15,
  timerId: null
};

const els = {
  counter: document.getElementById("question-counter"),
  timer: document.getElementById("timer"),
  score: document.getElementById("score"),
  question: document.getElementById("question"),
  choices: document.getElementById("choices"),
  submit: document.getElementById("submit"),
  next: document.getElementById("next"),
  feedback: document.getElementById("feedback"),
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  finalScore: document.getElementById("final-score"),
  restart: document.getElementById("restart")
};

const fetchQuestions = async () => {
  try {
    console.log("Fetching questions...");
    const res = await fetch("/api/questions");
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Questions data:", data);
    state.questions = data.questions ?? [];
    console.log("Questions loaded:", state.questions.length);
  } catch (error) {
    console.error("Error fetching questions:", error);
    els.question.textContent = "Erreur lors du chargement des questions";
  }
};

const startTimer = () => {
  clearInterval(state.timerId);
  state.timeLeft = state.timePerQuestion;
  els.timer.textContent = `⏳ ${state.timeLeft}s`;
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    els.timer.textContent = `⏳ ${state.timeLeft}s`;
    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      lockQuestion();
      showFeedback(false, "Temps écoulé !");
      els.next.hidden = false;
      els.submit.disabled = true;
    }
  }, 1000);
};

const renderQuestion = () => {
  console.log("Rendering question, currentIndex:", state.currentIndex);
  const q = state.questions[state.currentIndex];
  console.log("Current question:", q);
  if (!q) {
    console.log("No question found");
    return;
  }

  els.counter.textContent = `Question ${state.currentIndex + 1}/${state.questions.length}`;
  els.question.textContent = q.question;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.submit.disabled = false;
  els.next.hidden = true;

  els.choices.innerHTML = q.choices
    .map((label, idx) => {
      const id = `choice-${idx}`;
      return `
        <label class="choice" for="${id}">
          <input type="radio" id="${id}" name="choice" value="${idx}">
          <span>${label}</span>
        </label>`;
    })
    .join("");

  startTimer();
};

const getSelectedIndex = () => {
  const input = document.querySelector("input[name=choice]:checked");
  if (!input) return null;
  return Number(input.value);
};

const lockQuestion = () => {
  document.querySelectorAll("input[name=choice]").forEach((el) => {
    el.disabled = true;
  });
};

const showFeedback = (isCorrect, message = "") => {
  els.feedback.textContent = message || (isCorrect ? "Bonne réponse !" : "Mauvaise réponse.");
  els.feedback.classList.toggle("ok", isCorrect);
  els.feedback.classList.toggle("ko", !isCorrect);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const q = state.questions[state.currentIndex];
  const selected = getSelectedIndex();
  if (selected === null) return;

  clearInterval(state.timerId);
  const isCorrect = selected === q.correctIndex;
  if (isCorrect) state.score += 1;
  els.score.textContent = `Score: ${state.score}`;
  lockQuestion();
  const correctLabel = q.choices[q.correctIndex];
  showFeedback(isCorrect, isCorrect ? "Bonne réponse !" : `Mauvaise réponse. Réponse correcte: ${correctLabel}`);

  els.submit.disabled = true;
  els.next.hidden = false;
};

const handleNext = () => {
  state.currentIndex += 1;
  if (state.currentIndex >= state.questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
};

const endQuiz = () => {
  clearInterval(state.timerId);
  els.quiz.hidden = true;
  els.result.hidden = false;
  els.finalScore.textContent = `Votre score final est ${state.score}/${state.questions.length}`;
};

const restartQuiz = () => {
  state.currentIndex = 0;
  state.score = 0;
  els.score.textContent = `Score: ${state.score}`;
  els.result.hidden = true;
  els.quiz.hidden = false;
  renderQuestion();
};

els.submit.addEventListener("click", handleSubmit);
els.next.addEventListener("click", (e) => { e.preventDefault(); handleNext(); });
els.restart.addEventListener("click", (e) => { e.preventDefault(); restartQuiz(); });

(async function init() {
  console.log("Initializing quiz app...");
  await fetchQuestions();
  if (state.questions.length === 0) {
    console.log("No questions available");
    els.question.textContent = "Aucune question disponible.";
    els.submit.disabled = true;
    return;
  }
  console.log("Starting quiz with", state.questions.length, "questions");
  els.score.textContent = `Score: ${state.score}`;
  renderQuestion();
})();
