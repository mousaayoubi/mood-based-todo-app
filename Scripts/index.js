// ---------------------- ACCOUNT HANDLING ----------------------
const accountName = localStorage.getItem("name");
document.getElementById("account").textContent = accountName || "Guest";

document.getElementById("login_message").innerHTML = `
    <h5 class='login_message'>Login Successful</h5>
    <br />
    <h6 class='login_message'>You have been successfully logged in.</h6>
`;

document.getElementById("account_login").addEventListener("click", () => {
    window.location.href = accountName
        ? "/Components/editProfile.html"
        : "/Components/loginForm.html";
});

// ---------------------- TASK HANDLING ----------------------
const taskContainer = document.getElementById("task_container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

renderTasks(); // initial render

// ---------------------- RENDER ACTIVE TASKS ----------------------
function renderTasks() {
    taskContainer.innerHTML = "";

    const keys = Object.keys(tasks).filter(id => tasks[id].taskStatus !== "completed");

    document.getElementById("tasks_number").textContent =
        keys.length > 0
            ? `You have ${keys.length} tasks planned for today`
            : "You have no tasks planned for today";

    keys.forEach((taskId) => {
        const task = tasks[taskId];

        const col = document.createElement("div");
        col.className = "col-4 mb-4";

        const card = document.createElement("div");
        card.className = "task_card";
        card.dataset.id = taskId;

        card.innerHTML = `
            <div class="delete_hover">
                <img class="delete_btn" src="/Assets/Images/bin.png" width="20" height="20" alt="delete">
            </div>

            <img class="check_btn" src="/Assets/Images/check_mark.png" width="20" height="20" alt="complete">

            <div class="task_name">${task.taskName}</div>
            <div class="task_duration">${task.taskDuration} mins</div>
            <div class="task_time">${task.taskTime}</div>
        `;

        col.appendChild(card);
        taskContainer.appendChild(col);

        // Click to edit
        card.addEventListener("click", () => {
            window.location.href = `/Components/editTask.html?param1=${taskId}`;
        });

        // Delete
        card.querySelector(".delete_btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(taskId);
        });

        // Complete
        card.querySelector(".check_btn").addEventListener("click", (e) => {
            e.stopPropagation();
            completeTask(taskId);
        });
    });
}

// ---------------------- COMPLETE A TASK ----------------------
function completeTask(id) {
    tasks[id].taskStatus = "completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(); // refresh main list

    // Refresh completed list if visible
    if (completedVisible) renderCompletedTasks();
}

// ---------------------- DELETE A TASK ----------------------
function deleteTask(id) {
    delete tasks[id];
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

    const msg = document.getElementById("task_delete_message");
    msg.textContent = "Successfully deleted task.";
    setTimeout(() => msg.textContent = "", 3000);
}

// ---------------------- STRIKE-THROUGH ----------------------
function applyStrike(card) {
    card.querySelector(".task_name").style.textDecoration = "line-through";
    card.querySelector(".task_duration").style.textDecoration = "line-through";
    card.querySelector(".task_time").style.textDecoration = "line-through";
}

// ---------------------- COMPLETED TASKS TOGGLE ----------------------
let completedVisible = false;

const completedTasksButton = document.getElementById("completed_tasks_button");
completedTasksButton.addEventListener("click", toggleCompletedTasks);

function toggleCompletedTasks() {
    completedVisible = !completedVisible;

    if (completedVisible) {
        completedTasksButton.textContent = "Hide Completed";
        renderCompletedTasks();
    } else {
        completedTasksButton.textContent = "Show Completed";
        hideCompletedTasks();
    }
}

function hideCompletedTasks() {
    document.getElementById("completed_tasks_title").innerHTML = "";
    document.getElementById("completed_tasks_container").innerHTML = "";
}

function renderCompletedTasks() {
    const title = document.getElementById("completed_tasks_title");
    const container = document.getElementById("completed_tasks_container");

    title.innerHTML = "Completed Tasks";
    container.innerHTML = "";

    const keys = Object.keys(tasks)
        .filter(id => tasks[id].taskStatus === "completed");

    keys.forEach((taskId) => {
        const task = tasks[taskId];

        const col = document.createElement("div");
        col.className = "col-12 mb-3";

        const card = document.createElement("div");
        card.className = "task_card_completed";

        card.innerHTML = `
            <div class="task_name">${task.taskName}</div>
            <div class="task_duration">${task.taskDuration}</div>
            <div class="task_time">${task.taskTime}</div>
        `;

        applyStrike(card);
        col.appendChild(card);
        container.appendChild(col);
    });
}
