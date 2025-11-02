// Login Page JavaScript
class LoginManager {
    constructor() {
        this.accounts = {
            'priya.kumar@okstate.edu': {
                password: 'password123',
                studentId: 'OSU003'
            }
        };
        
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.loginForm = document.getElementById('loginForm');
        this.studentIdInput = document.getElementById('studentId');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.demoAccountCards = document.querySelectorAll('.demo-account-card');
    }

    attachEventListeners() {
        // Form submission
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Password toggle
        this.passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // Demo account buttons
        this.demoAccountCards.forEach(card => {
            const loginBtn = card.querySelector('.demo-login-btn');
            loginBtn.addEventListener('click', () => {
                const studentId = card.dataset.studentId;
                this.loginWithDemo(studentId);
            });
        });

        // Input field animations
        [this.studentIdInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.parentElement.classList.remove('focused');
                }
            });
        });
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';
        
        const icon = this.passwordToggle.querySelector('i');
        icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    }

    async handleLogin() {
        const email = this.studentIdInput.value.trim().toLowerCase();
        const password = this.passwordInput.value;

        // Basic validation
        if (!email || !password) {
            this.showError('Please enter both email and password');
            return;
        }

        // Check credentials
        if (!this.accounts[email]) {
            this.showError('Invalid email address');
            return;
        }

        if (this.accounts[email].password !== password) {
            this.showError('Invalid password');
            return;
        }

        // Show loading
        this.showLoading();

        // Simulate network delay
        await this.delay(1500);

        // Store login info and redirect (using the correct localStorage key)
        const studentId = this.accounts[email].studentId;
        localStorage.setItem('loggedInStudentId', studentId);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirect to main portal
        window.location.href = 'index.html';
    }

    async loginWithDemo(studentId) {
        // Find the email for this student ID
        const email = Object.keys(this.accounts).find(key => 
            this.accounts[key].studentId === studentId
        );
        
        if (!email) {
            this.showError('Demo account not found');
            return;
        }
        
        // Fill form with demo credentials
        this.studentIdInput.value = email;
        this.passwordInput.value = this.accounts[email].password;
        
        // Animate form fields
        this.studentIdInput.parentElement.classList.add('focused');
        this.passwordInput.parentElement.classList.add('focused');
        
        // Show loading
        this.showLoading();
        
        // Simulate network delay
        await this.delay(1000);
        
        // Store login info and redirect (using the correct localStorage key)
        localStorage.setItem('loggedInStudentId', studentId);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirect to main portal
        window.location.href = 'index.html';
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    showError(message) {
        // Remove any existing error
        const existingError = document.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }

        // Create error element
        const errorEl = document.createElement('div');
        errorEl.className = 'login-error';
        errorEl.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;

        // Insert after form
        this.loginForm.insertAdjacentElement('afterend', errorEl);

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.remove();
            }
        }, 5000);

        // Shake animation
        this.loginForm.classList.add('shake');
        setTimeout(() => {
            this.loginForm.classList.remove('shake');
        }, 500);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize login page
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in (using the correct localStorage key)
    const loggedInStudentId = localStorage.getItem('loggedInStudentId');
    const loginTime = localStorage.getItem('loginTime');
    
    if (loggedInStudentId && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
        
        // If logged in within last 8 hours, redirect to portal
        if (hoursDiff < 8) {
            window.location.href = 'index.html';
            return;
        } else {
            // Clear expired session
            localStorage.removeItem('loggedInStudentId');
            localStorage.removeItem('loginTime');
        }
    }
    
    new LoginManager();
});

// Add some login-specific styles
const loginStyles = `
.login-body {
    background: linear-gradient(135deg, #e55a00 0%, #b8470d 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.login-container {
    display: flex;
    max-width: 1200px;
    width: 100%;
    min-height: 600px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
}

.login-card {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.osu-logo {
    background: linear-gradient(135deg, #e55a00, #b8470d);
    color: white;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 1rem;
}

.login-header h1 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

.login-header p {
    color: #666;
    font-size: 1.1rem;
}

.login-form {
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.input-group {
    position: relative;
    display: flex;
    align-items: center;
}

.input-group i {
    position: absolute;
    left: 1rem;
    color: #999;
    z-index: 2;
}

.input-group input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.input-group input:focus {
    outline: none;
    border-color: #e55a00;
    box-shadow: 0 0 0 3px rgba(229, 90, 0, 0.1);
}

.input-group.focused i {
    color: #e55a00;
}

.password-toggle {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 5px;
    transition: color 0.3s ease;
}

.password-toggle:hover {
    color: #e55a00;
}

.login-btn {
    width: 100%;
    background: linear-gradient(135deg, #e55a00, #b8470d);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(229, 90, 0, 0.3);
}

.login-divider {
    text-align: center;
    margin: 1.5rem 0;
    position: relative;
}

.login-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e9ecef;
}

.login-divider span {
    background: white;
    padding: 0 1rem;
    color: #666;
    font-size: 0.9rem;
}

.demo-accounts h3 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.demo-accounts p {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.demo-account-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.demo-account-card:hover {
    border-color: #e55a00;
    box-shadow: 0 2px 8px rgba(229, 90, 0, 0.1);
}

.demo-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.demo-avatar {
    background: #f8f9fa;
    color: #e55a00;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.demo-details h4 {
    color: #333;
    margin-bottom: 0.25rem;
    font-size: 1rem;
}

.demo-details p {
    color: #666;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
}

.demo-id {
    color: #999;
    font-size: 0.8rem;
}

.demo-login-btn {
    background: #e55a00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.demo-login-btn:hover {
    background: #cc5200;
    transform: translateY(-1px);
}

.login-footer {
    margin-top: auto;
}

.help-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
}

.help-link {
    color: #e55a00;
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
}

.help-link:hover {
    color: #cc5200;
}

.login-info {
    text-align: center;
}

.login-info p {
    color: #999;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.login-background {
    flex: 1;
    background: linear-gradient(135deg, #333 0%, #555 100%);
    color: white;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.campus-info {
    text-align: center;
    max-width: 400px;
}

.campus-info h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.campus-info p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
}

.feature i {
    color: #e55a00;
    font-size: 1.2rem;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.loading-overlay.active {
    opacity: 1;
    visibility: visible;
}

.loading-spinner {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    color: #333;
}

.loading-spinner i {
    font-size: 2rem;
    color: #e55a00;
    margin-bottom: 1rem;
}

.login-error {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    color: #c53030;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideInDown 0.3s ease;
}

.login-form.shake {
    animation: shake 0.5s ease-in-out;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@media (max-width: 768px) {
    .login-container {
        flex-direction: column;
        max-width: 500px;
    }
    
    .login-background {
        order: -1;
        min-height: 200px;
    }
    
    .campus-info h2 {
        font-size: 2rem;
    }
    
    .features {
        grid-template-columns: 1fr;
    }
    
    .help-links {
        flex-direction: column;
        gap: 1rem;
    }
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = loginStyles;
document.head.appendChild(styleSheet);