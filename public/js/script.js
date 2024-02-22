// Load counts from Local Storage or initialize if not present
let counters = JSON.parse(localStorage.getItem('counters')) || {
    plateSound: 0,
    opaSound: 0,
    kazooSound: 0,
    hornSound: 0,
};

let currentSound = null; // Global variable to keep track of the currently playing sound

// Update counters on the page initially
updateCounters();

document.querySelectorAll('.soundButton').forEach(button => {
    button.addEventListener('click', function() {
        let soundId = this.getAttribute('data-sound');
        playSound(soundId);
        // incrementCounter(soundId);
    });
});

document.getElementById('stopButton').addEventListener('click', stopAllSounds);

function playSound(soundId) {
    try {
        stopAllSounds();
        console.log("Play sound", soundId);

        if (soundId === 'opaSound') {
            // Define the list of opa sound files
            const opaSoundFiles = [
                'opa_aj.m4a',
                'opa_ap.m4a',
                'opa_mj.mp4',
                'opa_jd.opus',
                'opa_cc.m4a',
                'opa_lb.mp4',
                'opa_td.mp4',
                'opa_bd.m4a',
                'opa_mg.mp4',
                'opa_np.m4a',
                'opa_vs.mp4',
            ];

            // Randomly select from the opaSoundFiles array
            let randomIndex = Math.floor(Math.random() * opaSoundFiles.length);
            let opaFileName = opaSoundFiles[randomIndex];
            console.log("Playing opa sound file:", opaFileName); // Log the chosen file name
            currentSound  = new Audio(`public/audio/${opaFileName}`);
        } else {
            currentSound = document.getElementById(soundId);
        }

        currentSound .play();
        updateIndicator(soundId);
        counters[soundId]++;
        updateCounters();
        localStorage.setItem('counters', JSON.stringify(counters));
    } catch (error) {
        console.error("Error playing sound: ", error);
        // Optionally, handle the error more gracefully here
    }
}

function stopAllSounds() {
    console.log("Stop all sounds");
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }
    updateIndicator();
}

function updateCounters() {
    console.log("Update counters");
    document.getElementById('platesSmashedCounter').textContent = "Plates Smashed: " + counters['plateSound'];
    document.getElementById('opasCounter').textContent = "Opas: " + counters['opaSound'];
    document.getElementById('kazooCounter').textContent = "Kazoos: " + counters['kazooSound'];
    document.getElementById('hornCounter').textContent = "Horns: " + counters['hornSound'];
}

function updateIndicator(soundId = '') {
    console.log('Update indicator', soundId);
    try {
        let indicator = document.getElementById('playingIndicator');
        if (soundId) {
            let sound = document.getElementById(soundId);
            sound.ontimeupdate = () => {
                let currentTime = formatTime(sound.currentTime);
                let duration = formatTime(sound.duration);
                indicator.textContent = currentTime + " / " + duration;
            };
        } else {
            indicator.textContent = "00:00 / 00:00";
        }
    } catch (error) {
        console.error("Error updating indicator: ", error);
        // Optionally, handle the error more gracefully here
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
