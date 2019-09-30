/*
    *Make references to the HTML elements that we want to interact with through JS 
    * Add in the abilty to add a new list item
    * Add in the ability to remove a list item
    * Add in the ability to mark a list as done
*/

var submitButton = document.getElementById("submit");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul"); //querySelector gets the first instance of a particular element type. Since we only have one ul, this will create a reference to that ul.

function createListElement() {
    //Create a new li element 
    var li = document.createElement("li");
    //Add content to it
    li.innerHTML =  input.value;
    //Add it to our ul
    ul.appendChild(li);
    //Clear out the text input after we create our new list item
    input.value = "";


    //Function to handle showing a list item as complete 
    function markDone() {
        //If the li does not have a class "done" applied to it, it will be applied. If it does, it will taken off 
        li.classList.toggle("done");
    }

    li.addEventListener("click", markDone);

    //Create the delete buttom that will be add to our list item
     var deleteButton = document.createElement("button");
     //Give the button the text of X
     deleteButton.innerText = "X";
     //Add the button as a child of the li
    li.appendChild(deleteButton);

    //Function will be called whenever the delete button is clicked 
    function deleteListItem() {
        //Add the delete class to the list item
        li.classList.add("delete");
    }

    deleteButton.addEventListener("click", deleteListItem);
}

//This is going to be use to create a list element when the submit button is tapped
function createListItemSubmitButton() {
    //Check to make sure our input actually has some text. An empty string will have length of 0
    if(input.value.length > 0){
    createListElement();
    }
}

//This is going to be used to create a list element when the enter key is pressed
function creatListItemEnterKey(event) {
    console.log(event.keyCode);

    //Create a new list item if there text in the input field and the enter key is pressed
    if(input.value.length > 0 && event.keyCode === 13) {
        createListElement();
    }
}

//Make it so that the submit button is clicked, the createListItemSubmitButton function is called
submitButton.addEventListener("click", createListItemSubmitButton);

//This event listener will detect when keys are pressed while the input is active
input.addEventListener("keypress", creatListItemEnterKey);