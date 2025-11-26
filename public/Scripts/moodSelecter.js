const moodSelector = document.getElementById('mood_selector');
const moodImage = document.getElementById('mood_selector_image');

moodSelector.addEventListener('click', handleClick);

function handleClick(event) {
    if (!event.target.id) return;

    // Update image and save mood
    switch (event.target.id) {
        case 'mood1': // Sad
            moodImage.src = '../Assets/Images/mood-selector1.png';
            localStorage.setItem('mood', 'mood1');
            break;
        case 'mood2': // Neutral
            moodImage.src = '../Assets/Images/mood-selector2.png';
            localStorage.setItem('mood', 'mood2');
            break;
        case 'mood3': // Happy
            moodImage.src = '../Assets/Images/mood-selector3.png';
            localStorage.setItem('mood', 'mood3');
            break;
        default:
            return; // ignore other clicks
    }

    // Update suggested tasks on index.html dynamically
    if (window.updateSuggestedTasks) {
        window.updateSuggestedTasks();
    }
}

// ---------------------- Initialize mood image ----------------------
const currentMood = localStorage.getItem('mood') || 'mood2';

switch (currentMood) {
    case 'mood1': // Sad
        moodImage.src = '../Assets/Images/mood-selector1.png';
        break;
    case 'mood2': // Neutral (default)
        moodImage.src = '../Assets/Images/mood-selector2.png';
        break;
    case 'mood3': // Happy
        moodImage.src = '../Assets/Images/mood-selector3.png';
        break;
}
