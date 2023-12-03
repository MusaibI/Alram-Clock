//OnChange of clock inputs
function validateInput(input) {
    const value = parseInt(input.value);
    const min = parseInt(input.min);
    const max = parseInt(input.max);

    if (isNaN(value) || value < min || value > max) {
        input.value = Math.min(Math.max(value, min), max); // Set value to the nearest range limit
    }
}

//setting of alarm
function setAlarm() {
    const alarmHoursInput = document.getElementById('alarmHours');
    const alarmMinutesInput = document.getElementById('alarmMinutes');
    const alarmSecondsInput = document.getElementById('alarmSeconds');
    const ampm = document.getElementById('ampm').value;

    const alarmHours = alarmHoursInput.value;
    const alarmMinutes = alarmMinutesInput.value;
    const alarmSeconds = alarmSecondsInput.value;

    if (alarmHours === '' || alarmMinutes === '' || alarmSeconds === '') {
        alert('Please fill in all fields to set the alarm.');
        return;
    }

    const alarmTime = `${alarmHours < 10 ? "0" + alarmHours : alarmHours}:${alarmMinutes < 10 ? "0" + alarmMinutes : alarmMinutes}:${alarmSeconds < 10 ? "0" + alarmSeconds : alarmSeconds} ${ampm}`;

    const alarmItem = document.createElement('li');
    const alarmDiv = document.createElement('div');
    alarmDiv.classList.add("alarm-list-div");
    alarmDiv.textContent = alarmTime;

    // Adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete");
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        alarmItem.remove();
    };

    // Appending both div and delete button to the li parent element
    alarmItem.append(alarmDiv, deleteButton);
    document.getElementById('alarmsList').appendChild(alarmItem);

    // Clearing the input fields
    alarmHoursInput.value = "";
    alarmMinutesInput.value = "";
    alarmSecondsInput.value = "";
}


//SetInterval to show clock and refresh it every 1 Sec.
setInterval(() => {
    let date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    ampm = "AM";

    if (hours > 12) {  // Validating hours to work like 12hours clock
        hours = hours - 12;
        ampm = "PM"
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let clock = document.querySelector(".show-clock");
    clock.innerHTML = `${hours} : ${minutes} : ${seconds} ${ampm}`
}, 1000);


function checkAlarms() {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    const currentTimeString = `${currentHours - 12 < 10 ? "0" + currentHours - 12 : currentHours - 12}:${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds} ${currentHours >= 12 ? 'PM' : 'AM'}`;

    const alarms = document.querySelectorAll(".alarm-list-div");
    // console.log(alarms)
    for (let i = 0; i < alarms.length; i++) {
        const alarmTime = alarms[i].textContent;

        console.log(alarms[i].textContent, currentTimeString);
        // console.log(typeof (currentTimeString), typeof (alarmTime))
        if (currentTimeString == alarmTime) {
            alert('Alarm! ' + alarmTime);
            alarms[i].parentElement.remove();
            break;
        }
    }
}

// Check alarms every second
setInterval(checkAlarms, 1000);