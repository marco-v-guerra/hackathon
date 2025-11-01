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

        // Course Planner elements
        this.totalCreditsEarnedEl = document.getElementById('totalCreditsEarned');
        this.totalCreditsRemainingEl = document.getElementById('totalCreditsRemaining');
        this.semestersRemainingEl = document.getElementById('semestersRemaining');
        this.expectedGraduationEl = document.getElementById('expectedGraduation');
        this.degreeProgressBarEl = document.getElementById('degreeProgressBar');
        this.targetCreditsEl = document.getElementById('targetCredits');
        this.targetCreditsValueEl = document.getElementById('targetCreditsValue');
        this.generatePlanBtn = document.getElementById('generatePlan');
        this.semesterPlanEl = document.getElementById('semesterPlan');
        this.courseCatalogEl = document.getElementById('courseCatalog');
        this.courseSearchEl = document.getElementById('courseSearch');

        // Course planner data
        this.courseCatalog = this.getCourseCatalog();
        this.academicPlan = null;
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

        // Course Planner event listeners
        if (this.targetCreditsEl) {
            this.targetCreditsEl.addEventListener('input', (e) => {
                this.targetCreditsValueEl.textContent = e.target.value;
                // Only update the display value, don't regenerate plan automatically
            });
        }

        if (this.generatePlanBtn) {
            this.generatePlanBtn.addEventListener('click', () => {
                this.generateAcademicPlan();
            });
        }

        if (this.courseSearchEl) {
            this.courseSearchEl.addEventListener('input', (e) => {
                this.filterCourses(e.target.value);
            });
        }

        // Filter buttons for course catalog
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterCoursesByType(e.target.dataset.filter);
            });
        });

        // Focus area checkboxes - only update display, don't auto-regenerate
        const focusCheckboxes = document.querySelectorAll('.course-type-selection input[type="checkbox"]');
        focusCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Just track the change, don't auto-regenerate the plan
                // Plan will update when "Generate Academic Plan" button is clicked
            });
        });
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

    getCourseCatalog() {
        return [
            // Core CS Courses
            { code: 'CS 101', name: 'Introduction to Programming', credits: 3, type: 'core', prerequisites: [], description: 'Basic programming concepts and problem solving' },
            { code: 'CS 201', name: 'Data Structures', credits: 3, type: 'core', prerequisites: ['CS 101'], description: 'Fundamental data structures and algorithms' },
            { code: 'CS 202', name: 'Computer Systems', credits: 4, type: 'core', prerequisites: ['CS 101'], description: 'Computer architecture and systems programming' },
            { code: 'CS 301', name: 'Advanced Algorithms', credits: 3, type: 'core', prerequisites: ['CS 201'], description: 'Advanced algorithmic techniques and analysis' },
            { code: 'CS 350', name: 'Software Engineering', credits: 3, type: 'core', prerequisites: ['CS 201'], description: 'Software development methodologies and practices' },
            { code: 'CS 401', name: 'Database Systems', credits: 3, type: 'core', prerequisites: ['CS 201'], description: 'Database design and management systems' },
            { code: 'CS 402', name: 'Operating Systems', credits: 4, type: 'core', prerequisites: ['CS 202'], description: 'Operating system concepts and implementation' },
            
            // Math Requirements
            { code: 'MATH 151', name: 'Calculus I', credits: 4, type: 'core', prerequisites: [], description: 'Differential calculus and applications' },
            { code: 'MATH 152', name: 'Calculus II', credits: 4, type: 'core', prerequisites: ['MATH 151'], description: 'Integral calculus and series' },
            { code: 'MATH 220', name: 'Linear Algebra', credits: 4, type: 'core', prerequisites: ['MATH 151'], description: 'Vector spaces, matrices, and linear transformations' },
            { code: 'MATH 310', name: 'Discrete Mathematics', credits: 3, type: 'core', prerequisites: ['MATH 151'], description: 'Logic, sets, combinatorics, and graph theory' },
            { code: 'STAT 201', name: 'Statistics', credits: 3, type: 'core', prerequisites: ['MATH 151'], description: 'Probability and statistical inference' },
            
            // CS Electives
            { code: 'CS 420', name: 'Machine Learning', credits: 3, type: 'electives', prerequisites: ['CS 301', 'STAT 201'], description: 'Introduction to machine learning algorithms' },
            { code: 'CS 430', name: 'Computer Graphics', credits: 3, type: 'electives', prerequisites: ['CS 301', 'MATH 220'], description: '3D graphics and visualization techniques' },
            { code: 'CS 440', name: 'Artificial Intelligence', credits: 3, type: 'electives', prerequisites: ['CS 301'], description: 'AI algorithms and applications' },
            { code: 'CS 450', name: 'Computer Networks', credits: 3, type: 'electives', prerequisites: ['CS 202'], description: 'Network protocols and distributed systems' },
            { code: 'CS 460', name: 'Cybersecurity', credits: 3, type: 'electives', prerequisites: ['CS 202'], description: 'Security principles and cryptography' },
            { code: 'CS 470', name: 'Mobile App Development', credits: 3, type: 'electives', prerequisites: ['CS 350'], description: 'iOS and Android app development' },
            { code: 'CS 480', name: 'Web Development', credits: 3, type: 'electives', prerequisites: ['CS 201'], description: 'Full-stack web application development' },
            { code: 'CS 485', name: 'Game Development', credits: 4, type: 'electives', prerequisites: ['CS 301'], description: 'Game engine programming and design' },
            
            // General Education
            { code: 'ENG 101', name: 'Composition I', credits: 3, type: 'core', prerequisites: [], description: 'Academic writing and communication' },
            { code: 'ENG 102', name: 'Technical Writing', credits: 3, type: 'core', prerequisites: ['ENG 101'], description: 'Professional and technical communication' },
            { code: 'HIST 101', name: 'World History', credits: 3, type: 'electives', prerequisites: [], description: 'Survey of world civilizations' },
            { code: 'PHIL 201', name: 'Ethics', credits: 3, type: 'electives', prerequisites: [], description: 'Moral philosophy and ethical reasoning' },
            { code: 'PSYC 101', name: 'Psychology', credits: 3, type: 'electives', prerequisites: [], description: 'Introduction to psychological principles' },
            { code: 'SOC 101', name: 'Sociology', credits: 3, type: 'electives', prerequisites: [], description: 'Social structures and interactions' },
            
            // Capstone
            { code: 'CS 490', name: 'Senior Capstone I', credits: 3, type: 'capstone', prerequisites: ['CS 350'], description: 'Independent research project' },
            { code: 'CS 491', name: 'Senior Capstone II', credits: 3, type: 'capstone', prerequisites: ['CS 490'], description: 'Capstone project completion' },
            { code: 'CS 495', name: 'Internship', credits: 3, type: 'capstone', prerequisites: ['CS 350'], description: 'Professional work experience' }
        ];
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
                { name: 'Core CS Courses', status: 'progress', progress: '18/24' },
                { name: 'Mathematics', status: 'progress', progress: '12/20' },
                { name: 'General Education', status: 'complete', progress: '30/30' },
                { name: 'CS Electives', status: 'progress', progress: '6/18' },
                { name: 'Capstone Project', status: 'pending', progress: '0/6' }
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
        this.loadCoursePlanner();
    }

    loadCoursePlanner() {
        this.updatePlannerStats();
        this.loadCourseCatalog();
        this.generateDefaultPlan();
    }

    updatePlannerStats() {
        if (!this.studentData) return;

        const totalCredits = 120;
        const earnedCredits = this.studentData.credits;
        const remainingCredits = totalCredits - earnedCredits;
        const progressPercentage = Math.round((earnedCredits / totalCredits) * 100);

        // Calculate semesters remaining based on current year and target graduation
        const currentYear = this.studentData.year;
        const semestersRemaining = Math.max(0, (4 - currentYear) * 2);

        if (this.totalCreditsEarnedEl) this.totalCreditsEarnedEl.textContent = earnedCredits;
        if (this.totalCreditsRemainingEl) this.totalCreditsRemainingEl.textContent = remainingCredits;
        if (this.semestersRemainingEl) this.semestersRemainingEl.textContent = semestersRemaining;
        if (this.expectedGraduationEl) {
            const graduationTerm = semestersRemaining <= 2 ? 'Spring 2026' : 'Fall 2026';
            this.expectedGraduationEl.textContent = graduationTerm;
        }
        if (this.degreeProgressBarEl) {
            this.degreeProgressBarEl.style.width = `${progressPercentage}%`;
            const progressText = this.degreeProgressBarEl.parentElement.nextElementSibling;
            if (progressText) progressText.textContent = `${progressPercentage}% Complete`;
        }
    }

    generateAcademicPlan() {
        const targetCredits = parseInt(this.targetCreditsEl.value);
        const remainingCredits = 120 - this.studentData.credits;
        
        // Get currently selected focus areas
        const focusAreaCheckboxes = document.querySelectorAll('.course-type-selection input[type="checkbox"]:checked');
        const focusAreas = Array.from(focusAreaCheckboxes).map(cb => cb.value);
        
        // If no focus areas selected, default to core and electives
        if (focusAreas.length === 0) {
            focusAreas.push('core', 'electives');
        }

        // Calculate number of semesters needed
        const minSemesters = Math.ceil(remainingCredits / 19); // Max credits per semester
        const idealSemesters = Math.ceil(remainingCredits / targetCredits);
        const semestersToUse = Math.max(minSemesters, idealSemesters);

        this.academicPlan = this.createSemesterPlan(remainingCredits, semestersToUse, targetCredits, focusAreas);
        this.displaySemesterPlan();
    }

    generateDefaultPlan() {
        if (!this.academicPlan) {
            const remainingCredits = 120 - this.studentData.credits;
            const defaultTargetCredits = 15;
            const semestersToUse = Math.ceil(remainingCredits / defaultTargetCredits);
            const focusAreas = ['core', 'electives'];
            
            this.academicPlan = this.createSemesterPlan(remainingCredits, semestersToUse, defaultTargetCredits, focusAreas);
            this.displaySemesterPlan();
        }
    }

    createSemesterPlan(totalCredits, numSemesters, targetCredits, focusAreas) {
        const plan = [];
        let remainingCredits = totalCredits;
        
        // Get available courses based on prerequisites and focus areas
        const availableCourses = this.getAvailableCourses(focusAreas);
        
        for (let i = 0; i < numSemesters && remainingCredits > 0; i++) {
            const semester = {
                term: this.getSemesterName(i),
                courses: [],
                totalCredits: 0
            };

            // Calculate target credits for this semester
            const remainingSemesters = numSemesters - i;
            const avgCreditsNeeded = remainingCredits / remainingSemesters;
            
            // Target should be close to user preference but adjust based on remaining needs
            let semesterTarget = targetCredits;
            if (avgCreditsNeeded > targetCredits + 2) {
                semesterTarget = Math.min(19, Math.ceil(avgCreditsNeeded));
            } else if (avgCreditsNeeded < targetCredits - 2 && i === numSemesters - 1) {
                semesterTarget = remainingCredits; // Last semester, take what's left
            }

            const maxCreditsForSemester = Math.min(19, remainingCredits);
            const minCreditsForSemester = Math.min(semesterTarget, remainingCredits);
            let semesterCredits = 0;

            // Select courses for this semester
            while (semesterCredits < minCreditsForSemester && semesterCredits < maxCreditsForSemester) {
                const suitableCourses = availableCourses.filter(course => {
                    const wouldExceedMax = semesterCredits + course.credits > maxCreditsForSemester;
                    const alreadySelected = semester.courses.some(c => c.code === course.code);
                    const prerequisitesMet = this.checkPrerequisites(course, plan);
                    const alreadyInPlan = plan.some(sem => sem.courses.some(c => c.code === course.code));
                    
                    return !wouldExceedMax && !alreadySelected && prerequisitesMet && !alreadyInPlan;
                });

                if (suitableCourses.length === 0) {
                    // Try to find any course that fits, even if it's not ideal
                    const anyCourse = availableCourses.filter(course => {
                        const wouldExceedMax = semesterCredits + course.credits > maxCreditsForSemester;
                        const alreadySelected = semester.courses.some(c => c.code === course.code);
                        const alreadyInPlan = plan.some(sem => sem.courses.some(c => c.code === course.code));
                        
                        return !wouldExceedMax && !alreadySelected && !alreadyInPlan;
                    });
                    
                    if (anyCourse.length === 0) break;
                    
                    const selectedCourse = this.selectPrioritizedCourse(anyCourse, focusAreas);
                    semester.courses.push(selectedCourse);
                    semesterCredits += selectedCourse.credits;
                } else {
                    // Prioritize core courses, then electives, then capstone
                    const prioritizedCourse = this.selectPrioritizedCourse(suitableCourses, focusAreas);
                    semester.courses.push(prioritizedCourse);
                    semesterCredits += prioritizedCourse.credits;
                }
            }

            semester.totalCredits = semesterCredits;
            remainingCredits -= semesterCredits;
            plan.push(semester);
        }

        return plan;
    }

    getAvailableCourses(focusAreas) {
        return this.courseCatalog.filter(course => 
            focusAreas.includes(course.type) || 
            (focusAreas.includes('core') && course.type === 'core')
        );
    }

    checkPrerequisites(course, completedPlan) {
        if (!course.prerequisites || course.prerequisites.length === 0) return true;
        
        const completedCourses = [];
        // Add current student courses (assuming they're completed or in progress)
        if (this.studentData.currentCourses) {
            completedCourses.push(...this.studentData.currentCourses.map(c => c.code));
        }
        
        // Add some assumed completed courses based on student's year and credits
        const assumedCompletedCourses = [
            'CS 101', 'ENG 101', 'MATH 151', 'MATH 152' // Basic courses for a junior
        ];
        completedCourses.push(...assumedCompletedCourses);
        
        // Add courses from the plan so far
        completedPlan.forEach(semester => {
            completedCourses.push(...semester.courses.map(c => c.code));
        });

        return course.prerequisites.every(prereq => completedCourses.includes(prereq));
    }

    selectPrioritizedCourse(courses, focusAreas) {
        // Priority: core > electives > capstone
        const coreFirst = courses.filter(c => c.type === 'core');
        if (coreFirst.length > 0) return coreFirst[0];
        
        const electivesNext = courses.filter(c => c.type === 'electives');
        if (electivesNext.length > 0) return electivesNext[0];
        
        return courses[0];
    }

    getSemesterName(index) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        
        // Determine starting semester (Fall or Spring)
        const isSpring = currentMonth >= 1 && currentMonth <= 7;
        const startYear = isSpring ? currentYear : currentYear + 1;
        const startSemester = isSpring ? 'Spring' : 'Fall';
        
        const semesterIndex = index;
        const yearOffset = Math.floor(semesterIndex / 2);
        const isSpringTerm = (semesterIndex % 2) === (isSpring ? 0 : 1);
        
        const term = isSpringTerm ? 'Spring' : 'Fall';
        const year = startYear + yearOffset;
        
        return `${term} ${year}`;
    }

    displaySemesterPlan() {
        if (!this.semesterPlanEl || !this.academicPlan) return;

        const totalDegreeCredits = 120;
        const currentCredits = this.studentData.credits;
        let cumulativeCredits = currentCredits;

        const planHTML = this.academicPlan.map((semester, index) => {
            cumulativeCredits += semester.totalCredits;
            const progressPercentage = Math.round((cumulativeCredits / totalDegreeCredits) * 100);
            
            return `
                <div class="semester-card">
                    <div class="semester-header">
                        <h4>${semester.term}</h4>
                        <div class="semester-credits">${semester.totalCredits} credits</div>
                    </div>
                    <div class="semester-courses">
                        ${semester.courses.map(course => `
                            <div class="planned-course">
                                <div class="course-code">${course.code}</div>
                                <div class="course-title">${course.name}</div>
                                <div class="course-credits">${course.credits} cr</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="semester-progress">
                        <div class="progress-bar-small">
                            <div class="progress-fill-small" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div class="progress-text">${progressPercentage}% Complete (${cumulativeCredits}/${totalDegreeCredits} credits)</div>
                    </div>
                </div>
            `;
        }).join('');

        this.semesterPlanEl.innerHTML = planHTML;
    }

    loadCourseCatalog() {
        if (!this.courseCatalogEl) return;

        this.displayCourseList(this.courseCatalog);
    }

    displayCourseList(courses) {
        const catalogHTML = courses.map(course => `
            <div class="catalog-course" data-type="${course.type}">
                <div class="course-header">
                    <span class="course-code">${course.code}</span>
                    <span class="course-credits">${course.credits} credits</span>
                    <span class="course-type-badge course-type-${course.type}">${course.type}</span>
                </div>
                <div class="course-name">${course.name}</div>
                <div class="course-description">${course.description}</div>
                ${course.prerequisites.length > 0 ? 
                    `<div class="course-prerequisites">Prerequisites: ${course.prerequisites.join(', ')}</div>` : 
                    ''
                }
            </div>
        `).join('');

        this.courseCatalogEl.innerHTML = catalogHTML;
    }

    filterCourses(searchTerm) {
        const filteredCourses = this.courseCatalog.filter(course =>
            course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayCourseList(filteredCourses);
    }

    filterCoursesByType(type) {
        if (type === 'all') {
            this.displayCourseList(this.courseCatalog);
        } else {
            const filteredCourses = this.courseCatalog.filter(course => course.type === type);
            this.displayCourseList(filteredCourses);
        }
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