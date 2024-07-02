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

document.addEventListener("DOMContentLoaded", () => {
  const checkBoxList = document.querySelectorAll(".custom-checkbox");
  const inputFields = document.querySelectorAll(".goal-input");
  //   const errorLabel = document.querySelector(".error-label");
  const progressLabel = document.querySelector(".progress-label");
  const progressBar = document.querySelector(".progress-bar");
  const progressValue = document.querySelector(".progress-value span");

  const allQuotes = [
    "Raise the Progress bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! You just completed all the goals, time for chill :D",
  ];

  // Initialize allGoals object
  const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    "goal-1": { name: "", completed: false },
    "goal-2": { name: "", completed: false },
    "goal-3": { name: "", completed: false },
  };

  // Function to update progress bar
  function updateProgressBar() {
    const completedGoalsCount = Object.values(allGoals).filter(
      (goal) => goal.completed
    ).length;
    const progressPercentage = (completedGoalsCount / inputFields.length) * 100;
    progressBar.querySelector(
      ".progress-value"
    ).style.width = `${progressPercentage}%`;
    progressValue.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
    progressLabel.innerText = allQuotes[completedGoalsCount];
  }

  // Update progress bar on page load
  updateProgressBar();

  checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const inputId = checkbox.nextElementSibling.id;
      const inputElement = document.getElementById(inputId);

      // Ensure all goals are added before marking complete
      const allGoalsAdded = Array.from(inputFields).every(
        (input) => input.value !== ""
      );

      if (allGoalsAdded) {
        // Toggle completed state
        allGoals[inputId].completed = !allGoals[inputId].completed;
        checkbox.parentElement.classList.toggle("completed");

        // Update local storage and progress bar
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
        updateProgressBar();
      } else {
        progressBar.classList.add("show-error");
        setTimeout(() => {
          progressBar.classList.remove("show-error");
        }, 2000); // Remove error after 2 seconds
      }
    });
  });

  inputFields.forEach((input) => {
    // Populate input fields with saved data
    if (allGoals[input.id]) {
      input.value = allGoals[input.id].name;
      if (allGoals[input.id].completed) {
        input.parentElement.classList.add("completed");
      }
    }

    input.addEventListener("focus", () => {
      progressBar.classList.remove("show-error");
    });

    input.addEventListener("input", (e) => {
      const inputId = input.id;
      if (allGoals[inputId] && allGoals[inputId].completed) {
        input.value = allGoals[inputId].name;
        return;
      }

      if (allGoals[inputId]) {
        allGoals[inputId].name = input.value;
      } else {
        allGoals[inputId] = {
          name: input.value,
          completed: false,
        };
      }

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    });
  });
});
