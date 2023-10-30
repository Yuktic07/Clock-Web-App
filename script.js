// ----- Stopwatch -----
$(".stopwatch-btn").click(function(){
    //hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    //show stopwatch wrapper
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

// ----- back button -----

$(".back-btn").click(function(){
    //hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    //show clock wrapper
    $(".clock").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

// ----- timer -----

$(".timer-btn").click(function(){
    //hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    //show clock wrapper
    $(".timer").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

// ----- alarm -----

$(".alarm-btn").click(function(){
  //hide all other wrappers
  $(".outer-wrapper > div").slideUp();
  //show clock wrapper
  $(".mainAlarm").slideDown();
  //update type text
  $(".type").html("Stopwatch");
});

// ----- world clock -----

$(".wc-btn").click(function(){
  //hide all other wrappers
  $(".outer-wrapper > div").slideUp();
  //show clock wrapper
  $(".wc").slideDown();
  //update type text
  $(".type").html("Stopwatch");
});

//-----CLOCK-----

function addTrailingZero(number) {
    return number < 10 ? "0" + number : number;
  }

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";
  
    // converting 24 hour to 12 hour
    hours = hours % 12 || 12;

    // add trailing zeros if less than 10 
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);
  
    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
  };
  
  // call the function on page load
  updateTime();

  //call the function after every second
  setInterval(updateTime, 1000);
  
  //-----STOPWATCH-----

  let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;
  
  const stopwatch = () => {
    //increase milisecond by one
    stopwatchMiliSeconds++;

    if (stopwatchMiliSeconds === 100) {
      //if stopwatch mililsecond equals to 100 increase one second and set ms to 0
      stopwatchMiliSeconds = 0;
      stopwatchSeconds++;
    }
    if (stopwatchSeconds === 60) {
      // same with minutes
      stopwatchSeconds = 0;
      stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
      //same with hours
      stopwatchMinutes = 0;
      stopwatchHours++;
    }
  
    //show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
  };
  
  //function to start stopwatch
  function startStopwatch() {
    if (!stopwatchRunning) {
      //if stopwatch not already running  
      stopwatchInterval = setInterval(stopwatch, 10);
      stopwatchRunning = true;
    }
  };

  //reset stopwatch function
  const resetStopwatch = () => {
    //clear interval and set all values to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,

    //update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
  }
  
  //function to stop stopwatch
  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
  }
  
  // start stopwatch on start button
  $(".start-stopwatch").click(function () {
    startStopwatch();
    //hide start button show lap button 
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
  });

//reset stopwatch on start button
$(".reset-stopwatch").click(function () {
    resetStopwatch();
    //hide lap button show start button 
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
  });

$(".lap-stopwatch").click(function(){
    //on lap button click
    laps++;
    //remove active class
    $(".lap").removeClass("active");
    $(".laps").prepend(
        `<div class="lap active">
            <p>Lap ${laps}</p>
            <p>${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)}</p>
        </div>
        `
    );
});

//-----TIMER-----

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");
    //convert time to seconds
    time = time * 60;
    //update timer defaults
    setTime();
    if (isNaN(time)){
        alert("Enter numbers only");
        resetTimer();
    }
};

const setTime = () => {
    timerHours = Math.floor((time / 3600) % 60);
    timerMinutes = Math.floor((time /60 ) % 60 );
    timerSeconds = Math.floor(time % 60);

    //show user entered time on document
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
}

const timer = () => {
    timerMiliseconds--;
    if(timerMiliseconds === -1) {
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if(timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
    }
    if(timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
    }

    //update time
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

    //check time up on every interval
    timeUp();
};

const startTimer = () => {
    //before staring checkif valid time given
    if(
        (timerHours === 0) && (timerMinutes === 0) && (timerSeconds === 0) && (timerMiliseconds === 0)
    ) {
        //if all values are zero get time
        getTime();
    }
    else{
        //start timer
        timerInterval=setInterval(timer,10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
} 

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};

const timeUp = () => {
    if((timerHours === 0) && 
        (timerMinutes === 0) && 
        (timerSeconds === 0) && 
        (timerMiliseconds === 0)
        ){
            resetTimer();
            alert("Time's Up");
        }
}

$(".start-timer").click(function() {
    startTimer();
});

$(".stop-timer").click(function() {
    stopTimer();
});
  
$(".reset-timer").click(function() {
    resetTimer();
});

// ----- ALARM -----

//Initial References
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("./alarm.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display Time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  //Display time
  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
  if ((hourInput.value >=23) && (hourInput.value <=0)){
    alert("Invalid hours input")
  }
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Create alarm div

const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

//Set Alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  if ((hourInput.value > 23) || (hourInput.value < 0) || (minuteInput.value > 59) || (minuteInput.value <0)){
    alert("Invalid input");
  }
  else{
    console.log(alarmObj);
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
  }
});

//Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

//Stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};

// ----- WORLD CLOCK -----
function showTime() {
  var timezone = document.getElementById("timezone").value;
  var currentTime = moment().tz(timezone).format('MMMM Do YYYY, h:mm:ss a');

  document.getElementById("current-time").textContent = "Current time: " + currentTime;
}

// Fill the dropdown with all timezones
function showTime() {
  var timezone = document.getElementById("timezone").value;
  var currentTime = moment().tz(timezone).format('MMMM Do YYYY, h:mm:ss a');

  document.getElementById("current-time").textContent = "Current time: " + currentTime;
}

// Fill the dropdown with all timezones
var select = document.getElementById("timezone");
var timezones = moment.tz.names();

timezones.sort().forEach(function(timezone) {
  var option = document.createElement("option");
  option.text = timezone;
  option.value = timezone;
  select.appendChild(option);
});