class UserAuth {
    constructor() {
        this.initializeForms();
        this.setupFormValidation();
    }

    initializeForms() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    setupFormValidation() {
        const forms = [this.loginForm, this.registerForm].filter(Boolean);
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required]');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    this.validateForm(form, submitBtn);
                });
                
                input.addEventListener('blur', () => {
                    this.validateForm(form, submitBtn);
                });
            });
        });
    }

    validateForm(form, submitBtn) {
        if (!form || !submitBtn) return;
        
        const inputs = form.querySelectorAll('input[required]');
        const isValid = Array.from(inputs).every(input => input.value.trim() !== '');
        
        submitBtn.disabled = !isValid;
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(this.loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showMessage('Login successful!', 'success');
                this.loginForm.reset();
                this.validateForm(this.loginForm, this.loginForm.querySelector('button[type="submit"]'));
                
                setTimeout(() => {
                    window.location.href = '/register';
                }, 2000);
            } else {
                if (data.error === 'User not found') {
                    this.showMessage('User not found', 'error');
                } else {
                    this.showMessage(data.error || 'Login failed', 'error');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('An error occurred during login', 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(this.registerForm);
        const userData = {
            name: formData.get('name'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password')
        };
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showMessage('User registered successfully!', 'success');
                this.registerForm.reset();
                this.validateForm(this.registerForm, this.registerForm.querySelector('button[type="submit"]'));
                
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                if (data.error === 'Username or email already exists') {
                    this.showMessage('Username or email already exists', 'error');
                } else {
                    this.showMessage(data.error || 'Registration failed', 'error');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('An error occurred during registration', 'error');
        }
    }

    showMessage(message, type = 'info') {
        const messageEl = document.getElementById('message');
        if (!messageEl) return;
        
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        messageEl.classList.remove('hidden');
        
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UserAuth();
});
