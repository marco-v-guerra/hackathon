// Student Portal Application
class StudentPortal {
    constructor() {
        this.studentData = null;
        this.currentTab = 'overview';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadStudentData();
    }

    initializeElements() {
        // Profile elements
        this.studentNameEl = document.getElementById('studentName');
        this.fullStudentNameEl = document.getElementById('fullStudentName');
        this.studentIdEl = document.getElementById('studentId');
        this.studentMajorEl = document.getElementById('studentMajor');
        this.studentYearEl = document.getElementById('studentYear');
        this.studentGPAEl = document.getElementById('studentGPA');
        this.studentCreditsEl = document.getElementById('studentCredits');
        this.studentStatusEl = document.getElementById('studentStatus');
        this.studentEmailEl = document.getElementById('studentEmail');
        this.studentPhoneEl = document.getElementById('studentPhone');
        this.studentAddressEl = document.getElementById('studentAddress');

        // Tab elements
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');

        // Content containers
        this.currentCoursesEl = document.getElementById('currentCourses');
        this.gradeHistoryEl = document.getElementById('gradeHistory');
        this.achievementsEl = document.getElementById('achievements');
        this.requirementsEl = document.getElementById('requirements');
        this.balanceSummaryEl = document.getElementById('balanceSummary');
        this.transactionsEl = document.getElementById('transactions');
        this.financialAidEl = document.getElementById('financialAid');
        this.paymentScheduleEl = document.getElementById('paymentSchedule');
        this.weeklyScheduleEl = document.getElementById('weeklySchedule');
    }

    attachEventListeners() {
        // Tab navigation
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Logout button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Notification icon
        const notificationIcon = document.querySelector('.notification-icon');
        if (notificationIcon) {
            notificationIcon.addEventListener('click', () => {
                this.showNotifications();
            });
        }
    }

    async loadStudentData() {
        try {
            // Try to load from JSON file first
            const response = await fetch('students.json');
            if (response.ok) {
                const data = await response.json();
                // For portal, we'll use the first student or a specific one
                this.studentData = data.find(student => student.id === 'STU001') || data[0];
            } else {
                // If no JSON file, use default data
                this.studentData = this.getDefaultStudentData();
            }
        } catch (error) {
            console.log('Using default student data');
            this.studentData = this.getDefaultStudentData();
        }
        
        this.populateStudentInfo();
        this.loadTabContent();
    }

