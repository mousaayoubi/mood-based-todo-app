// ---------- ACCOUNT HANDLING ----------
const name = localStorage.getItem('name');
document.getElementById('account').innerHTML = name || 'Guest';

document.getElementById("login_message").innerHTML = `
    <h5 class='login_message'>Login Successful</h5>
    <br />
    <h6 class='login_message'>You have been successfully logged in.</h6>
`;

document.getElementById('account_login').addEventListener('click', () => {
    window.location.href = name ? "/Components/editProfile.html" : "/Components/loginForm.html";
});

// ---------- TASK HANDLING ----------
const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

// Hide all task cards initially
for (let i = 1; i <= 3; i++) {
    document.getElementById(`task_name_border${i}`).style.visibility = 'hidden';
}

// Show existing tasks and attach event listeners
Object.keys(tasks).forEach(key => {
    const task = tasks[key];
    const card = document.getElementById(`task_name_border${key}`);
    card.style.visibility = 'visible';

    // Populate task info
    document.getElementById(`task_name${key}`).innerHTML = task.taskName;
    document.getElementById(`task_duration${key}`).innerHTML = task.taskDuration;
    document.getElementById(`task_time${key}`).innerHTML = task.taskTime;

    // Mark task complete
    document.getElementById(`check_mark${key}`).addEventListener('click', (e) => {
        e.stopPropagation();
        task.taskStatus = 'Complete';
        localStorage.setItem('tasks', JSON.stringify(tasks));

        document.getElementById(`task_name${key}`).style.textDecoration = 'line-through';
        document.getElementById(`task_duration${key}`).style.textDecoration = 'line-through';
        document.getElementById(`task_time${key}`).style.textDecoration = 'line-through';
    });

    // Navigate to edit page when card is clicked
    card.addEventListener('click', () => {
        window.location.href = `/Components/editTask.html?param1=${key}`;
    });

    // Delete button handling (assuming a delete button inside the card)
    const deleteBtn = document.getElementById(`delete_bin${key}`);
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent navigating to edit page
            delete tasks[key];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            card.style.visibility = 'hidden';
            document.getElementById('task_delete_message').innerHTML = 'Successfully deleted task card.';
        });
	    setTimeout(() => {
 		document.getElementById('task_delete_message').innerHTML = '';
	    }, 2000);
    }

    // Strike-through completed tasks on load
    if (task.taskStatus === 'Complete') {
        document.getElementById(`task_name${key}`).style.textDecoration = 'line-through';
        document.getElementById(`task_duration${key}`).style.textDecoration = 'line-through';
        document.getElementById(`task_time${key}`).style.textDecoration = 'line-through';
    }
});
