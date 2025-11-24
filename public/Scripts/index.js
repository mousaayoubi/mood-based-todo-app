// ---------------------  ACCOUNT LOGIN ----------------------
const accountName = localStorage.getItem("name"); // get account from localStorage
const accountLoginBtn = document.getElementById("account_login");

accountLoginBtn.addEventListener("click", () => {
    if (accountName && accountName.trim() !== "") {
        // User is logged in → edit profile
        window.location.href = "/Components/editProfile.html";
    } else {
        // User not logged in → login form
        window.location.href = "/Components/loginForm.html";
    }
});

// Get the account name from localStorage
const name = localStorage.getItem("name") || "Guest";

// Update the welcome message dynamically
const accountSpan = document.getElementById("account");
accountSpan.textContent = name;

// ---------------------- TASK HANDLING ----------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let completedVisible = false;

// Handlebars templates
const taskTemplate = Handlebars.compile(document.getElementById("task-template").innerHTML);
const completedTemplate = Handlebars.compile(document.getElementById("completed-task-template").innerHTML);
const suggestedTemplate = Handlebars.compile(document.getElementById("suggested-task-template").innerHTML);

// Containers
const taskContainer = document.getElementById("task_container");
const completedContainer = document.getElementById("completed_tasks_container");
const completedTitle = document.getElementById("completed_tasks_title");
const suggestedContainer = document.getElementById("suggested_tasks_container");
const tasksNumber = document.getElementById("tasks_number");
const completedTasksButton = document.getElementById("completed_tasks_button");

// ---------------------- RENDER ACTIVE TASKS ----------------------
function renderTasks() {
    const activeTasks = Object.keys(tasks)
        .filter(id => tasks[id].taskStatus === "Incomplete")
        .map(id => ({ ...tasks[id], id }));

    taskContainer.innerHTML = taskTemplate({ tasks: activeTasks });

    // ---------------- Update task count dynamically ----------------
    tasksNumber.textContent =
        activeTasks.length > 0
            ? `You have ${activeTasks.length} task${activeTasks.length > 1 ? 's' : ''} planned for today`
            : "You have no tasks planned for today";

    // Attach event listeners for edit, delete, complete
    activeTasks.forEach(task => {
        const card = taskContainer.querySelector(`.task_card[data-id="${task.id}"]`);

        card.addEventListener("click", () => {
            window.location.href = `/Components/editTask.html?param1=${task.id}`;
        });

        card.querySelector(".delete_btn").addEventListener("click", e => {
            e.stopPropagation();
            deleteTask(task.id);
        });

        card.querySelector(".check_btn").addEventListener("click", e => {
            e.stopPropagation();
            completeTask(task.id);
        });
    });
}

// ---------------------- COMPLETE A TASK ----------------------
function completeTask(id) {
    tasks[id].taskStatus = "Backlog";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(); // <-- task count updates here
    if (completedVisible) renderCompletedTasks();
}

// ---------------------- DELETE A TASK ----------------------
function deleteTask(id) {
    delete tasks[id];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(); // <-- task count updates here

    const msg = document.getElementById("task_delete_message");
    msg.textContent = "Successfully deleted task.";
    setTimeout(() => msg.textContent = "", 3000);
}

// ---------------------- COMPLETED TASKS ----------------------
completedTasksButton.addEventListener("click", toggleCompletedTasks);

function toggleCompletedTasks() {
    completedVisible = !completedVisible;

    completedTasksButton.textContent = completedVisible ? "Hide Completed" : "Show Completed";

    if (completedVisible) renderCompletedTasks();
    else hideCompletedTasks();
}

function hideCompletedTasks() {
    completedTitle.innerHTML = "";
    completedContainer.innerHTML = "";
}

function renderCompletedTasks() {
    const completedTasks = Object.keys(tasks)
        .filter(id => tasks[id].taskStatus === "Backlog")
        .map(id => ({ ...tasks[id], id }));

    if (completedTasks.length === 0) {
        completedTitle.innerHTML = "";
        completedContainer.innerHTML = "";
        return;
    }

    completedTitle.innerHTML = "Completed Tasks";
    completedContainer.innerHTML = completedTemplate({ tasks: completedTasks });
}

// ---------------------- SUGGESTED TASKS ----------------------
function renderSuggestedTasks() {
    const suggestedTasks = [
        {
            taskName: "Read a Book",
            titleClass: "title1",
            taskDuration: 45,
            taskTime: "12:43",
            timePeriod: "PM",
            moodIcon: "neutral-face_orange.png",
            moodWidth: 30,
            moodHeight: 30,
            moodLabelClass: "mood_label1",
            moodLabel: "Mood"
        },
        {
            taskName: "Meditation",
            titleClass: "title2",
            taskDuration: 15,
            taskTime: "12:43",
            timePeriod: "PM",
            moodIcon: "cloud_yellow.png",
            moodWidth: 35,
            moodHeight: 35,
            moodLabelClass: "mood_label2",
            moodLabel: "Weather - Mostly Cloudy"
        }
    ];

    suggestedContainer.innerHTML = suggestedTemplate({ tasks: suggestedTasks });
}

// ---------------------- WEATHER API ----------------------
const weatherApi = document.getElementById('weatherApi');
weatherApi.addEventListener('click', handleWeatherApi);

function handleWeatherApi() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            const res = await fetch(`/weather?lat=${lat}&lon=${lon}`);
            const data = await res.json();

            if (res.ok) {
                const weather = {
                    icon: data.current.icon,
                    temp_c: data.current.temp_c,
                    condition: data.current.condition,
                    humidity: data.current.humidity
                };

                localStorage.setItem("weather", JSON.stringify(weather));
                window.location.href = '/Components/currentWeather.html';
            }
        } catch (err) {
            console.log(err);
        }
    });
}

// ---------------------- INITIAL RENDER ----------------------
renderTasks();
renderSuggestedTasks();
