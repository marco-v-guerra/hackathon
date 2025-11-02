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
        this.mealPlanBudgetEl = document.getElementById('mealPlanBudget');
        this.weeklyScheduleEl = document.getElementById('weeklySchedule');
        this.paystubsListEl = document.getElementById('paystubsList');
        this.workSummaryEl = document.getElementById('workSummary');
        this.combinedScheduleEl = document.getElementById('combinedSchedule');
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

        // Planning tab event listeners
        const generatePlanBtn = document.getElementById('generatePlanBtn');
        if (generatePlanBtn) {
            generatePlanBtn.addEventListener('click', () => {
                this.generateAcademicPlan();
            });
        }

        const customizePlanBtn = document.getElementById('customizePlanBtn');
        if (customizePlanBtn) {
            customizePlanBtn.addEventListener('click', () => {
                this.showPlanCustomization();
            });
        }

        // Employee tab event listeners
        const addPaystubBtn = document.getElementById('addPaystubBtn');
        if (addPaystubBtn) {
            addPaystubBtn.addEventListener('click', () => {
                this.showPaystubModal();
            });
        }

        // Auto-calculate gross and net pay in paystub form
        const hoursWorkedInput = document.getElementById('hoursWorked');
        const hourlyRateInput = document.getElementById('hourlyRate');
        const taxesInput = document.getElementById('taxes');
        
        if (hoursWorkedInput && hourlyRateInput) {
            [hoursWorkedInput, hourlyRateInput, taxesInput].forEach(input => {
                if (input) {
                    input.addEventListener('input', () => {
                        this.calculatePaystubAmounts();
                    });
                }
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
                "major": "Electrical Engineering",
                "year": 4, // This field is now deprecated, academic year is calculated from credits
                "grade": "A",
                "gpa": 3.8,
                "credits": 98, // 90-120 = Senior
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
                    "mealPlan": {
                        "totalCost": 2800.00,
                        "amountUsed": 1200.00,
                        "remainingBalance": 1600.00,
                        "startDate": "2025-08-22",
                        "endDate": "2025-12-13",
                        "currentWeek": 11,
                        "totalWeeks": 16
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
                        { "time": "14:00", "class": "CS 4273", "room": "MSCS 207" },
                        { "time": "16:00", "class": "Work - IT Support", "room": "IT Center", "type": "work" }
                    ],
                    "Wednesday": [
                        { "time": "10:00", "class": "CS 3443", "room": "MSCS 205" },
                        { "time": "13:00", "class": "MATH 3113", "room": "MSCS 310" },
                        { "time": "15:00", "class": "CS 3653", "room": "MSCS 203" }
                    ],
                    "Thursday": [
                        { "time": "11:00", "class": "CS 3823", "room": "MSCS 109" },
                        { "time": "14:00", "class": "CS 4273", "room": "MSCS 207" },
                        { "time": "16:00", "class": "Work - IT Support", "room": "IT Center", "type": "work" }
                    ],
                    "Friday": [
                        { "time": "10:00", "class": "CS 3443", "room": "MSCS 205" },
                        { "time": "13:00", "class": "MATH 3113", "room": "MSCS 310" }
                    ]
                },
                "employment": {
                    "position": "IT Support Technician",
                    "hourlyRate": 15.50,
                    "hoursPerWeek": 10,
                    "supervisor": "Dr. Mike Stevens",
                    "department": "Information Technology",
                    "startDate": "2025-08-22",
                    "paystubs": [
                        {
                            "id": 1,
                            "payPeriodStart": "2025-10-15",
                            "payPeriodEnd": "2025-10-31",
                            "hoursWorked": 20,
                            "hourlyRate": 15.50,
                            "grossPay": 310.00,
                            "taxes": 46.50,
                            "netPay": 263.50
                        },
                        {
                            "id": 2,
                            "payPeriodStart": "2025-10-01",
                            "payPeriodEnd": "2025-10-14",
                            "hoursWorked": 18.5,
                            "hourlyRate": 15.50,
                            "grossPay": 286.75,
                            "taxes": 43.01,
                            "netPay": 243.74
                        }
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
                "year": 2, // This field is now deprecated, academic year is calculated from credits
                "grade": "A-",
                "gpa": 3.7,
                "credits": 62, // 60-89 = Junior
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
                    "mealPlan": {
                        "totalCost": 3200.00,
                        "amountUsed": 1400.00,
                        "remainingBalance": 1800.00,
                        "startDate": "2025-08-22",
                        "endDate": "2025-12-13",
                        "currentWeek": 11,
                        "totalWeeks": 16
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
                        { "time": "14:00", "class": "STAT 2013", "room": "MSCS 203" },
                        { "time": "16:00", "class": "Work - Lab Assistant", "room": "Chemistry Lab", "type": "work" }
                    ],
                    "Thursday": [
                        { "time": "10:30", "class": "BIOL 3204", "room": "LSE 104" },
                        { "time": "13:00", "class": "PSYC 1113", "room": "PSYC 108" }
                    ],
                    "Friday": [
                        { "time": "09:00", "class": "CHEM 3053", "room": "CHEM 179" },
                        { "time": "11:00", "class": "PHYS 2014", "room": "PHYS 106" },
                        { "time": "16:00", "class": "Work - Lab Assistant", "room": "Chemistry Lab", "type": "work" }
                    ]
                },
                "employment": {
                    "position": "Chemistry Lab Assistant",
                    "hourlyRate": 12.00,
                    "hoursPerWeek": 8,
                    "supervisor": "Dr. Sarah Peterson",
                    "department": "Chemistry Department",
                    "startDate": "2025-08-22",
                    "paystubs": [
                        {
                            "id": 1,
                            "payPeriodStart": "2025-10-15",
                            "payPeriodEnd": "2025-10-31",
                            "hoursWorked": 16,
                            "hourlyRate": 12.00,
                            "grossPay": 192.00,
                            "taxes": 28.80,
                            "netPay": 163.20
                        },
                        {
                            "id": 2,
                            "payPeriodStart": "2025-10-01",
                            "payPeriodEnd": "2025-10-14",
                            "hoursWorked": 15,
                            "hourlyRate": 12.00,
                            "grossPay": 180.00,
                            "taxes": 27.00,
                            "netPay": 153.00
                        }
                    ]
                }
            }
        ];
    }

    getCourseDatabase() {
        return {
            'Computer Science': {
                'Core Courses': [
                    { code: 'CS 1113', name: 'Computer Science I', credits: 3, prerequisites: [] },
                    { code: 'CS 1323', name: 'Computer Science II', credits: 3, prerequisites: ['CS 1113'] },
                    { code: 'CS 2133', name: 'Data Structures', credits: 3, prerequisites: ['CS 1323'] },
                    { code: 'CS 2714', name: 'Computer Organization', credits: 4, prerequisites: ['CS 1323'] },
                    { code: 'CS 3353', name: 'Algorithms and Data Structures', credits: 3, prerequisites: ['CS 2133'] },
                    { code: 'CS 3613', name: 'Operating Systems', credits: 3, prerequisites: ['CS 2714'] },
                    { code: 'CS 4143', name: 'Senior Capstone I', credits: 3, prerequisites: ['CS 3353'] },
                    { code: 'CS 4153', name: 'Senior Capstone II', credits: 3, prerequisites: ['CS 4143'] }
                ],
                'Electives': [
                    { code: 'CS 4413', name: 'Web Programming', credits: 3, prerequisites: ['CS 2133'] },
                    { code: 'CS 4513', name: 'Database Management Systems', credits: 3, prerequisites: ['CS 2133'] },
                    { code: 'CS 4613', name: 'Artificial Intelligence', credits: 3, prerequisites: ['CS 3353'] },
                    { code: 'CS 4713', name: 'Computer Graphics', credits: 3, prerequisites: ['CS 2133'] },
                    { code: 'CS 4813', name: 'Software Engineering II', credits: 3, prerequisites: ['CS 4273'] },
                    { code: 'CS 4913', name: 'Machine Learning', credits: 3, prerequisites: ['CS 3353'] },
                    { code: 'CS 5113', name: 'Distributed Systems', credits: 3, prerequisites: ['CS 3613'] },
                    { code: 'CS 5213', name: 'Computer Security', credits: 3, prerequisites: ['CS 3613'] }
                ],
                'Math Requirements': [
                    { code: 'MATH 2144', name: 'Calculus II', credits: 4, prerequisites: [] },
                    { code: 'MATH 2153', name: 'Calculus III', credits: 3, prerequisites: ['MATH 2144'] },
                    { code: 'MATH 3113', name: 'Linear Algebra', credits: 3, prerequisites: ['MATH 2144'] },
                    { code: 'STAT 3743', name: 'Applied Statistics', credits: 3, prerequisites: ['MATH 2144'] }
                ]
            },
            'Pre-Medicine': {
                'Science Core': [
                    { code: 'CHEM 1314', name: 'General Chemistry I', credits: 4, prerequisites: [] },
                    { code: 'CHEM 1515', name: 'General Chemistry II', credits: 5, prerequisites: ['CHEM 1314'] },
                    { code: 'CHEM 3063', name: 'Organic Chemistry II', credits: 3, prerequisites: ['CHEM 3053'] },
                    { code: 'CHEM 3653', name: 'Biochemistry I', credits: 3, prerequisites: ['CHEM 3053'] },
                    { code: 'BIOL 1114', name: 'Principles of Biology I', credits: 4, prerequisites: [] },
                    { code: 'BIOL 1124', name: 'Principles of Biology II', credits: 4, prerequisites: ['BIOL 1114'] },
                    { code: 'BIOL 3214', name: 'Human Physiology', credits: 4, prerequisites: ['BIOL 3204'] },
                    { code: 'BIOL 3304', name: 'Genetics', credits: 4, prerequisites: ['BIOL 1124'] },
                    { code: 'BIOL 4154', name: 'Microbiology', credits: 4, prerequisites: ['BIOL 1124'] }
                ],
                'Physics Requirements': [
                    { code: 'PHYS 2024', name: 'University Physics II', credits: 4, prerequisites: ['PHYS 2014'] },
                    { code: 'PHYS 2034', name: 'University Physics III', credits: 4, prerequisites: ['PHYS 2024'] }
                ],
                'Additional Requirements': [
                    { code: 'MATH 2144', name: 'Calculus II', credits: 4, prerequisites: ['MATH 2143'] },
                    { code: 'STAT 4013', name: 'Biostatistics', credits: 3, prerequisites: ['STAT 2013'] },
                    { code: 'ENGL 3323', name: 'Medical Writing', credits: 3, prerequisites: [] },
                    { code: 'PSYC 2124', name: 'Abnormal Psychology', credits: 4, prerequisites: ['PSYC 1113'] },
                    { code: 'SOC 1113', name: 'Introduction to Sociology', credits: 3, prerequisites: [] }
                ],
                'Electives': [
                    { code: 'BIOL 4204', name: 'Cell Biology', credits: 4, prerequisites: ['BIOL 1124'] },
                    { code: 'BIOL 4304', name: 'Molecular Biology', credits: 4, prerequisites: ['BIOL 3304'] },
                    { code: 'CHEM 4653', name: 'Biochemistry II', credits: 3, prerequisites: ['CHEM 3653'] },
                    { code: 'HLTH 2143', name: 'Medical Terminology', credits: 3, prerequisites: [] },
                    { code: 'NURS 3143', name: 'Human Pathophysiology', credits: 3, prerequisites: ['BIOL 3204'] }
                ]
            }
        };
    }

    generateAcademicPlan() {
        if (!this.studentData) return;

        const currentCredits = this.studentData.credits;
        const targetCredits = 120;
        const remainingCredits = targetCredits - currentCredits;
        
        // Get current courses to avoid duplicates
        const currentCourses = this.studentData.currentCourses.map(course => course.code);
        
        // Get available courses for student's major
        const courseDatabase = this.getCourseDatabase();
        const majorCourses = courseDatabase[this.studentData.major];
        
        if (!majorCourses) {
            console.error('No course database found for major:', this.studentData.major);
            return;
        }

        // Combine all available courses
        const allAvailableCourses = [];
        Object.keys(majorCourses).forEach(category => {
            majorCourses[category].forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    allAvailableCourses.push({...course, category});
                }
            });
        });

        // Generate semester plan
        const semesters = this.planSemesters(allAvailableCourses, remainingCredits);
        
        // Display the plan
        this.displayAcademicPlan(semesters, currentCredits, remainingCredits);
    }

    planSemesters(availableCourses, remainingCredits) {
        const semesters = [];
        let creditsLeft = remainingCredits;
        const coursesLeft = [...availableCourses];
        
        // Options from UI
        const includeSummer = document.getElementById('summerCoursesOption')?.checked ?? true;
        const preferLightLoad = document.getElementById('lightLoadOption')?.checked ?? false;
        
        const minCredits = preferLightLoad ? 12 : 13;
        const maxCredits = 19;
        const avgCredits = preferLightLoad ? 13 : 15;

        let semesterCount = 1;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        
        // Determine starting semester
        let startingSemester = currentMonth <= 4 ? 'Spring' : currentMonth <= 7 ? 'Summer' : 'Fall';
        let year = currentMonth <= 4 ? currentYear : currentYear + 1;

        while (creditsLeft > 0 && coursesLeft.length > 0) {
            const semester = {
                name: `${startingSemester} ${year}`,
                courses: [],
                totalCredits: 0
            };

            // Skip summer if not included
            if (startingSemester === 'Summer' && !includeSummer) {
                startingSemester = 'Fall';
                continue;
            }

            // Target credits for this semester
            let targetCredits = Math.min(avgCredits, creditsLeft);
            if (creditsLeft <= maxCredits) {
                targetCredits = creditsLeft;
            }

            // Select courses for this semester
            while (semester.totalCredits < targetCredits && coursesLeft.length > 0) {
                // Find courses that fit
                const availableOptions = coursesLeft.filter(course => 
                    semester.totalCredits + course.credits <= maxCredits
                );

                if (availableOptions.length === 0) break;

                // Prioritize core courses, then electives
                let selectedCourse = availableOptions.find(course => 
                    course.category.toLowerCase().includes('core') || 
                    course.category.toLowerCase().includes('requirement')
                ) || availableOptions[0];

                semester.courses.push(selectedCourse);
                semester.totalCredits += selectedCourse.credits;
                
                // Remove from available courses
                const index = coursesLeft.findIndex(c => c.code === selectedCourse.code);
                coursesLeft.splice(index, 1);
            }

            if (semester.courses.length > 0) {
                semesters.push(semester);
                creditsLeft -= semester.totalCredits;
            }

            // Move to next semester
            if (startingSemester === 'Spring') {
                startingSemester = includeSummer ? 'Summer' : 'Fall';
            } else if (startingSemester === 'Summer') {
                startingSemester = 'Fall';
            } else {
                startingSemester = 'Spring';
                year++;
            }

            semesterCount++;
            if (semesterCount > 8) break; // Safety limit
        }

        return semesters;
    }

    displayAcademicPlan(semesters, currentCredits, remainingCredits) {
        const planContainer = document.getElementById('academicPlan');
        
        let html = '';
        let totalPlannedCredits = 0;

        semesters.forEach(semester => {
            totalPlannedCredits += semester.totalCredits;
            
            html += `
                <div class="semester-plan">
                    <div class="semester-header">
                        <h4 class="semester-title">${semester.name}</h4>
                        <span class="semester-credits">${semester.totalCredits} Credits</span>
                    </div>
                    <div class="semester-courses">
                        <div class="course-list">
            `;

            semester.courses.forEach(course => {
                html += `
                    <div class="course-item">
                        <div class="course-info">
                            <div class="course-code">${course.code}</div>
                            <div class="course-name">${course.name}</div>
                        </div>
                        <div class="course-credits">${course.credits} CR</div>
                    </div>
                `;
            });

            html += `
                        </div>
                    </div>
                </div>
            `;
        });

        // Add summary
        html += `
            <div class="plan-summary">
                <h4 class="summary-title">
                    <i class="fas fa-chart-line"></i>
                    Plan Summary
                </h4>
                <div class="summary-stats">
                    <div class="summary-item">
                        <span class="summary-value">${semesters.length}</span>
                        <span class="summary-label">Semesters</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${totalPlannedCredits}</span>
                        <span class="summary-label">Planned Credits</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${Math.round((totalPlannedCredits / semesters.length) * 10) / 10}</span>
                        <span class="summary-label">Avg Credits/Semester</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${currentCredits + totalPlannedCredits}</span>
                        <span class="summary-label">Total at Graduation</span>
                    </div>
                </div>
                <div class="plan-actions">
                    <button class="btn btn-outline" onclick="studentPortal.generateAcademicPlan()">
                        <i class="fas fa-refresh"></i> Regenerate Plan
                    </button>
                    <button class="btn btn-outline" onclick="studentPortal.exportPlan()">
                        <i class="fas fa-download"></i> Export Plan
                    </button>
                </div>
            </div>
        `;

        planContainer.innerHTML = html;
        planContainer.classList.add('active');

        // Update progress stats
        this.updatePlanningStats(currentCredits, remainingCredits, semesters.length);
    }

    updatePlanningStats(currentCredits, remainingCredits, semestersRemaining) {
        document.getElementById('completedCredits').textContent = currentCredits;
        document.getElementById('remainingCredits').textContent = remainingCredits;
        document.getElementById('semestersRemaining').textContent = semestersRemaining;
        
        const progressPercent = Math.round((currentCredits / 120) * 100);
        document.getElementById('graduationProgress').style.width = `${progressPercent}%`;
        document.getElementById('progressText').textContent = `${currentCredits} of 120 credits completed (${progressPercent}%)`;
    }

    exportPlan() {
        // Simple export functionality
        const planData = document.getElementById('academicPlan').textContent;
        const blob = new Blob([planData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.studentData.name}_Academic_Plan.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getDefaultStudentData() {
        return {
            id: 'OSU001',
            name: 'Alice Smith',
            email: 'alice.smith@okstate.edu',
            phone: '(405) 744-5000',
            address: 'Kerr-Drummond Hall, Room 304',
            major: 'Electrical Engineering',
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

    getAcademicYear(credits) {
        if (credits >= 0 && credits <= 29) {
            return 'Freshman';
        } else if (credits >= 30 && credits <= 59) {
            return 'Sophomore';
        } else if (credits >= 60 && credits <= 89) {
            return 'Junior';
        } else if (credits >= 90 && credits <= 120) {
            return 'Senior';
        } else {
            return 'Graduate';
        }
    }

    populateStudentInfo() {
        const data = this.studentData;
        
        // Calculate academic year based on credits
        const academicYear = this.getAcademicYear(data.credits);
        
        // Update profile information
        if (this.studentNameEl) this.studentNameEl.textContent = data.name.split(' ')[0];
        if (this.fullStudentNameEl) this.fullStudentNameEl.textContent = data.name;
        if (this.studentIdEl) this.studentIdEl.textContent = data.id;
        if (this.studentMajorEl) this.studentMajorEl.textContent = data.major;
        if (this.studentYearEl) this.studentYearEl.textContent = academicYear;
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
        this.loadPlanningTab();
        this.loadEmployeeInfo();
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
                    <span class="semester-name">${semester.semester} ${semester.year}</span>
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
        this.loadMealPlanBudget();
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

    loadMealPlanBudget() {
        if (!this.mealPlanBudgetEl || !this.studentData.financial.mealPlan) return;

        const mealPlan = this.studentData.financial.mealPlan;
        const weeksRemaining = mealPlan.totalWeeks - mealPlan.currentWeek + 1;
        const dailyBudget = (mealPlan.remainingBalance / (weeksRemaining * 7)).toFixed(2);
        const monthlyBudget = (mealPlan.remainingBalance / (weeksRemaining / 4)).toFixed(2);
        const perMealBudget = (dailyBudget / 3).toFixed(2); // Assuming 3 meals per day

        const budgetHTML = `
            <div class="meal-budget-compact">
                <div class="budget-item">
                    <div class="budget-label">
                        <i class="fas fa-calendar-day"></i>
                        Per Day
                    </div>
                    <div class="budget-amount">$${dailyBudget}</div>
                </div>
                <div class="budget-item">
                    <div class="budget-label">
                        <i class="fas fa-calendar-alt"></i>
                        Per Month
                    </div>
                    <div class="budget-amount">$${monthlyBudget}</div>
                </div>
                <div class="budget-item">
                    <div class="budget-label">
                        <i class="fas fa-utensils"></i>
                        Per Meal
                    </div>
                    <div class="budget-amount">$${perMealBudget}</div>
                </div>
                <div class="budget-item">
                    <div class="budget-label">
                        <i class="fas fa-calendar-week"></i>
                        Weeks Left
                    </div>
                    <div class="budget-amount">${weeksRemaining}</div>
                </div>
            </div>
        `;

        this.mealPlanBudgetEl.innerHTML = budgetHTML;
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
            scheduleHTML += `<div class="schedule-time">${time}</div>`;
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

    loadPlanningTab() {
        // Initialize planning tab with current student data
        if (!this.studentData) return;

        // Update planning stats on tab load
        const currentCredits = this.studentData.credits;
        const remainingCredits = 120 - currentCredits;
        const estimatedSemesters = Math.ceil(remainingCredits / 15);
        
        this.updatePlanningStats(currentCredits, remainingCredits, estimatedSemesters);
    }

    showPlanCustomization() {
        console.log('Opening plan customization...');
        
        // Initialize customization data
        this.customizationData = {
            selectedCourses: [],
            coursePriorities: { high: [], medium: [], low: [] },
            timeline: {
                graduationSemester: 'Spring 2027',
                includeSummer: true,
                targetCredits: 15
            }
        };
        
        try {
            this.openCustomizationModal();
            this.loadAvailableCourses();
            this.setupCustomizationTabs();
        } catch (error) {
            console.error('Error opening customization:', error);
            alert('Error opening customization: ' + error.message);
        }
    }

    openCustomizationModal() {
        const modal = document.getElementById('customizationModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCustomization() {
        const modal = document.getElementById('customizationModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupCustomizationTabs() {
        const tabButtons = document.querySelectorAll('.custom-tab-btn');
        const tabPanes = document.querySelectorAll('.custom-tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.tab;
                
                // Update button states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Update pane states
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    loadAvailableCourses() {
        try {
            if (!this.studentData) {
                console.error('No student data available');
                return;
            }

            console.log('Loading courses for major:', this.studentData.major);
            
            const courseDatabase = this.getCourseDatabase();
            const majorCourses = courseDatabase[this.studentData.major];
            
            if (!majorCourses) {
                console.error('No courses found for major:', this.studentData.major);
                alert('No courses found for your major. Please contact support.');
                return;
            }

            // Get current courses to avoid duplicates
            const currentCourses = this.studentData.currentCourses.map(course => course.code);
            console.log('Current courses:', currentCourses);
            
            // Combine all available courses
            const allAvailableCourses = [];
            Object.keys(majorCourses).forEach(category => {
                majorCourses[category].forEach(course => {
                    if (!currentCourses.includes(course.code)) {
                        allAvailableCourses.push({...course, category: category.toLowerCase()});
                    }
                });
            });

            console.log('Available courses loaded:', allAvailableCourses.length);
            
            this.renderAvailableCourses(allAvailableCourses);
            this.initializePriorities(allAvailableCourses);
            
        } catch (error) {
            console.error('Error loading available courses:', error);
            alert('Error loading courses: ' + error.message);
        }
    }

    renderAvailableCourses(courses) {
        const container = document.getElementById('availableCourses');
        
        // Clear any existing content first
        container.innerHTML = '';
        
        // Clear selected courses display too
        const selectedContainer = document.getElementById('selectedCourses');
        if (selectedContainer) {
            selectedContainer.innerHTML = '';
        }
        
        // Reset selected courses in data
        this.customizationData.selectedCourses = [];
        
        container.innerHTML = courses.map(course => `
            <div class="course-card" data-course-code="${course.code}" onclick="studentPortal.toggleCourseSelection('${course.code}')">
                <div class="course-info">
                    <h6>${course.code}</h6>
                    <p>${course.name}</p>
                </div>
                <div class="course-credits">${course.credits} CR</div>
            </div>
        `).join('');
    }

    toggleCourseSelection(courseCode) {
        const availableContainer = document.getElementById('availableCourses');
        const selectedContainer = document.getElementById('selectedCourses');
        const availableCourseCard = availableContainer.querySelector(`[data-course-code="${courseCode}"]`);
        const selectedCourseCard = selectedContainer.querySelector(`[data-course-code="${courseCode}"]`);
        
        if (this.customizationData.selectedCourses.includes(courseCode)) {
            // Remove from selected
            this.customizationData.selectedCourses = this.customizationData.selectedCourses.filter(c => c !== courseCode);
            
            // Update available course card
            if (availableCourseCard) {
                availableCourseCard.classList.remove('selected');
            }
            
            // Remove from selected display
            if (selectedCourseCard) {
                selectedCourseCard.remove();
            }
        } else {
            // Add to selected
            this.customizationData.selectedCourses.push(courseCode);
            
            // Update available course card
            if (availableCourseCard) {
                availableCourseCard.classList.add('selected');
            }
            
            // Add to selected display
            const courseData = this.findCourseData(courseCode);
            if (courseData) {
                const selectedCard = document.createElement('div');
                selectedCard.className = 'course-card selected';
                selectedCard.setAttribute('data-course-code', courseCode);
                selectedCard.innerHTML = `
                    <div class="course-info">
                        <h6>${courseData.code}</h6>
                        <p>${courseData.name}</p>
                    </div>
                    <div class="course-credits">${courseData.credits} CR</div>
                `;
                selectedCard.onclick = () => this.toggleCourseSelection(courseCode);
                selectedContainer.appendChild(selectedCard);
            }
        }
    }

    findCourseData(courseCode) {
        const courseDatabase = this.getCourseDatabase();
        const majorCourses = courseDatabase[this.studentData.major];
        
        for (const category of Object.values(majorCourses)) {
            const course = category.find(c => c.code === courseCode);
            if (course) return course;
        }
        return null;
    }

    filterCourses() {
        const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
        const category = document.getElementById('courseCategory').value;
        const courseCards = document.querySelectorAll('#availableCourses .course-card');
        
        courseCards.forEach(card => {
            const courseCode = card.querySelector('h6').textContent.toLowerCase();
            const courseName = card.querySelector('p').textContent.toLowerCase();
            const courseData = this.findCourseData(card.dataset.courseCode);
            
            const matchesSearch = courseCode.includes(searchTerm) || courseName.includes(searchTerm);
            const matchesCategory = category === 'all' || (courseData && courseData.category.includes(category));
            
            card.style.display = matchesSearch && matchesCategory ? 'flex' : 'none';
        });
    }

    initializePriorities(courses) {
        // Auto-categorize courses by priority
        const highPriority = courses.filter(c => 
            c.category.toLowerCase().includes('core') || 
            c.category.toLowerCase().includes('requirement') ||
            c.category.toLowerCase().includes('science core')
        );
        const mediumPriority = courses.filter(c => 
            c.category.toLowerCase().includes('math') || 
            c.category.toLowerCase().includes('physics') ||
            c.category.toLowerCase().includes('additional')
        );
        const lowPriority = courses.filter(c => 
            c.category.toLowerCase().includes('elective')
        );
        
        this.customizationData.coursePriorities = {
            high: highPriority.slice(0, 8).map(c => c.code),
            medium: mediumPriority.slice(0, 6).map(c => c.code),
            low: lowPriority.slice(0, 4).map(c => c.code)
        };
        
        this.renderPriorities();
    }

    renderPriorities() {
        const priorities = ['high', 'medium', 'low'];
        
        priorities.forEach(priority => {
            const container = document.getElementById(`${priority}Priority`);
            const courses = this.customizationData.coursePriorities[priority];
            
            container.innerHTML = courses.map(courseCode => {
                const courseData = this.findCourseData(courseCode);
                return courseData ? `
                    <div class="priority-course" draggable="true" data-course-code="${courseCode}">
                        ${courseData.code}
                    </div>
                ` : '';
            }).join('');
        });
        
        // Re-setup drag and drop after rendering
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const priorityLists = document.querySelectorAll('.priority-list');
        const priorityCourses = document.querySelectorAll('.priority-course');
        
        priorityCourses.forEach(course => {
            course.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.courseCode);
                e.target.classList.add('dragging');
            });
            
            course.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        priorityLists.forEach(list => {
            list.addEventListener('dragover', (e) => {
                e.preventDefault();
                list.classList.add('drag-over');
            });
            
            list.addEventListener('dragleave', (e) => {
                list.classList.remove('drag-over');
            });
            
            list.addEventListener('drop', (e) => {
                e.preventDefault();
                list.classList.remove('drag-over');
                
                const courseCode = e.dataTransfer.getData('text/plain');
                const newPriority = list.dataset.priority;
                
                this.moveCourseToNewPriority(courseCode, newPriority);
            });
        });
    }

    moveCourseToNewPriority(courseCode, newPriority) {
        // Remove from all priority lists
        Object.keys(this.customizationData.coursePriorities).forEach(priority => {
            this.customizationData.coursePriorities[priority] = 
                this.customizationData.coursePriorities[priority].filter(c => c !== courseCode);
        });
        
        // Add to new priority
        this.customizationData.coursePriorities[newPriority].push(courseCode);
        
        // Re-render priorities (this will also re-setup drag and drop)
        this.renderPriorities();
    }

    applyCustomization() {
        console.log('applyCustomization called');
        console.log('studentPortal object:', window.studentPortal);
        console.log('this context:', this);
        try {
            // Get timeline settings
            const graduationSemesterEl = document.getElementById('graduationSemester');
            const includeSummerEl = document.getElementById('includeSummerCustom');
            const creditRangeEl = document.getElementById('creditRange');
            
            console.log('DOM elements found:', {
                graduationSemester: !!graduationSemesterEl,
                includeSummer: !!includeSummerEl,
                creditRange: !!creditRangeEl
            });
            
            // Use values if elements exist, otherwise use defaults
            this.customizationData.timeline.graduationSemester = graduationSemesterEl ? graduationSemesterEl.value : 'Spring 2027';
            this.customizationData.timeline.includeSummer = includeSummerEl ? includeSummerEl.checked : true;
            this.customizationData.timeline.targetCredits = creditRangeEl ? parseInt(creditRangeEl.value) : 15;
            
            console.log('Timeline data collected:', this.customizationData.timeline);
            
            // Generate custom plan
            const success = this.generateCustomPlan();
            console.log('Plan generation success:', success);
            
            // Only close modal if plan generation was successful
            if (success) {
                this.closeCustomization();
            }
        } catch (error) {
            console.error('Error in applyCustomization:', error);
            // Try to generate a basic plan anyway
            try {
                const semesters = this.createBasicPlanStructure(75); // Default remaining credits
                this.displayAcademicPlan(semesters, 45, 75);
                this.closeCustomization();
            } catch (fallbackError) {
                console.error('Fallback plan generation failed:', fallbackError);
            }
        }
    }

    generateCustomPlan() {
        console.log('generateCustomPlan method called');
        try {
            console.log('Student data check:', !!this.studentData);
            if (!this.studentData) {
                console.error('No student data available - using defaults');
                // Use default values instead of failing
                const currentCredits = 45; // Default current credits
                const targetCredits = 120;
                const remainingCredits = targetCredits - currentCredits;
                
                const prioritizedCourses = this.getPrioritizedCourseList();
                let semesters = [];
                if (prioritizedCourses.length > 0) {
                    semesters = this.planCustomSemesters(prioritizedCourses, remainingCredits);
                } else {
                    semesters = this.createBasicPlanStructure(remainingCredits);
                }
                
                this.displayAcademicPlan(semesters, currentCredits, remainingCredits);
                return true;
            }

            const currentCredits = this.studentData.credits;
            const targetCredits = 120;
            const remainingCredits = targetCredits - currentCredits;
            
            console.log('Generating custom plan with:', {
                currentCredits,
                remainingCredits,
                selectedCourses: this.customizationData.selectedCourses,
                priorities: this.customizationData.coursePriorities
            });
            
            // Get prioritized course list
            const prioritizedCourses = this.getPrioritizedCourseList();
            console.log('Prioritized courses:', prioritizedCourses);
            
            // Generate custom semester plan even if no courses are selected
            let semesters = [];
            if (prioritizedCourses.length > 0) {
                semesters = this.planCustomSemesters(prioritizedCourses, remainingCredits);
            } else {
                // Create a basic plan structure even with no courses
                semesters = this.createBasicPlanStructure(remainingCredits);
            }
            console.log('Generated semesters:', semesters);
            
            // Always allow plan generation, even if empty or incomplete
            
            // Display the plan
            this.displayAcademicPlan(semesters, currentCredits, remainingCredits);
            return true;
            
        } catch (error) {
            console.error('Error generating custom plan:', error);
            // Generate a basic plan as fallback
            try {
                const semesters = this.createBasicPlanStructure(75);
                this.displayAcademicPlan(semesters, 45, 75);
                return true;
            } catch (fallbackError) {
                console.error('Fallback plan failed:', fallbackError);
                return false;
            }
        }
    }

    getPrioritizedCourseList() {
        try {
            const courseDatabase = this.getCourseDatabase();
            const majorCourses = courseDatabase[this.studentData.major];
            
            if (!majorCourses) {
                console.error('No major courses found for:', this.studentData.major);
                return [];
            }
            
            const currentCourses = this.studentData.currentCourses.map(course => course.code);
            
            // Build prioritized list
            let prioritizedCourses = [];
            
            // Ensure priority arrays exist
            if (!this.customizationData.coursePriorities) {
                this.customizationData.coursePriorities = { high: [], medium: [], low: [] };
            }
            
            // Add high priority courses first
            (this.customizationData.coursePriorities.high || []).forEach(courseCode => {
                const courseData = this.findCourseInDatabase(courseCode, majorCourses);
                if (courseData && !currentCourses.includes(courseCode)) {
                    prioritizedCourses.push(courseData);
                }
            });
            
            // Add medium priority courses
            (this.customizationData.coursePriorities.medium || []).forEach(courseCode => {
                const courseData = this.findCourseInDatabase(courseCode, majorCourses);
                if (courseData && !currentCourses.includes(courseCode)) {
                    prioritizedCourses.push(courseData);
                }
            });
            
            // Add low priority courses
            (this.customizationData.coursePriorities.low || []).forEach(courseCode => {
                const courseData = this.findCourseInDatabase(courseCode, majorCourses);
                if (courseData && !currentCourses.includes(courseCode)) {
                    prioritizedCourses.push(courseData);
                }
            });
            
            // Add any remaining courses not in priorities
            Object.values(majorCourses).flat().forEach(course => {
                if (!prioritizedCourses.find(c => c.code === course.code) && 
                    !currentCourses.includes(course.code)) {
                    prioritizedCourses.push(course);
                }
            });
            
            return prioritizedCourses;
            
        } catch (error) {
            console.error('Error getting prioritized course list:', error);
            return [];
        }
    }

    findCourseInDatabase(courseCode, majorCourses) {
        for (const category of Object.values(majorCourses)) {
            const course = category.find(c => c.code === courseCode);
            if (course) return course;
        }
        return null;
    }

    planCustomSemesters(availableCourses, remainingCredits) {
        const semesters = [];
        let creditsLeft = remainingCredits;
        const coursesLeft = [...availableCourses];
        
        // Ensure we have valid timeline data
        const timeline = this.customizationData?.timeline || {
            graduationSemester: 'Spring 2027',
            includeSummer: true,
            targetCredits: 15
        };
        const { graduationSemester, includeSummer, targetCredits } = timeline;
        const maxCredits = 19;

        let semesterCount = 1;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        
        // Determine starting semester
        let startingSemester = currentMonth <= 4 ? 'Spring' : currentMonth <= 7 ? 'Summer' : 'Fall';
        let year = currentMonth <= 4 ? currentYear : currentYear + 1;

        // Parse graduation target
        const [gradSemester, gradYear] = graduationSemester.split(' ');
        const targetYear = parseInt(gradYear);

        while (creditsLeft > 0 && coursesLeft.length > 0) {
            // Check if we've reached graduation deadline
            if (year > targetYear || (year === targetYear && 
                (startingSemester === 'Fall' && gradSemester === 'Spring') ||
                (startingSemester === 'Summer' && ['Spring', 'Summer'].includes(gradSemester)))) {
                break;
            }

            const semester = {
                name: `${startingSemester} ${year}`,
                courses: [],
                totalCredits: 0
            };

            // Skip summer if not included
            if (startingSemester === 'Summer' && !includeSummer) {
                startingSemester = 'Fall';
                continue;
            }

            // Select courses for this semester based on priorities
            while (semester.totalCredits < targetCredits && coursesLeft.length > 0) {
                const availableOptions = coursesLeft.filter(course => 
                    semester.totalCredits + course.credits <= maxCredits
                );

                if (availableOptions.length === 0) break;

                // Select first available course (already prioritized)
                const selectedCourse = availableOptions[0];

                semester.courses.push(selectedCourse);
                semester.totalCredits += selectedCourse.credits;
                
                // Remove from available courses
                const index = coursesLeft.findIndex(c => c.code === selectedCourse.code);
                coursesLeft.splice(index, 1);
            }

            if (semester.courses.length > 0) {
                semesters.push(semester);
                creditsLeft -= semester.totalCredits;
            }

            // Move to next semester
            if (startingSemester === 'Spring') {
                startingSemester = includeSummer ? 'Summer' : 'Fall';
            } else if (startingSemester === 'Summer') {
                startingSemester = 'Fall';
            } else {
                startingSemester = 'Spring';
                year++;
            }

            semesterCount++;
            if (semesterCount > 12) break; // Safety limit
        }

        return semesters;
    }

    createBasicPlanStructure(remainingCredits) {
        const semesters = [];
        const { graduationSemester, includeSummer, targetCredits } = this.customizationData.timeline;
        
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        
        // Determine starting semester
        let startingSemester = currentMonth <= 4 ? 'Spring' : currentMonth <= 7 ? 'Summer' : 'Fall';
        let year = currentMonth <= 4 ? currentYear : currentYear + 1;

        // Parse graduation target
        const [gradSemester, gradYear] = graduationSemester.split(' ');
        const targetYear = parseInt(gradYear);

        let semesterCount = 0;
        while (year <= targetYear && semesterCount < 12) {
            // Check if we've reached graduation deadline
            if (year === targetYear && 
                ((startingSemester === 'Fall' && gradSemester === 'Spring') ||
                 (startingSemester === 'Summer' && ['Spring', 'Summer'].includes(gradSemester)))) {
                break;
            }

            // Skip summer if not included
            if (startingSemester === 'Summer' && !includeSummer) {
                startingSemester = 'Fall';
                continue;
            }

            const semester = {
                name: `${startingSemester} ${year}`,
                courses: [],
                totalCredits: 0
            };

            semesters.push(semester);

            // Move to next semester
            if (startingSemester === 'Spring') {
                startingSemester = includeSummer ? 'Summer' : 'Fall';
            } else if (startingSemester === 'Summer') {
                startingSemester = 'Fall';
            } else {
                startingSemester = 'Spring';
                year++;
            }

            semesterCount++;
        }

        return semesters;
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

    // Curriculum Management Methods
    addSecondMajor() {
        const availableMajors = [
            'Mathematics', 'Physics', 'Business Administration', 
            'Psychology', 'English Literature', 'Electrical Engineering', 
            'Biology', 'Chemistry', 'History', 'Economics'
        ];
        
        const selectedMajor = prompt('Select a second major:\n' + 
            availableMajors.map((major, index) => `${index + 1}. ${major}`).join('\n') +
            '\n\nEnter the number of your choice:'
        );
        
        const majorIndex = parseInt(selectedMajor) - 1;
        if (majorIndex >= 0 && majorIndex < availableMajors.length) {
            this.initializeSecondMajor(availableMajors[majorIndex]);
        }
    }

    initializeSecondMajor(majorName) {
        // Initialize student data for second major if not exists
        if (!this.studentData.secondMajor) {
            this.studentData.secondMajor = {
                name: majorName,
                credits: 0,
                requiredCredits: 36,
                courses: []
            };
        }

        // Show the second major column
        const secondMajorColumn = document.getElementById('secondMajorColumn');
        const secondMajorTitle = document.getElementById('secondMajorTitle');
        
        if (secondMajorColumn && secondMajorTitle) {
            secondMajorColumn.style.display = 'block';
            secondMajorTitle.textContent = majorName;
        }

        // Add to active curricula display
        this.updateActiveCurricula();
        this.populateSecondMajorCourses();
    }

    addMinor() {
        const availableMinors = [
            'Data Science', 'Cybersecurity', 'Web Development',
            'Mobile App Development', 'Artificial Intelligence',
            'Creative Writing', 'Digital Marketing', 'Statistics',
            'Philosophy', 'International Studies'
        ];
        
        const selectedMinor = prompt('Select a minor:\n' + 
            availableMinors.map((minor, index) => `${index + 1}. ${minor}`).join('\n') +
            '\n\nEnter the number of your choice:'
        );
        
        const minorIndex = parseInt(selectedMinor) - 1;
        if (minorIndex >= 0 && minorIndex < availableMinors.length) {
            this.initializeMinor(availableMinors[minorIndex]);
        }
    }

    initializeMinor(minorName) {
        // Initialize minors array if not exists
        if (!this.studentData.minors) {
            this.studentData.minors = [];
        }

        // Check if minor already exists
        const existingMinor = this.studentData.minors.find(minor => minor.name === minorName);
        if (existingMinor) {
            alert(`You already have ${minorName} as a minor.`);
            return;
        }

        // Add new minor (max 2)
        if (this.studentData.minors.length >= 2) {
            alert('You can only have up to 2 minors.');
            return;
        }

        this.studentData.minors.push({
            name: minorName,
            credits: 0,
            requiredCredits: 18,
            courses: []
        });

        // Show minors container
        const minorsContainer = document.getElementById('minorsContainer');
        if (minorsContainer) {
            minorsContainer.style.display = 'block';
        }

        this.updateActiveCurricula();
        this.populateMinorCourses();
    }

    viewSharedCourses() {
        const curriculumBreakdown = document.getElementById('curriculumBreakdown');
        if (curriculumBreakdown) {
            curriculumBreakdown.style.display = 'block';
            this.populateSharedCourses();
            this.populateMajorRequirements();
            this.populateMinorCourses();
        }
    }

    hideCurriculumBreakdown() {
        const curriculumBreakdown = document.getElementById('curriculumBreakdown');
        if (curriculumBreakdown) {
            curriculumBreakdown.style.display = 'none';
        }
    }

    updateActiveCurricula() {
        const activeCurricula = document.getElementById('activeCurricula');
        if (!activeCurricula) return;

        let html = `
            <div class="curriculum-item primary-major">
                <div class="curriculum-badge">Primary Major</div>
                <div class="curriculum-name">${this.studentData.major}</div>
                <div class="curriculum-progress">
                    <span class="progress-fraction">${this.studentData.credits || 45}/120 credits</span>
                    <div class="mini-progress-bar">
                        <div class="mini-progress-fill" style="width: ${((this.studentData.credits || 45) / 120) * 100}%"></div>
                    </div>
                </div>
            </div>
        `;

        // Add second major if exists
        if (this.studentData.secondMajor) {
            const progress = (this.studentData.secondMajor.credits / this.studentData.secondMajor.requiredCredits) * 100;
            html += `
                <div class="curriculum-item second-major">
                    <div class="curriculum-badge" style="background: #1565c0;">Second Major</div>
                    <div class="curriculum-name">${this.studentData.secondMajor.name}</div>
                    <div class="curriculum-progress">
                        <span class="progress-fraction">${this.studentData.secondMajor.credits}/${this.studentData.secondMajor.requiredCredits} credits</span>
                        <div class="mini-progress-bar">
                            <div class="mini-progress-fill" style="width: ${progress}%; background: #1565c0;"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Add minors if exist
        if (this.studentData.minors && this.studentData.minors.length > 0) {
            this.studentData.minors.forEach(minor => {
                const progress = (minor.credits / minor.requiredCredits) * 100;
                html += `
                    <div class="curriculum-item minor-item">
                        <div class="curriculum-badge" style="background: #388e3c;">Minor</div>
                        <div class="curriculum-name">${minor.name}</div>
                        <div class="curriculum-progress">
                            <span class="progress-fraction">${minor.credits}/${minor.requiredCredits} credits</span>
                            <div class="mini-progress-bar">
                                <div class="mini-progress-fill" style="width: ${progress}%; background: #388e3c;"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        activeCurricula.innerHTML = html;
    }

    populateSharedCourses() {
        const sharedCoursesGrid = document.getElementById('sharedCoursesGrid');
        if (!sharedCoursesGrid) return;

        // Shared courses that count towards multiple requirements
        const sharedCourses = [
            {
                code: 'MATH 2101',
                name: 'Calculus I',
                credits: 4,
                appliesTo: ['Electrical Engineering', 'Mathematics', 'Physics', 'General Education']
            },
            {
                code: 'MATH 2102',
                name: 'Calculus II',
                credits: 3,
                appliesTo: ['Electrical Engineering', 'Mathematics', 'Physics', 'General Education']
            },
            {
                code: 'PHYS 2101',
                name: 'Physics I',
                credits: 4,
                appliesTo: ['Electrical Engineering', 'Physics', 'General Education']
            },
            {
                code: 'ENGL 3101',
                name: 'Technical Writing',
                credits: 3,
                appliesTo: ['Electrical Engineering', 'Engineering', 'General Education']
            },
            {
                code: 'MATH 3101',
                name: 'Linear Algebra',
                credits: 3,
                appliesTo: ['Electrical Engineering', 'Mathematics', 'Data Science Minor']
            }
        ];

        let html = '';
        sharedCourses.forEach(course => {
            const appliesToTags = course.appliesTo.map(item => 
                `<span class="applies-tag">${item}</span>`
            ).join('');

            html += `
                <div class="shared-course-item">
                    <div class="shared-course-code">${course.code}</div>
                    <div class="shared-course-name">${course.name}</div>
                    <div class="course-credits" style="margin: 0.5rem 0; display: inline-block;">${course.credits} CR</div>
                    <div class="shared-course-applies">
                        ${appliesToTags}
                    </div>
                </div>
            `;
        });

        sharedCoursesGrid.innerHTML = html;
    }

    populateMajorRequirements() {
        // Populate primary major courses
        this.populatePrimaryMajorCourses();
        
        // Populate second major courses if exists
        if (this.studentData.secondMajor) {
            this.populateSecondMajorCourses();
        }
    }

    populatePrimaryMajorCourses() {
        const primaryMajorCourses = document.getElementById('primaryMajorCourses');
        if (!primaryMajorCourses) return;

        // Electrical Engineering core courses - generic course structure
        const eeCourses = [
            // Foundation Courses
            { code: 'EE 2101', name: 'Circuit Analysis I', credits: 3 },
            { code: 'EE 2102', name: 'Circuit Analysis II', credits: 3 },
            { code: 'EE 2201', name: 'Digital Logic Design', credits: 3 },
            { code: 'EE 2301', name: 'Electronics Lab', credits: 2 },
            
            // Core EE Courses
            { code: 'EE 3101', name: 'Electronic Devices', credits: 4 },
            { code: 'EE 3201', name: 'Signals and Systems', credits: 3 },
            { code: 'EE 3301', name: 'Electromagnetic Fields', credits: 3 },
            { code: 'EE 3401', name: 'Power Systems', credits: 3 },
            { code: 'EE 3501', name: 'Control Systems', credits: 3 },
            
            // Advanced Courses
            { code: 'EE 4101', name: 'Senior Design I', credits: 3 },
            { code: 'EE 4102', name: 'Senior Design II', credits: 3 },
            { code: 'EE 4201', name: 'Communication Systems', credits: 3 },
            { code: 'EE 4301', name: 'Microprocessors', credits: 3 },
            
            // Supporting Courses
            { code: 'ENGR 2001', name: 'Engineering Economics', credits: 3 },
            { code: 'CS 1201', name: 'Programming Fundamentals', credits: 3 },
            { code: 'MATH 3401', name: 'Engineering Mathematics', credits: 3 }
        ];

        let html = '';
        eeCourses.forEach(course => {
            html += `
                <div class="major-course-item">
                    <div class="major-course-info">
                        <div class="major-course-code">${course.code}</div>
                        <div class="major-course-name">${course.name}</div>
                    </div>
                    <div class="major-course-credits">${course.credits} CR</div>
                </div>
            `;
        });

        primaryMajorCourses.innerHTML = html;
    }

    populateSecondMajorCourses() {
        const secondMajorCourses = document.getElementById('secondMajorCourses');
        if (!secondMajorCourses || !this.studentData.secondMajor) return;

        // Generate courses based on the actual second major selected
        const majorName = this.studentData.secondMajor.name;
        let courses = [];

        // Define courses for different majors
        switch (majorName) {
            case 'Mathematics':
                courses = [
                    { code: 'MATH 2153', name: 'Calculus II', credits: 3 },
                    { code: 'MATH 2163', name: 'Calculus III', credits: 3 },
                    { code: 'MATH 3113', name: 'Linear Algebra', credits: 3 },
                    { code: 'MATH 3323', name: 'Differential Equations', credits: 3 },
                    { code: 'MATH 4103', name: 'Abstract Algebra', credits: 3 },
                    { code: 'MATH 4203', name: 'Real Analysis', credits: 3 }
                ];
                break;
            case 'Physics':
                courses = [
                    { code: 'PHYS 2014', name: 'University Physics I', credits: 4 },
                    { code: 'PHYS 2114', name: 'University Physics II', credits: 4 },
                    { code: 'PHYS 3054', name: 'Modern Physics', credits: 4 },
                    { code: 'PHYS 3204', name: 'Thermodynamics', credits: 4 },
                    { code: 'PHYS 4014', name: 'Quantum Mechanics', credits: 4 },
                    { code: 'PHYS 4024', name: 'Electromagnetic Theory', credits: 4 }
                ];
                break;
            case 'Business Administration':
                courses = [
                    { code: 'MGMT 3013', name: 'Principles of Management', credits: 3 },
                    { code: 'MKTG 3213', name: 'Marketing Principles', credits: 3 },
                    { code: 'ACCT 2103', name: 'Financial Accounting', credits: 3 },
                    { code: 'FIN 3113', name: 'Business Finance', credits: 3 },
                    { code: 'MGMT 4333', name: 'Strategic Management', credits: 3 },
                    { code: 'BUSN 4013', name: 'Business Ethics', credits: 3 }
                ];
                break;
            case 'Psychology':
                courses = [
                    { code: 'PSYC 2003', name: 'Research Methods', credits: 3 },
                    { code: 'PSYC 2013', name: 'Developmental Psychology', credits: 3 },
                    { code: 'PSYC 3003', name: 'Abnormal Psychology', credits: 3 },
                    { code: 'PSYC 3013', name: 'Cognitive Psychology', credits: 3 },
                    { code: 'PSYC 4003', name: 'Social Psychology', credits: 3 },
                    { code: 'PSYC 4013', name: 'Psychology Capstone', credits: 3 }
                ];
                break;
            case 'English Literature':
                courses = [
                    { code: 'ENGL 2413', name: 'World Literature I', credits: 3 },
                    { code: 'ENGL 2423', name: 'World Literature II', credits: 3 },
                    { code: 'ENGL 3323', name: 'American Literature', credits: 3 },
                    { code: 'ENGL 3413', name: 'British Literature', credits: 3 },
                    { code: 'ENGL 4003', name: 'Literary Theory', credits: 3 },
                    { code: 'ENGL 4013', name: 'Senior Seminar', credits: 3 }
                ];
                break;
            case 'Electrical Engineering':
                courses = [
                    // EE Electives and Advanced Courses
                    { code: 'EE 3601', name: 'Energy Systems', credits: 3 },
                    { code: 'EE 3701', name: 'Antenna Theory', credits: 3 },
                    { code: 'EE 3801', name: 'Digital Signal Processing', credits: 3 },
                    { code: 'EE 4401', name: 'Semiconductor Devices', credits: 3 },
                    { code: 'EE 4501', name: 'VLSI Design', credits: 3 },
                    { code: 'EE 4601', name: 'Renewable Energy Systems', credits: 3 }
                ];
                break;
            case 'Biology':
                courses = [
                    { code: 'BIOL 2004', name: 'General Biology I', credits: 4 },
                    { code: 'BIOL 2014', name: 'General Biology II', credits: 4 },
                    { code: 'BIOL 3013', name: 'Genetics', credits: 3 },
                    { code: 'BIOL 3023', name: 'Ecology', credits: 3 },
                    { code: 'BIOL 4003', name: 'Molecular Biology', credits: 3 },
                    { code: 'BIOL 4013', name: 'Evolution', credits: 3 }
                ];
                break;
            case 'Chemistry':
                courses = [
                    { code: 'CHEM 1515', name: 'General Chemistry I', credits: 5 },
                    { code: 'CHEM 1615', name: 'General Chemistry II', credits: 5 },
                    { code: 'CHEM 3053', name: 'Organic Chemistry I', credits: 3 },
                    { code: 'CHEM 3153', name: 'Organic Chemistry II', credits: 3 },
                    { code: 'CHEM 4003', name: 'Physical Chemistry', credits: 3 },
                    { code: 'CHEM 4013', name: 'Analytical Chemistry', credits: 3 }
                ];
                break;
            case 'History':
                courses = [
                    { code: 'HIST 1103', name: 'World History I', credits: 3 },
                    { code: 'HIST 1213', name: 'World History II', credits: 3 },
                    { code: 'HIST 2013', name: 'American History I', credits: 3 },
                    { code: 'HIST 2023', name: 'American History II', credits: 3 },
                    { code: 'HIST 4003', name: 'Historical Methods', credits: 3 },
                    { code: 'HIST 4013', name: 'Senior Thesis', credits: 3 }
                ];
                break;
            case 'Economics':
                courses = [
                    { code: 'ECON 1113', name: 'Principles of Macroeconomics', credits: 3 },
                    { code: 'ECON 1213', name: 'Principles of Microeconomics', credits: 3 },
                    { code: 'ECON 3013', name: 'Intermediate Microeconomics', credits: 3 },
                    { code: 'ECON 3023', name: 'Intermediate Macroeconomics', credits: 3 },
                    { code: 'ECON 4003', name: 'Econometrics', credits: 3 },
                    { code: 'ECON 4013', name: 'Economic Theory', credits: 3 }
                ];
                break;
            default:
                // Generic courses for any unlisted major
                const prefix = majorName.substring(0, 4).toUpperCase();
                courses = [
                    { code: `${prefix} 2003`, name: `Introduction to ${majorName}`, credits: 3 },
                    { code: `${prefix} 3003`, name: `Intermediate ${majorName}`, credits: 3 },
                    { code: `${prefix} 3013`, name: `Advanced ${majorName} I`, credits: 3 },
                    { code: `${prefix} 3023`, name: `Advanced ${majorName} II`, credits: 3 },
                    { code: `${prefix} 4003`, name: `${majorName} Research Methods`, credits: 3 },
                    { code: `${prefix} 4013`, name: `${majorName} Capstone`, credits: 3 }
                ];
        }

        let html = '';
        courses.forEach(course => {
            html += `
                <div class="major-course-item">
                    <div class="major-course-info">
                        <div class="major-course-code">${course.code}</div>
                        <div class="major-course-name">${course.name}</div>
                    </div>
                    <div class="major-course-credits">${course.credits} CR</div>
                </div>
            `;
        });

        secondMajorCourses.innerHTML = html;
    }

    populateMinorCourses() {
        const minorsGrid = document.getElementById('minorsGrid');
        if (!minorsGrid || !this.studentData.minors || this.studentData.minors.length === 0) return;

        let html = '';
        this.studentData.minors.forEach(minor => {
            // Example courses for different minors
            let minorCourses = [];
            if (minor.name === 'Data Science') {
                minorCourses = [
                    { code: 'DS 2003', name: 'Introduction to Data Science', credits: 3 },
                    { code: 'DS 3013', name: 'Data Mining', credits: 3 },
                    { code: 'DS 3023', name: 'Machine Learning', credits: 3 },
                    { code: 'DS 4003', name: 'Data Visualization', credits: 3 },
                    { code: 'DS 4013', name: 'Big Data Analytics', credits: 3 },
                    { code: 'DS 4023', name: 'Capstone Project', credits: 3 }
                ];
            } else {
                // Generic minor courses
                minorCourses = [
                    { code: `${minor.name.substring(0,2).toUpperCase()} 2003`, name: `Introduction to ${minor.name}`, credits: 3 },
                    { code: `${minor.name.substring(0,2).toUpperCase()} 3003`, name: `Intermediate ${minor.name}`, credits: 3 },
                    { code: `${minor.name.substring(0,2).toUpperCase()} 3013`, name: `Advanced ${minor.name}`, credits: 3 },
                    { code: `${minor.name.substring(0,2).toUpperCase()} 4003`, name: `${minor.name} Applications`, credits: 3 },
                    { code: `${minor.name.substring(0,2).toUpperCase()} 4013`, name: `${minor.name} Seminar`, credits: 3 },
                    { code: `${minor.name.substring(0,2).toUpperCase()} 4023`, name: `${minor.name} Project`, credits: 3 }
                ];
            }

            const progress = (minor.credits / minor.requiredCredits) * 100;
            let coursesHtml = '';
            minorCourses.forEach(course => {
                coursesHtml += `
                    <div class="minor-course-item">
                        <div class="minor-course-info">
                            <div class="minor-course-code">${course.code}</div>
                            <div class="minor-course-name">${course.name}</div>
                        </div>
                        <div class="minor-course-credits">${course.credits} CR</div>
                    </div>
                `;
            });

            html += `
                <div class="minor-item">
                    <div class="minor-header">
                        <div class="minor-name">${minor.name}</div>
                        <div class="minor-progress">${minor.credits}/${minor.requiredCredits} credits</div>
                    </div>
                    <div class="minor-courses">
                        ${coursesHtml}
                    </div>
                </div>
            `;
        });

        minorsGrid.innerHTML = html;
    }

    // Employee Management Methods
    loadEmployeeInfo() {
        if (this.studentData.employment) {
            this.loadPaystubs();
            this.loadWorkSummary();
            this.loadCombinedSchedule();
        }
    }

    loadPaystubs() {
        if (!this.paystubsListEl || !this.studentData.employment) return;

        const employment = this.studentData.employment;
        const paystubs = employment.paystubs || [];

        const paystubsHTML = paystubs.map(paystub => `
            <div class="paystub-item">
                <div class="paystub-header">
                    <h4>Pay Period: ${new Date(paystub.payPeriodStart).toLocaleDateString()} - ${new Date(paystub.payPeriodEnd).toLocaleDateString()}</h4>
                    <span class="paystub-net">$${paystub.netPay.toFixed(2)}</span>
                </div>
                <div class="paystub-details">
                    <div class="detail-row">
                        <span>Hours Worked:</span>
                        <span>${paystub.hoursWorked}</span>
                    </div>
                    <div class="detail-row">
                        <span>Hourly Rate:</span>
                        <span>$${paystub.hourlyRate.toFixed(2)}</span>
                    </div>
                    <div class="detail-row">
                        <span>Gross Pay:</span>
                        <span>$${paystub.grossPay.toFixed(2)}</span>
                    </div>
                    <div class="detail-row">
                        <span>Taxes/Deductions:</span>
                        <span>-$${paystub.taxes.toFixed(2)}</span>
                    </div>
                    <div class="detail-row total">
                        <span>Net Pay:</span>
                        <span>$${paystub.netPay.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');

        this.paystubsListEl.innerHTML = paystubsHTML || '<p class="no-data">No paystubs available. Click "Add Paystub" to get started.</p>';
    }

    loadWorkSummary() {
        if (!this.workSummaryEl || !this.studentData.employment) return;

        const employment = this.studentData.employment;
        const totalEarnings = employment.paystubs.reduce((sum, paystub) => sum + paystub.netPay, 0);
        const totalHours = employment.paystubs.reduce((sum, paystub) => sum + paystub.hoursWorked, 0);

        const summaryHTML = `
            <div class="work-stats">
                <div class="work-stat">
                    <div class="stat-icon"><i class="fas fa-briefcase"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Position</div>
                        <div class="stat-value">${employment.position}</div>
                    </div>
                </div>
                <div class="work-stat">
                    <div class="stat-icon"><i class="fas fa-dollar-sign"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Hourly Rate</div>
                        <div class="stat-value">$${employment.hourlyRate.toFixed(2)}</div>
                    </div>
                </div>
                <div class="work-stat">
                    <div class="stat-icon"><i class="fas fa-clock"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Total Hours</div>
                        <div class="stat-value">${totalHours} hrs</div>
                    </div>
                </div>
                <div class="work-stat">
                    <div class="stat-icon"><i class="fas fa-money-bill-wave"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Total Earnings</div>
                        <div class="stat-value">$${totalEarnings.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `;

        this.workSummaryEl.innerHTML = summaryHTML;
    }

    loadCombinedSchedule() {
        if (!this.combinedScheduleEl || !this.studentData.schedule) return;

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

        let scheduleHTML = `
            <div class="schedule-header">Time</div>
            ${days.map(day => `<div class="schedule-header">${day}</div>`).join('')}
        `;

        times.forEach(time => {
            scheduleHTML += `<div class="schedule-time">${time}</div>`;
            days.forEach(day => {
                const daySchedule = this.studentData.schedule[day] || [];
                const itemAtTime = daySchedule.find(item => item.time === time);
                
                if (itemAtTime) {
                    const isWork = itemAtTime.type === 'work';
                    scheduleHTML += `
                        <div class="schedule-cell ${isWork ? 'work-cell' : 'class-cell'}">
                            <div class="schedule-item">
                                <div class="item-name">${itemAtTime.class}</div>
                                <div class="item-room">${itemAtTime.room}</div>
                            </div>
                        </div>
                    `;
                } else {
                    scheduleHTML += `<div class="schedule-cell"></div>`;
                }
            });
        });

        this.combinedScheduleEl.innerHTML = scheduleHTML;
    }

    showPaystubModal() {
        const modal = document.getElementById('paystubModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Pre-fill hourly rate if available
        if (this.studentData.employment) {
            const hourlyRateInput = document.getElementById('hourlyRate');
            if (hourlyRateInput) {
                hourlyRateInput.value = this.studentData.employment.hourlyRate;
            }
        }
    }

    closePaystubModal() {
        const modal = document.getElementById('paystubModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('paystubForm');
        if (form) form.reset();
    }

    calculatePaystubAmounts() {
        const hoursWorked = parseFloat(document.getElementById('hoursWorked').value) || 0;
        const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
        const taxes = parseFloat(document.getElementById('taxes').value) || 0;

        const grossPay = hoursWorked * hourlyRate;
        const netPay = grossPay - taxes;

        document.getElementById('grossPay').value = grossPay.toFixed(2);
        document.getElementById('netPay').value = netPay.toFixed(2);
    }

    savePaystub() {
        const form = document.getElementById('paystubForm');
        const formData = new FormData(form);
        
        const paystub = {
            id: Date.now(), // Simple ID generation
            payPeriodStart: document.getElementById('payPeriodStart').value,
            payPeriodEnd: document.getElementById('payPeriodEnd').value,
            hoursWorked: parseFloat(document.getElementById('hoursWorked').value),
            hourlyRate: parseFloat(document.getElementById('hourlyRate').value),
            grossPay: parseFloat(document.getElementById('grossPay').value),
            taxes: parseFloat(document.getElementById('taxes').value) || 0,
            netPay: parseFloat(document.getElementById('netPay').value)
        };

        // Validate required fields
        if (!paystub.payPeriodStart || !paystub.payPeriodEnd || !paystub.hoursWorked || !paystub.hourlyRate) {
            alert('Please fill in all required fields.');
            return;
        }

        // Add to student data
        if (!this.studentData.employment.paystubs) {
            this.studentData.employment.paystubs = [];
        }
        this.studentData.employment.paystubs.unshift(paystub); // Add to beginning

        // Reload displays
        this.loadPaystubs();
        this.loadWorkSummary();
        this.closePaystubModal();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.studentPortal = new StudentPortal();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StudentPortal;
}