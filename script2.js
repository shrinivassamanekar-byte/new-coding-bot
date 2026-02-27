// ================================
// SUPER TRAVELS FINAL SCRIPT
// ================================



// BUILT-IN BUS DATABASE

const busDatabase = {

"KA-01-1234":{

driver:"Shri",

route:"Bangalore → Mysore",

distance:150,

scheduled:"08:00"

},

"KA-02-5678":{

driver:"Vinay",

route:"Bangalore → Chennai",

distance:350,

scheduled:"09:30"

},

"KA-03-4321":{

driver:"Ashit",

route:"Bangalore → Hubli",

distance:410,

scheduled:"07:45"

},

"KA-04-8765":{

driver:"Arun",

route:"Bangalore → Hyderabad",

distance:570,

scheduled:"06:30"

},

"KA-05-98765":{

    driver:"Sumit",

    route:"Banglore → Chennai",

    distance:450,

    scheduled:"06:45"
},
"KA-06-1234":{

    driver:"KIRAN",

    route:"Banglore → Pune",

    distance:450,

    scheduled:"07:00"
},
"KA-07-1234":{

    driver:"Tejas",

    route:"Banglore → Kohlapur",

    distance:250,

    scheduled:"08:20"
},
"KA-08-1234":{

    driver:"Adarsh",

    route:"Banglore → goa",

    distance:550,

    scheduled:"02:30"
},
"KA-09-1234":{

    driver:"OM",

    route:"Banglore → Haveri",

    distance:180,

    scheduled:"09:05"
},
"KA-10-1234":{

    driver:"Nikhil",

    route:"Banglore → Davangere",

    distance:350,

    scheduled:"11:45"
},

};



// ==================================
// AUTO FILL BUS DETAILS
// ==================================

document.getElementById("busNo").addEventListener("change",function(){

let bus=this.value;

document.getElementById("driver").value=

busDatabase[bus].driver;


document.getElementById("route").value=

busDatabase[bus].route;


document.getElementById("scheduled").value=

busDatabase[bus].scheduled;

});




// ==================================
// SAVE DELAY DATA
// ==================================

function saveData(){

let bus=document.getElementById("busNo").value;

let driver=document.getElementById("driver").value;

let route=document.getElementById("route").value;

let scheduled=document.getElementById("scheduled").value;

let actual=document.getElementById("actual").value;

let reason=document.getElementById("reason").value;



let delayMinutes=calculateDelayMinutes(scheduled,actual);

let status=getDelayStatus(delayMinutes);

let cause=attributeCause(delayMinutes,reason);



let data={

bus,

driver,

route,

delay:delayMinutes+" min",

status,

cause

};



// SAVE LOCAL STORAGE

let records=

JSON.parse(localStorage.getItem("delay"))||[];

records.push(data);

localStorage.setItem("delay",JSON.stringify(records));



showData();

updateDashboard();


alert("Delay Saved Successfully");

}



// ==================================
// CALCULATE DELAY
// ==================================

function calculateDelayMinutes(s,a){

let sTime=new Date("2020-01-01 "+s);

let aTime=new Date("2020-01-01 "+a);

let diff=(aTime-sTime)/60000;

return Math.max(diff,0);

}



// ==================================
// DELAY STATUS
// ==================================

function getDelayStatus(delay){

if(delay==0)

return "On Time 🟢";


else if(delay<=10)

return "Minor Delay 🟡";


else

return "Major Delay 🔴";

}



// ==================================
// DELAY ATTRIBUTION SYSTEM
// ==================================

function attributeCause(delay,reason){

if(delay<=5)

return "Operational Variation";


if(reason=="Traffic")

return "Road Traffic Congestion";


if(reason=="Breakdown")

return "Mechanical Failure";


if(reason=="Weather")

return "Weather Impact";


return "Operational Issue";

}



// ==================================
// SHOW TABLE DATA
// ==================================

function showData(){

let records=

JSON.parse(localStorage.getItem("delay"))||[];

let table="";


records.forEach(function(r){

table+=`

<tr>

<td>${r.bus}</td>

<td>${r.driver}</td>

<td>${r.route}</td>

<td>${r.delay}</td>

<td>${r.status}</td>

<td>${r.cause}</td>

</tr>

`;

});


document.getElementById("tableData").innerHTML=table;

}



// ==================================
// UPDATE DASHBOARD
// ==================================

function updateDashboard(){

let records=

JSON.parse(localStorage.getItem("delay"))||[];

let delayed=records.length;

let total=4;

let ontime=total-delayed;


document.getElementById("delayedBus").innerText=

delayed;


document.getElementById("onTimeBus").innerText=

ontime;

}



// ==================================
// LIVE CLOCK
// ==================================

function clock(){

document.getElementById("clock").innerHTML=

new Date().toLocaleTimeString();

}

setInterval(clock,1000);



// ==================================
// LIVE DELAY PREDICTION SYSTEM
// ==================================

function predictDelay(){

let bus=document.getElementById("busNo").value;

let distance=busDatabase[bus].distance;

let hour=new Date().getHours();


let predictedDelay=0;

let cause="Normal Operation";

let risk="LOW 🟢";



// Prediction Logic

if(distance>400){

predictedDelay+=15;

cause="Long Distance Delay";

}


if(hour>=9 && hour<=11){

predictedDelay+=10;

cause="Morning Traffic";

}


if(hour>=17 && hour<=20){

predictedDelay+=12;

cause="Evening Traffic";

}



// Risk

if(predictedDelay>20)

risk="HIGH 🔴";


else if(predictedDelay>10)

risk="MEDIUM 🟡";



// SHOW RESULT

document.getElementById("prediction").innerHTML=

`

Predicted Delay: ${predictedDelay} min<br>

Predicted Cause: ${cause}<br>

Risk Level: ${risk}

`;

}



// ==================================
// LOAD DATA ON START
// ==================================

showData();

updateDashboard();

// CLEAR ALL RECORDS FUNCTION

function clearRecords(){

let confirmClear=

confirm("Are you sure you want to clear all delay records?");


if(confirmClear){

localStorage.removeItem("delay");


showData();

updateDashboard();


alert("All Records Cleared Successfully");

}

}