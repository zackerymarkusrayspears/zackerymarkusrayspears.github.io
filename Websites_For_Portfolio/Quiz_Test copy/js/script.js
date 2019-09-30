/*
    This is a IIFE - Immediatly Invoked Function Expression.
    IIFEs run as soon as they are defined. IFFEs are commonly used to keep variables/functions outside of the gloobal scope and they tend to work better if you're running multiple scripts.
*/

//This variable exist in teh global scope, which means it's less secure and can be accessed by anything 
var global;

(function() {

    //Because thus variable is inside of an IIFE, it is not in the global scope
    var variable = 10;

    //Make references to our elements that we're going to interact with
    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");
    var resetButton = document.getElementById("reset");

    var myQuestions = [];

    //What does a quiz question consist of?
    //Question Text, Answer Choices, Correct Answer

    var question1 = {
        question: "What color is the sky?",
        answer: {
            a: "Blue",
            b: "Green",
            c: "Red"
        },
        correctAnswer: "a"
    };

    console.log(question1.question); //Get the question text
    console.log(question1.answer.b); //Get answer b

    var question2 = {
        question: "What Pokemon is from Generation 3?",
        answer: {
            a: "Pikachu",
            b: "Froakie",
            c: "Mudkip"
        },
        correctAnswer: "c"
    };
    
    var question3 = {
        question: "What anime is a Shonen Jump?",
        answer: {
            a: "My Hero Academia",
            b: "Newgame!",
            c: "Ace of Diamond"
        },
        correctAnswer: "a"
    };

    //Add the question objects to our array of questions
    myQuestions.push(question1, question2, question3);
    
    //Function to build a quiz that goes through our question objects and generates HTML for each question
    function buildQuiz() {
        //We need to go through each of our question objects and use them to build out the HTML to show a question

        for(var i = 0; i < myQuestions.length; i++) {

            //Creating a new div called questionDiv that will hodl information about a single question
            var questionDiv = document.createElement("div");
            

            //Get the question text from the question we are looking at with this iteration of the loop
            questionDiv.innerText = myQuestions[i].question;

            //Display the answer choices (and take user input to select an answer)

            //Creating a div to hold the questoin answers
            var answerDiv = document.createElement("div");answerDiv.classList.add("answers");
           
            //For each propety in the current question's answer object
            /* A For-in loop is used to go through the properties of an object */
            for (letter in myQuestions[i].answer) {
                //Create the lable for the radeo button input
                var label = document.createElement("lable");

                //Create a radio button for each answer for this question
                var input = document.createElement("input");
                //Confiqure the input element 
                input.type = "radio";
                input.name = "question" + i;
                input.value = letter;

                //Add the input to our label
                label.appendChild(input);
                
                //Creating some text from the current letter we're looking at and the corresponding answer for that letter
                var labelText = document.createTextNode(`${letter} : ${myQuestions[i].answer[letter]}`);

                //Add the text to the label
                label.appendChild(labelText);

                //Add the label to the answer div
                answerDiv.appendChild(label);
            }

            //Once all the answer are added, add the answerDiv to the questionDiv
            questionDiv.appendChild(answerDiv);

            //Add the questionDiv to the quizContainer
            quizContainer.appendChild(questionDiv);
        }
    }
    buildQuiz();

    //Function to show the results of the quiz
    function showResults() {
        //Get all the answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll(".answers")
        //This will basically give us back an array containing everything in the quizContainer with the class "answers"

        //Variable to keep track of how many they get right
        var numCorrect = 0;
        

        for (var i = 0; i < answerContainers.length; i++)
        {
            //Get the current answer container we're looking at for the loop
            var answerContainer = answerContainers[i];

           

            //String to find which input is checked for the current question
            var selector = `input[name=question${i}]:checked`;

            var userAnswer = (answerContainer.querySelector(selector) ||{}).value; //If it can't find a selected input for a question, query

            if (userAnswer === myQuestions[i].correctAnswer) {
                //They got it right!
                //Add 1 to numCorrect
                numCorrect++;
                //Change the text color of the element in the answer contain green
                answerContainer.style.color = "green";
            } else { 
                //They got it wrong!
                //Change the text color of the elements in the answer contain to red
                answerContainer.style.color = "red";
            }
        }

        //Add text to the results container to show how many they got right
        resultsContainer.innerText = "You got " + numCorrect + " out of " + myQuestions.length;
    }

    //Call the showResults function when the submit button is clicked
    submitButton.addEventListener("click", showResults);

    

    //Function to reset the quiz
    function resetQuiz() {
        //Clear out what's in the results container 
        resultsContainer.innerText = "";
        //Clear out the quiz container
        quizContainer.innerHTML = "";
        //Rebuild the quiz
        buildQuiz();
    }
    
    //Call the resetQuiz function when the reset button is clicked
    resetButton.addEventListener("click", resetQuiz);

})();
    