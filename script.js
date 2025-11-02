// Student Portal Application
class StudentPortal {
    constructor() {
        this.studentData = null;
        this.currentTab = 'overview';
        
        // Initialize course tracking system
        this.initializeCourseTrackingSystem();
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadStudentData();
    }

    initializeCourseTrackingSystem() {
        // Initialize centralized course database
        this.initializeCourseDatabase();
        
        // Course tracking variables
        this.completedCourses = new Set(); // Courses that have been completed
        this.inProgressCourses = new Set(); // Currently enrolled courses
        this.plannedCourses = new Map(); // semester -> [courses] mapping
        this.courseGrades = new Map(); // course code -> grade mapping
        this.semesterHistory = []; // chronological list of semesters
        
        // Prerequisite chain cache for performance
        this.prerequisiteCache = new Map();
    }

    initializeCourseDatabase() {
        // ========== CENTRALIZED COURSE DATABASE ==========
        // All courses defined as variables for consistent reference

        // Mathematics Courses
        this.MATH_1813 = { code: 'MATH 1813', name: 'Precalculus', credits: 3, prerequisites: [] };
        this.MATH_2144 = { code: 'MATH 2144', name: 'Calculus I', credits: 4, prerequisites: ['MATH 1813'] };
        this.MATH_2153 = { code: 'MATH 2153', name: 'Calculus II', credits: 3, prerequisites: ['MATH 2144'] };
        this.MATH_2163 = { code: 'MATH 2163', name: 'Calculus III', credits: 3, prerequisites: ['MATH 2153'] };
        this.MATH_2233 = { code: 'MATH 2233', name: 'Differential Equations', credits: 3, prerequisites: ['MATH 2153'] };
        this.MATH_3013 = { code: 'MATH 3013', name: 'Linear Algebra', credits: 3, prerequisites: ['MATH 2153'] };
        this.MATH_3113 = { code: 'MATH 3113', name: 'Introduction to Linear Algebra', credits: 3, prerequisites: ['MATH 2153'] };

        // Physics Courses
        this.PHYS_2014 = { code: 'PHYS 2014', name: 'University Physics I', credits: 4, prerequisites: ['MATH 2144'] };
        this.PHYS_2114 = { code: 'PHYS 2114', name: 'University Physics II', credits: 4, prerequisites: ['PHYS 2014', 'MATH 2153'] };
        this.PHYS_3313 = { code: 'PHYS 3313', name: 'Modern Physics', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2163'] };

        // Chemistry Courses  
        this.CHEM_1414 = { code: 'CHEM 1414', name: 'General Chemistry for Engineers', credits: 4, prerequisites: [] };
        this.CHEM_1515 = { code: 'CHEM 1515', name: 'General Chemistry I', credits: 5, prerequisites: [] };
        this.CHEM_1615 = { code: 'CHEM 1615', name: 'General Chemistry II', credits: 5, prerequisites: ['CHEM 1515'] };
        this.CHEM_3053 = { code: 'CHEM 3053', name: 'Organic Chemistry I', credits: 3, prerequisites: ['CHEM 1615'] };

        // English/Communication Courses
        this.ENGL_1113 = { code: 'ENGL 1113', name: 'Composition I', credits: 3, prerequisites: [] };
        this.ENGL_1313 = { code: 'ENGL 1313', name: 'Critical Analysis and Writing I', credits: 3, prerequisites: [] };
        this.ENGL_3323 = { code: 'ENGL 3323', name: 'Technical Writing', credits: 3, prerequisites: ['ENGL 1113'] };

        // Computer Science Courses
        this.CS_1113 = { code: 'CS 1113', name: 'Computer Science I', credits: 3, prerequisites: [] };
        this.CS_1323 = { code: 'CS 1323', name: 'Computer Science II', credits: 3, prerequisites: ['CS 1113'] };
        this.CS_2133 = { code: 'CS 2133', name: 'Data Structures', credits: 3, prerequisites: ['CS 1323'] };
        this.CS_2433 = { code: 'CS 2433', name: 'C/C++ Programming', credits: 3, prerequisites: ['CS 1113'] };
        this.CS_2714 = { code: 'CS 2714', name: 'Computer Organization', credits: 4, prerequisites: ['CS 1323'] };
        this.CS_3353 = { code: 'CS 3353', name: 'Algorithms and Data Structures', credits: 3, prerequisites: ['CS 2133'] };
        this.CS_3443 = { code: 'CS 3443', name: 'Computer Systems', credits: 3, prerequisites: ['CS 2714'] };
        this.CS_3613 = { code: 'CS 3613', name: 'Operating Systems', credits: 3, prerequisites: ['CS 2714'] };
        this.CS_3823 = { code: 'CS 3823', name: 'Database Systems', credits: 3, prerequisites: ['CS 2133'] };
        this.CS_4143 = { code: 'CS 4143', name: 'Senior Capstone I', credits: 3, prerequisites: ['CS 3353'] };
        this.CS_4153 = { code: 'CS 4153', name: 'Senior Capstone II', credits: 3, prerequisites: ['CS 4143'] };
        this.CS_4273 = { code: 'CS 4273', name: 'Software Engineering', credits: 3, prerequisites: ['CS 3353'] };
        this.CS_4413 = { code: 'CS 4413', name: 'Web Technologies', credits: 3, prerequisites: ['CS 2133'] };

        // Engineering Science Courses
        this.ENSC_2113 = { code: 'ENSC 2113', name: 'Statics', credits: 3, prerequisites: ['PHYS 2014', 'MATH 2144'] };
        this.ENSC_2123 = { code: 'ENSC 2123', name: 'Elementary Dynamics', credits: 3, prerequisites: ['ENSC 2113'] };
        this.ENSC_2143 = { code: 'ENSC 2143', name: 'Strength of Materials', credits: 3, prerequisites: ['ENSC 2113'] };
        this.ENSC_2213 = { code: 'ENSC 2213', name: 'Thermodynamics', credits: 3, prerequisites: ['PHYS 2014', 'MATH 2153'] };
        this.ENSC_2411 = { code: 'ENSC 2411', name: 'Engineering Laboratory I', credits: 1, prerequisites: ['PHYS 2014'] };
        this.ENSC_2611 = { code: 'ENSC 2611', name: 'Electrical Fabrication Lab', credits: 1, prerequisites: ['PHYS 2014'] };
        this.ENSC_3213 = { code: 'ENSC 3213', name: 'Engineering Systems Design', credits: 3, prerequisites: ['ENSC 2113'] };

        // Electrical & Computer Engineering Courses
        this.ECEN_2011 = { code: 'ECEN 2011', name: 'Experimental Methods I', credits: 1, prerequisites: ['PHYS 2014'] };
        this.ECEN_2233 = { code: 'ECEN 2233', name: 'Fundamentals of Digital Logic Design', credits: 3, prerequisites: ['MATH 1813'] };
        this.ECEN_2714 = { code: 'ECEN 2714', name: 'Fundamentals of Electric Circuits', credits: 4, prerequisites: ['MATH 2153', 'PHYS 2014', 'MATH 2233', 'ENSC 2611'] };
        this.ECEN_3113 = { code: 'ECEN 3113', name: 'Energy, Environment and Economics', credits: 3, prerequisites: ['ECEN 2714'] };
        this.ECEN_3213 = { code: 'ECEN 3213', name: 'Computer Based Systems in Engineering', credits: 3, prerequisites: ['ECEN 2714', 'ECEN 2233', 'CS 2433'] };
        this.ECEN_3314 = { code: 'ECEN 3314', name: 'Electronic Devices and Applications', credits: 4, prerequisites: ['ECEN 3714', 'ENSC 2611'] };
        this.ECEN_3513 = { code: 'ECEN 3513', name: 'Signal Analysis', credits: 3, prerequisites: ['ECEN 3714'] };
        this.ECEN_3613 = { code: 'ECEN 3613', name: 'Applied Fields and Waves I', credits: 3, prerequisites: ['MATH 2163', 'ECEN 3714'] };
        this.ECEN_3623 = { code: 'ECEN 3623', name: 'Applied Fields and Waves II', credits: 3, prerequisites: ['ECEN 3613'] };
        this.ECEN_3714 = { code: 'ECEN 3714', name: 'Network Analysis', credits: 4, prerequisites: ['MATH 2233', 'PHYS 2014', 'ECEN 2714'] };
        this.ECEN_3723 = { code: 'ECEN 3723', name: 'Systems I', credits: 3, prerequisites: ['ECEN 3714', 'ENSC 2113', 'MATH 3013'] };
        this.ECEN_3903 = { code: 'ECEN 3903', name: 'Introduction to Semiconductor Devices', credits: 3, prerequisites: ['ECEN 3714'] };
        this.ECEN_4013 = { code: 'ECEN 4013', name: 'Design of Engineering Systems', credits: 3, prerequisites: ['ECEN 3213', 'ECEN 2233', 'ECEN 3714', 'ECEN 3613', 'ECEN 3513', 'ECEN 3314', 'ENGL 3323'] };
        this.ECEN_4024 = { code: 'ECEN 4024', name: 'Capstone Design', credits: 4, prerequisites: ['ECEN 4013', 'ECEN 4503'] };
        this.ECEN_4293 = { code: 'ECEN 4293', name: 'Applied Numerical Methods for Python for EE', credits: 3, prerequisites: ['ECEN 3714', 'CS 2433'] };
        this.ECEN_4503 = { code: 'ECEN 4503', name: 'Applications of Probability and Statistics to Random Signals', credits: 3, prerequisites: ['ECEN 3513'] };

        // General Engineering
        this.ENGR_1111 = { code: 'ENGR 1111', name: 'First Year Seminar', credits: 1, prerequisites: [] };
        this.ENGR_1412 = { code: 'ENGR 1412', name: 'Introduction to Engineering', credits: 2, prerequisites: [] };

        // Industrial Engineering & Management
        this.IEM_3503 = { code: 'IEM 3503', name: 'Engineering Economic Analysis', credits: 3, prerequisites: [] };

        // Statistics
        this.STAT_2013 = { code: 'STAT 2013', name: 'Elementary Statistics', credits: 3, prerequisites: ['MATH 1813'] };
        this.STAT_4033 = { code: 'STAT 4033', name: 'Probability and Statistics', credits: 3, prerequisites: ['MATH 2163'] };

        // Psychology
        this.PSYC_1113 = { code: 'PSYC 1113', name: 'Introduction to Psychology', credits: 3, prerequisites: [] };

        // History and Government
        this.HIST_1103 = { code: 'HIST 1103', name: 'Survey of American History', credits: 3, prerequisites: [] };
        this.POLS_1113 = { code: 'POLS 1113', name: 'American Government', credits: 3, prerequisites: [] };

        // Biology
        this.BIOL_2004 = { code: 'BIOL 2004', name: 'General Biology I', credits: 4, prerequisites: [] };
        this.BIOL_3204 = { code: 'BIOL 3204', name: 'Human Anatomy', credits: 4, prerequisites: ['BIOL 2004'] };

        // Create master course list with all course variables
        this.ALL_COURSES = [
            this.MATH_1813, this.MATH_2144, this.MATH_2153, this.MATH_2163, this.MATH_2233, this.MATH_3013, this.MATH_3113,
            this.PHYS_2014, this.PHYS_2114, this.PHYS_3313,
            this.CHEM_1414, this.CHEM_1515, this.CHEM_1615, this.CHEM_3053,
            this.ENGL_1113, this.ENGL_1313, this.ENGL_3323,
            this.CS_1113, this.CS_1323, this.CS_2133, this.CS_2433, this.CS_2714, this.CS_3353, this.CS_3443, this.CS_3613, this.CS_3823, this.CS_4143, this.CS_4153, this.CS_4273, this.CS_4413,
            this.ENSC_2113, this.ENSC_2123, this.ENSC_2143, this.ENSC_2213, this.ENSC_2411, this.ENSC_2611, this.ENSC_3213,
            this.ECEN_2011, this.ECEN_2233, this.ECEN_2714, this.ECEN_3113, this.ECEN_3213, this.ECEN_3314, this.ECEN_3513, this.ECEN_3613, this.ECEN_3623, this.ECEN_3714, this.ECEN_3723, this.ECEN_3903, this.ECEN_4013, this.ECEN_4024, this.ECEN_4293, this.ECEN_4503,
            this.ENGR_1111, this.ENGR_1412,
            this.IEM_3503,
            this.STAT_2013, this.STAT_4033,
            this.PSYC_1113,
            this.HIST_1103, this.POLS_1113,
            this.BIOL_2004, this.BIOL_3204
        ];

        // Create course lookup map for fast access
        this.COURSE_MAP = new Map();
        this.ALL_COURSES.forEach(course => {
            this.COURSE_MAP.set(course.code, course);
        });

        // Build the structured course database using the variables
        this.courseDatabase = this.buildStructuredDatabase();
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
        this.pastClassesListEl = document.getElementById('pastClassesList');
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

        // Course import event listeners
        this.setupCourseImportListeners();
    }

    setupCourseImportListeners() {
        const importBtn = document.getElementById('importCoursesBtn');
        const importSection = document.getElementById('courseImportSection');
        const cancelBtn = document.getElementById('cancelImportBtn');
        const processBtn = document.getElementById('processImportBtn');
        const confirmBtn = document.getElementById('confirmImportBtn');
        const fileInput = document.getElementById('courseFileInput');

        if (importBtn && importSection) {
            importBtn.addEventListener('click', () => {
                importSection.style.display = importSection.style.display === 'none' ? 'block' : 'none';
            });
        }

        if (cancelBtn && importSection) {
            cancelBtn.addEventListener('click', () => {
                importSection.style.display = 'none';
                this.clearImportData();
            });
        }

        if (processBtn) {
            processBtn.addEventListener('click', () => {
                this.processImportData();
            });
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmImport();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileInput(e);
            });
        }

