/* -------------------------------------------------------------
   ELEMENTS
------------------------------------------------------------- */
const slider = document.getElementById("moodSlider");

const faces = [
    document.getElementById("face1"), // Sad
    document.getElementById("face2"), // Neutral
    document.getElementById("face3")  // Happy
];


/* -------------------------------------------------------------
   INITIAL MOOD SETUP
------------------------------------------------------------- */

// Default mood = 2 (neutral)
if (!localStorage.getItem("mood")) {
    localStorage.setItem("mood", "2");
}

slider.value = localStorage.getItem("mood");


/* -------------------------------------------------------------
   UPDATE UI BASED ON SLIDER VALUE
------------------------------------------------------------- */
function updateMoodUI() {
    const value = parseInt(slider.value);

    // Update face highlight
    faces.forEach(face => face.classList.remove("selected"));
    faces[value - 1].classList.add("selected");

    // Update slider gradient
    const percent = ((value - 1) / 2) * 100;
    slider.style.background =
        `linear-gradient(to right, #9dfe00 ${percent}%, #2e323d ${percent}%)`;

    // Save mood to localStorage
    localStorage.setItem("mood", value.toString());
}


/* -------------------------------------------------------------
   SLIDER → FACE SYNC
------------------------------------------------------------- */
slider.addEventListener("input", updateMoodUI);


/* -------------------------------------------------------------
   FACE CLICK → SLIDER SYNC
------------------------------------------------------------- */
faces.forEach((face, index) => {
    face.addEventListener("click", () => {
        slider.value = index + 1;
        updateMoodUI();
    });
});


/* -------------------------------------------------------------
   RUN ON LOAD
------------------------------------------------------------- */
updateMoodUI();
