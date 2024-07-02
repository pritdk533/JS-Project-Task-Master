const checkBoxList = document.querySelectorAll(".custom-checkbox"); // Selecting all the checkbox using querySelectorAll, when we use querySelectorAll => it returns a node list which is array-like-object

const inputFields = document.querySelectorAll(".goal-input"); // Selecting all the inputFields using querySelectorAll

const errorLabel = document.querySelector(".error-label"); // Selecting the errorLabel using querySelector

const progressBar = document.querySelector(".progress-bar"); // Selecting the progressBar using querySelector

const progressValue = document.querySelector(".progress-value"); // Selecting the progressBar using progressValue

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "33.33%";
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
});

/*

NOTE DETAILS ABOUT Array-Like-Object:
Array-like objects are objects that have properties and behavior similar to arrays, but they do not have all the methods and properties that arrays have. They typically have a length property and indexed elements, but they do not inherit from Array.prototype.

Indexed Elements: Elements can be accessed using indices 
Length Property: They usually have a length property that indicates the number of elements.
Looping Over Array-Like-Object: they can be iterated using for of loop / forEach / for loop
*/

/*
NOTE DETAILS ABOUT EVENT LISTENER : When we add an event listener using addEventListener, the callback function we provide is managed by the browser.

1.Registering the Event Listener ==> When we call addEventListener, we register a callback function to be executed when a specific event occurs on a particular element.
2.Event Occurrence ==> When the event (e.g., a click) occurs, the browser detects it and places the callback function in the callback queue.
3.Event Loop ==> The event loop is a mechanism in JavaScript that monitors both the call stack (where functions are executed) and the callback queue (where functions wait to be executed).
4.Callback Queue ==> The callback function from the event listener is placed in the callback queue when the event occurs.
5.Executing Callbacks==> Once the call stack is empty, the event loop transfers the first callback function from the queue to the call stack. This process is done one callback at a time, ensuring that each function executes fully before the next one begins.

*/
