function calculateTip() {
    //Get the values the user inputs (bill amount, service quality, number of people spliting the bil)
   var billAmount = document.getElementById("billAmt").value;
    console.log(billAmount);
    
    var serviceQuality = document.getElementById("serviceQual").value;
    console.log(serviceQuality);

    var numberOfPeople = document.getElementById("numPeople").value;
    console.log(numberOfPeople);
    
    //Validate their input (to make sure what they input is usable)
    
    //Bill Amount - Words, Negative values, Empty String

    var amount = Number(billAmount); ///Try to turn the value of billAmount into a number

    if(isNaN(amount) || amount <=0 || amount >= 10000) {
        //If amount can't be converted into a number or is less than or equal to 0 show an error 
        alert("Invalid input for bill amount.");
        return; //Return to exit the function if the bill amount is invalid
    }
    
    //If we make it here the amount is good 

    //Servive Selector - Not choosing an Optiom

    var service = Number(serviceQuality); //Convert serviceQuality into a number

    if (service === 0) {
        alert("You must pick an option for service quality");
        return;
    }

    //Number of people - Words, Negative Values, Empty String, Decimal Values

    var people = Number(numberOfPeople);

    if(isNaN(people) || people < 1) {
        alert("Invalid amount of people")
        return;
    }
    
    //Calulate the amount of tip each person needs to pay
    var tipPerPerson = (amount * service) / people;

    tipPerPerson = tipPerPerson.toFixed(2); //Round the tip per person to 2 decimal points


    //Display that information to the user 
    
    document.getElementById("tipAmount").style.display = "block"; //Display the hidden tipAmount div when we're ready to show the calculated tip
    document.getElementById("tip").innerText = tipPerPerson;

    var priceAmount = amount /people;
    var priceAmount = priceAmount.toFixed(2);
    
    document.getElementById("perPrice").style.display ="block";
    document.getElementById("noTip").innerText = priceAmount;

    var amountPerson = amount /people + Number(tipPerPerson);
    var amountPerson = amountPerson.toFixed(2);
    
    document.getElementById("price").style.display = "block";
    document.getElementById("tip").innertext = tipPerPerson;
    document.getElementById("overal").innerText = amountPerson;

}

function reset() {
    document.getElementById("billAmt").value= "";
    document.getElementById("serviceQual").value = "0";
    document.getElementById("numPeople").value = "";
    document.getElementById("tipAmount").style.display = "none";
    document.getElementById("perPrice").style.display = "none";
    document.getElementById("price").style.display = "none";
}

reset();
//Function that is executed when the button is clicked
//We are passing an anonymous function (a function without a name to the button's onclick handler when it's clicked)
document.getElementById("calculateTip").onclick = function() {
    calculateTip();
}
document.getElementById("reset").onclick =function() {
    reset();
}