    getDefaultStudentData() {
        return {
            id: 'STU001',
            name: 'Alice Smith',
            email: 'alice.smith@university.edu',
            phone: '(555) 123-4567',
            address: '123 Campus Dr, Room 204',
            major: 'Computer Science',
            year: 3,
            gpa: 3.8,
            credits: 95,
            status: 'Active',
            currentCourses: [
                {
                    code: 'CS 301',
                    name: 'Data Structures & Algorithms',
                    instructor: 'Dr. Johnson',
                    credits: 3,
                    grade: 'A',
                    schedule: 'MWF 10:00-11:00'
                },
                {
                    code: 'CS 350',
                    name: 'Software Engineering',
                    instructor: 'Prof. Davis',
                    credits: 3,
                    grade: 'A-',
                    schedule: 'TTh 2:00-3:30'
                },
                {
                    code: 'MATH 220',
                    name: 'Linear Algebra',
                    instructor: 'Dr. Wilson',
                    credits: 4,
                    grade: 'B+',
                    schedule: 'MWF 1:00-2:00'
                },
                {
                    code: 'ENG 102',
                    name: 'Technical Writing',
                    instructor: 'Prof. Brown',
                    credits: 3,
                    grade: 'A',
                    schedule: 'TTh 11:00-12:30'
                }
            ],
            gradeHistory: [
                { semester: 'Fall 2025', year: '2025', gpa: 3.9, credits: 15 },
                { semester: 'Spring 2025', year: '2025', gpa: 3.7, credits: 16 },
                { semester: 'Fall 2024', year: '2024', gpa: 3.8, credits: 15 },
                { semester: 'Spring 2024', year: '2024', gpa: 3.6, credits: 14 }
            ],
            achievements: [
                {
                    title: 'Dean\'s List',
                    description: 'Fall 2025 - GPA above 3.5',
                    icon: 'fas fa-medal'
                },
                {
                    title: 'Programming Competition',
                    description: '2nd Place - Regional ACM Contest',
                    icon: 'fas fa-trophy'
                },
                {
                    title: 'Research Assistant',
                    description: 'AI Lab - Machine Learning Project',
                    icon: 'fas fa-flask'
                }
            ],
            requirements: [
                { name: 'Core CS Courses', status: 'complete', progress: '24/24' },
                { name: 'Mathematics', status: 'progress', progress: '18/20' },
                { name: 'General Education', status: 'complete', progress: '30/30' },
                { name: 'Electives', status: 'progress', progress: '12/18' },
                { name: 'Capstone Project', status: 'pending', progress: '0/3' }
            ],
            financial: {
                balance: {
                    tuition: -8500.00,
                    fees: -1200.00,
                    housing: -4500.00,
                    meal_plan: -2800.00,
                    payments: 12000.00,
                    total: -5000.00
                },
                transactions: [
                    {
                        date: '2025-11-01',
                        description: 'Tuition Payment',
                        amount: 4000.00,
                        type: 'payment'
                    },
                    {
                        date: '2025-10-15',
                        description: 'Housing Fee',
                        amount: -2250.00,
                        type: 'charge'
                    },
                    {
                        date: '2025-10-01',
                        description: 'Scholarship Credit',
                        amount: 2500.00,
                        type: 'credit'
                    },
                    {
                        date: '2025-09-15',
                        description: 'Meal Plan',
                        amount: -1400.00,
                        type: 'charge'
                    }
                ],
                financialAid: [
                    {
                        name: 'Merit Scholarship',
                        amount: 5000.00,
                        status: 'Active',
                        description: 'Academic Excellence Award'
                    },
                    {
                        name: 'Federal Pell Grant',
                        amount: 3000.00,
                        status: 'Active',
                        description: 'Need-based federal aid'
                    },
                    {
                        name: 'Work Study',
                        amount: 1500.00,
                        status: 'Active',
                        description: 'Campus employment program'
                    }
                ],
                paymentSchedule: [
                    {
                        date: '2025-12-15',
                        description: 'Spring 2026 Tuition',
                        amount: 4250.00
                    },
                    {
                        date: '2025-12-20',
                        description: 'Spring Housing',
                        amount: 2250.00
                    },
                    {
                        date: '2026-01-15',
                        description: 'Spring Meal Plan',
                        amount: 1400.00
                    }
                ]
            },
            schedule: {
                'Monday': [
                    { time: '10:00', class: 'CS 301', room: 'SCI 204' },
                    { time: '13:00', class: 'MATH 220', room: 'MATH 101' }
                ],
                'Tuesday': [
                    { time: '11:00', class: 'ENG 102', room: 'ENG 205' },
                    { time: '14:00', class: 'CS 350', room: 'SCI 301' }
                ],
                'Wednesday': [
                    { time: '10:00', class: 'CS 301', room: 'SCI 204' },
                    { time: '13:00', class: 'MATH 220', room: 'MATH 101' }
                ],
                'Thursday': [
                    { time: '11:00', class: 'ENG 102', room: 'ENG 205' },
                    { time: '14:00', class: 'CS 350', room: 'SCI 301' }
                ],
                'Friday': [
                    { time: '10:00', class: 'CS 301', room: 'SCI 204' },
                    { time: '13:00', class: 'MATH 220', room: 'MATH 101' }
                ]
            }
        };
    }

