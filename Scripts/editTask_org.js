const data = localStorage.getItem('tasks');

const tasks = JSON.parse(data);

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const taskName = urlParams.get('param1');

//First card is clicked

if (taskName.includes("1")){

	document.getElementById('task_name').value = tasks[1][0].taskName;
	document.getElementById('task_duration').value = tasks[1][0].taskDuration;
	document.getElementById('task_time').value = tasks[1][0].taskTime;

}
//Second card is clicked 
if (taskName.includes("2")){

        document.getElementById('task_name').value = tasks[2][0].taskName;
        document.getElementById('task_duration').value = tasks[2][0].taskDuration;
        document.getElementById('task_time').value = tasks[2][0].taskTime;

}
//Third card is clicked 
if (taskName.includes("3")){

        document.getElementById('task_name').value = tasks[3][0].taskName;
        document.getElementById('task_duration').value = tasks[3][0].taskDuration;
        document.getElementById('task_time').value = tasks[3][0].taskTime;
}

//Handle saving a task1 to localstorage
const saveTask1 = document.getElementById('save_task');

saveTask1.addEventListener('click', handleSaveTask);

function handleSaveTask(){

tasks[1][0].taskName = document.getElementById('task_name').value;
tasks[1][0].taskDuration = document.getElementById('task_duration').value;
tasks[1][0].taskTime = document.getElementById('task_time').value;

	localStorage.setItem("tasks", JSON.stringify(tasks));
	document.getElementById("save_task_success").innerHTML = "Successfully saved changes."

}

//Handle saving a task2 to localstorage
const saveTask2 = document.getElementById('save_task');

saveTask2.addEventListener('click', handleSaveTask);

function handleSaveTask(){

tasks[2][0].taskName = document.getElementById('task_name').value;
tasks[2][0].taskDuration = document.getElementById('task_duration').value;
tasks[2][0].taskTime = document.getElementById('task_time').value;

        localStorage.setItem("tasks", JSON.stringify(tasks));
	document.getElementById("save_task_success").innerHTML = "Successfully saved changes."

}

//Handle saving a task3 to localstorage
const saveTask3 = document.getElementById('save_task');

saveTask3.addEventListener('click', handleSaveTask);

function handleSaveTask(){

tasks[3][0].taskName = document.getElementById('task_name').value;
tasks[3][0].taskDuration = document.getElementById('task_duration').value;
tasks[3][0].taskTime = document.getElementById('task_time').value;

        localStorage.setItem("tasks", JSON.stringify(tasks));
	document.getElementById("save_task_success").innerHTML = "Successfully saved changes."

}
