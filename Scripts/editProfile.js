let name = localStorage.getItem('name');
let email = localStorage.getItem('email');

document.querySelector('#name').value = name;
document.querySelector('#email').value = email;

saveChanges = document.getElementById('save_changes');

saveChanges.addEventListener('click', handleSaveChangesClick);

function handleSaveChangesClick(){

//Validate name
let name = document.querySelector('#name').value;

if (!name){

                document.getElementById('name_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Name cannot be empty";

        }

if (name){
	let name = document.querySelector('#name').value;
	localStorage.setItem('name', name);
	document.getElementById('name_error').innerHTML = '';
}

//Validate email
        let email = document.querySelector('#email').value; 
	if (!email.includes('@')){

                document.getElementById('email_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Please enter a valid email address";

        } else {
		let email = document.querySelector('#email').value;
        	localStorage.setItem('email', email);
		document.getElementById('email_error').innerHTML = '';
	}
}

logout = document.getElementById('logout');

logout.addEventListener('click', handleLogoutClick);

function handleLogoutClick(){

localStorage.removeItem('name');
localStorage.removeItem('email');
localStorage.removeItem('password');

	const myTimeout = setTimeout(delay, 3000);
	document.getElementById('logout_success').innerHTML = "<br /><span id='logout_success_message'>Logout was successfull.</span>";
	function delay(){
	window.location.href = '/Components/loginForm.html';
	}
}