        // Radio button listeners
        const radioButtons = document.querySelectorAll('input[name="importMethod"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.toggleImportMethod();
            });
        });
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
        
        // Initialize course tracking with student data
        this.initializeStudentCourseTracking();
        
        this.populateStudentInfo();
        this.loadTabContent();
    }

    // ========== COURSE TRACKING SYSTEM ==========
    
    initializeStudentCourseTracking() {
        // Parse completed courses from student history
        this.parseCompletedCourses();
        
        // Parse current courses
        this.parseCurrentCourses();
        
        // Initialize prerequisite checking
        this.buildPrerequisiteCache();
    }

    parseCompletedCourses() {
        // Clear existing tracking
        this.completedCourses.clear();
        this.courseGrades.clear();
        this.semesterHistory = [];

        // Parse actual past classes if available
        if (this.studentData.pastClasses && this.studentData.pastClasses.length > 0) {
            this.studentData.pastClasses.forEach(semester => {
                const semesterKey = `${semester.semester} ${semester.year}`;
                this.semesterHistory.push(semesterKey);
                
                // Parse actual course completions
                semester.classes.forEach(classItem => {
                    if (classItem.grade !== 'W' && classItem.grade !== 'F') {
                        this.markCourseCompleted(classItem.code, classItem.grade);
                    }
                });
            });
        } else if (this.studentData.gradeHistory) {
            // Fallback to grade history with sample courses if no past classes
            this.studentData.gradeHistory.forEach(semesterData => {
                const semesterKey = `${semesterData.semester} ${semesterData.year}`;
                this.semesterHistory.push(semesterKey);
                
                // Add sample completed courses based on year progression
                this.addSampleCompletedCourses(semesterData.semester, semesterData.year);
            });
        }
    }

    addSampleCompletedCourses(semester, year) {
        // Add realistic course progression based on year using course variables
        const yearNum = parseInt(year);
        const isSpring = semester === 'Spring';
        const isFall = semester === 'Fall';
        
        if (yearNum <= 2023) {
            // Freshman year courses
            this.markCourseCompleted(this.MATH_1813.code, 'B+');
            this.markCourseCompleted(this.ENGL_1113.code, 'A');
            this.markCourseCompleted(this.ENGR_1111.code, 'A');
            this.markCourseCompleted(this.HIST_1103.code, 'B+');
        }
        
        if (yearNum <= 2024) {
            // Sophomore courses
            this.markCourseCompleted(this.MATH_2144.code, 'A-');
            this.markCourseCompleted(this.MATH_2153.code, 'A-');
            this.markCourseCompleted(this.PHYS_2014.code, 'B+');
            this.markCourseCompleted(this.CHEM_1414.code, 'A');
            this.markCourseCompleted(this.CS_1113.code, 'A');
            this.markCourseCompleted(this.ENGL_3323.code, 'A');
            
            if (isSpring) {
                this.markCourseCompleted(this.MATH_2163.code, 'A-');
                this.markCourseCompleted(this.PHYS_2114.code, 'B+');
                this.markCourseCompleted(this.ENSC_2113.code, 'B+');
            }
        }
        
        if (yearNum >= 2024) {
            // Junior level courses
            this.markCourseCompleted(this.MATH_2233.code, 'B+');
            this.markCourseCompleted(this.MATH_3013.code, 'A-');
            this.markCourseCompleted(this.ECEN_2233.code, 'A');
            this.markCourseCompleted(this.ENSC_2611.code, 'A');
            this.markCourseCompleted(this.CS_1323.code, 'A');
            this.markCourseCompleted(this.CS_2433.code, 'A-');
            
            if (yearNum === 2025 && isFall) {
                this.markCourseCompleted(this.ECEN_2714.code, 'B+');
                this.markCourseCompleted(this.CS_2133.code, 'A');
                this.markCourseCompleted(this.ECEN_3714.code, 'A-');
            }
        }
    }

    parseCurrentCourses() {
        this.inProgressCourses.clear();
        
        if (this.studentData.currentCourses) {
            this.studentData.currentCourses.forEach(course => {
                this.inProgressCourses.add(course.code);
            });
        }
    }

    markCourseCompleted(courseCode, grade = 'A') {
        this.completedCourses.add(courseCode);
        this.courseGrades.set(courseCode, grade);
    }

    buildPrerequisiteCache() {
        // Build a flattened prerequisite chain for all courses
        Object.values(this.courseDatabase).forEach(major => {
            Object.values(major).forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(course => {
                        this.cachePrerequisiteChain(course.code);
                    });
                }
            });
        });
    }

    cachePrerequisiteChain(courseCode) {
        if (this.prerequisiteCache.has(courseCode)) {
            return this.prerequisiteCache.get(courseCode);
        }

        const course = this.findCourse(courseCode);
        if (!course) {
            this.prerequisiteCache.set(courseCode, []);
            return [];
        }

        const allPrereqs = new Set();
        const queue = [...course.prerequisites];
        
        while (queue.length > 0) {
            const prereq = queue.shift();
            if (!allPrereqs.has(prereq)) {
                allPrereqs.add(prereq);
                const prereqCourse = this.findCourse(prereq);
                if (prereqCourse) {
                    queue.push(...prereqCourse.prerequisites);
                }
            }
        }

        const prereqArray = Array.from(allPrereqs);
        this.prerequisiteCache.set(courseCode, prereqArray);
        return prereqArray;
    }

    findCourse(courseCode) {
        // Use centralized course lookup for better performance and consistency
        return this.COURSE_MAP.get(courseCode) || null;
    }

    getCourseDatabase() {
        return this.courseDatabase;
    }

    // ========== COURSE STATUS CHECKING ==========

    isCourseCompleted(courseCode) {
        return this.completedCourses.has(courseCode);
    }

    isCourseInProgress(courseCode) {
        return this.inProgressCourses.has(courseCode);
    }

    hasPrerequisites(courseCode) {
        const course = this.findCourse(courseCode);
        return course && course.prerequisites.length > 0;
    }

    checkPrerequisites(courseCode) {
        const course = this.findCourse(courseCode);
        if (!course) return { eligible: false, missing: [], reason: 'Course not found' };

        const missing = [];
        
        for (const prereq of course.prerequisites) {
            if (!this.isCourseCompleted(prereq)) {
                missing.push(prereq);
            }
        }

        return {
            eligible: missing.length === 0,
            missing: missing,
            reason: missing.length > 0 ? `Missing prerequisites: ${missing.join(', ')}` : null
        };
    }

    getCoursesReadyToTake() {
        const readyCourses = [];
        
        Object.values(this.courseDatabase).forEach(major => {
            Object.values(major).forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(course => {
                        if (!this.isCourseCompleted(course.code) && 
                            !this.isCourseInProgress(course.code)) {
                            
                            const prereqCheck = this.checkPrerequisites(course.code);
                            if (prereqCheck.eligible) {
                                readyCourses.push(course);
                            }
                        }
                    });
                }
            });
        });

        return readyCourses;
    }

    getCoursesByPrerequisiteLevel() {
        const levels = {
            0: [], // No prerequisites
            1: [], // Direct prerequisites only
            2: [], // 2+ levels of prerequisites
            3: []  // Complex prerequisite chains
        };

        Object.values(this.courseDatabase).forEach(major => {
            Object.values(major).forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(course => {
                        const prereqChain = this.cachePrerequisiteChain(course.code);
                        const level = Math.min(3, prereqChain.length === 0 ? 0 : 
                                     course.prerequisites.length === 0 ? 0 :
                                     course.prerequisites.length === 1 ? 1 :
                                     course.prerequisites.length <= 3 ? 2 : 3);
                        
                        levels[level].push({
                            ...course,
                            prerequisiteChain: prereqChain,
                            isCompleted: this.isCourseCompleted(course.code),
                            isInProgress: this.isCourseInProgress(course.code),
                            canTake: this.checkPrerequisites(course.code).eligible
                        });
                    });
                }
            });
        });

        return levels;
    }

    // ========== ACADEMIC PLANNING WITH PREREQUISITES ==========

    generateSequencedAcademicPlan() {
        // Create temporary tracking for planning simulation
        const tempCompleted = new Set(this.completedCourses);
        const tempInProgress = new Set(this.inProgressCourses);
        
        const plan = [];
        
        // Determine starting semester based on current date (avoiding summer assumption)
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-11
        const currentYear = currentDate.getFullYear();
        
        let startingSemester, startingYear;
        if (currentMonth >= 0 && currentMonth <= 4) { // Jan-May: Next semester is Summer/Fall
            startingSemester = 'Fall';
            startingYear = currentYear;
        } else if (currentMonth >= 5 && currentMonth <= 7) { // Jun-Aug: Next semester is Fall
            startingSemester = 'Fall';
            startingYear = currentYear;
        } else { // Sep-Dec: Next semester is Spring
            startingSemester = 'Spring';
            startingYear = currentYear + 1;
        }
        
        let currentSemester = `${startingSemester} ${startingYear}`;
        let maxSemesters = 8; // Increased to allow for more planning flexibility
        
        for (let semesterCount = 0; semesterCount < maxSemesters; semesterCount++) {
            const availableCourses = this.getCoursesReadyToTakeWithTemp(tempCompleted, tempInProgress);
            
            if (availableCourses.length === 0) {
                break; // No more courses available
            }
            
            // Sort by prerequisite complexity and importance
            availableCourses.sort((a, b) => {
                const aChain = this.cachePrerequisiteChain(a.code);
                const bChain = this.cachePrerequisiteChain(b.code);
                
                // Prioritize courses with more dependent courses
                const aDependents = this.countDependentCourses(a.code);
                const bDependents = this.countDependentCourses(b.code);
                
                if (aDependents !== bDependents) {
                    return bDependents - aDependents; // More dependents first
                }
                
                return aChain.length - bChain.length; // Simpler prerequisites first
            });
            
            const semesterCourses = [];
            let semesterCredits = 0;
            const maxCredits = 15;
            
            // Select courses for this semester
            for (const course of availableCourses) {
                if (semesterCredits + course.credits <= maxCredits) {
                    semesterCourses.push(course);
                    semesterCredits += course.credits;
                    tempCompleted.add(course.code); // Mark as completed for future semesters
                    
                    if (semesterCredits >= 12) break; // Minimum full-time load
                }
            }
            
            if (semesterCourses.length > 0) {
                plan.push({
                    semester: currentSemester,
                    courses: semesterCourses,
                    totalCredits: semesterCredits
                });
                
                currentSemester = this.getNextSemester(currentSemester);
            } else {
                break; // Can't schedule any more courses
            }
        }
        
        return plan;
    }

    getCoursesReadyToTakeWithTemp(tempCompleted, tempInProgress) {
        const readyCourses = [];
        const seenCourses = new Set(); // Prevent duplicates
        
        Object.values(this.courseDatabase).forEach(major => {
            Object.values(major).forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(course => {
                        // Skip if already seen (prevents duplicates)
                        if (seenCourses.has(course.code)) {
                            return;
                        }
                        seenCourses.add(course.code);
                        
                        if (!tempCompleted.has(course.code) && 
                            !tempInProgress.has(course.code)) {
                            
                            const prereqCheck = this.checkPrerequisitesWithTemp(course.code, tempCompleted);
                            if (prereqCheck.eligible) {
                                readyCourses.push(course);
                            }
                        }
                    });
                }
            });
        });

        return readyCourses;
    }

    checkPrerequisitesWithTemp(courseCode, tempCompleted) {
        const course = this.findCourse(courseCode);
        if (!course) return { eligible: false, missing: [], reason: 'Course not found' };

        const missing = [];
        
        for (const prereq of course.prerequisites) {
            if (!tempCompleted.has(prereq)) {
                missing.push(prereq);
            }
        }

        return {
            eligible: missing.length === 0,
            missing: missing,
            reason: missing.length > 0 ? `Missing prerequisites: ${missing.join(', ')}` : null
        };
    }

    countDependentCourses(courseCode) {
        let count = 0;
        
        Object.values(this.courseDatabase).forEach(major => {
            Object.values(major).forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(course => {
                        if (course.prerequisites.includes(courseCode)) {
                            count++;
                        }
                    });
                }
            });
        });
        
        return count;
    }

    getNextSemester(currentSemester) {
        const [season, year] = currentSemester.split(' ');
        const yearNum = parseInt(year);
        
        // Check if summer semesters should be included
        const includeSummer = document.getElementById('summerCoursesOption')?.checked ?? false;
        
        switch (season) {
            case 'Spring':
                return includeSummer ? `Summer ${year}` : `Fall ${year}`;
            case 'Summer':
                return `Fall ${year}`;
            case 'Fall':
                return `Spring ${yearNum + 1}`;
            default:
                return `Spring ${yearNum + 1}`;
        }
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
                        "code": "ECEN 2714",
                        "name": "Fundamentals of Electric Circuits",
                        "instructor": "Dr. Johnson",
                        "credits": 4,
                        "grade": "IP",
                        "schedule": "MWF 10:00-10:50"
                    },
                    {
                        "code": "ECEN 2011",
                        "name": "Experimental Methods I",
                        "instructor": "Prof. Williams",
                        "credits": 1,
                        "grade": "IP",
                        "schedule": "T 14:00-15:50"
                    },
                    {
                        "code": "STAT 4033",
                        "name": "Probability and Statistics",
                        "instructor": "Dr. Smith",
                        "credits": 3,
                        "grade": "IP",
                        "schedule": "MWF 13:00-13:50"
                    },
                    {
                        "code": "CS 2133",
                        "name": "Data Structures",
                        "instructor": "Prof. Brown",
                        "credits": 3,
                        "grade": "IP",
                        "schedule": "TTh 11:00-12:15"
                    },
                    {
                        "code": "IEM 3503",
                        "name": "Engineering Economic Analysis",
                        "instructor": "Dr. Davis",
                        "credits": 3,
                        "grade": "IP",
                        "schedule": "MW 15:00-16:15"
                    }
                ],
                "gradeHistory": [
                    { "semester": "Spring 2025", "year": "2025", "gpa": 3.7, "credits": 17 },
                    { "semester": "Fall 2024", "year": "2024", "gpa": 3.8, "credits": 16 },
                    { "semester": "Spring 2024", "year": "2024", "gpa": 3.6, "credits": 16 },
                    { "semester": "Fall 2023", "year": "2023", "gpa": 3.7, "credits": 16 }
                ],
                "pastClasses": [
                    {
                        "semester": "Spring 2025",
                        "year": "2025",
                        "gpa": 3.7,
                        "classes": [
                            { "code": "MATH 2163", "name": "Calculus III", "instructor": "Martin", "credits": 3, "grade": "A-" },
                            { "code": "MATH 2233", "name": "Differential Equations", "instructor": "Taylor", "credits": 3, "grade": "A" },
                            { "code": "PHYS 2114", "name": "University Physics II", "instructor": "White", "credits": 4, "grade": "B+" },
                            { "code": "CS 2433", "name": "C/C++ Programming", "instructor": "Thompson", "credits": 3, "grade": "A-" },
                            { "code": "ENSC 2113", "name": "Statics", "instructor": "Lee", "credits": 3, "grade": "B+" },
                            { "code": "ENSC 2611", "name": "Electrical Fabrication Lab", "instructor": "Davis", "credits": 1, "grade": "A" }
                        ]
                    },
                    {
                        "semester": "Fall 2024",
                        "year": "2024",
                        "gpa": 3.8,
                        "classes": [
                            { "code": "MATH 2153", "name": "Calculus II", "instructor": "Garcia", "credits": 3, "grade": "A-" },
                            { "code": "PHYS 2014", "name": "University Physics I", "instructor": "Jackson", "credits": 4, "grade": "B+" },
                            { "code": "ECEN 2233", "name": "Fundamentals of Digital Logic Design", "instructor": "Rodriguez", "credits": 3, "grade": "A" },
                            { "code": "CS 1323", "name": "Computer Science II", "instructor": "Miller", "credits": 3, "grade": "A" },
                            { "code": "STAT 2013", "name": "Elementary Statistics", "instructor": "Wilson", "credits": 3, "grade": "A-" }
                        ]
                    },
                    {
                        "semester": "Spring 2024",
                        "year": "2024",
                        "gpa": 3.6,
                        "classes": [
                            { "code": "MATH 2144", "name": "Calculus I", "instructor": "Martin", "credits": 4, "grade": "B+" },
                            { "code": "CS 1113", "name": "Computer Science I", "instructor": "Thompson", "credits": 3, "grade": "A" },
                            { "code": "ENGL 3323", "name": "Technical Writing", "instructor": "Harris", "credits": 3, "grade": "A-" },
                            { "code": "HIST 1103", "name": "Survey of American History", "instructor": "Lewis", "credits": 3, "grade": "B+" },
                            { "code": "POLS 1113", "name": "American Government", "instructor": "Clark", "credits": 3, "grade": "A-" }
                        ]
                    },
                    {
                        "semester": "Fall 2023",
                        "year": "2023",
                        "gpa": 3.7,
                        "classes": [
                            { "code": "ENGR 1111", "name": "First Year Seminar", "instructor": "Adams", "credits": 1, "grade": "A" },
                            { "code": "ENGR 1412", "name": "Introduction to Engineering", "instructor": "Adams", "credits": 2, "grade": "A" },
                            { "code": "ENGL 1113", "name": "Composition I", "instructor": "Harris", "credits": 3, "grade": "A-" },
                            { "code": "MATH 1813", "name": "Preparation for Calculus", "instructor": "Martin", "credits": 3, "grade": "B+" },
                            { "code": "CHEM 1414", "name": "General Chemistry for Engineers", "instructor": "Walker", "credits": 4, "grade": "A-" },
                            { "code": "PSYC 1113", "name": "Introduction to Psychology", "instructor": "Moore", "credits": 3, "grade": "A" }
                        ]
                    }
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
                "pastClasses": [
                    {
                        "semester": "Fall 2025",
                        "year": "2025",
                        "gpa": 3.8,
                        "classes": [
                            {
                                "code": "BIOL 3104",
                                "name": "Cell Biology",
                                "instructor": "Johnson",
                                "credits": 4,
                                "grade": "A-"
                            },
                            {
                                "code": "CHEM 3515",
                                "name": "Organic Chemistry II",
                                "instructor": "Davis",
                                "credits": 5,
                                "grade": "B+"
                            },
                            {
                                "code": "PHYS 2234",
                                "name": "University Physics II",
                                "instructor": "Wilson",
                                "credits": 4,
                                "grade": "A"
                            },
                            {
                                "code": "MATH 3283",
                                "name": "Partial Differential Equations",
                                "instructor": "Miller",
                                "credits": 3,
                                "grade": "B"
                            },
                            {
                                "code": "PSYC 2223",
                                "name": "Developmental Psychology",
                                "instructor": "Brown",
                                "credits": 3,
                                "grade": "A"
                            }
                        ]
                    },
                    {
                        "semester": "Spring 2025",
                        "year": "2025",
                        "gpa": 3.6,
                        "classes": [
                            {
                                "code": "BIOL 2124",
                                "name": "Human Anatomy and Physiology I",
                                "instructor": "Anderson",
                                "credits": 4,
                                "grade": "B+"
                            },
                            {
                                "code": "CHEM 3415",
                                "name": "Organic Chemistry I",
                                "instructor": "Clark",
                                "credits": 5,
                                "grade": "B"
                            },
                            {
                                "code": "PHYS 1114",
                                "name": "University Physics I",
                                "instructor": "Thompson",
                                "credits": 4,
                                "grade": "B+"
                            },
                            {
                                "code": "MATH 2144",
                                "name": "Calculus III",
                                "instructor": "Taylor",
                                "credits": 4,
                                "grade": "A-"
                            },
                            {
                                "code": "STAT 2013",
                                "name": "Elementary Statistics",
                                "instructor": "Rodriguez",
                                "credits": 3,
                                "grade": "B+"
                            }
                        ]
                    },
                    {
                        "semester": "Fall 2024",
                        "year": "2024",
                        "gpa": 3.7,
                        "classes": [
                            {
                                "code": "BIOL 1114",
                                "name": "Principles of Biology I",
                                "instructor": "Garcia",
                                "credits": 4,
                                "grade": "A"
                            },
                            {
                                "code": "CHEM 1515",
                                "name": "General Chemistry I",
                                "instructor": "White",
                                "credits": 5,
                                "grade": "B+"
                            },
                            {
                                "code": "MATH 2934",
                                "name": "Differential Equations",
                                "instructor": "Lewis",
                                "credits": 4,
                                "grade": "B"
                            },
                            {
                                "code": "ENGL 1213",
                                "name": "English Composition I",
                                "instructor": "Harris",
                                "credits": 3,
                                "grade": "A-"
                            }
                        ]
                    },
                    {
                        "semester": "Spring 2024",
                        "year": "2024",
                        "gpa": 3.5,
                        "classes": [
                            {
                                "code": "MATH 1914",
                                "name": "Calculus I",
                                "instructor": "Martin",
                                "credits": 4,
                                "grade": "B+"
                            },
                            {
                                "code": "CHEM 1314",
                                "name": "General Chemistry",
                                "instructor": "Jackson",
                                "credits": 4,
                                "grade": "B"
                            },
                            {
                                "code": "BIOL 1004",
                                "name": "Introduction to Biology",
                                "instructor": "Adams",
                                "credits": 4,
                                "grade": "A"
                            },
                            {
                                "code": "HIST 1493",
                                "name": "American History since 1865",
                                "instructor": "Walker",
                                "credits": 3,
                                "grade": "B-"
                            }
                        ]
                    }
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

    buildStructuredDatabase() {
        return {
            'Electrical Engineering': {
                'Foundation Courses': [
                    this.MATH_1813, this.MATH_2144, this.MATH_2153, this.MATH_2163, this.MATH_2233, this.MATH_3013,
                    this.PHYS_2014, this.PHYS_2114, this.PHYS_3313,
                    this.ENGL_1113, this.ENGL_3323,
                    this.CHEM_1414
                ],
                'Core ECEN Courses': [
                    this.ECEN_2011, this.ECEN_2233, this.ECEN_2714, this.ECEN_3714, this.ECEN_3314, 
                    this.ECEN_3513, this.ECEN_3613, this.ECEN_3623, this.ECEN_3723
                ],
                'Engineering Support': [
                    this.CS_1113, this.CS_1323, this.CS_2133, this.CS_2433,
                    this.ENSC_2113, this.ENSC_2411, this.ENSC_2611, this.ENSC_2213, this.ENSC_3213,
                    this.ENGR_1111, this.ENGR_1412,
                    this.IEM_3503,
                    this.STAT_4033
                ],
                'Advanced ECEN': [
                    this.ECEN_3113, this.ECEN_3213, this.ECEN_4013, this.ECEN_4024, this.ECEN_4293, this.ECEN_4503
                ],
                'Electives': [
                    this.ECEN_3903
                ]
            },
            'Computer Science': {
                'Core Courses': [
                    this.CS_1113, this.CS_1323, this.CS_2133, this.CS_2714, this.CS_3353, this.CS_3613, this.CS_4143, this.CS_4153
                ],
                'Electives': [
                    this.CS_4413, this.CS_3823, this.CS_4273, this.CS_3443
                ],
                'Math Requirements': [
                    this.MATH_2144, this.MATH_2153, this.MATH_3113, this.STAT_2013
                ]
            },
            'Pre-Medicine': {
                'Science Core': [
                    this.CHEM_1515, this.CHEM_1615, this.CHEM_3053,
                    this.BIOL_2004, this.BIOL_3204
                ],
                'Physics Requirements': [
                    this.PHYS_2014, this.PHYS_2114
                ],
                'Additional Requirements': [
                    this.MATH_2144, this.STAT_2013, this.ENGL_3323, this.PSYC_1113, this.HIST_1103
                ],
                'Electives': [
                    { code: 'BIOL 4204', name: 'Cell Biology', credits: 4, prerequisites: ['BIOL 1124'] },
                    { code: 'BIOL 4304', name: 'Molecular Biology', credits: 4, prerequisites: ['BIOL 3304'] },
                    { code: 'CHEM 4653', name: 'Biochemistry II', credits: 3, prerequisites: ['CHEM 3653'] },
                    { code: 'HLTH 2143', name: 'Medical Terminology', credits: 3, prerequisites: [] },
                    { code: 'NURS 3143', name: 'Human Pathophysiology', credits: 3, prerequisites: ['BIOL 3204'] }
                ]
            },
            'Mathematics': {
                'Foundation Courses': [
                    { code: 'MATH 1483', name: 'Mathematical Functions and Their Uses', credits: 3, prerequisites: [] },
                    { code: 'MATH 1513', name: 'College Algebra', credits: 3, prerequisites: [] },
                    { code: 'MATH 1715', name: 'Precalculus', credits: 3, prerequisites: [] },
                    { code: 'MATH 1813', name: 'Preparation for Calculus', credits: 3, prerequisites: ['MATH 1513'] },
                    { code: 'MATH 2144', name: 'Calculus I', credits: 3, prerequisites: ['MATH 1813'] },
                    { code: 'MATH 2153', name: 'Calculus II', credits: 3, prerequisites: ['MATH 2144'] },
                    { code: 'MATH 2163', name: 'Calculus III', credits: 3, prerequisites: ['MATH 2153'] },
                    { code: 'MATH 2233', name: 'Differential Equations', credits: 3, prerequisites: ['MATH 2153'] }
                ],
                'Core Math Courses': [
                    { code: 'MATH 3013', name: 'Linear Algebra', credits: 3, prerequisites: ['MATH 2153'] },
                    { code: 'MATH 3613', name: 'Introduction to Abstract Algebra', credits: 3, prerequisites: ['MATH 3013'] },
                    { code: 'MATH 4013', name: 'Calculus of Several Variables', credits: 3, prerequisites: ['MATH 2163', 'MATH 3013'] },
                    { code: 'MATH 4023', name: 'Introduction to Analysis', credits: 3, prerequisites: ['MATH 2153', 'MATH 3613'] },
                    { code: 'MATH 4063', name: 'Advanced Linear Algebra', credits: 3, prerequisites: ['MATH 3013', 'MATH 3613'] },
                    { code: 'MATH 4143', name: 'Advanced Calculus I', credits: 3, prerequisites: ['MATH 2163', 'MATH 3013', 'MATH 4023'] },
                    { code: 'MATH 4233', name: 'Intermediate Differential Equations', credits: 3, prerequisites: ['MATH 2233', 'MATH 3013'] },
                    { code: 'MATH 4613', name: 'Abstract Algebra I', credits: 3, prerequisites: ['MATH 3613'] }
                ],
                'Applied Mathematics': [
                    { code: 'MATH 3583', name: 'Introduction to Mathematical Modeling', credits: 3, prerequisites: ['MATH 2233', 'MATH 3013'] },
                    { code: 'MATH 4513', name: 'Introduction to Numerical Analysis', credits: 3, prerequisites: ['MATH 2233', 'MATH 3013'] },
                    { code: 'MATH 4533', name: 'Matrix Methods in Machine Learning', credits: 3, prerequisites: ['MATH 3013'] },
                    { code: 'MATH 4553', name: 'Introduction to Optimization', credits: 3, prerequisites: ['MATH 2163', 'MATH 3013'] },
                    { code: 'MATH 4573', name: 'Introduction to Mathematical Epidemiology', credits: 3, prerequisites: ['MATH 2163', 'MATH 2233', 'MATH 3013'] },
                    { code: 'MATH 4753', name: 'Introduction to Cryptography', credits: 3, prerequisites: ['MATH 3013', 'MATH 3613'] }
                ],
                'Specialized Areas': [
                    { code: 'MATH 4283', name: 'Functions of a Complex Variable', credits: 3, prerequisites: ['MATH 4013'] },
                    { code: 'MATH 4343', name: 'Introduction to Topology', credits: 3, prerequisites: ['MATH 4023'] },
                    { code: 'MATH 4403', name: 'Geometry', credits: 3, prerequisites: ['MATH 3013', 'MATH 3613'] },
                    { code: 'MATH 4663', name: 'Combinatorics', credits: 3, prerequisites: ['MATH 3013'] },
                    { code: 'MATH 4713', name: 'Number Theory', credits: 3, prerequisites: ['MATH 3613'] },
                    { code: 'MATH 4813', name: 'Groups and Representations', credits: 3, prerequisites: ['MATH 3013', 'MATH 3613'] }
                ],
                'Research & Capstone': [
                    { code: 'MATH 3933', name: 'Introduction to Mathematical Research', credits: 3, prerequisites: ['MATH 3013'] },
                    { code: 'MATH 4900', name: 'Undergraduate Research', credits: 3, prerequisites: [] },
                    { code: 'MATH 4963', name: 'Preparation for Senior Thesis', credits: 3, prerequisites: [] },
                    { code: 'MATH 4973', name: 'Senior Thesis', credits: 3, prerequisites: [] },
                    { code: 'MATH 4993', name: 'Senior Honors Thesis', credits: 3, prerequisites: [] }
                ]
            },
            'Physics': {
                'Foundation Physics': [
                    { code: 'PHYS 1001', name: 'Frontiers of Physics', credits: 1, prerequisites: [] },
                    { code: 'PHYS 1014', name: 'Descriptive Physics (N)', credits: 3, prerequisites: [] },
                    { code: 'PHYS 1114', name: 'College Physics I (LN)', credits: 4, prerequisites: ['MATH 1513'] },
                    { code: 'PHYS 1214', name: 'College Physics II (LN)', credits: 4, prerequisites: ['PHYS 1114'] },
                    { code: 'PHYS 2014', name: 'University Physics I (LN)', credits: 4, prerequisites: ['MATH 2103', 'MATH 2123', 'MATH 2144'] },
                    { code: 'PHYS 2020', name: 'Special Topics in Physics (L)', credits: 1, prerequisites: [] },
                    { code: 'PHYS 2114', name: 'University Physics II (LN)', credits: 4, prerequisites: ['PHYS 2014'] },
                    { code: 'PHYS 2203', name: 'University Physics III', credits: 3, prerequisites: ['PHYS 2114'] },
                    { code: 'PHYS 2663', name: 'Physics in Medicine (N)', credits: 3, prerequisites: [] },
                    { code: 'PHYS 2890', name: 'Honors Experience in Physics', credits: 3, prerequisites: [] }
                ],
                'Core Physics': [
                    { code: 'PHYS 3013', name: 'Mechanics I', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2233'] },
                    { code: 'PHYS 3113', name: 'Thermal Physics', credits: 3, prerequisites: ['PHYS 2203', 'MATH 2163'] },
                    { code: 'PHYS 3213', name: 'Optics', credits: 3, prerequisites: ['PHYS 2114', 'PHYS 3513'] },
                    { code: 'PHYS 3313', name: 'Introduction to Semiconductor Device Physics', credits: 3, prerequisites: ['PHYS 2114'] },
                    { code: 'PHYS 3323', name: 'Modern Laboratory Methods I', credits: 3, prerequisites: ['PHYS 2014', 'PHYS 2114'] },
                    { code: 'PHYS 3513', name: 'Mathematical Physics', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2163'] },
                    { code: 'PHYS 3553', name: 'Foundations of Cancer', credits: 3, prerequisites: ['CHEM 1225', 'CHEM 1414', 'CHEM 1515'] },
                    { code: 'PHYS 3623', name: 'Modern Laboratory Methods II', credits: 3, prerequisites: ['PHYS 2014', 'PHYS 2114'] },
                    { code: 'PHYS 3713', name: 'Modern Physics', credits: 3, prerequisites: ['PHYS 2203'] }
                ],
                'Advanced Physics': [
                    { code: 'PHYS 4003', name: 'Computer Simulation Methods in Physics', credits: 3, prerequisites: ['PHYS 3013', 'PHYS 3113', 'PHYS 3313'] },
                    { code: 'PHYS 4010', name: 'Special Problems', credits: 3, prerequisites: [] },
                    { code: 'PHYS 4113', name: 'Electricity and Magnetism', credits: 3, prerequisites: ['PHYS 2114', 'MATH 2233'] },
                    { code: 'PHYS 4213', name: 'Introduction to Nuclear and Particle Physics', credits: 3, prerequisites: ['PHYS 2114', 'PHYS 3713'] },
                    { code: 'PHYS 4223', name: 'Introduction to General Relativity', credits: 3, prerequisites: ['PHYS 2203', 'PHYS 3513'] },
                    { code: 'PHYS 4263', name: 'Introduction to Solid State Physics', credits: 3, prerequisites: ['PHYS 3013', 'PHYS 3713'] },
                    { code: 'PHYS 4313', name: 'Molecular Biophysics', credits: 3, prerequisites: ['PHYS 1214', 'PHYS 2114'] },
                    { code: 'PHYS 4413', name: 'Modern Physics II', credits: 3, prerequisites: ['PHYS 3013', 'PHYS 3713'] },
                    { code: 'PHYS 4423', name: 'Mechanics II', credits: 3, prerequisites: ['PHYS 3013'] },
                    { code: 'PHYS 4503', name: 'Quantum Information', credits: 3, prerequisites: ['PHYS 3713'] },
                    { code: 'PHYS 4513', name: 'Introductory Quantum Mechanics', credits: 3, prerequisites: ['PHYS 3713'] },
                    { code: 'PHYS 4663', name: 'Radioactivity and Nuclear Physics', credits: 3, prerequisites: ['PHYS 3713'] },
                    { code: 'PHYS 4712', name: 'Senior Project', credits: 2, prerequisites: [] },
                    { code: 'PHYS 4813', name: 'Electromagnetic Radiation', credits: 3, prerequisites: ['PHYS 4113'] },
                    { code: 'PHYS 4993', name: 'Senior Honors Thesis', credits: 3, prerequisites: [] }
                ],
                'Graduate Physics': [
                    { code: 'PHYS 5000', name: 'Master\'s Thesis Research or Report', credits: 3, prerequisites: [] },
                    { code: 'PHYS 5110', name: 'Seminar', credits: 1, prerequisites: [] },
                    { code: 'PHYS 5113', name: 'Statistical Thermodynamics and Kinetic Theory', credits: 3, prerequisites: ['PHYS 3113'] },
                    { code: 'PHYS 5123', name: 'Geometrical Optics', credits: 3, prerequisites: ['PHYS 3213'] },
                    { code: 'PHYS 5133', name: 'Laser Spectroscopy', credits: 3, prerequisites: ['PHYS 5163'] },
                    { code: 'PHYS 5163', name: 'Lasers', credits: 3, prerequisites: ['PHYS 4813'] },
                    { code: 'PHYS 5213', name: 'Statistical Mechanics', credits: 3, prerequisites: ['PHYS 5113', 'PHYS 5613'] },
                    { code: 'PHYS 5220', name: 'Physics Topics for Teachers', credits: 3, prerequisites: [] },
                    { code: 'PHYS 5263', name: 'Particle Physics', credits: 3, prerequisites: ['PHYS 5613'] },
                    { code: 'PHYS 5303', name: 'Physical Optics', credits: 3, prerequisites: ['PHYS 3213'] },
                    { code: 'PHYS 5313', name: 'Electromagnetic Theory', credits: 3, prerequisites: ['PHYS 5453'] },
                    { code: 'PHYS 5350', name: 'Special Problems', credits: 3, prerequisites: [] },
                    { code: 'PHYS 5413', name: 'Classical Mechanics', credits: 3, prerequisites: ['PHYS 4423'] },
                    { code: 'PHYS 5453', name: 'Mathematical Methods for Physicists', credits: 3, prerequisites: ['PHYS 3513'] },
                    { code: 'PHYS 5503', name: 'Frontiers of Quantum Information Science', credits: 3, prerequisites: [] },
                    { code: 'PHYS 5523', name: 'Radiation Detection and Measurement', credits: 3, prerequisites: ['PHYS 3713', 'PHYS 4213'] },
                    { code: 'PHYS 5533', name: 'Dosimetry and Radiation Protection', credits: 3, prerequisites: ['PHYS 4663', 'PHYS 5523'] },
                    { code: 'PHYS 5553', name: 'Foundations of Cancer', credits: 3, prerequisites: ['MICR 3033'] },
                    { code: 'PHYS 5563', name: 'Radioactivity and Nuclear Physics Laboratory', credits: 3, prerequisites: ['PHYS 4663', 'PHYS 5523'] },
                    { code: 'PHYS 5573', name: 'Radiation Biophysics', credits: 3, prerequisites: ['PHYS 5533'] },
                    { code: 'PHYS 5593', name: 'Physics of Radiation Therapy', credits: 3, prerequisites: ['PHYS 5533'] },
                    { code: 'PHYS 5613', name: 'Quantum Mechanics I', credits: 3, prerequisites: ['PHYS 5453'] },
                    { code: 'PHYS 5663', name: 'Solid State Physics I', credits: 3, prerequisites: ['PHYS 4513'] },
                    { code: 'PHYS 5713', name: 'Solid State Physics II', credits: 3, prerequisites: ['PHYS 5663'] },
                    { code: 'PHYS 5813', name: 'General Relativity', credits: 3, prerequisites: ['PHYS 5453'] },
                    { code: 'PHYS 5960', name: 'Problems in Chemical Physics', credits: 3, prerequisites: [] }
                ],
                'Doctoral Physics': [
                    { code: 'PHYS 6000', name: 'Doctoral Dissertation Research', credits: 3, prerequisites: [] },
                    { code: 'PHYS 6010', name: 'Advanced Graduate Seminar', credits: 1, prerequisites: [] },
                    { code: 'PHYS 6113', name: 'Advanced Theory of Solids', credits: 3, prerequisites: ['PHYS 5663'] },
                    { code: 'PHYS 6213', name: 'Group Theory for Physics', credits: 3, prerequisites: ['PHYS 5453'] },
                    { code: 'PHYS 6243', name: 'Semiconductors I', credits: 3, prerequisites: ['PHYS 5113', 'PHYS 5613', 'PHYS 5663'] },
                    { code: 'PHYS 6260', name: 'Special Topics in High Energy Physics', credits: 3, prerequisites: ['PHYS 5263'] },
                    { code: 'PHYS 6313', name: 'Quantum Mechanics II', credits: 3, prerequisites: ['PHYS 5613'] },
                    { code: 'PHYS 6323', name: 'Quantum Field Theory', credits: 3, prerequisites: ['PHYS 6313'] },
                    { code: 'PHYS 6343', name: 'Semiconductors II', credits: 3, prerequisites: ['PHYS 6243'] },
                    { code: 'PHYS 6413', name: 'Nonlinear Optics', credits: 3, prerequisites: ['PHYS 5163', 'PHYS 5313', 'PHYS 5613'] },
                    { code: 'PHYS 6423', name: 'Quantum Optics', credits: 3, prerequisites: ['PHYS 5163', 'PHYS 5613'] },
                    { code: 'PHYS 6513', name: 'Advanced Topics in Solid State Physics', credits: 3, prerequisites: ['PHYS 5663'] },
                    { code: 'PHYS 6613', name: 'Advanced Nuclear and Particle Physics', credits: 3, prerequisites: ['PHYS 5263', 'PHYS 6313'] },
                    { code: 'PHYS 6713', name: 'Advanced Electromagnetic Radiation', credits: 3, prerequisites: [] }
                ],
                'Photonics Specialization': [
                    { code: 'PHYS 6803', name: 'Photonics I: Advanced Optics', credits: 3, prerequisites: ['ECEN 3213', 'ECEN 3813'] },
                    { code: 'PHYS 6810', name: 'Photonics II: THz Photonics and THz-TDS', credits: 3, prerequisites: ['PHYS 6803'] },
                    { code: 'PHYS 6820', name: 'Photonics II: Spectroscopy II', credits: 3, prerequisites: ['PHYS 6803'] },
                    { code: 'PHYS 6830', name: 'Photonics II: Spectroscopy III', credits: 3, prerequisites: ['PHYS 6803'] },
                    { code: 'PHYS 6840', name: 'Photonics III: Microscopy I', credits: 3, prerequisites: ['CHEM 3553'] },
                    { code: 'PHYS 6850', name: 'Photonics III: Microscopy II', credits: 3, prerequisites: ['PHYS 3553'] },
                    { code: 'PHYS 6860', name: 'Photonics III: Microscopy III and Image Processing', credits: 3, prerequisites: ['ECEN 5793'] },
                    { code: 'PHYS 6870', name: 'Photonics IV: Synthesis and Devices I', credits: 3, prerequisites: ['PHYS 6803', 'PHYS 6840'] },
                    { code: 'PHYS 6880', name: 'Photonics IV: Semiconductor Devices, Testing and Characterization', credits: 3, prerequisites: ['PHYS 6803'] },
                    { code: 'PHYS 6890', name: 'Photonics IV: Semiconductor Synthesis and Devices III', credits: 3, prerequisites: ['PHYS 6803'] }
                ]
            }
        };
    }

    async generateAcademicPlan() {
        if (!this.studentData) return;

        const currentCredits = this.calculateTotalCredits(false); // Only completed credits for planning
        const targetCredits = 120;
        const remainingCredits = targetCredits - currentCredits;
        
        console.log('Generating academic plan (AI-first with prerequisite awareness)');
        console.log('Completed courses:', Array.from(this.completedCourses));
        console.log('In progress courses:', Array.from(this.inProgressCourses));

        // Visual feedback while generating
        const btn = document.getElementById('generatePlanBtn');
        const originalBtnText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        }

        let usedAI = false;
        try {
            // Try AI-powered planning via OpenRouter if configured or provided
            const aiPlan = await this.generateAcademicPlanAI();
            if (aiPlan && aiPlan.length > 0) {
                usedAI = true;
                this.displayAcademicPlanWithPrerequisites(aiPlan, currentCredits, remainingCredits);
            }
        } catch (err) {
            console.warn('AI planning failed, falling back to local planner:', err);
        } finally {
            if (!usedAI) {
                // Fallback: local prerequisite-aware planner
                const semesters = this.generateSequencedAcademicPlan();
                this.displayAcademicPlanWithPrerequisites(semesters, currentCredits, remainingCredits);
            }
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalBtnText;
            }
        }
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

    displayAcademicPlanWithPrerequisites(semesters, currentCredits, remainingCredits) {
        const planContainer = document.getElementById('academicPlan');
        
        let html = '';
        let totalPlannedCredits = 0;

        semesters.forEach(semester => {
            totalPlannedCredits += semester.totalCredits;
            
            html += `
                <div class="semester-plan">
                    <div class="semester-header">
                        <h4 class="semester-title">${semester.semester}</h4>
                        <span class="semester-credits">${semester.totalCredits} Credits</span>
                    </div>
                    <div class="semester-courses">
                        <div class="course-list">
            `;

            semester.courses.forEach(course => {
                const prereqCheck = this.checkPrerequisites(course.code);
                const prereqChain = this.cachePrerequisiteChain(course.code);
                
                let prereqBadge = '';
                let prereqTooltip = '';
                
                if (course.prerequisites && course.prerequisites.length > 0) {
                    const completedPrereqs = course.prerequisites.filter(p => this.isCourseCompleted(p));
                    const prereqStatus = completedPrereqs.length === course.prerequisites.length ? 'completed' : 'pending';
                    
                    prereqBadge = `<span class="prereq-badge prereq-${prereqStatus}" title="Prerequisites: ${course.prerequisites.join(', ')}">${course.prerequisites.length} REQ</span>`;
                    prereqTooltip = `Prerequisites: ${course.prerequisites.join(', ')}`;
                }

                html += `
                    <div class="course-item ${prereqCheck.eligible ? 'prereq-ready' : 'prereq-waiting'}" title="${prereqTooltip}">
                        <div class="course-info">
                            <div class="course-header">
                                <div class="course-code">${course.code}</div>
                                ${prereqBadge}
                            </div>
                            <div class="course-name">${course.name}</div>
                            ${!prereqCheck.eligible ? `<div class="prereq-warning">⚠️ ${prereqCheck.reason}</div>` : ''}
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

        // Add enhanced summary with prerequisite analysis
        const readyCourses = this.getCoursesReadyToTake();
        const levels = this.getCoursesByPrerequisiteLevel();
        
        html += `
            <div class="plan-summary">
                <h4 class="summary-title">
                    <i class="fas fa-chart-line"></i>
                    Plan Summary & Prerequisites
                </h4>
                <div class="summary-stats">
                    <div class="summary-item">
                        <span class="summary-value">${semesters.length}</span>
                        <span class="summary-label">Semesters Planned</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${totalPlannedCredits}</span>
                        <span class="summary-label">Planned Credits</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${readyCourses.length}</span>
                        <span class="summary-label">Courses Ready Now</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-value">${this.completedCourses.size}</span>
                        <span class="summary-label">Completed Courses</span>
                    </div>
                </div>
                
                <div class="prerequisite-summary">
                    <h5>📋 Course Readiness Breakdown:</h5>
                    <div class="prereq-levels">
                        <div class="prereq-level">
                            <span class="level-badge ready">No Prerequisites</span>
                            <span class="level-count">${levels[0].length} courses</span>
                        </div>
                        <div class="prereq-level">
                            <span class="level-badge intermediate">1-2 Prerequisites</span>
                            <span class="level-count">${levels[1].length + levels[2].length} courses</span>
                        </div>
                        <div class="prereq-level">
                            <span class="level-badge advanced">Complex Chain</span>
                            <span class="level-count">${levels[3].length} courses</span>
                        </div>
                    </div>
                </div>
                
                <div class="plan-actions">
                    <button class="btn btn-outline" onclick="studentPortal.generateAcademicPlan()">
                        <i class="fas fa-refresh"></i> Regenerate Plan
                    </button>
                    <button class="btn btn-outline" onclick="studentPortal.showPrerequisiteTree()">
                        <i class="fas fa-sitemap"></i> View Prerequisite Tree
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

    // ========== AI INTEGRATION: OPENROUTER + GEMINI ==========

    getOpenRouterConfig() {
        // Retrieve API key and model from localStorage, optionally prompting the user for the key.
        let apiKey = (localStorage.getItem('openrouter_api_key') || '').trim();
        let model = (localStorage.getItem('openrouter_model') || '').trim();

        if (!model) {
            // Default to requested model; allow override in localStorage
            model = 'google/gemini-2.5-pro';
        }

        if (!apiKey) {
            // Prompt user for key once; store for subsequent runs
            apiKey = window.prompt('Enter your OpenRouter API key to generate an AI plan (stored locally in your browser):', '');
            if (apiKey) {
                localStorage.setItem('openrouter_api_key', apiKey.trim());
            }
        }

        return { apiKey, model };
    }

    buildStudentContextForAI() {
        const includeSummer = document.getElementById('summerCoursesOption')?.checked ?? true;
        const preferLightLoad = document.getElementById('lightLoadOption')?.checked ?? false;

        const completed = Array.from(this.completedCourses);
        const inProgress = Array.from(this.inProgressCourses);

        return {
            student: {
                id: this.studentData.id,
                name: this.studentData.name,
                major: this.studentData.major,
                gpa: this.studentData.gpa,
                creditsCompleted: this.calculateTotalCredits(false),
                targetCredits: 120,
                preferences: {
                    includeSummer,
                    preferLightLoad
                }
            },
            completedCourses: completed,
            inProgressCourses: inProgress
        };
    }

    getCourseCatalogForAI() {
        // Pull the course catalog and filter to relevant prefixes to keep the payload manageable
        const catalog = this.getAllCourses();
        const relevantPrefixes = ['ECEN','ENSC','CS','MATH','PHYS','CHEM','ENGL','STAT','IEM','HIST','POLS','PSYC','BIOL','ENGR'];
        const isRelevant = (code) => relevantPrefixes.some(p => code?.toUpperCase().startsWith(p));

        // Normalize catalog entries to a compact structure
        const slim = catalog
            .filter(c => c && c.code && isRelevant(c.code))
            .map(c => ({
                code: c.code,
                name: c.name,
                credits: c.credits,
                prerequisites: typeof c.prerequisites === 'string' ? c.prerequisites : Array.isArray(c.prerequisites) ? c.prerequisites.join(', ') : ''
            }));

        // Deduplicate by course code (some catalogs repeat)
        const seen = new Set();
        const unique = [];
        for (const c of slim) {
            if (!seen.has(c.code)) { seen.add(c.code); unique.push(c); }
        }
        return unique;
    }

    async callOpenRouterChat(apiKey, model, messages, extra = {}) {
        const body = {
            model,
            messages,
            temperature: 0.2,
            ...extra
        };

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'OSU Student Portal'
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text().catch(() => '');
            throw new Error(`OpenRouter error ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content || '';
        return content;
    }

    parseJsonFromAI(text) {
        if (!text) return null;
        let clean = text.trim();
        // Remove code fences if present
        if (clean.startsWith('```')) {
            clean = clean.replace(/^```[a-zA-Z]*\n/, '').replace(/\n```$/, '');
        }
        // Try to find the first JSON object
        const start = clean.indexOf('{');
        const end = clean.lastIndexOf('}');
        if (start === -1 || end === -1 || end <= start) return null;
        const candidate = clean.slice(start, end + 1);
        try {
            return JSON.parse(candidate);
        } catch (e) {
            console.warn('Failed to parse AI JSON:', e, candidate);
            return null;
        }
    }

    parsePrereqTextToCodes(text) {
        if (!text || typeof text !== 'string') return [];
        // Match patterns like CS 1113, MATH 2153, ECEN 3714, etc.
        const regex = /\b([A-Z]{2,5})\s?([0-9]{3,4})\b/g;
        const set = new Set();
        let m;
        while ((m = regex.exec(text)) !== null) {
            const code = `${m[1]} ${m[2]}`.trim();
            set.add(code);
        }
        return Array.from(set);
    }

    async generateAcademicPlanAI() {
        const { apiKey, model } = this.getOpenRouterConfig();
        if (!apiKey) {
            // No key provided; signal caller to use fallback
            throw new Error('Missing OpenRouter API key');
        }

        const studentCtx = this.buildStudentContextForAI();
        const catalog = this.getCourseCatalogForAI();

        // Build a compact course map for quick validation
        const courseMap = new Map();
        catalog.forEach(c => courseMap.set(c.code, c));

        const systemPrompt = [
            'You are an academic planning assistant for a university student portal.',
            'Task: Create a prerequisite-respecting, semester-by-semester plan using ONLY the provided course catalog.',
            'Constraints:',
            '- Do not include any course not present in the catalog.',
            '- Do not schedule courses whose prerequisites are not completed in prior semesters of the plan.',
            '- Skip courses already completed or currently in progress.',
            '- Adhere to credit load preferences and optionally include summer.',
            'Output: JSON only, no prose, matching this schema:',
            '{ "plan": [ { "semester": "Fall 2026", "courses": [ { "code": "ECEN 3714", "name": "Network Analysis", "credits": 4, "prerequisites": ["MATH 2233"], "reason": "Required for major; unlocks ECEN 3723" } ], "totalCredits": 15 } ], "notes": ["Short bullets with rationale and assumptions"] }'
        ].join('\n');

        // Determine starting semester label similar to local planner
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        let nextSem;
        if (month >= 0 && month <= 4) nextSem = `Fall ${year}`;
        else if (month >= 5 && month <= 7) nextSem = `Fall ${year}`;
        else nextSem = `Spring ${year + 1}`;

        const userPrompt = {
            student: studentCtx.student,
            completedCourses: studentCtx.completedCourses,
            inProgressCourses: studentCtx.inProgressCourses,
            startingSemester: nextSem,
            catalog: catalog
        };

        let content = await this.callOpenRouterChat(apiKey, model, [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(userPrompt) }
        ]);

        // If the requested model isn't available, try a reasonable fallback
        if (!content && model !== 'google/gemini-1.5-pro') {
            content = await this.callOpenRouterChat(apiKey, 'google/gemini-1.5-pro', [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: JSON.stringify(userPrompt) }
            ]);
        }

        const parsed = this.parseJsonFromAI(content);
        if (!parsed || !Array.isArray(parsed.plan)) {
            throw new Error('AI did not return a valid plan JSON');
        }

        // Normalize AI output to our display shape and enrich with prerequisites if available
        const normalizeCourse = (c) => {
            const code = c.code;
            const catalogEntry = courseMap.get(code) || {};
            const structured = this.findCourse(code);
            let prereqList = [];
            if (structured && Array.isArray(structured.prerequisites)) {
                prereqList = structured.prerequisites.slice();
            } else if (catalogEntry && catalogEntry.prerequisites) {
                prereqList = this.parsePrereqTextToCodes(catalogEntry.prerequisites);
            }
            return {
                code,
                name: c.name || catalogEntry.name || code,
                credits: Number(c.credits || catalogEntry.credits || 0) || 0,
                prerequisites: prereqList
            };
        };

        const semesters = parsed.plan.map(s => {
            const courses = Array.isArray(s.courses) ? s.courses.map(normalizeCourse) : [];
            const totalCredits = typeof s.totalCredits === 'number' && !Number.isNaN(s.totalCredits)
                ? s.totalCredits
                : courses.reduce((sum, c) => sum + (c.credits || 0), 0);
            return {
                semester: s.semester,
                courses,
                totalCredits
            };
        });

        return semesters;
    }

    showPrerequisiteTree() {
        // Display a modal showing the full prerequisite tree
        const modal = document.createElement('div');
        modal.className = 'modal-overlay prerequisite-modal';
        modal.innerHTML = `
            <div class="modal-dialog large">
                <div class="modal-header">
                    <h3><i class="fas fa-sitemap"></i> Course Prerequisite Tree</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.generatePrerequisiteTreeHTML()}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    generatePrerequisiteTreeHTML() {
        const levels = this.getCoursesByPrerequisiteLevel();
        let html = '<div class="prerequisite-tree">';
        
        Object.keys(levels).forEach(level => {
            const levelName = ['Foundation', 'Intermediate', 'Advanced', 'Capstone'][level];
            html += `
                <div class="tree-level">
                    <h4 class="level-title">${levelName} Courses</h4>
                    <div class="level-courses">
            `;
            
            levels[level].forEach(course => {
                const statusClass = course.isCompleted ? 'completed' : 
                                  course.isInProgress ? 'in-progress' : 
                                  course.canTake ? 'ready' : 'blocked';
                
                html += `
                    <div class="tree-course ${statusClass}" title="${course.prerequisites.join(', ')}">
                        <div class="course-code">${course.code}</div>
                        <div class="course-name">${course.name}</div>
                        <div class="course-status">${statusClass.replace('-', ' ')}</div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
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
                ],
                mealPlan: {
                    totalBudget: 2100.00,
                    spent: 420.00,
                    semesterStartDate: '2025-08-26',
                    semesterEndDate: '2025-12-13',
                    mealsPerDay: 3
                }
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
        
        // Calculate academic year based on credits
        const credits = data.credits;
        let academicYear;
        if (credits >= 0 && credits <= 29) {
            academicYear = 1; // Freshman
        } else if (credits >= 30 && credits <= 59) {
            academicYear = 2; // Sophomore
        } else if (credits >= 60 && credits <= 89) {
            academicYear = 3; // Junior
        } else if (credits >= 90 && credits <= 120) {
            academicYear = 4; // Senior
        } else {
            academicYear = 4; // Default to Senior for >120 credits
        }
        
        // Calculate the weighted GPA using the same method as Past Classes
        const calculatedGPA = this.calculateWeightedGPA();
        
        // Calculate total credits from actual classes taken
        const calculatedCredits = this.calculateTotalCredits();
        
        // Update profile information
        if (this.studentNameEl) this.studentNameEl.textContent = data.name.split(' ')[0];
        if (this.fullStudentNameEl) this.fullStudentNameEl.textContent = data.name;
        if (this.studentIdEl) this.studentIdEl.textContent = data.id;
        if (this.studentMajorEl) this.studentMajorEl.textContent = data.major;
        if (this.studentYearEl) this.studentYearEl.textContent = yearNames[academicYear];
        if (this.studentGPAEl) this.studentGPAEl.textContent = calculatedGPA;
        if (this.studentCreditsEl) this.studentCreditsEl.textContent = calculatedCredits;
        if (this.studentStatusEl) this.studentStatusEl.textContent = data.status;
        if (this.studentEmailEl) this.studentEmailEl.textContent = data.email;
        if (this.studentPhoneEl) this.studentPhoneEl.textContent = data.phone;
        if (this.studentAddressEl) this.studentAddressEl.textContent = data.address;
    }

    loadTabContent() {
        this.loadCurrentCourses();
        this.loadGradeHistory();
        this.loadPastClasses();
        this.loadAchievements();
        this.loadRequirements();
        this.loadCourseCatalog();
        this.loadFinancialInfo();
        this.loadSchedule();
        this.loadPlanningTab();
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

        // Group semesters by year
        const groupedByYear = {};
        this.studentData.gradeHistory.forEach(semester => {
            if (!groupedByYear[semester.year]) {
                groupedByYear[semester.year] = [];
            }
            groupedByYear[semester.year].push(semester);
        });

        // Sort years in descending order (most recent first)
        const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

        const historyHTML = sortedYears.map(year => {
            const yearSemesters = groupedByYear[year];
            
            return `
                <div class="year-group">
                    <div class="year-header">${year}</div>
                    ${yearSemesters.map(semester => `
                        <div class="grade-item">
                            <div class="semester-info">
                                <span class="semester-name">${semester.semester}</span>
                            </div>
                            <div class="gpa-value">${semester.gpa.toFixed(1)}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }).join('');

        this.gradeHistoryEl.innerHTML = historyHTML;
    }

    loadPastClasses() {
        if (!this.pastClassesListEl || !this.studentData.pastClasses) return;

        // Initialize filter elements if they exist
        const pastClassesFilter = document.getElementById('pastClassesFilter');
        const pastClassesSearch = document.getElementById('pastClassesSearch');

        // Set up event listeners for filtering
        if (pastClassesFilter && !pastClassesFilter.hasEventListener) {
            pastClassesFilter.addEventListener('change', () => this.filterPastClasses());
            pastClassesFilter.hasEventListener = true;
        }
        
        if (pastClassesSearch && !pastClassesSearch.hasEventListener) {
            pastClassesSearch.addEventListener('input', () => this.filterPastClasses());
            pastClassesSearch.hasEventListener = true;
        }

        // Update summary statistics
        this.updatePastClassesSummary();

        // Display past classes
        this.displayPastClasses();
    }

    calculateWeightedGPA() {
        if (!this.studentData.pastClasses) return '3.8'; // fallback to original value

        let totalWeightedGPA = 0;
        let totalCredits = 0;

        this.studentData.pastClasses.forEach(semester => {
            // Calculate semester credits
            let semesterCredits = semester.classes.reduce((sum, classItem) => sum + classItem.credits, 0);
            
            // Use the semester GPA weighted by semester credits
            if (semester.gpa && semesterCredits > 0) {
                totalWeightedGPA += semester.gpa * semesterCredits;
                totalCredits += semesterCredits;
            }
        });

        // If we have grade history data, cross-reference it for accuracy
        if (this.studentData.gradeHistory && totalCredits === 0) {
            // Fallback to grade history if pastClasses data is incomplete
            this.studentData.gradeHistory.forEach(historyItem => {
                if (historyItem.gpa && historyItem.credits) {
                    totalWeightedGPA += historyItem.gpa * historyItem.credits;
                    totalCredits += historyItem.credits;
                }
            });
        }

        return totalCredits > 0 ? (totalWeightedGPA / totalCredits).toFixed(1) : '3.8';
    }

    calculateTotalCredits(includeCurrentCourses = true) {
        let totalCredits = 0;

        // Add credits from past classes (completed only)
        if (this.studentData.pastClasses) {
            this.studentData.pastClasses.forEach(semester => {
                semester.classes.forEach(classItem => {
                    // Only count completed classes (not withdrawn or failed)
                    if (classItem.grade !== 'W' && classItem.grade !== 'F') {
                        totalCredits += classItem.credits;
                    }
                });
            });
        }

        // Add credits from current courses (in progress) - optional
        if (includeCurrentCourses && this.studentData.currentCourses) {
            totalCredits += this.studentData.currentCourses.reduce((sum, course) => sum + course.credits, 0);
        }

        // If no past classes data, fall back to grade history
        if ((!this.studentData.pastClasses || this.studentData.pastClasses.length === 0) && this.studentData.gradeHistory) {
            totalCredits = this.studentData.gradeHistory.reduce((sum, semester) => sum + semester.credits, 0);
            // Add current courses if available and requested
            if (includeCurrentCourses && this.studentData.currentCourses) {
                totalCredits += this.studentData.currentCourses.reduce((sum, course) => sum + course.credits, 0);
            }
        }

        return totalCredits;
    }

    updatePastClassesSummary() {
        const totalClassesEl = document.getElementById('totalClassesTaken');
        const completedClassesEl = document.getElementById('completedClasses');
        const averageGradeEl = document.getElementById('averageGrade');

        if (!this.studentData.pastClasses) return;

        let totalClasses = 0;
        let completedClasses = 0;
        let totalWeightedGPA = 0;
        let totalCredits = 0;

        this.studentData.pastClasses.forEach(semester => {
            // Calculate semester credits and count classes
            let semesterCredits = 0;
            semester.classes.forEach(classItem => {
                totalClasses++;
                semesterCredits += classItem.credits;
                
                if (classItem.grade !== 'W' && classItem.grade !== 'F') {
                    completedClasses++;
                }
            });
            
            // Use the semester GPA weighted by semester credits
            if (semester.gpa && semesterCredits > 0) {
                totalWeightedGPA += semester.gpa * semesterCredits;
                totalCredits += semesterCredits;
            }
        });

        // If we have grade history data, cross-reference it for accuracy
        if (this.studentData.gradeHistory && totalCredits === 0) {
            // Fallback to grade history if pastClasses data is incomplete
            this.studentData.gradeHistory.forEach(historyItem => {
                if (historyItem.gpa && historyItem.credits) {
                    totalWeightedGPA += historyItem.gpa * historyItem.credits;
                    totalCredits += historyItem.credits;
                }
            });
        }

        const averageGPA = totalCredits > 0 ? (totalWeightedGPA / totalCredits).toFixed(2) : '0.00';

        // Debug logging for GPA calculation
        console.log('GPA Calculation Debug:');
        console.log('Total weighted GPA points:', totalWeightedGPA);
        console.log('Total credits:', totalCredits);
        console.log('Calculated average GPA:', averageGPA);
        console.log('Semester data:', this.studentData.pastClasses?.map(s => ({
            semester: s.semester,
            year: s.year,
            gpa: s.gpa,
            classCount: s.classes.length,
            totalCredits: s.classes.reduce((sum, c) => sum + c.credits, 0)
        })));

        if (totalClassesEl) totalClassesEl.textContent = totalClasses;
        if (completedClassesEl) completedClassesEl.textContent = completedClasses;
        if (averageGradeEl) averageGradeEl.textContent = averageGPA;
    }

    getGradePoints(grade) {
        const gradeMap = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0,
            'W': null, 'WF': 0.0, 'I': null, 'P': null, 'NP': null
        };
        
        // Debug logging to see what grades we're encountering
        if (gradeMap[grade] === undefined) {
            console.warn(`Unknown grade encountered: "${grade}"`);
        }
        
        return gradeMap[grade] !== undefined ? gradeMap[grade] : null;
    }

    displayPastClasses(filteredClasses = null) {
        const classesToDisplay = filteredClasses || this.studentData.pastClasses;
        
        if (!classesToDisplay || classesToDisplay.length === 0) {
            this.pastClassesListEl.innerHTML = `
                <div class="no-classes-message">
                    <i class="fas fa-book-open"></i>
                    No past classes found matching your criteria.
                </div>
            `;
            return;
        }

        // Group semesters by year
        const groupedByYear = {};
        classesToDisplay.forEach(semester => {
            if (!groupedByYear[semester.year]) {
                groupedByYear[semester.year] = [];
            }
            groupedByYear[semester.year].push(semester);
        });

        // Sort years in descending order (most recent first)
        const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

        const pastClassesHTML = sortedYears.map(year => {
            const yearSemesters = groupedByYear[year];
            
            return `
                <div class="year-group">
                    <div class="year-header">${year}</div>
                    ${yearSemesters.map(semester => `
                        <div class="past-class-semester">
                            <div class="semester-subheader">
                                <span class="semester-name">${semester.semester}</span>
                                <span class="semester-gpa">GPA: ${semester.gpa.toFixed(2)}</span>
                            </div>
                            <div class="semester-classes">
                                ${semester.classes.map(classItem => {
                                    // Look up the correct course name from our centralized database
                                    const courseInfo = this.findCourse(classItem.code);
                                    const displayName = courseInfo ? courseInfo.name : classItem.name;
                                    
                                    return `
                                    <div class="past-class-item">
                                        <div class="past-class-info">
                                            <div class="past-class-code">${classItem.code}</div>
                                            <div class="past-class-name">${displayName}</div>
                                            <div class="past-class-instructor">Prof. ${classItem.instructor}</div>
                                        </div>
                                        <div class="past-class-grade">
                                            <span class="grade-badge grade-${classItem.grade.toLowerCase().replace('+', 'plus').replace('-', 'minus')}">${classItem.grade}</span>
                                            <span class="past-class-credits">${classItem.credits}</span>
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }).join('');

        this.pastClassesListEl.innerHTML = pastClassesHTML;
    }

    filterPastClasses() {
        const filterValue = document.getElementById('pastClassesFilter')?.value || 'all';
        const searchValue = document.getElementById('pastClassesSearch')?.value.toLowerCase() || '';

        if (!this.studentData.pastClasses) return;

        let filteredSemesters = this.studentData.pastClasses.map(semester => {
            let filteredClasses = semester.classes;

            // Apply search filter
            if (searchValue) {
                filteredClasses = filteredClasses.filter(classItem => 
                    classItem.code.toLowerCase().includes(searchValue) ||
                    classItem.name.toLowerCase().includes(searchValue) ||
                    classItem.instructor.toLowerCase().includes(searchValue)
                );
            }

            // Apply status filter
            if (filterValue === 'completed') {
                filteredClasses = filteredClasses.filter(classItem => 
                    classItem.grade !== 'W' && classItem.grade !== 'F'
                );
            } else if (filterValue === 'failed') {
                filteredClasses = filteredClasses.filter(classItem => 
                    classItem.grade === 'W' || classItem.grade === 'F'
                );
            }

            return {
                ...semester,
                classes: filteredClasses
            };
        }).filter(semester => semester.classes.length > 0);

        this.displayPastClasses(filteredSemesters);
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

    loadCourseCatalog() {
        if (!this.courseCatalogEl) return;

        const courses = this.getAllCourses();
        this.renderCourseCatalog(courses);
        this.attachCatalogEventListeners();
    }

    getAllCourses() {
        const allCourses = [
            // MATH Courses - Complete Mathematics Department Catalog
            {
                code: "MATH 1483",
                name: "Mathematical Functions and Their Uses (Q)",
                credits: 3,
                prerequisites: "An acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1493",
                name: "Applications of Modern Mathematics (Q)",
                credits: 3,
                prerequisites: "An acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1513",
                name: "College Algebra (Q)",
                credits: 3,
                prerequisites: "An acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1583",
                name: "Applied Geometry and Trigonometry (Q)",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in MATH 1483 or MATH 1513, or an acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1613",
                name: "Trigonometry (Q)",
                credits: 3,
                prerequisites: "MATH 1513 with a grade of \"C\" or better or an acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1715",
                name: "Precalculus (Q)",
                credits: 3,
                prerequisites: "An acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1813",
                name: "Preparation for Calculus (Q)",
                credits: 3,
                prerequisites: "MATH 1513 with a grade of \"C\" or better or an acceptable placement score.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 1910",
                name: "Special Studies",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "1000",
                department: "Mathematics"
            },
            {
                code: "MATH 2103",
                name: "Business Calculus (Q)",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in one of MATH 1483 or MATH 1513 or MATH 1715 or MATH 1813, or an acceptable placement score.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2123",
                name: "Calculus for Technology Programs I (Q)",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in MATH 1613 or MATH 1715 or MATH 1813, or an acceptable placement score.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2133",
                name: "Calculus for Technology Programs II (Q)",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in MATH 2123 or MATH 2144.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2144",
                name: "Calculus I (Q)",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in MATH 1613 or MATH 1715 or MATH 1813, or an acceptable placement score.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2153",
                name: "Calculus II (Q)",
                credits: 3,
                prerequisites: "MATH 2144 with a grade of \"C\" or better.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2163",
                name: "Calculus III",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2233",
                name: "Differential Equations",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2890",
                name: "Honors Experience in Math",
                credits: 1,
                prerequisites: "Honors College participation and concurrent enrollment in a designated MATH course.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2900",
                name: "Undergraduate Research",
                credits: 3,
                prerequisites: "Consent of Instructor.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 2910",
                name: "Special Studies",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "2000",
                department: "Mathematics"
            },
            {
                code: "MATH 3013",
                name: "Linear Algebra (Q)",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3263",
                name: "Linear Algebra and Differential Equations",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3303",
                name: "Advanced Perspectives on Secondary Mathematics",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3403",
                name: "Geometric Structures for Early Childhood and Elementary Teachers",
                credits: 3,
                prerequisites: "MATH 1483 or MATH 1493 or MATH 1513.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3583",
                name: "Introduction to Mathematical Modeling",
                credits: 3,
                prerequisites: "MATH 2233 and MATH 3013 with grades of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3603",
                name: "Mathematical Structures for Early Childhood and Elementary Teachers",
                credits: 3,
                prerequisites: "MATH 1483 or MATH 1493 or MATH 1513.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3613",
                name: "Introduction to Abstract Algebra",
                credits: 3,
                prerequisites: "MATH 3013 with a grade of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3703",
                name: "Mathematical Structures in the Middle Grades",
                credits: 3,
                prerequisites: "MATH 3603 and MATH 3403 with grades of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3890",
                name: "Advanced Honors Experience in Mathematics",
                credits: 1,
                prerequisites: "Honors College participation and concurrent enrollment in a designated MATH course.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3910",
                name: "Special Studies",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "3000",
                department: "Mathematics"
            },
            {
                code: "MATH 3933",
                name: "Introduction to Mathematical Research",
                credits: 3,
                prerequisites: "MATH 3013 with grade of \"C\" or better.",
                level: "3000",
                department: "Mathematics"
            },
            // 4000 Level MATH Courses
            {
                code: "MATH 4003",
                name: "Mathematical Logic and Computability",
                credits: 3,
                prerequisites: "MATH 3613 or PHIL 3003 or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4013",
                name: "Calculus of Several Variables",
                credits: 3,
                prerequisites: "MATH 2163 and MATH 3013 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4023",
                name: "Introduction to Analysis",
                credits: 3,
                prerequisites: "MATH 2153 and MATH 3613 with grades of \"C\" or better, or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4033",
                name: "History of Mathematics",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4063",
                name: "Advanced Linear Algebra",
                credits: 3,
                prerequisites: "MATH 3013 and MATH 3613 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4083",
                name: "Intermediate Analysis",
                credits: 3,
                prerequisites: "MATH 4023 with grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4143",
                name: "Advanced Calculus I",
                credits: 3,
                prerequisites: "MATH 2163, MATH 3013, and MATH 4023 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4153",
                name: "Advanced Calculus II",
                credits: 3,
                prerequisites: "MATH 4143 with grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4233",
                name: "Intermediate Differential Equations",
                credits: 3,
                prerequisites: "MATH 2233 and MATH 3013 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4263",
                name: "Introduction to Partial Differential Equations",
                credits: 3,
                prerequisites: "MATH 2163 and MATH 2233 and MATH 3013 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4283",
                name: "Functions of a Complex Variable",
                credits: 3,
                prerequisites: "MATH 4013 with a grade of \"C\" or better, or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4343",
                name: "Introduction to Topology",
                credits: 3,
                prerequisites: "MATH 4023 with a grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4403",
                name: "Geometry",
                credits: 3,
                prerequisites: "MATH 3013 and MATH 3613 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4423",
                name: "Geometry and Algorithms in Three-Dimensional Modeling",
                credits: 3,
                prerequisites: "MATH 2163 and MATH 3013 and (CS 1103 or CS 1113 or ENGR 1412) with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4443",
                name: "Differential Geometry of Curves and Surfaces",
                credits: 3,
                prerequisites: "MATH 2163 and MATH 3013 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4453",
                name: "Mathematical Interest Theory",
                credits: 3,
                prerequisites: "MATH 2153 and MATH 2233 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4513",
                name: "Introduction to Numerical Analysis",
                credits: 3,
                prerequisites: "MATH 2233 and MATH 3013 with grades of \"C\" or better and knowledge of programming, or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4533",
                name: "Matrix Methods in Machine Learning",
                credits: 3,
                prerequisites: "MATH 3013 with grade of \"C\" or better and knowledge of computer programming, or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4553",
                name: "Introduction to Optimization",
                credits: 3,
                prerequisites: "MATH 2163 and MATH 3013 with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4573",
                name: "Introduction to Mathematical Epidemiology",
                credits: 3,
                prerequisites: "MATH 2163, MATH 2233, and MATH 3013 with grades of \"C\" or better; and basic experience in coding, or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4590",
                name: "Professional Practice in Mathematics",
                credits: 3,
                prerequisites: "Declared major in mathematics and consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4613",
                name: "Abstract Algebra I",
                credits: 3,
                prerequisites: "MATH 3613 with grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4623",
                name: "Abstract Algebra II",
                credits: 3,
                prerequisites: "MATH 4613 with grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4663",
                name: "Combinatorics",
                credits: 3,
                prerequisites: "MATH 3013 with a grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4713",
                name: "Number Theory",
                credits: 3,
                prerequisites: "MATH 3613 with a grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4753",
                name: "Introduction to Cryptography",
                credits: 3,
                prerequisites: "MATH 3013 and (MATH 3613 or CS 3653) with grades of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4813",
                name: "Groups and Representations",
                credits: 3,
                prerequisites: "MATH 3013 and MATH 3613 with grades of \"C\" or better, or consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4900",
                name: "Undergraduate Research",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4910",
                name: "Special Studies",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4950",
                name: "Problem Solving Seminar",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4963",
                name: "Preparation for Senior Thesis",
                credits: 3,
                prerequisites: "Consent of instructor, junior or senior standing.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4973",
                name: "Senior Thesis",
                credits: 3,
                prerequisites: "Consent of instructor, senior standing.",
                level: "4000",
                department: "Mathematics"
            },
            {
                code: "MATH 4993",
                name: "Senior Honors Thesis",
                credits: 3,
                prerequisites: "Consent of instructor, senior standing, and Honors Program participation.",
                level: "4000",
                department: "Mathematics"
            },
            // 5000 Level MATH Courses (Graduate)
            {
                code: "MATH 5000",
                name: "Master's Research and Thesis",
                credits: 6,
                prerequisites: "Consent of advisory committee.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5003",
                name: "Abstract Algebra I",
                credits: 3,
                prerequisites: "MATH 3613 with grade of \"C\" or better.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5010",
                name: "Seminar in Mathematics",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5013",
                name: "Abstract Algebra II",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in one of MATH 4613 or MATH 5003.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5023",
                name: "Advanced Linear Algebra",
                credits: 3,
                prerequisites: "MATH 3013 and MATH 3613 with grades of \"C\" or better.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5033",
                name: "History of Mathematics",
                credits: 3,
                prerequisites: "MATH 2153 with a grade of \"C\" or better.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5043",
                name: "Advanced Calculus I",
                credits: 3,
                prerequisites: "MATH 2163, MATH 3013, and MATH 4023 with grades of \"C\" or better.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5053",
                name: "Advanced Calculus II",
                credits: 3,
                prerequisites: "Grade of \"C\" or better in one of MATH 4143 or MATH 5043.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5063",
                name: "Calculus of Several Variables",
                credits: 3,
                prerequisites: "MATH 2163 and MATH 3013 with grades of \"C\" or better.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5073",
                name: "Introduction to Analysis",
                credits: 3,
                prerequisites: "MATH 2153 and MATH 3613 with grades of \"C\" or better, or consent of instructor.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5083",
                name: "Intermediate Analysis",
                credits: 3,
                prerequisites: "MATH 4023 with grade of \"C\" or better.",
                level: "5000",
                department: "Mathematics"
            },
            {
                code: "MATH 5133",
                name: "Stochastic Processes",
                credits: 3,
                prerequisites: "MATH 2233, MATH 3013 and STAT 5123.",
                level: "5000",
                department: "Mathematics"
            },
            // 6000 Level MATH Courses (Doctoral)
            {
                code: "MATH 6000",
                name: "Doctoral Research and Dissertation",
                credits: 12,
                prerequisites: "Consent of advisory committee.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 6010",
                name: "Advanced Seminar in Mathematics",
                credits: 3,
                prerequisites: "Consent of instructor and student's advisory committee.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 6090",
                name: "Doctoral Research Project",
                credits: 6,
                prerequisites: "Consent of advisory committee.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 6143",
                name: "Functional Analysis I",
                credits: 3,
                prerequisites: "MATH 4613 or MATH 5003 or MATH 5023, MATH 5153, MATH 5303.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 6213",
                name: "Harmonic Analysis",
                credits: 3,
                prerequisites: "MATH 5153, MATH 5283.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 6233",
                name: "Advanced Partial Differential Equations",
                credits: 3,
                prerequisites: "MATH 5233 or consent of instructor.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 6290",
                name: "Topics in Analysis",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "6000",
                department: "Mathematics"
            },
            {
                code: "MATH 2233",
                name: "Differential Equations",
                credits: 3,
                prerequisites: "MATH 2163 with a grade of C or better.",
                level: "2000"
            },
            {
                code: "MATH 3013",
                name: "Linear Algebra",
                credits: 3,
                prerequisites: "MATH 2163 with a grade of C or better.",
                level: "3000"
            },
            // PHYSICS Courses - Complete Physics Department Catalog
            {
                code: "PHYS 1001",
                name: "Frontiers of Physics",
                credits: 1,
                prerequisites: "Freshmen and sophomore Physics Majors only or consent of instructor.",
                level: "1000",
                department: "Physics"
            },
            {
                code: "PHYS 1014",
                name: "Descriptive Physics (N)",
                credits: 3,
                prerequisites: "None.",
                level: "1000",
                department: "Physics"
            },
            {
                code: "PHYS 1114",
                name: "College Physics I (LN)",
                credits: 4,
                prerequisites: "Minimum grade of \"C\" in MATH 1513 or higher.",
                level: "1000",
                department: "Physics"
            },
            {
                code: "PHYS 1214",
                name: "College Physics II (LN)",
                credits: 4,
                prerequisites: "PHYS 1114 or PHYS 2014 with a \"C\" or better or acceptable AP credit.",
                level: "1000",
                department: "Physics"
            },
            {
                code: "PHYS 2014",
                name: "University Physics I (LN)",
                credits: 4,
                prerequisites: "Minimum grade of \"C\" in MATH 2103 or MATH 2123 or MATH 2144 or acceptable AP credit.",
                level: "2000",
                department: "Physics"
            },
            {
                code: "PHYS 2020",
                name: "Special Topics in Physics (L)",
                credits: 1,
                prerequisites: "None. (Lab exercises for introductory courses).",
                level: "2000",
                department: "Physics"
            },
            {
                code: "PHYS 2114",
                name: "University Physics II (LN)",
                credits: 4,
                prerequisites: "PHYS 2014 with a \"C\" or better or acceptable AP credit.",
                level: "2000",
                department: "Physics"
            },
            {
                code: "PHYS 2203",
                name: "University Physics III",
                credits: 3,
                prerequisites: "PHYS 2114 with a grade of \"C\" or better or acceptable AP credit.",
                level: "2000",
                department: "Physics"
            },
            {
                code: "PHYS 2663",
                name: "Physics in Medicine (N)",
                credits: 3,
                prerequisites: "None.",
                level: "2000",
                department: "Physics"
            },
            {
                code: "PHYS 2890",
                name: "Honors Experience in Physics",
                credits: 3,
                prerequisites: "Honors Program participation and concurrent enrollment in designated course(s).",
                level: "2000",
                department: "Physics"
            },
            {
                code: "PHYS 3013",
                name: "Mechanics I",
                credits: 3,
                prerequisites: "PHYS 2114 or equivalent, and MATH 2233 or concurrent enrollment.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3113",
                name: "Thermal Physics",
                credits: 3,
                prerequisites: "PHYS 2203 and MATH 2163 or concurrent enrollment.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3213",
                name: "Optics",
                credits: 3,
                prerequisites: "PHYS 2114 and PHYS 3513, or consent of the instructor.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3313",
                name: "Introduction to Semiconductor Device Physics",
                credits: 3,
                prerequisites: "PHYS 2114 or equivalent.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3323",
                name: "Modern Laboratory Methods I",
                credits: 3,
                prerequisites: "PHYS 2014, PHYS 2114.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3513",
                name: "Mathematical Physics",
                credits: 3,
                prerequisites: "PHYS 2114 and MATH 2163.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3553",
                name: "Foundations of Cancer",
                credits: 3,
                prerequisites: "Minimum grade of \"C\" in CHEM 1225 or CHEM 1414 or CHEM 1515.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3623",
                name: "Modern Laboratory Methods II",
                credits: 3,
                prerequisites: "PHYS 2014, PHYS 2114.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 3713",
                name: "Modern Physics",
                credits: 3,
                prerequisites: "PHYS 2203 with a \"C\" or better.",
                level: "3000",
                department: "Physics"
            },
            {
                code: "PHYS 4003",
                name: "Computer Simulation Methods in Physics",
                credits: 3,
                prerequisites: "PHYS 3013, PHYS 3113, PHYS 3313 or consent of instructor.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4010",
                name: "Special Problems",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4113",
                name: "Electricity and Magnetism",
                credits: 3,
                prerequisites: "PHYS 2114 and MATH 2233, or their equivalents.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4213",
                name: "Introduction to Nuclear and Particle Physics",
                credits: 3,
                prerequisites: "PHYS 2114 and PHYS 3713 or consent of instructor.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4223",
                name: "Introduction to General Relativity",
                credits: 3,
                prerequisites: "Minimum grade of \"C\" in both PHYS 2203 and PHYS 3513 or consent of instructor.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4263",
                name: "Introduction to Solid State Physics",
                credits: 3,
                prerequisites: "PHYS 3013, PHYS 3713 or consent of instructor.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4313",
                name: "Molecular Biophysics",
                credits: 3,
                prerequisites: "PHYS 1214 or PHYS 2114.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4413",
                name: "Modern Physics II",
                credits: 3,
                prerequisites: "PHYS 3013 and PHYS 3713.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4423",
                name: "Mechanics II",
                credits: 3,
                prerequisites: "PHYS 3013.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4503",
                name: "Quantum Information",
                credits: 3,
                prerequisites: "PHYS 3713 Modern Physics.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4513",
                name: "Introductory Quantum Mechanics",
                credits: 3,
                prerequisites: "PHYS 3713.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4663",
                name: "Radioactivity and Nuclear Physics",
                credits: 3,
                prerequisites: "PHYS 3713 or consent of instructor.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4712",
                name: "Senior Project",
                credits: 2,
                prerequisites: "None listed.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4813",
                name: "Electromagnetic Radiation",
                credits: 3,
                prerequisites: "PHYS 4113 with minimum grade of \"C.\"",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 4993",
                name: "Senior Honors Thesis",
                credits: 3,
                prerequisites: "Departmental invitation, senior standing, Honors Program participation.",
                level: "4000",
                department: "Physics"
            },
            {
                code: "PHYS 5000",
                name: "Master's Thesis Research or Report",
                credits: 3,
                prerequisites: "Consent of major professor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5110",
                name: "Seminar",
                credits: 1,
                prerequisites: "Graduate standing in physics.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5113",
                name: "Statistical Thermodynamics and Kinetic Theory",
                credits: 3,
                prerequisites: "PHYS 3113.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5123",
                name: "Geometrical Optics",
                credits: 3,
                prerequisites: "PHYS 3213 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5133",
                name: "Laser Spectroscopy",
                credits: 3,
                prerequisites: "PHYS 5163.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5163",
                name: "Lasers",
                credits: 3,
                prerequisites: "PHYS 4813 or equivalent.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5213",
                name: "Statistical Mechanics",
                credits: 3,
                prerequisites: "PHYS 5113 and PHYS 5613 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5220",
                name: "Physics Topics for Teachers",
                credits: 3,
                prerequisites: "Teaching experience or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5263",
                name: "Particle Physics",
                credits: 3,
                prerequisites: "PHYS 5613 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5303",
                name: "Physical Optics",
                credits: 3,
                prerequisites: "PHYS 3213 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5313",
                name: "Electromagnetic Theory",
                credits: 3,
                prerequisites: "PHYS 5453.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5350",
                name: "Special Problems",
                credits: 3,
                prerequisites: "Graduate standing in physics.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5413",
                name: "Classical Mechanics",
                credits: 3,
                prerequisites: "PHYS 4423 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5453",
                name: "Mathematical Methods for Physicists",
                credits: 3,
                prerequisites: "PHYS 3513.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5503",
                name: "Frontiers of Quantum Information Science",
                credits: 3,
                prerequisites: "None listed.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5523",
                name: "Radiation Detection and Measurement",
                credits: 3,
                prerequisites: "PHYS 3713 and PHYS 4213.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5533",
                name: "Dosimetry and Radiation Protection",
                credits: 3,
                prerequisites: "PHYS 4663 and PHYS 5523 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5553",
                name: "Foundations of Cancer",
                credits: 3,
                prerequisites: "Minimum grade of \"C\" in (or equivalent) or MICR 3033 (or equivalent) or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5563",
                name: "Radioactivity and Nuclear Physics Laboratory",
                credits: 3,
                prerequisites: "PHYS 4663 and PHYS 5523 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5573",
                name: "Radiation Biophysics",
                credits: 3,
                prerequisites: "PHYS 5533 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5593",
                name: "Physics of Radiation Therapy",
                credits: 3,
                prerequisites: "PHYS 5533 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5613",
                name: "Quantum Mechanics I",
                credits: 3,
                prerequisites: "PHYS 5453.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5663",
                name: "Solid State Physics I",
                credits: 3,
                prerequisites: "PHYS 4513.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5713",
                name: "Solid State Physics II",
                credits: 3,
                prerequisites: "PHYS 5663 or equivalent.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5813",
                name: "General Relativity",
                credits: 3,
                prerequisites: "PHYS 5453 or consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 5960",
                name: "Problems in Chemical Physics",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "5000",
                department: "Physics"
            },
            {
                code: "PHYS 6000",
                name: "Doctoral Dissertation Research",
                credits: 3,
                prerequisites: "Admission to candidacy and permission of major professor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6010",
                name: "Advanced Graduate Seminar",
                credits: 1,
                prerequisites: "Consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6113",
                name: "Advanced Theory of Solids",
                credits: 3,
                prerequisites: "PHYS 5663.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6213",
                name: "Group Theory for Physics",
                credits: 3,
                prerequisites: "PHYS 5453.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6243",
                name: "Semiconductors I",
                credits: 3,
                prerequisites: "PHYS 5113, PHYS 5613, PHYS 5663.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6260",
                name: "Special Topics in High Energy Physics",
                credits: 3,
                prerequisites: "PHYS 5263 or consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6313",
                name: "Quantum Mechanics II",
                credits: 3,
                prerequisites: "PHYS 5613.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6323",
                name: "Quantum Field Theory",
                credits: 3,
                prerequisites: "PHYS 6313 or consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6343",
                name: "Semiconductors II",
                credits: 3,
                prerequisites: "PHYS 6243.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6413",
                name: "Nonlinear Optics",
                credits: 3,
                prerequisites: "PHYS 5163, PHYS 5313, and PHYS 5613.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6423",
                name: "Quantum Optics",
                credits: 3,
                prerequisites: "PHYS 5163, PHYS 5613 or consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6513",
                name: "Advanced Topics in Solid State Physics",
                credits: 3,
                prerequisites: "PHYS 5663 or equivalent.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6613",
                name: "Advanced Nuclear and Particle Physics",
                credits: 3,
                prerequisites: "PHYS 5263, PHYS 6313; or consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6713",
                name: "Advanced Electromagnetic Radiation",
                credits: 3,
                prerequisites: "Consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6803",
                name: "Photonics I: Advanced Optics",
                credits: 3,
                prerequisites: "ECEN 3213 or ECEN 3813.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6810",
                name: "Photonics II: THz Photonics and THz-TDS",
                credits: 3,
                prerequisites: "PHYS 6803.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6820",
                name: "Photonics II: Spectroscopy II",
                credits: 3,
                prerequisites: "PHYS 6803.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6830",
                name: "Photonics II: Spectroscopy III",
                credits: 3,
                prerequisites: "PHYS 6803.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6840",
                name: "Photonics III: Microscopy I",
                credits: 3,
                prerequisites: "CHEM 3553 or consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6850",
                name: "Photonics III: Microscopy II",
                credits: 3,
                prerequisites: "PHYS 3553 or consent of instructor.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6860",
                name: "Photonics III: Microscopy III and Image Processing",
                credits: 3,
                prerequisites: "ECEN 5793.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6870",
                name: "Photonics IV: Synthesis and Devices I",
                credits: 3,
                prerequisites: "PHYS 6803 and PHYS 6840.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6880",
                name: "Photonics IV: Semiconductor Devices, Testing and Characterization",
                credits: 3,
                prerequisites: "PHYS 6803.",
                level: "6000",
                department: "Physics"
            },
            {
                code: "PHYS 6890",
                name: "Photonics IV: Semiconductor Synthesis and Devices III",
                credits: 3,
                prerequisites: "PHYS 6803.",
                level: "6000",
                department: "Physics"
            },
            // Computer Science Courses
            {
                code: "CS 1113",
                name: "Introduction to Programming",
                credits: 3,
                prerequisites: "None.",
                level: "1000"
            },
            {
                code: "CS 2133",
                name: "Introduction to Computer Science",
                credits: 3,
                prerequisites: "CS 1113 with a grade of C or better.",
                level: "2000"
            },
            {
                code: "CS 2433",
                name: "Data Structures",
                credits: 3,
                prerequisites: "CS 2133 with a grade of C or better.",
                level: "2000"
            },
            // Engineering Science Courses
            {
                code: "ENSC 2113",
                name: "Statics",
                credits: 3,
                prerequisites: "PHYS 2114 and MATH 2153 with grades of C or better.",
                level: "2000"
            },
            {
                code: "ENSC 2411",
                name: "Engineering Laboratory I",
                credits: 1,
                prerequisites: "PHYS 2114 concurrent enrollment or completion.",
                level: "2000"
            },
            {
                code: "ENSC 2611",
                name: "Engineering Mathematics",
                credits: 1,
                prerequisites: "MATH 2163 with a grade of C or better.",
                level: "2000"
            },
            {
                code: "ENSC 2613",
                name: "Thermodynamics",
                credits: 3,
                prerequisites: "PHYS 2114 and MATH 2163 with grades of C or better.",
                level: "2000"
            },
            {
                code: "ENSC 3213",
                name: "Engineering Systems Design",
                credits: 3,
                prerequisites: "ENSC 2113 and junior standing.",
                level: "3000"
            },
            // Other Required Courses
            {
                code: "ENGR 1412",
                name: "Introduction to Engineering",
                credits: 2,
                prerequisites: "None.",
                level: "1000"
            },
            {
                code: "EET 1103",
                name: "Introduction to Electrical Engineering Technology",
                credits: 3,
                prerequisites: "None.",
                level: "1000"
            },
            {
                code: "ENGL 3323",
                name: "Technical Writing",
                credits: 3,
                prerequisites: "ENGL 1113 and ENGL 1213 with grades of C or better.",
                level: "3000"
            },
            {
                code: "STAT 4033",
                name: "Probability and Statistics",
                credits: 3,
                prerequisites: "MATH 2163 with a grade of C or better.",
                level: "4000"
            },
            // Mechanical/Aerospace Engineering Courses
            {
                code: "MAE 3723",
                name: "Control Systems I",
                credits: 3,
                prerequisites: "MAE 2343 and MATH 2233 with grades of C or better.",
                level: "3000"
            },
            {
                code: "MAE 3724",
                name: "Control Systems Laboratory",
                credits: 1,
                prerequisites: "MAE 3723 concurrent enrollment or completion.",
                level: "3000"
            },
            {
                code: "MAE 4733",
                name: "Mechatronics",
                credits: 3,
                prerequisites: "MAE 3723 with a grade of C or better.",
                level: "4000"
            },
            {
                code: "MAE 5473",
                name: "Advanced Control Systems",
                credits: 3,
                prerequisites: "MAE 3723 or equivalent with departmental permission.",
                level: "5000"
            },
            {
                code: "MAE 5713",
                name: "Linear Systems Theory",
                credits: 3,
                prerequisites: "Graduate standing and departmental permission.",
                level: "5000"
            },
            {
                code: "CHEM 3553",
                name: "Physical Chemistry",
                credits: 3,
                prerequisites: "CHEM 1515 and PHYS 2114 and MATH 2163 with grades of C or better.",
                level: "3000"
            },
            {
                code: "ECEN 2011",
                name: "Experimental Methods I",
                credits: 1,
                prerequisites: 'PHYS 2114 with a "C" or better or concurrent enrollment/advisor permission.',
                level: "2000"
            },
            {
                code: "ECEN 2233",
                name: "Fundamentals of Digital Logic Design",
                credits: 3,
                prerequisites: 'MATH 1813 with a "C" or better or concurrent enrollment.',
                level: "2000"
            },
            {
                code: "ECEN 2714",
                name: "Fundamentals of Electric Circuits",
                credits: 4,
                prerequisites: 'MATH 2153 with a "C" or better and (PHYS 2114 and MATH 2233 and ENSC 2611 with a "C" or better or concurrent enrollment).',
                level: "2000"
            },
            {
                code: "ECEN 3020",
                name: "Supervised Research Project",
                credits: 1,
                prerequisites: "Consent of instructor and ECEN department head.",
                level: "3000"
            },
            {
                code: "ECEN 3113",
                name: "Energy, Environment and Economics",
                credits: 3,
                prerequisites: 'ECEN 3714 with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3213",
                name: "Computer Based Systems in Engineering",
                credits: 3,
                prerequisites: 'ECEN 2714 and ECEN 2233 and (CS 2433 or CS 2133 or ENGR 1412 or EET 1103), all with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3314",
                name: "Electronic Devices and Applications",
                credits: 4,
                prerequisites: 'ECEN 3714 with a "C" or better and ENSC 2611 with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3513",
                name: "Signal Analysis",
                credits: 3,
                prerequisites: 'ECEN 3714 with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3613",
                name: "Applied Fields and Waves I",
                credits: 3,
                prerequisites: 'MATH 2163 and ECEN 3714 with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3623",
                name: "Applied Fields and Waves II",
                credits: 3,
                prerequisites: "ECEN 3613.",
                level: "3000"
            },
            {
                code: "ECEN 3714",
                name: "Network Analysis",
                credits: 4,
                prerequisites: 'MATH 2233 and PHYS 2114 and (ECEN 2714 or (both ENSC 2613 and ENSC 2411) or (both ENSC 2613 and ECEN 2011)) with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3723",
                name: "Systems I",
                credits: 3,
                prerequisites: 'ECEN 3714 and ENSC 2113 with a "C" or better and (MATH 3013 with a "C" or better or concurrent enrollment).',
                level: "3000"
            },
            {
                code: "ECEN 3903",
                name: "Introduction to Semiconductor Devices",
                credits: 3,
                prerequisites: 'ECEN 3714 with a "C" or better.',
                level: "3000"
            },
            {
                code: "ECEN 3913",
                name: "Solid State Electronic Devices",
                credits: 3,
                prerequisites: 'ECEN 3714 with a "C" or better and (PHYS 3313 or ECEN 3903 with a "C" or better).',
                level: "3000"
            },
            {
                code: "ECEN 4013",
                name: "Design of Engineering Systems",
                credits: 3,
                prerequisites: '(ECEN 3213 or ENSC 3213), (ECEN 2233 or ECEN 3233), ECEN 3714, ECEN 3613, ECEN 3513, ECEN 3314, all with a "C" or better, and (ENGL 3323 with a "C" or better or concurrent enrollment).',
                level: "4000"
            },
            {
                code: "ECEN 4024",
                name: "Capstone Design",
                credits: 4,
                prerequisites: "ECEN 4013 and ECEN 4503.",
                level: "4000"
            },
            {
                code: "ECEN 4133",
                name: "Power Electronics",
                credits: 3,
                prerequisites: 'ECEN 3714 with a "C" or better.',
                level: "4000"
            },
            {
                code: "ECEN 4153",
                name: "Power System Analysis and Design",
                credits: 3,
                prerequisites: 'ECEN 3714, "C" or better.',
                level: "4000"
            },
            {
                code: "ECEN 4213",
                name: "Embedded Computer Systems Design",
                credits: 3,
                prerequisites: '(ECEN 3213 or ENSC 3213), (ECEN 2233 or ECEN 3233) and ECEN 3714, all with a "C" or better.',
                level: "4000"
            },
            {
                code: "ECEN 4313",
                name: "Linear Electronics Circuit Design",
                credits: 3,
                prerequisites: "ECEN 3314.",
                level: "4000"
            },
            {
                code: "ECEN 4413",
                name: "Automatic Control Systems",
                credits: 3,
                prerequisites: "ECEN 3723 or (MAE 3723 or MAE 3724).",
                level: "4000"
            },
            {
                code: "ECEN 4503",
                name: "Applications of Probability and Statistics to Random Signals",
                credits: 3,
                prerequisites: "ECEN 3513.",
                level: "4000"
            },
            {
                code: "ECEN 4523",
                name: "Communication Theory",
                credits: 3,
                prerequisites: "Currently enrolled in ECEN 4503 or have taken ECEN 4503 or both ECEN 3513 and STAT 4033.",
                level: "4000"
            },
            {
                code: "ECEN 4763",
                name: "Introduction to Digital Signal Processing",
                credits: 3,
                prerequisites: "ECEN 3513.",
                level: "4000"
            }
        ];
        
        // Add imported courses if any exist
        const importedCourses = this.getImportedCourses();
        return allCourses.concat(importedCourses);
    }

    getImportedCourses() {
        try {
            const stored = localStorage.getItem('importedCourses');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading imported courses:', error);
            return [];
        }
    }

    renderCourseCatalog(courses) {
        const coursesHTML = courses.map(course => {
            const levelClass = `level-${course.level}`;
            const departmentLabel = course.department || "Electrical Engineering";
            return `
                <div class="catalog-course-item" data-level="${course.level}" data-code="${course.code.toLowerCase()}" data-name="${course.name.toLowerCase()}">
                    <div class="course-badges">
                        <div class="course-level-badge ${levelClass}">${course.level} Level</div>
                        <div class="course-program-badge">${departmentLabel}</div>
                    </div>
                    <div class="catalog-course-header">
                        <div class="catalog-course-code">${course.code}</div>
                        <div class="catalog-course-credits">${course.credits} Credits</div>
                    </div>
                    <div class="catalog-course-name">${course.name}</div>
                    <div class="catalog-course-prereqs">
                        <div class="prereqs-label">
                            <i class="fas fa-link"></i>
                            Prerequisites:
                        </div>
                        <div class="prereqs-text">${course.prerequisites}</div>
                    </div>
                    <div class="catalog-course-actions">
                        <button class="btn btn-sm btn-primary" onclick="studentPortal.addCourseToPlan('${course.code}', '${course.name}', ${course.credits})">
                            <i class="fas fa-plus"></i> Add to Plan
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.courseCatalogEl.innerHTML = coursesHTML;
    }

    addCourseToPlan(courseCode, courseName, credits) {
        // Check if course is already in current courses
        const currentCourses = this.studentData.currentCourses.map(course => course.code);
        if (currentCourses.includes(courseCode)) {
            alert(`${courseCode} is already in your current courses.`);
            return;
        }

        // Initialize planning data if needed
        if (!this.customizationData) {
            this.customizationData = { selectedCourses: [] };
        }

        // Check if already selected
        const alreadySelected = this.customizationData.selectedCourses.find(course => course.code === courseCode);
        if (alreadySelected) {
            alert(`${courseCode} is already added to your plan.`);
            return;
        }

        // Add to selected courses
        this.customizationData.selectedCourses.push({
            code: courseCode,
            name: courseName,
            credits: credits
        });

        // Show success message
        alert(`${courseCode} - ${courseName} has been added to your academic plan!`);
        
        // Update the planning modal if it's open
        this.updateSelectedCoursesDisplay();
    }

    updateSelectedCoursesDisplay() {
        const selectedContainer = document.getElementById('selectedCourses');
        if (selectedContainer && this.customizationData && this.customizationData.selectedCourses) {
            selectedContainer.innerHTML = this.customizationData.selectedCourses.map(course => `
                <div class="course-card selected" data-course-code="${course.code}">
                    <div class="course-info">
                        <h6>${course.code}</h6>
                        <p>${course.name}</p>
                    </div>
                    <div class="course-credits">${course.credits} CR</div>
                    <button class="remove-btn" onclick="studentPortal.removeCourseFromPlan('${course.code}')">×</button>
                </div>
            `).join('');
        }
    }

    removeCourseFromPlan(courseCode) {
        if (this.customizationData && this.customizationData.selectedCourses) {
            this.customizationData.selectedCourses = this.customizationData.selectedCourses.filter(course => course.code !== courseCode);
            this.updateSelectedCoursesDisplay();
        }
    }

    attachCatalogEventListeners() {
        const searchInput = document.getElementById('courseSearch');
        const levelSelect = document.getElementById('courseLevel');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterCourses());
        }

        if (levelSelect) {
            levelSelect.addEventListener('change', () => this.filterCourses());
        }
    }

    filterCourses() {
        const searchTerm = document.getElementById('courseSearch')?.value.toLowerCase() || '';
        const selectedLevel = document.getElementById('courseLevel')?.value || 'all';
        const courseItems = document.querySelectorAll('.catalog-course-item');

        courseItems.forEach(item => {
            const code = item.dataset.code;
            const name = item.dataset.name;
            const level = item.dataset.level;

            const matchesSearch = code.includes(searchTerm) || name.includes(searchTerm);
            const matchesLevel = selectedLevel === 'all' || level === selectedLevel;

            item.style.display = (matchesSearch && matchesLevel) ? 'block' : 'none';
        });
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
        const currentDate = new Date();
        const semesterStart = new Date(mealPlan.semesterStartDate);
        const semesterEnd = new Date(mealPlan.semesterEndDate);
        
        // Calculate weeks remaining
        const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
        const weeksRemaining = Math.ceil((semesterEnd - currentDate) / millisecondsPerWeek);
        const totalWeeks = Math.ceil((semesterEnd - semesterStart) / millisecondsPerWeek);
        
        // Calculate budget metrics
        const remaining = mealPlan.totalBudget - mealPlan.spent;
        const budgetPercentage = Math.round((mealPlan.spent / mealPlan.totalBudget) * 100);
        const dailyAllowance = remaining / (weeksRemaining * 7);
        const perMealAllowance = dailyAllowance / mealPlan.mealsPerDay;
        
        // Determine budget alert
        let alertClass = 'alert-info';
        let alertMessage = "You're on track! Continue at current spending pace.";
        
        const expectedSpent = (mealPlan.totalBudget / totalWeeks) * (totalWeeks - weeksRemaining);
        if (mealPlan.spent > expectedSpent * 1.1) {
            alertClass = 'alert-warning';
            alertMessage = 'You\'re spending above your planned rate. Consider reducing daily expenses.';
        } else if (mealPlan.spent > expectedSpent * 1.2) {
            alertClass = 'alert-danger';
            alertMessage = 'Warning: You\'re significantly over budget. Immediate action needed.';
        }

        // Update HTML elements
        document.getElementById('remainingBudget').textContent = `$${remaining.toLocaleString()}`;
        document.getElementById('budgetPercentage').textContent = `${budgetPercentage}%`;
        document.getElementById('spentAmount').textContent = `$${mealPlan.spent.toLocaleString()}`;
        document.getElementById('totalBudgetProgress').textContent = `$${mealPlan.totalBudget.toLocaleString()}`;
        document.getElementById('budgetProgressBar').style.width = `${budgetPercentage}%`;
        document.getElementById('dailyAllowance').textContent = `$${dailyAllowance.toFixed(2)}`;
        document.getElementById('perMealBudget').textContent = `$${perMealAllowance.toFixed(2)}`;
        document.getElementById('weeksRemaining').textContent = weeksRemaining;
        
        const alertElement = document.getElementById('budgetAlert');
        alertElement.className = `alert ${alertClass}`;
        alertElement.innerHTML = `<i class="fas fa-info-circle"></i><span>${alertMessage}</span>`;
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
        const currentCredits = this.calculateTotalCredits(false); // Only completed credits for planning
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
            
            // Combine all available courses from student's major
            const allAvailableCourses = [];
            Object.keys(majorCourses).forEach(category => {
                majorCourses[category].forEach(course => {
                    if (!currentCourses.includes(course.code)) {
                        allAvailableCourses.push({...course, category: category.toLowerCase()});
                    }
                });
            });

            // Also include Mathematics courses for academic planning
            const mathCourses = courseDatabase['Mathematics'];
            if (mathCourses && this.studentData.major !== 'Mathematics') {
                console.log('Adding Mathematics courses to available courses');
                Object.keys(mathCourses).forEach(category => {
                    mathCourses[category].forEach(course => {
                        if (!currentCourses.includes(course.code)) {
                            // Check if course is already added from major courses
                            const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                            if (!existingCourse) {
                                allAvailableCourses.push({...course, category: `math-${category.toLowerCase()}`});
                            }
                        }
                    });
                });
            }

            // Also include Physics courses for academic planning
            const physicsCourses = courseDatabase['Physics'];
            if (physicsCourses && this.studentData.major !== 'Physics') {
                console.log('Adding Physics courses to available courses');
                Object.keys(physicsCourses).forEach(category => {
                    physicsCourses[category].forEach(course => {
                        if (!currentCourses.includes(course.code)) {
                            // Check if course is already added from major courses
                            const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                            if (!existingCourse) {
                                allAvailableCourses.push({...course, category: `physics-${category.toLowerCase()}`});
                            }
                        }
                    });
                });
            }

            // Also include ALL courses from the main catalog for comprehensive planning
            const allCatalogCourses = this.getAllCourses();
            
            // Add all Mathematics courses from catalog
            const mathCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('MATH') && course.department === 'Mathematics'
            );
            console.log('Adding comprehensive Mathematics catalog courses:', mathCatalogCourses.length);
            mathCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'mathematics-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all Physics courses from catalog
            const physicsCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('PHYS') && course.department === 'Physics'
            );
            console.log('Adding comprehensive Physics catalog courses:', physicsCatalogCourses.length);
            physicsCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'physics-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all Computer Science courses from catalog
            const csCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('CS') && !course.department
            );
            console.log('Adding Computer Science catalog courses:', csCatalogCourses.length);
            csCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'computer-science-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all Engineering Science courses from catalog
            const enscCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('ENSC') && !course.department
            );
            console.log('Adding Engineering Science catalog courses:', enscCatalogCourses.length);
            enscCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'engineering-science-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all Chemistry courses from catalog
            const chemCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('CHEM') && !course.department
            );
            console.log('Adding Chemistry catalog courses:', chemCatalogCourses.length);
            chemCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'chemistry-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all English courses from catalog
            const englCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('ENGL') && !course.department
            );
            console.log('Adding English catalog courses:', englCatalogCourses.length);
            englCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'english-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all Statistics courses from catalog
            const statCatalogCourses = allCatalogCourses.filter(course => 
                course.code.startsWith('STAT') && !course.department
            );
            console.log('Adding Statistics catalog courses:', statCatalogCourses.length);
            statCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'statistics-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
            });

            // Add all other courses from catalog that don't fit into specific categories
            const otherCatalogCourses = allCatalogCourses.filter(course => 
                !course.code.startsWith('MATH') && 
                !course.code.startsWith('PHYS') && 
                !course.code.startsWith('CS') && 
                !course.code.startsWith('ENSC') && 
                !course.code.startsWith('CHEM') && 
                !course.code.startsWith('ENGL') && 
                !course.code.startsWith('STAT') &&
                !course.department
            );
            console.log('Adding other catalog courses:', otherCatalogCourses.length);
            otherCatalogCourses.forEach(course => {
                if (!currentCourses.includes(course.code)) {
                    const existingCourse = allAvailableCourses.find(c => c.code === course.code);
                    if (!existingCourse) {
                        allAvailableCourses.push({
                            ...course, 
                            category: 'other-catalog',
                            prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [course.prerequisites]
                        });
                    }
                }
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
        console.log('generateCustomPlan method called with prerequisite awareness');
        try {
            console.log('Student data check:', !!this.studentData);
            if (!this.studentData) {
                console.error('No student data available - using defaults');
                const currentCredits = 45;
                const targetCredits = 120;
                const remainingCredits = targetCredits - currentCredits;
                
                const semesters = this.generateSequencedAcademicPlan();
                this.displayAcademicPlan(semesters, currentCredits, remainingCredits);
                return true;
            }

            const currentCredits = this.calculateTotalCredits(false); // Only completed credits for planning
            const targetCredits = 120;
            const remainingCredits = targetCredits - currentCredits;
            
            console.log('Generating prerequisite-aware plan with:', {
                currentCredits,
                remainingCredits,
                completedCourses: Array.from(this.completedCourses),
                inProgressCourses: Array.from(this.inProgressCourses)
            });
            
            // Generate prerequisite-aware semester plan
            const semesters = this.generateSequencedAcademicPlan();
            console.log('Generated prerequisite-sequenced semesters:', semesters);
            
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
                requiredCredits: 120,
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

    // Course Import Functions
    toggleImportMethod() {
        const selectedMethod = document.querySelector('input[name="importMethod"]:checked').value;
        const fileInput = document.getElementById('courseFileInput');
        const textArea = document.getElementById('courseDataInput');
        
        if (selectedMethod === 'file') {
            fileInput.style.display = 'block';
            textArea.style.display = 'none';
        } else {
            fileInput.style.display = 'none';
            textArea.style.display = 'block';
        }
    }

    handleFileInput(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                document.getElementById('courseDataInput').value = content;
            };
            reader.readAsText(file);
        }
    }

    processImportData() {
        const selectedMethod = document.querySelector('input[name="importMethod"]:checked').value;
        let rawData = '';

        if (selectedMethod === 'file') {
            rawData = document.getElementById('courseDataInput').value;
        } else {
            rawData = document.getElementById('courseDataInput').value;
        }

        if (!rawData.trim()) {
            alert('Please provide course data to import.');
            return;
        }

        try {
            const courses = this.parseCSVData(rawData);
            this.previewImportedCourses(courses);
        } catch (error) {
            alert('Error parsing course data: ' + error.message);
        }
    }

    parseCSVData(csvData) {
        const lines = csvData.trim().split('\n');
        const courses = [];
        
        // Skip header line if it exists
        const startIndex = lines[0].toLowerCase().includes('course') ? 1 : 0;
        
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Parse CSV line (handle quotes and commas)
            const columns = this.parseCSVLine(line);
            
            if (columns.length >= 3) {
                const code = columns[0].trim();
                const name = columns[1].trim();
                const prerequisites = columns[2].trim();
                
                // Extract course level from code
                const levelMatch = code.match(/(\d{4})/);
                const level = levelMatch ? levelMatch[1] : '1000';
                
                // Determine credits (default to 3 if not specified)
                let credits = 3;
                if (columns.length > 3 && columns[3]) {
                    const creditMatch = columns[3].match(/(\d+)/);
                    credits = creditMatch ? parseInt(creditMatch[1]) : 3;
                }
                
                courses.push({
                    code: code,
                    name: name,
                    credits: credits,
                    prerequisites: prerequisites || 'None',
                    level: level
                });
            }
        }
        
        return courses;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current);
        return result.map(item => item.replace(/^"(.*)"$/, '$1'));
    }

    previewImportedCourses(courses) {
        const previewSection = document.getElementById('importPreview');
        const previewList = document.getElementById('previewList');
        
        if (courses.length === 0) {
            alert('No valid courses found in the data.');
            return;
        }
        
        const previewHTML = courses.slice(0, 10).map(course => `
            <div class="preview-course-item">
                <div class="preview-course-code">${course.code}</div>
                <div class="preview-course-name">${course.name}</div>
                <div class="preview-course-prereqs">Prerequisites: ${course.prerequisites}</div>
                <div class="preview-course-details">${course.credits} credits • Level ${course.level}</div>
            </div>
        `).join('');
        
        previewList.innerHTML = previewHTML;
        
        if (courses.length > 10) {
            previewList.innerHTML += `<div class="preview-course-item"><em>... and ${courses.length - 10} more courses</em></div>`;
        }
        
        previewSection.style.display = 'block';
        this.pendingImportCourses = courses;
    }

    confirmImport() {
        if (!this.pendingImportCourses || this.pendingImportCourses.length === 0) {
            alert('No courses to import.');
            return;
        }
        
        // Add courses to the catalog
        this.addCoursesToCatalog(this.pendingImportCourses);
        
        // Clear import data and hide section
        this.clearImportData();
        document.getElementById('courseImportSection').style.display = 'none';
        
        // Refresh the course catalog display
        this.loadCourseCatalog();
        
        alert(`Successfully imported ${this.pendingImportCourses.length} courses!`);
    }

    addCoursesToCatalog(newCourses) {
        // Add courses to the internal course database
        if (!this.importedCourses) {
            this.importedCourses = [];
        }
        
        this.importedCourses = this.importedCourses.concat(newCourses);
        
        // Store in localStorage for persistence
        localStorage.setItem('importedCourses', JSON.stringify(this.importedCourses));
    }

    clearImportData() {
        document.getElementById('courseFileInput').value = '';
        document.getElementById('courseDataInput').value = '';
        document.getElementById('importPreview').style.display = 'none';
        this.pendingImportCourses = null;
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