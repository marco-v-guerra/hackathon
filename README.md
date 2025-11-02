# OSU Student Portal

A comprehensive student information system built for Oklahoma State University students. This modern web application provides a complete academic management experience with course tracking, financial information, scheduling, and academic planning tools.

## Features

### 🎓 Academic Management
- **Current Courses**: View enrolled courses with grades, schedules, and instructor information
- **Past Classes**: Complete academic history with grades and GPA tracking by semester
- **Course Catalog**: Browse available courses with prerequisites and descriptions
- **Degree Requirements**: Track progress toward Electrical Engineering degree completion
- **Academic Planning**: AI-powered and manual academic planning with prerequisite validation

### 📊 Student Dashboard
- **Student Profile**: Comprehensive profile with contact info, major, GPA, and credits
- **Academic Progress**: Visual progress tracking toward graduation
- **Grade History**: Semester-by-semester GPA and credit tracking
- **Achievements**: Academic honors and accomplishments display

### � Financial Information
- **Account Balance**: Real-time tuition, fees, housing, and meal plan balances
- **Transaction History**: Detailed payment and charge history
- **Financial Aid**: Scholarships, grants, and work-study information
- **Payment Schedule**: Upcoming payment due dates and amounts
- **Meal Plan Budget**: Track meal plan spending with budget alerts

### 📅 Schedule Management
- **Weekly Schedule**: Interactive weekly class schedule view
- **Course Times**: Real-time schedule based on current enrollments
- **Room Locations**: Building and room information for each class

### 🤖 AI-Powered Features
- **Academic Planning**: OpenRouter + Gemini integration for intelligent course sequencing
- **Prerequisite Validation**: Automatic prerequisite checking and course eligibility
- **Course Recommendations**: Smart suggestions based on degree requirements

## Project Structure

```
hackathon/
├── index.html              # Main portal interface with tabbed navigation
├── login.html              # Student authentication page
├── login.js                # Login functionality and validation
├── script.js               # Core application logic and data management
├── styles.css              # Comprehensive styling and responsive design
├── students.json           # Student data with academic records
├── Physics.txt             # Sample course descriptions and requirements
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required
- Optional: OpenRouter API key for AI-powered academic planning

### Installation
1. **Clone or download** the repository to your local machine
2. **Navigate** to the project directory
3. **Open** `login.html` in your web browser to start with authentication
4. **Or open** `index.html` directly to access the main portal

### Demo Login Credentials
- **Student ID**: `OSU001` (Alice Smith - Electrical Engineering)
- **Student ID**: `OSU002` (Marcus Johnson - Pre-Medicine)

### Alternative: Local Server
For the best experience (especially to load the JSON data), run a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### AI-Powered Academic Planning (Optional)

Enhanced academic planning with OpenRouter + Gemini integration:

1. **Create Account**: Sign up at [openrouter.ai](https://openrouter.ai) and get your API key
2. **Access Planning**: Navigate to Academic Planning tab in the portal
3. **Generate Plan**: Click "Generate Academic Plan" - you'll be prompted for your API key
4. **Automatic Storage**: API key is stored locally in your browser for future use

**Configuration Options:**
- **Default Model**: `google/gemini-2.5-pro`
- **Custom Model**: Set `openrouter_model` in browser localStorage
- **Fallback**: Local prerequisite-aware planner if AI fails

**AI Features:**
- Intelligent course sequencing based on prerequisites
- Personalized recommendations for degree completion
- Consideration of student's academic history and preferences

## Usage Guide

### Student Authentication
1. **Login Page**: Start at `login.html` for authentication
2. **Student ID**: Enter your OSU student ID (e.g., OSU001)
3. **Auto-Login**: System automatically loads your profile and academic data

### Navigation Tabs
The portal features five main sections:

#### 📊 Overview Tab
- **Academic Progress**: Visual degree completion tracking
- **Important Notices**: Registration deadlines and announcements
- **Upcoming Events**: Exams, career fairs, and academic deadlines

#### 📚 Educational Tab
- **Current Courses**: View enrolled classes with schedules and grades
- **Grade History**: Semester GPA tracking and academic performance
- **Past Classes**: Complete transcript with filtering and search
- **Achievements**: Academic honors and recognitions
- **Degree Requirements**: Progress tracking for major completion
- **Course Catalog**: Browse available courses with prerequisites

#### 💰 Financial Tab
- **Account Balance**: Current charges and payments
- **Transaction History**: Detailed payment records
- **Financial Aid**: Scholarships, grants, and aid status
- **Payment Schedule**: Upcoming due dates
- **Meal Plan Budget**: Spending tracking with progress indicators

#### 📅 Schedule Tab
- **Weekly View**: Interactive class schedule display
- **Room Information**: Building and classroom locations
- **Time Conflicts**: Automatic scheduling conflict detection

#### 🎯 Academic Planning Tab
- **Degree Progress**: Credits completed and remaining
- **Plan Generation**: AI-powered and manual academic planning
- **Prerequisite Tracking**: Course eligibility verification
- **Graduation Timeline**: Estimated completion dates

### Advanced Features

#### Course Catalog Search
- **Text Search**: Find courses by code or name
- **Level Filtering**: Filter by course level (1000-6000)
- **Department Filtering**: Browse by academic department
- **Prerequisite Information**: View course requirements

#### Academic Planning Tools
- **Generate Plan**: Create semester-by-semester course plans
- **Customize Plan**: Adjust course load and preferences
- **Prerequisite Validation**: Automatic prerequisite checking
- **Export Options**: Save plans for academic advising

## Data Management

### Student Data Structure
Each student record contains:
```json
{
    "id": "STU001",
    "name": "Alice Johnson",
    "email": "alice.johnson@university.edu",
    "phone": "(555) 123-4567",
    "major": "Computer Science",
    "year": 3,
    "grade": "A",
    "gpa": 3.8
}
```

### Data Storage
- **Default**: Students are stored in browser memory (lost on refresh)
- **Optional**: Load initial data from `students.json` file
- **Future Enhancement**: Can be extended to use localStorage, databases, or APIs

## Customization

### Adding New Fields
To add new student fields:

1. **Update HTML Form** (`index.html`):
```html
<div class="form-group">
    <label for="studentField">New Field</label>
    <input type="text" id="studentField" required>
