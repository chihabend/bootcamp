class QuizGame {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadQuestions();
    }
    
    initializeElements() {
        this.startScreen = document.getElementById('start-screen');
        this.questionScreen = document.getElementById('question-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.questionNumber = document.getElementById('question-number');
        this.scoreElement = document.getElementById('score');
        this.resultMessage = document.getElementById('result-message');
        this.finalScore = document.getElementById('final-score');
        this.progressFill = document.querySelector('.progress-fill');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }
    
    async loadQuestions() {
        try {
            const response = await fetch('/api/quiz');
            this.questions = await response.json();
        } catch (error) {
            console.error('Failed to load questions:', error);
        }
    }
    
    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.showQuestion();
        this.startScreen.style.display = 'none';
        this.questionScreen.style.display = 'block';
        this.resultScreen.style.display = 'none';
    }
    
    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        this.questionNumber.textContent = `Question ${this.currentQuestionIndex + 1}`;
        this.scoreElement.textContent = `Score: ${this.score}`;
        
        this.updateProgress();
        this.renderOptions(question.options);
        
        this.nextBtn.style.display = 'none';
        this.selectedAnswer = null;
    }
    
    renderOptions(options) {
        this.optionsContainer.innerHTML = '';
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.option = option;
            
            optionElement.addEventListener('click', () => this.selectOption(optionElement, option));
            this.optionsContainer.appendChild(optionElement);
        });
    }
    
    selectOption(optionElement, option) {
        if (this.selectedAnswer) return;
        
        this.selectedAnswer = option;
        
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        optionElement.classList.add('selected');
        this.checkAnswer();
    }
    
    async checkAnswer() {
        const question = this.questions[this.currentQuestionIndex];
        
        try {
            const response = await fetch('/api/quiz/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: question.id,
                    answer: this.selectedAnswer
                })
            });
            
            const result = await response.json();
            
            if (result.isCorrect) {
                this.score++;
                this.scoreElement.textContent = `Score: ${this.score}`;
            }
            
            this.showAnswerFeedback(result.isCorrect);
        } catch (error) {
            console.error('Failed to check answer:', error);
        }
    }
    
    showAnswerFeedback(isCorrect) {
        const options = document.querySelectorAll('.option');
        
        options.forEach(option => {
            if (option.dataset.option === this.selectedAnswer) {
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });
        
        this.nextBtn.style.display = 'inline-block';
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }
    
    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        this.questionScreen.style.display = 'none';
        this.resultScreen.style.display = 'block';
        
        this.resultMessage.textContent = `Quiz Complete! 🎉`;
        this.finalScore.textContent = `Final Score: ${this.score}/${this.questions.length} (${percentage}%)`;
    }
    
    restartQuiz() {
        this.startQuiz();
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
