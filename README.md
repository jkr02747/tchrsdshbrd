Teacher Dashboard

A simple, clean, and mobile-friendly single-page web application for managing a teacher's daily schedule, attendance, assignments, tests, exams, leave status, and class progress.

The application runs completely in the browser and stores data using LocalStorage.

---

## Features

### 👨‍🏫 Teacher Daily Status

Teachers can update their current daily status:

- Present
- Absent
- On Leave

The latest status is displayed at the top of the dashboard.

---

### 👥 Student Attendance

Track attendance for individual classes.

You can record:

- Class name
- Total students
- Present students
- Absent students
- Attendance percentage

The dashboard automatically calculates the absent count and attendance percentage.

---

### 📅 Daily Class Schedule

Add and manage today's classes with:

- Subject
- Class
- Time
- Room number

Classes are automatically sorted according to their time.

---

### 📝 Assignments

Track student assignments and grading work.

You can store:

- Assignment name
- Class
- Due date
- Status

Assignment statuses:

- Pending
- Graded

Pending assignments are displayed on the main dashboard.

You can also mark an assignment as graded or delete it.

---

### 📚 Tests & Exams

Store upcoming assessments.

Information includes:

- Test/exam name
- Subject
- Date
- Type

Types include:

- Test
- Exam

Upcoming assessments are automatically sorted by date.

---

### 📈 Class Progress

Record teaching progress for different classes.

You can store:

- Subject
- Class
- Topic covered
- Progress status
- Date

Progress statuses include:

- Completed
- In Progress
- Pending

---

## Empty State

When there is no data, the application provides clean empty states instead of displaying unnecessary information.

The teacher's latest daily status remains visible at the top of the dashboard.

Once data is added, the main dashboard displays:

1. Student attendance
2. Assignments to grade
3. Daily class schedule

---

## Technology Used

This project uses only browser-based technologies.

### Frontend

- HTML5
- CSS3
- JavaScript

### Storage

- Browser LocalStorage

### External Services

None.

There is no:

- Backend
- Database server
- Login system
- Payment system
- Email service
- SMS service
- External API

---

## Project Structure

```text
teacher-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the structure and user interface of the dashboard.

### `style.css`

Contains all styling, layout, responsive design, cards, buttons, forms, and modal styles.

### `script.js`

Contains the application's functionality, including:

- LocalStorage management
- Teacher status
- Attendance calculations
- Schedule management
- Assignment management
- Test/exam management
- Class progress
- Delete operations
- Modal handling

### `README.md`

Project documentation and setup instructions.

---

## How to Run

No installation is required.

### Step 1: Download or clone the project

Place all project files inside the same folder.

### Step 2: Check the file names

Make sure the folder contains:

```text
index.html
style.css
script.js
README.md
```

### Step 3: Open the application

Double-click:

```text
index.html
```

The application will open in your web browser.

---

## How Data Is Stored

All application data is stored locally in the browser using:

```javascript
localStorage
```

The application stores data under:

```text
teacherDashboardData
```

This means:

- No data is sent to a server.
- No internet connection is required after the files are loaded.
- Refreshing the page does not normally remove your data.
- Data is specific to the browser/device being used.

### Important

Clearing browser LocalStorage or browser site data can remove the saved dashboard information.

The **Clear Data** button inside the application also permanently removes the stored dashboard data from that browser.

---

## Security

The application does not transmit teacher or student information to an external server.

User-entered text is also escaped before being inserted into dynamically generated HTML to reduce the risk of HTML/script injection.

However, this application is designed as a **local browser-based prototype**, not as a production school information system.

For real-world deployment involving sensitive student records, additional security, authentication, access control, encrypted storage, and a secure backend would be required.

---

## Responsive Design

The dashboard is designed to work on:

- Desktop
- Laptop
- Tablet
- Mobile phones

On smaller screens, dashboard cards automatically switch to a single-column layout.

---

## What Is Not Included

The project intentionally does **not** include:

- Student portal
- Parent portal
- Teacher login
- User registration
- Backend server
- Cloud database
- Automated email notifications
- Automated SMS notifications
- Payment/subscription system
- External services
- AI features

These features are outside the scope of the current project.

---

## Main Dashboard Flow

```text
Open Dashboard
       │
       ▼
View Today's Status
       │
       ├── Present
       ├── Absent
       └── On Leave
       │
       ▼
View Dashboard
       │
       ├── Student Attendance
       ├── Assignments to Grade
       └── Today's Schedule
       │
       ▼
Manage Additional Information
       │
       ├── Tests & Exams
       ├── Assignments
       └── Class Progress
       │
       ▼
Data Saved in LocalStorage
```

---

## Future Improvements

Possible improvements for future versions include:

- Edit existing records
- Multiple classes for attendance
- Weekly/monthly schedule
- Attendance history
- Attendance reports
- Assignment filtering
- Test calendar
- Class-wise progress charts
- Dark mode
- Export data to CSV/PDF
- Import/export LocalStorage data
- Teacher profile
- Backend database
- Authentication
- Role-based access
- Cloud synchronization

---

## Project Goal

The goal of this project is to provide teachers with a lightweight dashboard where they can quickly manage their daily teaching responsibilities without needing an account, backend server, or complicated setup.

It is particularly suitable for:

- College projects
- Frontend practice
- JavaScript practice
- UI/UX demonstrations
- Local productivity tools
- Academic prototypes

---

## License

This project can be used and modified for educational and personal projects.

---

## Author

**Teacher Dashboard**

Built using:

```text
HTML + CSS + JavaScript + LocalStorage
```
