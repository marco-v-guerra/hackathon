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
        // Check if user is logged in
        const loggedInStudentId = localStorage.getItem('loggedInStudentId');
        if (!loggedInStudentId) {
            // Redirect to login page if not logged in
            window.location.href = 'login.html';
            return;
        }

        // Use embedded student data to avoid CORS issues
        const studentsData = this.getStudentsData();
        this.studentData = studentsData.find(student => student.id === loggedInStudentId);
        
        if (!this.studentData) {
            console.error('Student not found:', loggedInStudentId);
            // Clear invalid session and redirect to login
            localStorage.removeItem('loggedInStudentId');
            window.location.href = 'login.html';
            return;
        }
        
        this.populateStudentInfo();
        this.loadTabContent();
    }

    getStudentsData() {
        return [
            {
                "id": "OSU001",
                "name": "Alice Smith",
                "email": "alice.smith@okstate.edu",
                "phone": "(405) 744-5000",
                "address": "Kerr-Drummond Hall, Room 304",
                "major": "Computer Science",
                "year": 3,
                "grade": "A",
                "gpa": 3.8,
                "credits": 98,
                "status": "Active",
                "currentCourses": [
                    {
                        "code": "CS 3443",
                        "name": "Computer Systems",
                        "instructor": "Dr. Johnson",
                        "credits": 3,
                        "grade": "A",
                        "schedule": "MWF 10:00-10:50"
                    },
                    {
                        "code": "CS 3823",
                        "name": "Database Systems",
                        "instructor": "Prof. Williams",
                        "credits": 3,
                        "grade": "A-",
                        "schedule": "TTh 11:00-12:15"
                    },
                    {
                        "code": "MATH 3113",
                        "name": "Linear Algebra",
                        "instructor": "Dr. Smith",
                        "credits": 3,
                        "grade": "B+",
                        "schedule": "MWF 1:00-1:50"
                    },
                    {
                        "code": "CS 4273",
                        "name": "Software Engineering",
                        "instructor": "Prof. Brown",
                        "credits": 3,
                        "grade": "A",
                        "schedule": "TTh 2:00-3:15"
                    },
                    {
                        "code": "CS 3653",
                        "name": "Computer Networks",
                        "instructor": "Dr. Davis",
                        "credits": 3,
                        "grade": "A-",
                        "schedule": "MW 3:00-4:15"
                    }
                ],
                "gradeHistory": [
                    { "semester": "Fall 2025", "year": "2025", "gpa": 3.9, "credits": 15 },
                    { "semester": "Spring 2025", "year": "2025", "gpa": 3.7, "credits": 17 },
                    { "semester": "Fall 2024", "year": "2024", "gpa": 3.8, "credits": 16 },
                    { "semester": "Spring 2024", "year": "2024", "gpa": 3.6, "credits": 18 }
                ],
                "achievements": [
                    {
                        "title": "Dean's List",
                        "description": "Fall 2025 - Outstanding Academic Performance",
                        "icon": "fas fa-trophy"
                    },
                    {
                        "title": "CS Department Scholarship",
                        "description": "Merit-based scholarship recipient",
                        "icon": "fas fa-graduation-cap"
                    },
                    {
                        "title": "Hackathon Winner",
                        "description": "First place in OSU Code Challenge 2025",
                        "icon": "fas fa-code"
                    }
                ],
                "requirements": [
                    { "name": "CS Core Requirements", "status": "progress", "progress": "32/40" },
                    { "name": "Mathematics Requirements", "status": "complete", "progress": "18/18" },
                    { "name": "OSU General Education", "status": "complete", "progress": "40/40" },
                    { "name": "CS Electives", "status": "progress", "progress": "8/15" },
                    { "name": "Senior Capstone", "status": "pending", "progress": "0/6" }
                ],
                "financial": {
                    "balance": {
                        "tuition": -8500.00,
                        "fees": -1200.00,
                        "housing": -4800.00,
                        "meal_plan": -2800.00,
                        "payments": 14500.00,
                        "total": -2800.00
                    },
                    "transactions": [
                        {
                            "date": "2025-11-01",
                            "description": "Tuition Payment",
                            "amount": 4250.00,
                            "type": "payment"
                        },
                        {
                            "date": "2025-10-25",
                            "description": "Lab Fee - Computer Systems",
                            "amount": -75.00,
                            "type": "charge"
                        },
                        {
                            "date": "2025-10-15",
                            "description": "Housing Payment",
                            "amount": 2400.00,
                            "type": "payment"
                        },
                        {
                            "date": "2025-10-01",
                            "description": "Meal Plan",
                            "amount": -1400.00,
                            "type": "charge"
                        }
                    ],
                    "financialAid": [
                        {
                            "name": "Academic Excellence Scholarship",
                            "amount": 6500.00,
                            "status": "Active",
                            "description": "Merit-based scholarship for high GPA"
                        },
                        {
                            "name": "Oklahoma Promise",
                            "amount": 3200.00,
                            "status": "Active",
                            "description": "State tuition assistance program"
                        },
                        {
                            "name": "CS Department Grant",
                            "amount": 2800.00,
                            "status": "Active",
                            "description": "Departmental need-based aid"
                        },
                        {
                            "name": "Work Study - IT Support",
                            "amount": 2000.00,
                            "status": "Active",
                            "description": "Campus technology services"
                        }
                    ],
                    "paymentSchedule": [
                        {
                            "date": "2025-12-15",
                            "description": "Spring 2026 Tuition",
                            "amount": 4250.00
                        },
                        {
                            "date": "2025-12-20",
                            "description": "Spring Housing",
                            "amount": 2400.00
                        },
                        {
                            "date": "2026-01-15",
                            "description": "Spring Meal Plan",
                            "amount": 1400.00
                        }
                    ]
                },
                "schedule": {
                    "Monday": [
                        { "time": "10:00", "class": "CS 3443", "room": "MSCS 205" },
                        { "time": "13:00", "class": "MATH 3113", "room": "MSCS 310" },
                        { "time": "15:00", "class": "CS 3653", "room": "MSCS 203" }
                    ],
                    "Tuesday": [
                        { "time": "11:00", "class": "CS 3823", "room": "MSCS 109" },
                        { "time": "14:00", "class": "CS 4273", "room": "MSCS 207" }
                    ],
                    "Wednesday": [
                        { "time": "10:00", "class": "CS 3443", "room": "MSCS 205" },
                        { "time": "13:00", "class": "MATH 3113", "room": "MSCS 310" },
                        { "time": "15:00", "class": "CS 3653", "room": "MSCS 203" }
                    ],
                    "Thursday": [
                        { "time": "11:00", "class": "CS 3823", "room": "MSCS 109" },
                        { "time": "14:00", "class": "CS 4273", "room": "MSCS 207" }
                    ],
                    "Friday": [
                        { "time": "10:00", "class": "CS 3443", "room": "MSCS 205" },
                        { "time": "13:00", "class": "MATH 3113", "room": "MSCS 310" }
                    ]
                }
            },
            {
                "id": "OSU002",
                "name": "Marcus Johnson",
                "email": "marcus.johnson@okstate.edu",
                "phone": "(405) 744-6000",
                "address": "Bennett Hall, Room 512",
                "major": "Pre-Medicine",
                "year": 2,
                "grade": "A-",
                "gpa": 3.7,
                "credits": 62,
                "status": "Active",
                "currentCourses": [
                    {
                        "code": "CHEM 3053",
                        "name": "Organic Chemistry I",
                        "instructor": "Dr. Peterson",
                        "credits": 3,
                        "grade": "A-",
                        "schedule": "MWF 9:00-9:50"
                    },
                    {
                        "code": "BIOL 3204",
                        "name": "Human Anatomy",
                        "instructor": "Dr. Williams",
                        "credits": 4,
                        "grade": "A",
                        "schedule": "TTh 10:30-11:45"
                    },
                    {
                        "code": "PHYS 2014",
                        "name": "University Physics I",
                        "instructor": "Dr. Thompson",
                        "credits": 4,
                        "grade": "B+",
                        "schedule": "MWF 11:00-11:50"
                    },
                    {
                        "code": "PSYC 1113",
                        "name": "Introduction to Psychology",
                        "instructor": "Prof. Davis",
                        "credits": 3,
                        "grade": "A",
                        "schedule": "TTh 1:00-2:15"
                    },
                    {
                        "code": "STAT 2013",
                        "name": "Elementary Statistics",
                        "instructor": "Dr. Rodriguez",
                        "credits": 3,
                        "grade": "B+",
                        "schedule": "MW 2:00-3:15"
                    }
                ],
                "gradeHistory": [
                    { "semester": "Fall 2025", "year": "2025", "gpa": 3.8, "credits": 17 },
                    { "semester": "Spring 2025", "year": "2025", "gpa": 3.6, "credits": 15 },
                    { "semester": "Fall 2024", "year": "2024", "gpa": 3.7, "credits": 16 },
                    { "semester": "Spring 2024", "year": "2024", "gpa": 3.5, "credits": 14 }
                ],
                "achievements": [
                    {
                        "title": "Pre-Health Excellence Award",
                        "description": "Outstanding performance in pre-medical coursework",
                        "icon": "fas fa-medal"
                    },
                    {
                        "title": "Volunteer of the Month",
                        "description": "OSU Medical Center - 50+ volunteer hours",
                        "icon": "fas fa-heart"
                    },
                    {
                        "title": "Chemistry Tutor",
                        "description": "Peer tutoring program - General Chemistry",
                        "icon": "fas fa-flask"
                    }
                ],
                "requirements": [
                    { "name": "Pre-Med Core Requirements", "status": "progress", "progress": "28/36" },
                    { "name": "MCAT Prerequisites", "status": "progress", "progress": "18/24" },
                    { "name": "OSU General Education", "status": "complete", "progress": "40/40" },
                    { "name": "Science Electives", "status": "progress", "progress": "8/12" },
                    { "name": "Clinical Experience", "status": "progress", "progress": "75/150" }
                ],
                "financial": {
                    "balance": {
                        "tuition": -9200.00,
                        "fees": -1400.00,
                        "housing": -5000.00,
                        "meal_plan": -3200.00,
                        "payments": 15000.00,
                        "total": -3800.00
                    },
                    "transactions": [
                        {
                            "date": "2025-11-01",
                            "description": "Scholarship Payment",
                            "amount": 3500.00,
                            "type": "credit"
                        },
                        {
                            "date": "2025-10-20",
                            "description": "Lab Fee - Chemistry",
                            "amount": -150.00,
                            "type": "charge"
                        },
                        {
                            "date": "2025-10-01",
                            "description": "Housing Payment",
                            "amount": 2500.00,
                            "type": "payment"
                        },
                        {
                            "date": "2025-09-15",
                            "description": "Meal Plan",
                            "amount": -1600.00,
                            "type": "charge"
                        }
                    ],
                    "financialAid": [
                        {
                            "name": "Pre-Health Scholarship",
                            "amount": 5500.00,
                            "status": "Active",
                            "description": "Merit scholarship for pre-medical students"
                        },
                        {
                            "name": "Oklahoma Resident Grant",
                            "amount": 2800.00,
                            "status": "Active",
                            "description": "State grant for Oklahoma residents"
                        },
                        {
                            "name": "Federal Pell Grant",
                            "amount": 3800.00,
                            "status": "Active",
                            "description": "Need-based federal aid"
                        },
                        {
                            "name": "Work Study - Lab Assistant",
                            "amount": 2200.00,
                            "status": "Active",
                            "description": "Chemistry department lab assistant"
                        }
                    ],
                    "paymentSchedule": [
                        {
                            "date": "2025-12-15",
                            "description": "Spring 2026 Tuition",
                            "amount": 4600.00
                        },
                        {
                            "date": "2025-12-20",
                            "description": "Spring Housing",
                            "amount": 2500.00
                        },
                        {
                            "date": "2026-01-15",
                            "description": "Spring Meal Plan",
                            "amount": 1600.00
                        }
                    ]
                },
                "schedule": {
                    "Monday": [
                        { "time": "09:00", "class": "CHEM 3053", "room": "CHEM 179" },
                        { "time": "11:00", "class": "PHYS 2014", "room": "PHYS 106" },
                        { "time": "14:00", "class": "STAT 2013", "room": "MSCS 203" }
                    ],
                    "Tuesday": [
                        { "time": "10:30", "class": "BIOL 3204", "room": "LSE 104" },
                        { "time": "13:00", "class": "PSYC 1113", "room": "PSYC 108" }
                    ],
                    "Wednesday": [
                        { "time": "09:00", "class": "CHEM 3053", "room": "CHEM 179" },
                        { "time": "11:00", "class": "PHYS 2014", "room": "PHYS 106" },
                        { "time": "14:00", "class": "STAT 2013", "room": "MSCS 203" }
                    ],
                    "Thursday": [
                        { "time": "10:30", "class": "BIOL 3204", "room": "LSE 104" },
                        { "time": "13:00", "class": "PSYC 1113", "room": "PSYC 108" }
                    ],
                    "Friday": [
                        { "time": "09:00", "class": "CHEM 3053", "room": "CHEM 179" },
                        { "time": "11:00", "class": "PHYS 2014", "room": "PHYS 106" }
                    ]
                }
            }
        ];
    }

    getDefaultStudentData() {
        return {
            id: 'OSU001',
            name: 'Alice Smith',
            email: 'alice.smith@okstate.edu',
            phone: '(405) 744-5000',
            address: 'Kerr-Drummond Hall, Room 304',
            major: 'Computer Science',
            year: 3,
            gpa: 3.8,
            credits: 95,
            status: 'Active',
            currentCourses: [
                {
                    code: 'CS 3443',
                    name: 'Computer Systems',
                    instructor: 'Dr. Easttom',
                    credits: 3,
                    grade: 'A',
                    schedule: 'MWF 10:00-10:50'
                },
                {
                    code: 'CS 3823',
                    name: 'Database Systems',
                    instructor: 'Dr. Zheng',
                    credits: 3,
                    grade: 'A-',
                    schedule: 'TTh 2:00-3:15'
                },
                {
                    code: 'MATH 3113',
                    name: 'Introduction to Linear Algebra',
                    instructor: 'Dr. Kettering',
                    credits: 3,
                    grade: 'B+',
                    schedule: 'MWF 1:00-1:50'
                },
                {
                    code: 'ENGL 3323',
                    name: 'Technical Writing',
                    instructor: 'Prof. Martinez',
                    credits: 3,
                    grade: 'A',
                    schedule: 'TTh 11:00-12:15'
                },
                {
                    code: 'CS 4413',
                    name: 'Web Technologies',
                    instructor: 'Dr. Liu',
                    credits: 3,
                    grade: 'A',
                    schedule: 'MW 3:00-4:15'
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
                    description: 'Fall 2025 - College of Engineering, Architecture and Technology',
                    icon: 'fas fa-medal'
                },
                {
                    title: 'ACM Programming Contest',
                    description: '2nd Place - South Central USA Regional',
                    icon: 'fas fa-trophy'
                },
                {
                    title: 'Undergraduate Research',
                    description: 'OSU AI Lab - Machine Learning with Dr. Liu',
                    icon: 'fas fa-flask'
                },
                {
                    title: 'Cowboys Coder',
                    description: 'OSU Computer Science Honor Society Member',
                    icon: 'fas fa-star'
                }
            ],
            requirements: [
                { name: 'CS Core Requirements', status: 'progress', progress: '36/42' },
                { name: 'Mathematics/Science', status: 'progress', progress: '18/21' },
                { name: 'OSU General Education', status: 'complete', progress: '40/40' },
                { name: 'CS Electives', status: 'progress', progress: '9/15' },
                { name: 'Senior Design Project', status: 'pending', progress: '0/6' }
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
                        name: 'OSU Academic Excellence Scholarship',
                        amount: 4500.00,
                        status: 'Active',
                        description: 'Merit-based scholarship for high-achieving students'
                    },
                    {
                        name: 'Engineering Scholarship',
                        amount: 2000.00,
                        status: 'Active',
                        description: 'College of Engineering, Architecture and Technology'
                    },
                    {
                        name: 'Federal Pell Grant',
                        amount: 3100.00,
                        status: 'Active',
                        description: 'Need-based federal aid'
                    },
                    {
                        name: 'OSU Work Study',
                        amount: 1800.00,
                        status: 'Active',
                        description: 'Campus employment - IT Help Desk'
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
                    { time: '10:00', class: 'CS 3443', room: 'MSCS 501' },
                    { time: '13:00', class: 'MATH 3113', room: 'MSCS 203' },
                    { time: '15:00', class: 'CS 4413', room: 'MSCS 442' }
                ],
                'Tuesday': [
                    { time: '11:00', class: 'ENGL 3323', room: 'MORR 204' },
                    { time: '14:00', class: 'CS 3823', room: 'MSCS 501' }
                ],
                'Wednesday': [
                    { time: '10:00', class: 'CS 3443', room: 'MSCS 501' },
                    { time: '13:00', class: 'MATH 3113', room: 'MSCS 203' },
                    { time: '15:00', class: 'CS 4413', room: 'MSCS 442' }
                ],
                'Thursday': [
                    { time: '11:00', class: 'ENGL 3323', room: 'MORR 204' },
                    { time: '14:00', class: 'CS 3823', room: 'MSCS 501' }
                ],
                'Friday': [
                    { time: '10:00', class: 'CS 3443', room: 'MSCS 501' },
                    { time: '13:00', class: 'MATH 3113', room: 'MSCS 203' }
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
            // Clear session data
            localStorage.removeItem('loggedInStudentId');
            // Redirect to login page
            window.location.href = 'login.html';
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