
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

//Retrieve tasks from localstorage
const tasks = localStorage.getItem('tasks');
const data = JSON.parse(tasks);

Object.keys(data).forEach(key => {

	document.getElementById(`task_name${key}`).innerHTML = data[key][0].taskName;
	document.getElementById(`task_duration${key}`).innerHTML = data[key][0].taskDuration;
	document.getElementById(`task_time${key}`).innerHTML = data[key][0].taskTime;
});
