const loginButton = document.getElementById("login");

function handleClick() {

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Reset errors
    document.getElementById('email_error').innerHTML = "";
    document.getElementById('password_error').innerHTML = "";

    let valid = true;

    // Validate email
    if (!email.includes('@')) {
        document.getElementById('email_error').innerHTML =
            "<img src='/Assets/Images/warning_icon.png' width='15' height='15' /> Please enter a valid email address.";
        valid = false;
    }

    // Validate password
    if (password.length < 8) {
        document.getElementById('password_error').innerHTML =
            "<img src='/Assets/Images/warning_icon.png' width='15' height='15' /> Password must be at least 8 characters long.";
        valid = false;
    }

    // Stop if invalid
    if (!valid) return;

    // Save to localStorage only when valid
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Redirect to home
    window.location.href = "/";
}

loginButton.addEventListener("click", handleClick);
