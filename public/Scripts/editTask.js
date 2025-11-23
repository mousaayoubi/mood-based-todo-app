const tasks = JSON.parse(localStorage.getItem("tasks"));
const urlParams = new URLSearchParams(window.location.search);
const taskIndex = urlParams.get("param1");

// Load selected task
if (tasks[taskIndex]) {
    document.getElementById('task_name').value = tasks[taskIndex].taskName;
    document.getElementById('task_duration').value = tasks[taskIndex].taskDuration;
    document.getElementById('task_time').value = tasks[taskIndex].taskTime;
}

// Save changes
document.getElementById('save_task').addEventListener('click', () => {

    tasks[taskIndex].taskName = document.getElementById('task_name').value;
    tasks[taskIndex].taskDuration = document.getElementById('task_duration').value;
    tasks[taskIndex].taskTime = document.getElementById('task_time').value;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("save_task_success").innerHTML =
        "Successfully saved changes.";
});
