const STORAGE_KEY = "teacherDashboardData";

let data = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
) || {
    teacherStatus: "",
    attendance: {
        className: "",
        total: 0,
        present: 0
    },
    assignments: [],
    schedule: [],
    tests: [],
    progress: []
};

function saveData() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

const today = new Date();

document.getElementById("currentDate").textContent =
    today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

document.querySelectorAll(".status-btn").forEach(button => {
    button.addEventListener("click", () => {
        data.teacherStatus = button.dataset.status;
        saveData();
        renderStatus();
    });
});

function renderStatus() {
    const statusText =
        document.getElementById("statusText");

    if (!data.teacherStatus) {
        statusText.textContent = "Not updated";
        return;
    }

    statusText.textContent =
        data.teacherStatus;
}

renderStatus();

function openModal(id) {
    document
        .getElementById(id)
        .classList.add("active");
}

function closeModal(id) {
    document
        .getElementById(id)
        .classList.remove("active");
}

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
});

function saveAttendance() {
    const className =
        document.getElementById("attendanceClass").value.trim();

    const total =
        Number(document.getElementById("totalStudents").value);

    const present =
        Number(document.getElementById("studentsPresent").value);

    if (!className) {
        alert("Please enter the class name.");
        return;
    }

    if (total <= 0) {
        alert("Total students must be greater than 0.");
        return;
    }

    if (present < 0 || present > total) {
        alert("Present students must be between 0 and total students.");
        return;
    }

    data.attendance = {
        className,
        total,
        present
    };

    saveData();
    renderAttendance();
    closeModal("attendanceModal");
}

function renderAttendance() {
    const attendance = data.attendance;

    const absent =
        Math.max(
            attendance.total - attendance.present,
            0
        );

    const percentage =
        attendance.total > 0
            ? Math.round(
                (attendance.present /
                    attendance.total) * 100
            )
            : 0;

    document.getElementById("presentCount")
        .textContent = attendance.present;

    document.getElementById("absentCount")
        .textContent = absent;

    document.getElementById("attendancePercentage")
        .textContent = percentage + "%";
}

renderAttendance();

function saveAssignment() {
    const name =
        document.getElementById("assignmentName").value.trim();

    const className =
        document.getElementById("assignmentClass").value.trim();

    const dueDate =
        document.getElementById("assignmentDueDate").value;

    const status =
        document.getElementById("assignmentStatus").value;

    if (!name || !className || !dueDate) {
        alert("Please fill in all assignment fields.");
        return;
    }

    data.assignments.push({
        id: Date.now(),
        name,
        className,
        dueDate,
        status
    });

    saveData();
    renderAssignments();
    closeModal("assignmentModal");

    document.getElementById("assignmentName").value = "";
    document.getElementById("assignmentClass").value = "";
    document.getElementById("assignmentDueDate").value = "";
}

function renderAssignments() {
    const list =
        document.getElementById("assignmentList");

    const count =
        document.getElementById("assignmentCount");

    const pending =
        data.assignments.filter(
            assignment =>
                assignment.status === "Pending"
        ).length;

    count.textContent = pending;

    if (data.assignments.length === 0) {
        list.innerHTML =
            `<p class="empty-message">
                No assignments added.
             </p>`;
        return;
    }

    list.innerHTML =
        data.assignments.map(assignment => `
            <div class="item">
                <div class="item-info">
                    <h3>${escapeHTML(assignment.name)}</h3>
                    <p>
                        ${escapeHTML(assignment.className)}
                        · Due ${assignment.dueDate}
                        · ${assignment.status}
                    </p>
                </div>

                <div class="item-actions">
                    ${
                        assignment.status === "Pending"
                        ? `
                        <button
                            class="small-btn complete-btn"
                            onclick="markAssignmentGraded(${assignment.id})">
                            Mark Graded
                        </button>
                        `
                        : ""
                    }

                    <button
                        class="small-btn delete-btn"
                        onclick="deleteAssignment(${assignment.id})">
                        Delete
                    </button>
                </div>
            </div>
        `).join("");
}

function markAssignmentGraded(id) {
    const assignment =
        data.assignments.find(
            item => item.id === id
        );

    if (assignment) {
        assignment.status = "Graded";
        saveData();
        renderAssignments();
    }
}

function deleteAssignment(id) {
    data.assignments =
        data.assignments.filter(
            item => item.id !== id
        );

    saveData();
    renderAssignments();
}

renderAssignments();

function saveSchedule() {
    const subject =
        document.getElementById("subject").value.trim();

    const className =
        document.getElementById("className").value.trim();

    const time =
        document.getElementById("classTime").value;

    const room =
        document.getElementById("classRoom").value.trim();

    if (!subject || !className || !time) {
        alert("Please enter subject, class and time.");
        return;
    }

    data.schedule.push({
        id: Date.now(),
        subject,
        className,
        time,
        room
    });

    saveData();
    renderSchedule();
    closeModal("scheduleModal");

    document.getElementById("subject").value = "";
    document.getElementById("className").value = "";
    document.getElementById("classTime").value = "";
    document.getElementById("classRoom").value = "";
}

