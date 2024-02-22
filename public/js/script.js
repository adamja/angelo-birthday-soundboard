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


// let counters = {
//     plateSound: 0,
//     opaSound: 0,
//     kazooSound: 0,
//     hornSound: 0,
// };

// document.querySelectorAll('.soundButton').forEach(button => {
//     button.addEventListener('click', function() {
//         let soundId = this.getAttribute('data-sound');
//         playSound(soundId);
//     });
// });

// document.getElementById('stopButton').addEventListener('click', stopAllSounds);

// function playSound(soundId) {
//     stopAllSounds();
//     let sound = document.getElementById(soundId);
//     sound.play();
//     counters[soundId]++;
//     updateCounters();
//     updateIndicator(soundId);
// }

// function stopAllSounds() {
//     document.querySelectorAll('audio').forEach(audio => {
//         audio.pause();
//         audio.currentTime = 0;
//     });
//     updateIndicator();
// }

// function updateCounters() {
//     for (let soundId in counters) {
//         let counterId = soundId.replace('Sound', '') + 'Counter';
//         document.getElementById(counterId).textContent = counterId.replace('Counter', '') + ': ' + counters[soundId];
//     }
// }

// function updateIndicator(soundId = '') {
//     let indicator = document.getElementById('playingIndicator');
//     if (soundId) {
//         let sound = document.getElementById(soundId);
//         sound.ontimeupdate = () => {
//             let currentTime = formatTime(sound.currentTime);
//             let duration = formatTime(sound.duration);
//             indicator.textContent = currentTime + " / " + duration;
//         };
//     } else {
//         indicator.textContent = "00:00 / 00:00";
//     }
// }

// function formatTime(seconds) {
//     let minutes = Math.floor(seconds / 60);
//     seconds = Math.floor(seconds % 60);
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;
//     return minutes + ":" + seconds;
// }

// let platesSmashed = 0;
// let opaCount = 0;
// let kazooCount = 0;
// let hornCount = 0;

// function stopAndPlay(newSound, otherSound, updateCount) {
//     if (!newSound.paused) {
//         newSound.currentTime = 0;
//     }
//     otherSound.pause();
//     otherSound.currentTime = 0;
//     newSound.play();
//     updateCount();
// }

// document.getElementById('soundButton').addEventListener('click', function() {
//     var sound = document.getElementById('plateSound');
//     if (!sound.paused) {
//         sound.currentTime = 0;
//     }
//     sound.play();
//     updateIndicator();
// });

// document.getElementById('stopButton').addEventListener('click', function() {
//     var sound = document.getElementById('plateSound');
//     sound.pause();
//     sound.currentTime = 0;
//     updateIndicator();
// });

// var sound = document.getElementById('plateSound');
// sound.ontimeupdate = function() { updateIndicator(); };

// function updateIndicator() {
//     var sound = document.getElementById('plateSound');
//     var indicator = document.getElementById('playingIndicator');
//     var currentTime = formatTime(sound.currentTime);
//     var duration = formatTime(sound.duration);
//     indicator.textContent = currentTime + " / " + duration;
// }

// function formatTime(seconds) {
//     var minutes = Math.floor(seconds / 60);
//     seconds = Math.floor(seconds % 60);
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;
//     return minutes + ":" + seconds;
// }


// document.getElementById('soundButton').addEventListener('click', function() {
//     stopAndPlay(document.getElementById('plateSound'), document.getElementById('opaSound'), updatePlateCounter);
//     updateIndicator('playingIndicator', 'plateSound');
// });

// document.getElementById('soundButton2').addEventListener('click', function() {
//     stopAndPlay(document.getElementById('opaSound'), document.getElementById('plateSound'), updateOpaCounter);
//     updateIndicator('playingIndicator2', 'opaSound');
// });

// document.getElementById('soundButton3').addEventListener('click', function() {
//     stopAndPlay(document.getElementById('kazooSound'), document.getElementById('kazooSound'), updateKazooCounter);
//     updateIndicator('playingIndicator3', 'kazooSound');
// });

// document.getElementById('soundButton4').addEventListener('click', function() {
//     stopAndPlay(document.getElementById('hornSound'), document.getElementById('hornSound'), updateHornCounter);
//     updateIndicator('playingIndicator4', 'hornSound');
// });


// function updatePlateCounter() {
//     platesSmashed++;
//     document.getElementById('platesSmashedCounter').textContent = "Plates Smashed: " + platesSmashed;
// }

// function updateOpaCounter() {
//     opaCount++;
//     document.getElementById('opasCounter').textContent = "Opa Count: " + opaCount;
// }

// function updateKazooCounter() {
//     kazooCount++;
//     document.getElementById('kazooCounter').textContent = "Kazoos: " + kazooCount;
// }

// function updateHornCounter() {
//     hornCount++;
//     document.getElementById('hornCounter').textContent = "Horns Blown: " + hornCount;
// }