# Student Information System

A modern, responsive web application for managing and displaying student information. Built with vanilla HTML, CSS, and JavaScript for simplicity and portability.

## Features

### 🎓 Student Management
- **View Students**: Display students in grid or list view
- **Add Students**: Create new student records with comprehensive information
- **Edit Students**: Update existing student information
- **Search**: Real-time search across names, emails, majors, and student IDs
- **Filter**: Filter by grade, major, and academic year

### 📊 Statistics Dashboard
- **Total Students**: Count of all students in the system
- **Average GPA**: Calculated average GPA across all students
- **Honor Students**: Count of students with GPA ≥ 3.5

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Dark/Light Theme**: Automatic theme detection (system preference)

## Project Structure

```
hackathon/
├── index.html          # Main HTML file with app structure
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and student management
├── students.json       # Sample student data (optional)
└── README.md          # This documentation file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. **Clone or download** the repository to your local machine
2. **Navigate** to the project directory
3. **Open** `index.html` in your web browser

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

## Usage

### Viewing Students
- Students are displayed in a **grid view** by default
- Click the **list view** button to switch to a compact list format
- Each student card shows:
  - Name and Student ID
  - Email and phone number
  - Major and academic year
  - Current grade and GPA

### Adding Students
1. Click the **"Add Student"** button in the header
2. Fill out the student information form:
   - **Full Name**: Student's complete name
   - **Student ID**: Unique identifier (auto-generated if left blank)
   - **Email**: Student's email address
   - **Phone**: Contact phone number (optional)
   - **Major**: Field of study
   - **Year**: Academic year (1-4: Freshman to Senior)
   - **Grade**: Current letter grade (A-F)
   - **GPA**: Grade point average (0.0-4.0)
3. Click **"Save Student"** to add the student

### Editing Students
1. Click on any **student card** to open their details
2. Modify the information in the form
3. Click **"Save Student"** to update the record

### Searching and Filtering
- **Search Bar**: Type to search across names, emails, majors, and student IDs
- **Grade Filter**: Filter by specific letter grades
- **Major Filter**: Filter by academic major (populated dynamically)
- **Year Filter**: Filter by academic year (Freshman through Senior)

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