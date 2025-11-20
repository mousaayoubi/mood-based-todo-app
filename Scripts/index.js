// ---------------------- ACCOUNT HANDLING ----------------------
const accountName = localStorage.getItem("name");
document.getElementById("account").textContent = accountName || "Guest";

// Login message (if used)
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

// Render on page load
renderTasks();


// ---------------------- RENDER TASK CARDS ----------------------
function renderTasks() {
    taskContainer.innerHTML = ""; // Clear old cards

    const keys = Object.keys(tasks);

    document.getElementById("tasks_number").textContent =
        keys.length > 0
            ? `You have ${keys.length} tasks planned for today`
            : "You have no tasks planned for today";

    keys.forEach((taskId) => {
        const task = tasks[taskId];

        // Card wrapper column
        const col = document.createElement("div");
        col.className = "col-4 mb-4";

        // Task card
        const card = document.createElement("div");
        card.className = "task_card";
        card.dataset.id = taskId;

        // Card content
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

        // --- Click to edit ---
        card.addEventListener("click", () => {
            window.location.href = `/Components/editTask.html?param1=${taskId}`;
        });

        // --- Delete ---
        card.querySelector(".delete_btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(taskId);
        });

        // --- Complete ---
        card.querySelector(".check_btn").addEventListener("click", (e) => {
            e.stopPropagation();
            completeTask(taskId, card);

        });

        // --- Apply strike-through if already completed ---
        if (task.taskStatus === "backlog") {
            applyStrike(card);
		document.querySelectorAll('.task_card').forEach( e => e.remove(
		));
	};
    });
}



// ---------------------- COMPLETE A TASK ----------------------
function completeTask(id, card) {
    tasks[id].taskStatus = "backlog";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    applyStrike(card);
}



// ---------------------- DELETE A TASK ----------------------
function deleteTask(id) {
    delete tasks[id];
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(); // Re-render list

    const msg = document.getElementById("task_delete_message");
    msg.textContent = "Successfully deleted task.";
    setTimeout(() => {
        msg.textContent = "";
    }, 3000);
}



// ---------------------- STRIKE-THROUGH STYLE ----------------------
function applyStrike(card) {
    card.querySelector(".task_name").style.textDecoration = "line-through";
    card.querySelector(".task_duration").style.textDecoration = "line-through";
    card.querySelector(".task_time").style.textDecoration = "line-through";
}

completedTasks = document.getElementById('completed_tasks_button');

completedTasks.addEventListener('click', handleCompletedTasks);

function handleCompletedTasks(){
renderCompletedTasks();
}

function renderCompletedTasks(){
let completedTasksTitle = document.getElementById("completed_tasks_title");
completedTasksTitle.innerHTML = 'Completed Tasks';
let completedTasksContainer = document.getElementById("completed_tasks_container");
	let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

	completedTasksContainer.innerHTML = '';

	const keys = Object.keys(tasks);

	keys.forEach((taskId) => {
	
	const task = tasks[taskId];

	if (task.taskStatus === 'backlog') {
	const col = document.createElement("div");
		col.className = "col-1";
	const card = document.createElement("div");
		card.className = "task_card_completed"
		card.dataset.id = taskId;

		card.innerHTML = `
		<div class="task_name">${task.taskName}</div>
		<div class="task_duration">${task.taskDuration}</div>
		<div class="task_time">${task.taskTime}</div>
		`;
	col.appendChild(card);
	completedTasksContainer.appendChild(col);
	applyStrike(card);
	}
	});

}