function renderSchedule() {
    const list =
        document.getElementById("scheduleList");

    if (data.schedule.length === 0) {
        list.innerHTML =
            `<p class="empty-message">
                No classes scheduled.
             </p>`;
        return;
    }

    const sortedSchedule =
        [...data.schedule].sort(
            (a, b) =>
                a.time.localeCompare(b.time)
        );

    list.innerHTML =
        sortedSchedule.map(item => `
            <div class="schedule-item">
                <strong>
                    ${item.time}
                    — ${escapeHTML(item.subject)}
                </strong>

                <span>
                    ${escapeHTML(item.className)}
                    ${item.room
                        ? " · " + escapeHTML(item.room)
                        : ""}
                </span>

                <br>

                <button
                    class="small-btn delete-btn"
                    onclick="deleteSchedule(${item.id})">
                    Delete
                </button>
            </div>
        `).join("");
}

function deleteSchedule(id) {
    data.schedule =
        data.schedule.filter(
            item => item.id !== id
        );

    saveData();
    renderSchedule();
}

renderSchedule();

function saveTest() {
    const name =
        document.getElementById("testName").value.trim();

    const subject =
        document.getElementById("testSubject").value.trim();

    const date =
        document.getElementById("testDate").value;

    const type =
        document.getElementById("testType").value;

    if (!name || !subject || !date) {
        alert("Please fill in all test fields.");
        return;
    }

    data.tests.push({
        id: Date.now(),
        name,
        subject,
        date,
        type
    });

    saveData();
    renderTests();
    closeModal("testModal");

    document.getElementById("testName").value = "";
    document.getElementById("testSubject").value = "";
    document.getElementById("testDate").value = "";
}

function renderTests() {
    const list =
        document.getElementById("testList");

    if (data.tests.length === 0) {
        list.innerHTML =
            `<p class="empty-message">
                No upcoming tests or exams.
             </p>`;
        return;
    }

    const sortedTests =
        [...data.tests].sort(
            (a, b) =>
                a.date.localeCompare(b.date)
        );

    list.innerHTML =
        sortedTests.map(test => `
            <div class="item">
                <div class="item-info">
                    <h3>${escapeHTML(test.name)}</h3>
                    <p>
                        ${escapeHTML(test.subject)}
                        · ${test.type}
                        · ${test.date}
                    </p>
                </div>

                <button
                    class="small-btn delete-btn"
                    onclick="deleteTest(${test.id})">
                    Delete
                </button>
            </div>
        `).join("");
}

function deleteTest(id) {
    data.tests =
        data.tests.filter(
            item => item.id !== id
        );

    saveData();
    renderTests();
}

renderTests();

function saveProgress() {
    const subject =
        document.getElementById("progressSubject").value.trim();

    const className =
        document.getElementById("progressClass").value.trim();

    const topic =
        document.getElementById("progressTopic").value.trim();

    const status =
        document.getElementById("progressStatus").value;

    if (!subject || !className || !topic) {
        alert("Please fill in all progress fields.");
        return;
    }

    data.progress.push({
        id: Date.now(),
        subject,
        className,
        topic,
        status,
        date: new Date().toLocaleDateString("en-IN")
    });

    saveData();
    renderProgress();
    closeModal("progressModal");

    document.getElementById("progressSubject").value = "";
    document.getElementById("progressClass").value = "";
    document.getElementById("progressTopic").value = "";
}

function renderProgress() {
    const list =
        document.getElementById("progressList");

    if (data.progress.length === 0) {
        list.innerHTML =
            `<p class="empty-message">
                No class progress recorded.
             </p>`;
        return;
    }

    list.innerHTML =
        data.progress.map(item => `
            <div class="item">
                <div class="item-info">
                    <h3>
                        ${escapeHTML(item.subject)}
                        — ${escapeHTML(item.className)}
                    </h3>

                    <p>
                        ${escapeHTML(item.topic)}
                        · ${item.status}
                        · ${item.date}
                    </p>
                </div>

                <button
                    class="small-btn delete-btn"
                    onclick="deleteProgress(${item.id})">
                    Delete
                </button>
            </div>
        `).join("");
}

function deleteProgress(id) {
    data.progress =
        data.progress.filter(
            item => item.id !== id
        );

    saveData();
    renderProgress();
}

renderProgress();

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document
    .getElementById("clearDataBtn")
    .addEventListener("click", () => {

        const confirmed =
            confirm(
                "Delete all teacher dashboard data?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem(STORAGE_KEY);

        data = {
            teacherStatus: "",
            attendance: {
                className: "",
                total: 0,
                present: 0
            },
            assignments: [],
            schedule: [],
            tests: [],
            progress: []
        };

        renderStatus();
        renderAttendance();
        renderAssignments();
        renderSchedule();
        renderTests();
        renderProgress();
    });
