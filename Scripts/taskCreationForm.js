const createTask = document.getElementById('create_task');

createTask.addEventListener('click', clickHandleCreateTask);

function clickHandleCreateTask(){

const taskName = document.getElementById('task_name').value;
const taskDuration = document.getElementById('task_duration').value;
const taskDate = document.getElementById('task_date').value;

	//Validate task name
	if (!taskName){
	document.getElementById('task_name_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Name is required.";
	}

	//Validate task duration
	if (!taskDuration){
	document.getElementById('task_duration_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Duration is required.";
	}

	//Validate task date
	if (!taskDate){
	document.getElementById('task_date_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Time is required.";
	}

	if (taskName && taskDuration && taskDate){

		const tasks = [{
			'taskName': taskName,
			'taskDuration': taskDuration,
			'taskDate': taskDate
		}];

		let data = JSON.parse(localStorage.getItem("tasks")) || {};

		const newKey = Object.keys(data).length + 1;

		data[newKey] = [{
                        'taskName': document.getElementById('task_name').value,
                        'taskDuration': document.getElementById('task_duration').value,
                        'taskDate': document.getElementById('task_date').value
                }];

		
		localStorage.setItem("tasks", JSON.stringify(data));

		console.log(data);


		//Clear input fields
		document.getElementById('task_name_error').innerHTML = '';
		document.getElementById('task_duration_error').innerHTML = '';
		document.getElementById('task_duration_error').innerHTML = '';
	}

}
