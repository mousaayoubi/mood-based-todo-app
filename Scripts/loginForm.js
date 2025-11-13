const loginButton = document.getElementById("login");


function handleClick(){

	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	//Validate email
	if (!email.includes('@')){

		document.getElementById('email_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Please enter a valid email address";

	}

	//validate password
	if (password.length < 8){

		document.getElementById('password_error').innerHTML = "<img src='/Assets/Images/warning_icon.png' alt='warning icon' width='15' height='15' /> Password must be at least 8 characters long";

	}
	// Save to localstorage
	localStorage.setItem("name", name);
	localStorage.setItem("email", email);
	localStorage.setItem("password", password);

	//if lgon successful Redirect to homepage
        if (email.includes('@') && password.length > 8){
	window.location.href="/";

	}

	console.log('test');
	document.getElementById('account').innerHTML = localStorage.getItem('name');

}

loginButton.addEventListener('click', handleClick);
