// --------------------- ACCOUNT LOGIN ----------------------
const accountLoginBtn = document.getElementById("account_login");

accountLoginBtn.addEventListener("click", () => {
    const accountName = localStorage.getItem("name")?.trim();
    if (accountName) {
        window.location.href = "/Components/editProfile.html";
    } else {
        window.location.href = "/Components/loginForm.html";
    }
});

// Update the welcome message
const accountSpan = document.getElementById("account");
const name = localStorage.getItem("name")?.trim() || "Guest";
accountSpan.textContent = name;

// ---------------------- TASK HANDLING ----------------------
let tasksObj = JSON.parse(localStorage.getItem("tasks")) || {}; // object
let completedVisible = false;

// Convert object → array for rendering/filtering
function getTasksArray() {
    return Object.keys(tasksObj).map(id => ({ id, ...tasksObj[id] }));
}

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
    const tasksArray = getTasksArray();
    const activeTasks = tasksArray.filter(t => t.taskStatus === "Incomplete");

    taskContainer.innerHTML = taskTemplate({ tasks: activeTasks });

    tasksNumber.textContent =
        activeTasks.length > 0
            ? `You have ${activeTasks.length} task${activeTasks.length > 1 ? 's' : ''} planned for today`
            : "You have no tasks planned for today";

    activeTasks.forEach(task => {
        const card = taskContainer.querySelector(`.task_card[data-id="${task.id}"]`);

        card.addEventListener("click", (e) => {
            if (e.target.closest(".delete_btn") || e.target.closest(".check_btn")) return;
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

// ---------------------- COMPLETE TASK ----------------------
function completeTask(id) {
    if (tasksObj[id]) {
        tasksObj[id].taskStatus = "Completed";
        localStorage.setItem("tasks", JSON.stringify(tasksObj));
        renderTasks();
        if (completedVisible) renderCompletedTasks();
    }
}

// ---------------------- DELETE TASK ----------------------
function deleteTask(id) {
    delete tasksObj[id];
    localStorage.setItem("tasks", JSON.stringify(tasksObj));
    renderTasks();

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
    const tasksArray = getTasksArray();
    const completedTasks = tasksArray.filter(t => t.taskStatus === "Completed");

    if (completedTasks.length === 0) {
        hideCompletedTasks();
        return;
    }

    completedTitle.innerHTML = "Completed Tasks";
    completedContainer.innerHTML = completedTemplate({ tasks: completedTasks });
}

// ---------------------- SUGGESTED TASKS BASED ON MOOD ----------------------
function updateSuggestedTasks() {
    const moodValue = parseInt(localStorage.getItem("mood")) || 2; // 1 = Sad, 2 = Neutral, 3 = Happy
    let suggestedTasks = [];

    switch (moodValue) {
        case 1: // Sad
            suggestedTasks = [
                { taskName: "Meditation", titleClass: "title2", taskDuration: 10, taskTime: "01:00", timePeriod: "PM", moodIcon: "sad-face.png", moodWidth: 30, moodHeight: 30, moodLabelClass: "mood_label1", moodLabel: "Mood: Low" },
                { taskName: "Take a Short Walk", titleClass: "title3", taskDuration: 15, taskTime: "03:00", timePeriod: "PM", moodIcon: "sad-face.png", moodWidth: 30, moodHeight: 30, moodLabelClass: "mood_label1", moodLabel: "Mood: Low" }
            ];
            break;
        case 2: // Neutral
            suggestedTasks = [
                { taskName: "Go for a Drive", titleClass: "title1", taskDuration: 30, taskTime: "07:00", timePeriod: "PM", moodIcon: "neutral-face_orange.png", moodWidth: 30, moodHeight: 30, moodLabelClass: "mood_label2", moodLabel: "Mood: Neutral" },
                { taskName: "Light Cleaning", titleClass: "title2", taskDuration: 15, taskTime: "04:00", timePeriod: "PM", moodIcon: "neutral-face_orange.png", moodWidth: 30, moodHeight: 30, moodLabelClass: "mood_label2", moodLabel: "Mood: Neutral" }
            ];
            break;
        case 3: // Happy
            suggestedTasks = [
                { taskName: "Go for a Jog", titleClass: "title1", taskDuration: 20, taskTime: "02:00", timePeriod: "PM", moodIcon: "happy-face.png", moodWidth: 35, moodHeight: 35, moodLabelClass: "mood_label3", moodLabel: "Mood: Happy" },
                { taskName: "Read a Book", titleClass: "title2", taskDuration: 15, taskTime: "09:00", timePeriod: "PM", moodIcon: "happy-face.png", moodWidth: 35, moodHeight: 35, moodLabelClass: "mood_label3", moodLabel: "Mood: Happy" }
            ];
            break;
        default:
            suggestedTasks = [
                { taskName: "Select your mood to see suggestions", titleClass: "title1", taskDuration: 0, taskTime: "", timePeriod: "", moodIcon: "", moodWidth: 0, moodHeight: 0, moodLabelClass: "", moodLabel: "" }
            ];
    }

    suggestedContainer.innerHTML = suggestedTemplate({ tasks: suggestedTasks });
}

// Expose globally so moodSelector.js can call it
window.updateSuggestedTasks = updateSuggestedTasks;

// ---------------------- WEATHER API ----------------------
const weatherApi = document.getElementById('weatherApi');
weatherApi.addEventListener('click', handleWeatherApi);

function handleWeatherApi() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            const res = await fetch(`/weather?lat=${lat}&lon=${lon}`);
            if (!res.ok) throw new Error("Weather API error");

            const data = await res.json();
            const weather = {
                icon: data.current.icon,
                temp_c: data.current.temp_c,
                condition: data.current.condition,
                humidity: data.current.humidity
            };
            localStorage.setItem("weather", JSON.stringify(weather));
            window.location.href = '/Components/currentWeather.html';
        } catch (err) {
            console.error(err);
            alert("Unable to fetch weather.");
        }
    }, () => alert("Please allow location access for weather."));
}

// ---------------------- INITIAL RENDER ----------------------
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();

    // Render suggested tasks based on saved mood from localStorage
    updateSuggestedTasks();
});
