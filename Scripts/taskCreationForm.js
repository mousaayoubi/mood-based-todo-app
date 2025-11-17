const createTask = document.getElementById('create_task');

createTask.addEventListener('click', clickHandleCreateTask);

function clickHandleCreateTask(){

const taskName = document.getElementById('task_name').value;
const taskDuration = document.getElementById('task_duration').value;
const taskTime = document.getElementById('task_time').value;

formattedTaskTime = taskTime.toLocaleString('en-US', {
	hour: 'numeric',
	minute: 'numeric',
	hour12: true
});

	//Validate task name
	if (!taskName){
	document.getElementById('task_name_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Name is required.";
	}

	//Validate task duration
	if (!taskDuration){
	document.getElementById('task_duration_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Duration is required.";
	}

	//Validate task date
	if (!taskTime){
	document.getElementById('task_time_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Time is required.";
	}

	if (taskName && taskDuration && taskTime){

		const tasks = [{
			'taskName': taskName,
			'taskDuration': taskDuration,
			'taskTime': formattedTaskTime
		}];

		let data = JSON.parse(localStorage.getItem("tasks")) || {};

		const newKey = Object.keys(data).length + 1;

		data[newKey] = [{
                        'taskName': document.getElementById('task_name').value,
                        'taskDuration': document.getElementById('task_duration').value,
                        'taskTime': document.getElementById('task_time').value,
			'taskStaus': 'Incomplete',
                }];

		
		localStorage.setItem("tasks", JSON.stringify(data));


		//Clear input fields
		document.getElementById('task_name_error').innerHTML = '';
		document.getElementById('task_duration_error').innerHTML = '';
		document.getElementById('task_time_error').innerHTML = '';

		//Redirect to homepage;
		window.location.href = '/';
	}

}
