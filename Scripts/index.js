
//Check if name is stored
const name = localStorage.getItem('name');

if (name){
document.getElementById('account').innerHTML = name;
}

document.getElementById("login_message").innerHTML = "<h5 class='login_message'>Login Successful</h5><br /><h6 class='login_message'>You have been successfully logged in.</h6>";