    populateStudentInfo() {
        const data = this.studentData;
        const yearNames = ['', 'Freshman', 'Sophomore', 'Junior', 'Senior'];
        
        // Update profile information
        if (this.studentNameEl) this.studentNameEl.textContent = data.name.split(' ')[0];
        if (this.fullStudentNameEl) this.fullStudentNameEl.textContent = data.name;
        if (this.studentIdEl) this.studentIdEl.textContent = data.id;
        if (this.studentMajorEl) this.studentMajorEl.textContent = data.major;
        if (this.studentYearEl) this.studentYearEl.textContent = yearNames[data.year];
        if (this.studentGPAEl) this.studentGPAEl.textContent = data.gpa.toFixed(1);
        if (this.studentCreditsEl) this.studentCreditsEl.textContent = data.credits;
        if (this.studentStatusEl) this.studentStatusEl.textContent = data.status;
        if (this.studentEmailEl) this.studentEmailEl.textContent = data.email;
        if (this.studentPhoneEl) this.studentPhoneEl.textContent = data.phone;
        if (this.studentAddressEl) this.studentAddressEl.textContent = data.address;
    }

    loadTabContent() {
        this.loadCurrentCourses();
        this.loadGradeHistory();
        this.loadAchievements();
        this.loadRequirements();
        this.loadFinancialInfo();
        this.loadSchedule();
    }

