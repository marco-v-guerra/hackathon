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
        this.courseCatalogEl = document.getElementById('courseCatalog');
        this.balanceSummaryEl = document.getElementById('balanceSummary');
        this.transactionsEl = document.getElementById('transactions');
        this.financialAidEl = document.getElementById('financialAid');
        this.paymentScheduleEl = document.getElementById('paymentSchedule');
        this.mealPlanBudgetEl = document.getElementById('mealPlanBudget');
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
                    ],
                    "mealPlan": {
                        "totalBudget": 2100.00,
                        "spent": 420.00,
                        "semesterStartDate": "2025-08-26",
                        "semesterEndDate": "2025-12-13",
                        "mealsPerDay": 3
                    }
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
                    ],
                    "mealPlan": {
                        "totalBudget": 2300.00,
                        "spent": 690.00,
                        "semesterStartDate": "2025-08-26",
                        "semesterEndDate": "2025-12-13",
                        "mealsPerDay": 3
                    }
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

    getCourseDatabase() {
        return {
            'Electrical Engineering': {
                'Foundation Courses': [
                    { code: 'MATH 1813', name: 'Precalculus', credits: 3, prerequisites: [], programTags: ['Electrical Engineering', 'Mathematics Major'] },
                    { code: 'MATH 2153', name: 'Calculus I', credits: 3, prerequisites: ['MATH 1813'], programTags: ['Electrical Engineering', 'Mathematics Major'] },
                    { code: 'MATH 2163', name: 'Calculus II', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Electrical Engineering', 'Mathematics Major'] },
                    { code: 'MATH 2233', name: 'Differential Equations', credits: 3, prerequisites: ['MATH 2163'], programTags: ['Electrical Engineering', 'Mathematics Major'] },
                    { code: 'MATH 3013', name: 'Linear Algebra', credits: 3, prerequisites: ['MATH 2163'], programTags: ['Electrical Engineering', 'Mathematics Major'] },
                    { code: 'PHYS 2114', name: 'University Physics I', credits: 4, prerequisites: ['MATH 2153'], programTags: ['Electrical Engineering'] },
                    { code: 'PHYS 3313', name: 'Modern Physics', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2163'], programTags: ['Electrical Engineering'] },
                    { code: 'ENGL 3323', name: 'Technical Writing', credits: 3, prerequisites: [], programTags: ['Electrical Engineering'] }
                ],
                'Core ECEN Courses': [
                    { code: 'ECEN 2011', name: 'Experimental Methods I', credits: 1, prerequisites: ['PHYS 2114'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 2233', name: 'Fundamentals of Digital Logic Design', credits: 3, prerequisites: ['MATH 1813'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 2714', name: 'Fundamentals of Electric Circuits', credits: 4, prerequisites: ['MATH 2153', 'PHYS 2114', 'MATH 2233', 'ENSC 2611'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 3714', name: 'Network Analysis', credits: 4, prerequisites: ['MATH 2233', 'PHYS 2114', 'ECEN 2714'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 3314', name: 'Electronic Devices and Applications', credits: 4, prerequisites: ['ECEN 3714', 'ENSC 2611'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 3513', name: 'Signal Analysis', credits: 3, prerequisites: ['ECEN 3714'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 3613', name: 'Applied Fields and Waves I', credits: 3, prerequisites: ['MATH 2163', 'ECEN 3714'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 3623', name: 'Applied Fields and Waves II', credits: 3, prerequisites: ['ECEN 3613'], programTags: ['Electrical Engineering'] },
                    { code: 'ECEN 3723', name: 'Systems I', credits: 3, prerequisites: ['ECEN 3714', 'ENSC 2113', 'MATH 3013'], programTags: ['Electrical Engineering'] }
                ],
                'Engineering Support': [
                    { code: 'CS 1113', name: 'Introduction to Programming', credits: 3, prerequisites: [] },
                    { code: 'CS 2133', name: 'Introduction to Computer Science', credits: 3, prerequisites: ['CS 1113'] },
                    { code: 'CS 2433', name: 'Data Structures', credits: 3, prerequisites: ['CS 2133'] },
                    { code: 'ENSC 2113', name: 'Statics', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2153'] },
                    { code: 'ENSC 2411', name: 'Engineering Laboratory I', credits: 1, prerequisites: ['PHYS 2114'] },
                    { code: 'ENSC 2611', name: 'Engineering Mathematics', credits: 1, prerequisites: ['MATH 2163'] },
                    { code: 'ENSC 2613', name: 'Thermodynamics', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2163'] },
                    { code: 'ENSC 3213', name: 'Engineering Systems Design', credits: 3, prerequisites: ['ENSC 2113'] },
                    { code: 'ENGR 1412', name: 'Introduction to Engineering', credits: 2, prerequisites: [] },
                    { code: 'STAT 4033', name: 'Probability and Statistics', credits: 3, prerequisites: ['MATH 2163'] }
                ],
                'Advanced ECEN': [
                    { code: 'ECEN 3113', name: 'Energy, Environment and Economics', credits: 3, prerequisites: ['ECEN 3714'] },
                    { code: 'ECEN 3213', name: 'Computer Based Systems in Engineering', credits: 3, prerequisites: ['ECEN 2714', 'ECEN 2233', 'CS 2433'] },
                    { code: 'ECEN 4013', name: 'Design of Engineering Systems', credits: 3, prerequisites: ['ECEN 3213', 'ECEN 2233', 'ECEN 3714', 'ECEN 3613', 'ECEN 3513', 'ECEN 3314', 'ENGL 3323'] },
                    { code: 'ECEN 4024', name: 'Capstone Design', credits: 4, prerequisites: ['ECEN 4013', 'ECEN 4503'] },
                    { code: 'ECEN 4133', name: 'Power Electronics', credits: 3, prerequisites: ['ECEN 3714'] },
                    { code: 'ECEN 4153', name: 'Power System Analysis and Design', credits: 3, prerequisites: ['ECEN 3714'] },
                    { code: 'ECEN 4213', name: 'Embedded Computer Systems Design', credits: 3, prerequisites: ['ECEN 3213', 'ECEN 2233', 'ECEN 3714'] },
                    { code: 'ECEN 4313', name: 'Linear Electronics Circuit Design', credits: 3, prerequisites: ['ECEN 3314'] },
                    { code: 'ECEN 4413', name: 'Automatic Control Systems', credits: 3, prerequisites: ['ECEN 3723'] },
                    { code: 'ECEN 4503', name: 'Applications of Probability and Statistics to Random Signals', credits: 3, prerequisites: ['ECEN 3513'] },
                    { code: 'ECEN 4523', name: 'Communication Theory', credits: 3, prerequisites: ['ECEN 4503'] },
                    { code: 'ECEN 4763', name: 'Introduction to Digital Signal Processing', credits: 3, prerequisites: ['ECEN 3513'] }
                ],
                'Electives': [
                    { code: 'ECEN 3020', name: 'Supervised Research Project', credits: 1, prerequisites: [] },
                    { code: 'ECEN 3903', name: 'Introduction to Semiconductor Devices', credits: 3, prerequisites: ['ECEN 3714'] },
                    { code: 'ECEN 3913', name: 'Solid State Electronic Devices', credits: 3, prerequisites: ['ECEN 3714', 'PHYS 3313'] },
                    { code: 'MAE 3723', name: 'Control Systems I', credits: 3, prerequisites: [] },
                    { code: 'MAE 3724', name: 'Control Systems Laboratory', credits: 1, prerequisites: ['MAE 3723'] },
                    { code: 'MAE 4733', name: 'Mechatronics', credits: 3, prerequisites: ['MAE 3723'] },
                    { code: 'PHYS 3213', name: 'Optics', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2163'] },
                    { code: 'CHEM 3553', name: 'Physical Chemistry', credits: 3, prerequisites: [] }
                ]
            },
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
            },
            'Mathematics Major': {
                'Foundation Courses': [
                    { code: 'MATH 1483', name: 'Mathematical Functions and Their Uses (Q)', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 1493', name: 'Applications of Modern Mathematics (Q)', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 1513', name: 'College Algebra (Q)', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 1583', name: 'Applied Geometry and Trigonometry (Q)', credits: 3, prerequisites: ['MATH 1483 or MATH 1513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 1613', name: 'Trigonometry (Q)', credits: 3, prerequisites: ['MATH 1513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 1715', name: 'Precalculus (Q)', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 1813', name: 'Preparation for Calculus (Q)', credits: 3, prerequisites: ['MATH 1513'], programTags: ['Mathematics Major', 'Electrical Engineering'] },
                    { code: 'MATH 2103', name: 'Business Calculus (Q)', credits: 3, prerequisites: ['MATH 1483 or MATH 1513 or MATH 1715 or MATH 1813'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2123', name: 'Calculus for Technology Programs I (Q)', credits: 3, prerequisites: ['MATH 1613 or MATH 1715 or MATH 1813'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2133', name: 'Calculus for Technology Programs II (Q)', credits: 3, prerequisites: ['MATH 2123 or MATH 2144'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2144', name: 'Calculus I (Q)', credits: 4, prerequisites: ['MATH 1613 or MATH 1715 or MATH 1813'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2153', name: 'Calculus II (Q)', credits: 3, prerequisites: ['MATH 2144'], programTags: ['Mathematics Major', 'Electrical Engineering'] },
                    { code: 'MATH 2163', name: 'Calculus III', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major', 'Electrical Engineering'] },
                    { code: 'MATH 2233', name: 'Differential Equations', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major', 'Electrical Engineering'] },
                    { code: 'MATH 3013', name: 'Linear Algebra (Q)', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major', 'Electrical Engineering'] }
                ],
                'Core Mathematics': [
                    { code: 'MATH 3263', name: 'Linear Algebra and Differential Equations', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3303', name: 'Advanced Perspectives on Secondary Mathematics', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3403', name: 'Geometric Structures for Early Childhood and Elementary Teachers', credits: 3, prerequisites: ['MATH 1483 or MATH 1493 or MATH 1513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3583', name: 'Introduction to Mathematical Modeling', credits: 3, prerequisites: ['MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3603', name: 'Mathematical Structures for Early Childhood and Elementary Teachers', credits: 3, prerequisites: ['MATH 1483 or MATH 1493 or MATH 1513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3613', name: 'Introduction to Abstract Algebra', credits: 3, prerequisites: ['MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3703', name: 'Mathematical Structures in the Middle Grades', credits: 3, prerequisites: ['MATH 3603 and MATH 3403'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3933', name: 'Introduction to Mathematical Research', credits: 3, prerequisites: ['MATH 3013'], programTags: ['Mathematics Major'] }
                ],
                'Advanced Mathematics': [
                    { code: 'MATH 4003', name: 'Mathematical Logic and Computability', credits: 3, prerequisites: ['MATH 3613 or PHIL 3003'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4013', name: 'Calculus of Several Variables', credits: 3, prerequisites: ['MATH 2163 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4023', name: 'Introduction to Analysis', credits: 3, prerequisites: ['MATH 2153 and MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4033', name: 'History of Mathematics', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4063', name: 'Advanced Linear Algebra', credits: 3, prerequisites: ['MATH 3013 and MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4083', name: 'Intermediate Analysis', credits: 3, prerequisites: ['MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4143', name: 'Advanced Calculus I', credits: 3, prerequisites: ['MATH 2163, MATH 3013, and MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4153', name: 'Advanced Calculus II', credits: 3, prerequisites: ['MATH 4143'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4233', name: 'Intermediate Differential Equations', credits: 3, prerequisites: ['MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4263', name: 'Introduction to Partial Differential Equations', credits: 3, prerequisites: ['MATH 2163 and MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4283', name: 'Functions of a Complex Variable', credits: 3, prerequisites: ['MATH 4013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4343', name: 'Introduction to Topology', credits: 3, prerequisites: ['MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4403', name: 'Geometry', credits: 3, prerequisites: ['MATH 3013 and MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4423', name: 'Geometry and Algorithms in Three-Dimensional Modeling', credits: 3, prerequisites: ['MATH 2163 and MATH 3013 and (CS 1103 or CS 1113 or ENGR 1412)'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4443', name: 'Differential Geometry of Curves and Surfaces', credits: 3, prerequisites: ['MATH 2163 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4453', name: 'Mathematical Interest Theory', credits: 3, prerequisites: ['MATH 2153 and MATH 2233'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4513', name: 'Introduction to Numerical Analysis', credits: 3, prerequisites: ['MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4533', name: 'Matrix Methods in Machine Learning', credits: 3, prerequisites: ['MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4553', name: 'Introduction to Optimization', credits: 3, prerequisites: ['MATH 2163 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4573', name: 'Introduction to Mathematical Epidemiology', credits: 3, prerequisites: ['MATH 2163, MATH 2233, and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4613', name: 'Abstract Algebra I', credits: 3, prerequisites: ['MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4623', name: 'Abstract Algebra II', credits: 3, prerequisites: ['MATH 4613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4663', name: 'Combinatorics', credits: 3, prerequisites: ['MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4713', name: 'Number Theory', credits: 3, prerequisites: ['MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4753', name: 'Introduction to Cryptography', credits: 3, prerequisites: ['MATH 3013 and (MATH 3613 or CS 3653)'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4813', name: 'Groups and Representations', credits: 3, prerequisites: ['MATH 3013 and MATH 3613'], programTags: ['Mathematics Major'] }
                ],
                'Special Studies & Research': [
                    { code: 'MATH 1910', name: 'Special Studies', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2890', name: 'Honors Experience in Math', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2900', name: 'Undergraduate Research', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 2910', name: 'Special Studies', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3890', name: 'Advanced Honors Experience in Mathematics', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 3910', name: 'Special Studies', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4590', name: 'Professional Practice in Mathematics', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4900', name: 'Undergraduate Research', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4910', name: 'Special Studies', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4950', name: 'Problem Solving Seminar', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4963', name: 'Preparation for Senior Thesis', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4973', name: 'Senior Thesis', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 4993', name: 'Senior Honors Thesis', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] }
                ],
                'Graduate Level': [
                    { code: 'MATH 5000', name: 'Master\'s Research and Thesis', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5003', name: 'Abstract Algebra I', credits: 3, prerequisites: ['MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5010', name: 'Seminar in Mathematics', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5013', name: 'Abstract Algebra II', credits: 3, prerequisites: ['MATH 4613 or MATH 5003'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5023', name: 'Advanced Linear Algebra', credits: 3, prerequisites: ['MATH 3013 and MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5033', name: 'History of Mathematics', credits: 3, prerequisites: ['MATH 2153'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5043', name: 'Advanced Calculus I', credits: 3, prerequisites: ['MATH 2163, MATH 3013, and MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5053', name: 'Advanced Calculus II', credits: 3, prerequisites: ['MATH 4143 or MATH 5043'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5063', name: 'Calculus of Several Variables', credits: 3, prerequisites: ['MATH 2163 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5073', name: 'Introduction to Analysis', credits: 3, prerequisites: ['MATH 2153 and MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5083', name: 'Intermediate Analysis', credits: 3, prerequisites: ['MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5133', name: 'Stochastic Processes', credits: 3, prerequisites: ['MATH 2233, MATH 3013 and STAT 5123'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5143', name: 'Real Analysis I', credits: 3, prerequisites: ['MATH 4153 or MATH 5053'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5153', name: 'Real Analysis II', credits: 3, prerequisites: ['MATH 5143'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5193', name: 'Differentiable Manifolds', credits: 3, prerequisites: ['MATH 4153 or MATH 5053'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5203', name: 'Intermediate Differential Equations', credits: 3, prerequisites: ['MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5213', name: 'Fourier Analysis and Wavelets', credits: 3, prerequisites: ['MATH 4013 or MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5233', name: 'Partial Differential Equations', credits: 3, prerequisites: ['MATH 4013, MATH 4143 and MATH 4233'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5243', name: 'Ordinary Differential Equations', credits: 3, prerequisites: ['MATH 4143 or MATH 5043; MATH 4233; MATH 5023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5253', name: 'Advanced Ordinary Differential Equations', credits: 3, prerequisites: ['MATH 5243'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5263', name: 'Introduction to Partial Differential Equations', credits: 3, prerequisites: ['MATH 2163 and MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5273', name: 'Functions of a Complex Variable', credits: 3, prerequisites: ['MATH 4013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5283', name: 'Complex Analysis I', credits: 3, prerequisites: ['MATH 4153 or MATH 5053'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5293', name: 'Complex Analysis II', credits: 3, prerequisites: ['MATH 5283'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5303', name: 'General Topology', credits: 3, prerequisites: ['MATH 4143 or MATH 5043'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5313', name: 'Geometric Topology', credits: 3, prerequisites: ['MATH 4613 or MATH 5003, MATH 5303'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5343', name: 'Introduction to Topology', credits: 3, prerequisites: ['MATH 4023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5413', name: 'Differential Geometry', credits: 3, prerequisites: ['MATH 4013 or MATH 4143 or MATH 5043'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5423', name: 'Geometry and Algorithms in Three-Dimensional Modeling', credits: 3, prerequisites: ['MATH 2163 and MATH 3013 and (CS 1113 or ENGR 1412)'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5443', name: 'Differential Geometry of Curves and Surfaces', credits: 3, prerequisites: ['MATH 2163 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5453', name: 'Mathematical Interest Theory', credits: 3, prerequisites: ['MATH 2153 and MATH 2233'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5473', name: 'Financial Calculus', credits: 3, prerequisites: ['MATH 4143 or MATH 5043, STAT 4203'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5503', name: 'Introduction to Optimization', credits: 3, prerequisites: ['MATH 2163 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5513', name: 'Introduction to Numerical Analysis', credits: 3, prerequisites: ['MATH 2233 and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5533', name: 'Matrix Methods in Machine Learning', credits: 3, prerequisites: ['MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5543', name: 'Numerical Analysis for Differential Equations', credits: 3, prerequisites: ['MATH 4233, MATH 4513 or CS 4513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5553', name: 'Numerical Analysis for Linear Algebra', credits: 3, prerequisites: ['MATH 3013, and MATH 4513 or CS 4513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5563', name: 'Finite Element Methods for Partial Differential Equations', credits: 3, prerequisites: ['MATH 4023; MATH 4263; and MATH 4513 or CS 4513'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5573', name: 'Introduction to Mathematical Epidemiology', credits: 3, prerequisites: ['MATH 2163, MATH 2233, and MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5580', name: 'Case Studies in Applied Mathematics', credits: 3, prerequisites: ['MATH 2233, MATH 4013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5593', name: 'Methods of Applied Mathematics', credits: 3, prerequisites: ['MATH 2233, MATH 4013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5613', name: 'Algebra I', credits: 3, prerequisites: ['MATH 4613 or MATH 5003'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5623', name: 'Algebra II', credits: 3, prerequisites: ['MATH 5613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5673', name: 'Combinatorics', credits: 3, prerequisites: ['MATH 3013'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5713', name: 'Number Theory', credits: 3, prerequisites: ['MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5753', name: 'Introduction to Cryptography', credits: 3, prerequisites: ['MATH 3013 and (MATH 3613 or CS 3653)'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5803', name: 'Groups and Representations', credits: 3, prerequisites: ['MATH 3013 and MATH 3613'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5903', name: 'Seminar and Practicum in the Teaching of College Mathematics', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 5913', name: 'Introduction to Research in Mathematics Education', credits: 3, prerequisites: ['MATH 3613 or MATH 4023'], programTags: ['Mathematics Major'] }
                ],
                'Doctoral Level': [
                    { code: 'MATH 6000', name: 'Doctoral Research and Dissertation', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6010', name: 'Advanced Seminar in Mathematics', credits: 1, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6090', name: 'Doctoral Research Project', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6143', name: 'Functional Analysis I', credits: 3, prerequisites: ['MATH 4613 or MATH 5003 or MATH 5023, MATH 5153, MATH 5303'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6213', name: 'Harmonic Analysis', credits: 3, prerequisites: ['MATH 5153, MATH 5283'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6233', name: 'Advanced Partial Differential Equations', credits: 3, prerequisites: ['MATH 5233'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6263', name: 'Potential Theory', credits: 3, prerequisites: ['MATH 5153 and MATH 5283'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6283', name: 'Several Complex Variables', credits: 3, prerequisites: ['MATH 5283'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6290', name: 'Topics in Analysis', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6323', name: 'Algebraic Topology I', credits: 3, prerequisites: ['MATH 5313'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6390', name: 'Topics in Topology', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6433', name: 'Algebraic Geometry', credits: 3, prerequisites: ['MATH 5623'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6453', name: 'Complex Geometry', credits: 3, prerequisites: ['MATH 5283'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6490', name: 'Topics in Geometry', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6513', name: 'Theoretical Numerical Analysis', credits: 3, prerequisites: ['MATH 5153, MATH 5543 or CS 5543, and MATH 5553 or CS 5553'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6590', name: 'Topics in Applied Mathematics', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6613', name: 'Commutative Algebra', credits: 3, prerequisites: ['MATH 5623'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6623', name: 'Homological Algebra', credits: 3, prerequisites: ['MATH 5623'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6690', name: 'Topics in Algebra', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6713', name: 'Analytic Number Theory', credits: 3, prerequisites: ['MATH 4283 or MATH 5283'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6723', name: 'Algebraic Number Theory', credits: 3, prerequisites: ['MATH 5013 or MATH 5623'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6790', name: 'Topics in Number Theory', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6813', name: 'Lie Groups and Representations', credits: 3, prerequisites: ['MATH 4153 or MATH 5053, MATH 4613 or MATH 5003, MATH 5303'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6823', name: 'Lie Algebras', credits: 3, prerequisites: ['MATH 5013 and MATH 5023'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6890', name: 'Topics in Representation Theory', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6923', name: 'Research in Undergraduate Mathematics Education', credits: 3, prerequisites: ['MATH 5913'], programTags: ['Mathematics Major'] },
                    { code: 'MATH 6990', name: 'Topics in Collegiate Mathematics Education', credits: 3, prerequisites: [], programTags: ['Mathematics Major'] }
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
}
