
const moodSelector = document.getElementById('mood_selector');

moodSelector.addEventListener('click', handleClick);

function handleClick(){
	const mood1 = document.getElementById('mood1');
	const mood2 = document.getElementById('mood2');
	const mood3 = document.getElementById('mood3');

	const moodImage = document.getElementById('mood_selector_image');

	if (event.target.id === 'mood1'){
		moodImage.src = '../Assets/Images/mood-selector1.png';
	}
	if (event.target.id === 'mood2'){
		 moodImage.src = '../Assets/Images/mood-selector2.png';
	}
	if (event.target.id === 'mood3'){
		 moodImage.src = '../Assets/Images/mood-selector3.png';
	}
}