    switchTab(tabId) {
        // Update button states
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update tab panes
        this.tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabId);
        });

        this.currentTab = tabId;
    }

    loadCurrentCourses() {
        if (!this.currentCoursesEl || !this.studentData.currentCourses) return;

        const coursesHTML = this.studentData.currentCourses.map(course => `
            <div class="course-item">
                <div class="course-info">
                    <div class="course-name">${course.code} - ${course.name}</div>
                    <div class="course-details">
                        ${course.instructor} • ${course.credits} credits • ${course.schedule}
                    </div>
                </div>
                <div class="course-grade">${course.grade}</div>
            </div>
        `).join('');

        this.currentCoursesEl.innerHTML = coursesHTML;
    }

    loadGradeHistory() {
        if (!this.gradeHistoryEl || !this.studentData.gradeHistory) return;

        const historyHTML = this.studentData.gradeHistory.map(semester => `
            <div class="grade-item">
                <div class="semester-info">
                    <span class="semester-name">${semester.semester}</span>
                    <span class="semester-year">${semester.year}</span>
                </div>
                <div class="gpa-value">${semester.gpa.toFixed(1)}</div>
            </div>
        `).join('');

        this.gradeHistoryEl.innerHTML = historyHTML;
    }

    loadAchievements() {
        if (!this.achievementsEl || !this.studentData.achievements) return;

        const achievementsHTML = this.studentData.achievements.map(achievement => `
            <div class="achievement-item">
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-details">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `).join('');

        this.achievementsEl.innerHTML = achievementsHTML;
    }

    loadRequirements() {
        if (!this.requirementsEl || !this.studentData.requirements) return;

        const requirementsHTML = this.studentData.requirements.map(req => {
            const statusClass = `status-${req.status}`;
            const icon = req.status === 'complete' ? 'fas fa-check-circle' : 
                        req.status === 'progress' ? 'fas fa-clock' : 'fas fa-circle';
            
            return `
                <div class="requirement-item">
                    <div class="requirement-name">${req.name}</div>
                    <div class="requirement-status ${statusClass}">
                        <i class="${icon}"></i>
                        <span>${req.progress}</span>
                    </div>
                </div>
            `;
        }).join('');

        this.requirementsEl.innerHTML = requirementsHTML;
    }

    loadFinancialInfo() {
        this.loadBalanceSummary();
        this.loadTransactions();
        this.loadFinancialAid();
        this.loadPaymentSchedule();
    }

    loadBalanceSummary() {
        if (!this.balanceSummaryEl || !this.studentData.financial) return;

        const balance = this.studentData.financial.balance;
        const balanceHTML = `
            <div class="balance-item">
                <span class="balance-label">Tuition & Fees</span>
                <span class="balance-amount balance-negative">$${Math.abs(balance.tuition + balance.fees).toLocaleString()}</span>
            </div>
            <div class="balance-item">
                <span class="balance-label">Housing & Meal Plan</span>
                <span class="balance-amount balance-negative">$${Math.abs(balance.housing + balance.meal_plan).toLocaleString()}</span>
            </div>
            <div class="balance-item">
                <span class="balance-label">Payments Made</span>
                <span class="balance-amount balance-positive">$${balance.payments.toLocaleString()}</span>
            </div>
            <div class="balance-item">
                <span class="balance-label">Current Balance</span>
                <span class="balance-amount ${balance.total < 0 ? 'balance-negative' : 'balance-positive'}">
                    $${Math.abs(balance.total).toLocaleString()}
                </span>
            </div>
        `;

        this.balanceSummaryEl.innerHTML = balanceHTML;
    }

    loadTransactions() {
        if (!this.transactionsEl || !this.studentData.financial.transactions) return;

        const transactionsHTML = this.studentData.financial.transactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-description">${transaction.description}</div>
                    <div class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</div>
                </div>
                <div class="transaction-amount ${transaction.amount < 0 ? 'amount-negative' : 'amount-positive'}">
                    ${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toLocaleString()}
                </div>
            </div>
        `).join('');

        this.transactionsEl.innerHTML = transactionsHTML;
    }

    loadFinancialAid() {
        if (!this.financialAidEl || !this.studentData.financial.financialAid) return;

        const aidHTML = this.studentData.financial.financialAid.map(aid => `
            <div class="aid-item">
                <div class="aid-info">
                    <h4>${aid.name}</h4>
                    <p>${aid.description}</p>
                </div>
                <div class="aid-amount">$${aid.amount.toLocaleString()}</div>
            </div>
        `).join('');

        this.financialAidEl.innerHTML = aidHTML;
    }

    loadPaymentSchedule() {
        if (!this.paymentScheduleEl || !this.studentData.financial.paymentSchedule) return;

        const scheduleHTML = this.studentData.financial.paymentSchedule.map(payment => `
            <div class="payment-item">
                <div class="payment-date">${new Date(payment.date).toLocaleDateString()}</div>
                <div class="payment-description">${payment.description}</div>
                <div class="payment-amount">$${payment.amount.toLocaleString()}</div>
            </div>
        `).join('');

        this.paymentScheduleEl.innerHTML = scheduleHTML;
    }

    loadSchedule() {
        if (!this.weeklyScheduleEl || !this.studentData.schedule) return;

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

        let scheduleHTML = `
            <div class="schedule-header">Time</div>
            ${days.map(day => `<div class="schedule-header">${day}</div>`).join('')}
        `;

        times.forEach(time => {
            scheduleHTML += `<div class="schedule-time">${time}:00</div>`;
            days.forEach(day => {
                const daySchedule = this.studentData.schedule[day] || [];
                const classAtTime = daySchedule.find(item => item.time === time);
                
                if (classAtTime) {
                    scheduleHTML += `
                        <div class="schedule-cell">
                            <div class="schedule-class">
                                <div class="class-name">${classAtTime.class}</div>
                                <div class="class-room">${classAtTime.room}</div>
                            </div>
                        </div>
                    `;
                } else {
                    scheduleHTML += `<div class="schedule-cell"></div>`;
                }
            });
        });

        this.weeklyScheduleEl.innerHTML = scheduleHTML;
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            // In a real application, this would clear session data and redirect
            alert('Logging out... (In a real app, this would redirect to login page)');
        }
    }

    showNotifications() {
        // In a real application, this would show a notifications panel
        alert('Notifications:\n• Registration deadline approaching\n• New scholarship opportunity available\n• Grade posted for CS 301');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StudentPortal();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StudentPortal;
}