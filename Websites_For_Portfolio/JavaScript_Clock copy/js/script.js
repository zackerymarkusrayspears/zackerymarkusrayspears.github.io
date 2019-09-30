//We need a way to get the current time and have that be updated each second.

//To do this, we are going to create a function that contains a timer to call itself again each second.

function showTime() {
    var date = new Date(); //This gets us the current date and time 

    var hour = date.getHours(); // 0 - 23
    var minute = date.getMinutes(); // 0 - 59
    var seconds = date.getSeconds(); // 0 - 59 
    var period = "AM"; //We're are going to assume that we're in AM to start

    //We need to make sure the hour is properly represented in 12-hr time, and we also need to determine whether we shoul display AM or PM

    //With our hours being between 0 and 23, 0 would equal 12AM and anything 12 or above is a PM hour

   if (hour === 0) {
       period = "am";
   } else if (hour >= 12) {
       period = "PM";
   }
    
    if (hour === 0) {
        hour = 12; //If hour equals 0, change it 0
    }

    if (hour > 12) {
        hour = hour - 12; //If hour is greater than 12, subtract 12 from is - 13 === 1
        period = "PM";
    }

    hour = (hour < 10) ? ("0" + hour) : hour; //If hour is less than 10, set hour equal to 0 plus the value of hour
    minute = (minute < 10) ? ("0" + minute) : minute; 
    seconds = (seconds < 10) ? ("0" + seconds) : seconds;

    //String to store the current time
    var time = hour + ":" + minute + ":" + seconds + " " + period;
    
    document.getElementById("clockDisplay").innerText = time;

    setTimeout(showTime, 1000); //Schedule the showTime function to be called after 1000 ms (1 second)
}

showTime();

function currentDate() {
    var date = new Date();

    var numDay = date.getDate();
    
    
    
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[date.getDay()];

    var year = new Array(11);
    year[0] = "January";
    year[1] = "February";
    year[2] = "March";
    year[3] = "April";
    year[4] = "May";
    year[5] = "June";
    year[6] = "July";
    year[7] = "August";
    year[8] = "September";
    year[9] = "October";
    year[10] = "November";
    year[11] = "December";

    var m =year[date.getMonth()];

    var dateMonth = n + ", " + m + " " + numDay;

    document.getElementById("dayMonth").innerText = dateMonth;
    
}

currentDate();