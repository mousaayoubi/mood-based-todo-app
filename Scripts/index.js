
//Check if name is stored
const name = localStorage.getItem('name');

//Display default account is guest if no user is logged in
if (!name) {
document.getElementById('account').innerHTML = 'Guest';
} else {

document.getElementById('account').innerHTML = name;
}

document.getElementById("login_message").innerHTML = "<h5 class='login_message'>Login Successful</h5><br /><h6 class='login_message'>You have been successfully logged in.</h6>";

accountLogin = document.getElementById('account_login');

accountLogin.addEventListener('click', handleClick);

function handleClick(){

	if (name) {

		window.location.href = "/Components/editProfile.html";
	}

	if (!name) {

		window.location.href = "/Components/loginForm.html";
	}
}

//Hide cards initially
document.getElementById('task_name_border1').style.visibility = 'hidden';
document.getElementById('task_name_border2').style.visibility = 'hidden';
document.getElementById('task_name_border3').style.visibility = 'hidden';

//Retrieve tasks from localstorage
const tasks = localStorage.getItem('tasks');
const data = JSON.parse(tasks);

//Show card if data exists
if (data) {

	if (Object.keys(data).length === 1){
document.getElementById('task_name_border1').style.visibility = 'visible';
} 
if (Object.keys(data).length === 2){
document.getElementById('task_name_border1').style.visibility = 'visible';
document.getElementById('task_name_border2').style.visibility = 'visible';
} 
if (Object.keys(data).length === 3){
document.getElementById('task_name_border1').style.visibility = 'visible';
document.getElementById('task_name_border2').style.visibility = 'visible';
document.getElementById('task_name_border3').style.visibility = 'visible';
}
}

if (data){

Object.keys(data).forEach(key => {

	document.getElementById(`task_name${key}`).innerHTML = data[key][0].taskName;
	document.getElementById(`task_duration${key}`).innerHTML = data[key][0].taskDuration;
	document.getElementById(`task_time${key}`).innerHTML = data[key][0].taskTime;
});
}


//Handle completing a task event
const completeTask1 = document.getElementById('check_mark1');

completeTask1.addEventListener('click', handleCompleteTask1);

function handleCompleteTask1() {

	const taskName1 = document.getElementById('task_name1');
	taskName1.style.textDecoration = 'line-through';

	const taskDuration1 = document.getElementById('task_duration1');
        taskDuration1.style.textDecoration = 'line-through';

	const taskTime1 = document.getElementById('task_time1');
        taskTime1.style.textDecoration = 'line-through';
}

const completeTask2 = document.getElementById('check_mark2');

completeTask2.addEventListener('click', handleCompleteTask2);

function handleCompleteTask2() {

        const taskName2 = document.getElementById('task_name2');
        taskName2.style.textDecoration = 'line-through';

        const taskDuration2 = document.getElementById('task_duration2');
        taskDuration2.style.textDecoration = 'line-through';

        const taskTime2 = document.getElementById('task_time2');
        taskTime2.style.textDecoration = 'line-through';
}

const completeTask3 = document.getElementById('check_mark3');

completeTask3.addEventListener('click', handleCompleteTask3);

function handleCompleteTask3() {

        const taskName3 = document.getElementById('task_name3');
        taskName3.style.textDecoration = 'line-through';

        const taskDuration3 = document.getElementById('task_duration3');
        taskDuration3.style.textDecoration = 'line-through';

        const taskTime3 = document.getElementById('task_time3');
        taskTime3.style.textDecoration = 'line-through';
}

// Load edit task component if first task card is clicked
const taskCard1 = document.getElementById('task_name_border1');

taskCard1.addEventListener('click', handleTaskCard1);

function handleTaskCard1(){
	param_id = event.target.id
	window.location.href = `/Components/editTask.html?param1=${param_id}`;
}

// Load edit task component if second task card is clicked
const taskCard2 = document.getElementById('task_name_border2');

taskCard2.addEventListener('click', handleTaskCard2);

function handleTaskCard2(){
        param_id = event.target.id
        window.location.href = `/Components/editTask.html?param1=${param_id}`;
}

// Load edit task component if third task card is clicked
const taskCard3 = document.getElementById('task_name_border3');

taskCard3.addEventListener('click', handleTaskCard3);

function handleTaskCard3(){
        param_id = event.target.id
        window.location.href = `/Components/editTask.html?param1=${param_id}`;
}

//Delete a card

const deleteCard1 = document.getElementById('task_name_border1');

deleteCard1.addEventListener('click', handleDeleteCard1);

function handleDeleteCard1(){
	delete data[1];
	localStorage.setItem('tasks', JSON.stringify(data));
	document.getElementById('task_delete_message').innerHTML = 'Successfully deleted task card.';
	setTimeout(function(){}, 2000);
}

const deleteCard2 = document.getElementById('task_name_border2');

deleteCard2.addEventListener('click', handleDeleteCard2);

function handleDeleteCard2(){
        delete data[2];
        localStorage.setItem('tasks', JSON.stringify(data));
        document.getElementById('task_delete_message').innerHTML = 'Successfully deleted task card.';
	setTimeout(function(){}, 2000);

}

const deleteCard3 = document.getElementById('task_name_border3');

deleteCard3.addEventListener('click', handleDeleteCard3);

function handleDeleteCard3(){
        delete data[3];
        localStorage.setItem('tasks', JSON.stringify(data));
	document.getElementById('task_delete_message').innerHTML = 'Successfully deleted task card.';
	setTimeout(function(){}, 2000);
}