</div>
```

2. **Update JavaScript** (`script.js`):
```javascript
// In handleFormSubmit method, add:
newField: document.getElementById('studentField').value

// In populateForm method, add:
document.getElementById('studentField').value = student.newField || '';

// In createStudentCard method, add display logic
```

3. **Update CSS** (`styles.css`) as needed for styling

### Styling Customization
Key CSS variables can be modified in `styles.css`:
- **Primary Color**: `#667eea` (gradients and accents)
- **Success Color**: `#28a745` (positive actions)
- **Warning Color**: `#ffc107` (alerts)
- **Fonts**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

## Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile**: iOS Safari 12+, Android Chrome 60+

## Performance

- **Lightweight**: ~50KB total (all files)
- **Fast Loading**: No external dependencies except Font Awesome icons
- **Efficient**: Optimized rendering and search algorithms
- **Responsive**: Smooth animations and transitions

## Security Considerations

- **Client-Side Only**: All data processing happens in the browser
- **No Server Communication**: No data is sent to external servers
- **Input Validation**: Basic form validation implemented
- **XSS Protection**: All user inputs are properly escaped

## Future Enhancements

### Planned Features
- [ ] **Data Export**: Export student data as CSV/PDF
- [ ] **Data Import**: Import students from CSV files
- [ ] **Advanced Analytics**: Grade distribution charts
- [ ] **Print Support**: Printer-friendly student reports
- [ ] **Offline Support**: Service worker for offline functionality

### Potential Integrations
- [ ] **Database**: Connect to MySQL, PostgreSQL, or MongoDB
- [ ] **Authentication**: User login and role-based access
- [ ] **API Integration**: REST API for data synchronization
- [ ] **Cloud Storage**: Google Drive or Dropbox integration

## Troubleshooting

### Common Issues

**Students not loading from JSON:**
- Ensure you're running a local server (not just opening the HTML file)
- Check browser console for CORS errors
- Verify `students.json` is in the same directory as `index.html`

**Responsive design issues:**
- Clear browser cache and reload
- Check if CSS file is loading properly
- Verify viewport meta tag is present

**Form not submitting:**
- Check browser console for JavaScript errors
- Ensure all required fields are filled
- Verify form validation is working

### Browser Console
Open browser developer tools (F12) and check the Console tab for any error messages.

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/new-feature`)
3. **Commit** your changes (`git commit -am 'Add new feature'`)
4. **Push** to the branch (`git push origin feature/new-feature`)
5. **Create** a Pull Request

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Support

For questions, issues, or contributions, please:
- Open an issue on the repository
- Contact the development team
- Check the troubleshooting section above

---

**Built with ❤️ for educational purposes**