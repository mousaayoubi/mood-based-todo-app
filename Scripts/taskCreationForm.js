const createTask = document.getElementById('create_task');

createTask.addEventListener('click', clickHandleCreateTask);

function clickHandleCreateTask() {
    const taskName = document.getElementById('task_name').value.trim();
    const taskDuration = document.getElementById('task_duration').value.trim();
    const taskTime = document.getElementById('task_time').value;

    const formattedTaskTime = new Date(`1970-01-01T${taskTime}`).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    // Validation
    document.getElementById('task_name_error').innerHTML = taskName ? '' : "<img src='/Assets/Images/warning_icon.png' width='15' height='15' /> Name is required.";
    document.getElementById('task_duration_error').innerHTML = taskDuration ? '' : "<img src='/Assets/Images/warning_icon.png' width='15' height='15' /> Duration is required.";
    document.getElementById('task_time_error').innerHTML = taskTime ? '' : "<img src='/Assets/Images/warning_icon.png' width='15' height='15' /> Time is required.";

    if (!taskName || !taskDuration || !taskTime) return;

    // Load existing tasks
    let data = JSON.parse(localStorage.getItem("tasks")) || {};

    // Determine next key
    const newKey = (Object.keys(data).length + 1).toString();

    // Save task as object (no array)
    data[newKey] = {
        taskName: taskName,
        taskDuration: taskDuration,
        taskTime: formattedTaskTime,
        taskStatus: 'Incomplete'
    };

    // Store updated tasks
    localStorage.setItem("tasks", JSON.stringify(data));

    // Redirect to homepage
    window.location.href = '/';
}
