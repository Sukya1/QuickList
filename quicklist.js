/* 
    Plan is to collect the Task, Assignee and there email and store this data in an object so we can add it and remove it from our list easily
    We wont necessarily delete it from the list but set its visiblility to False, So to display our list we will 
    move through the array and check visibility if true then we add it if not already being displayed and remove if visibility is now false 
*/

// Task Class to store all the data that we will need
class Task {
    static assigneeList = new Map();
    constructor(visibility, task, assignee, assigneeMail) {
        if (Task.assigneeList.length === 0 || !Task.assigeeList.includes(assignee)) {
            Task.assigneeList.push(assignee);
        }
        this.visibility = visibility;
        this.task = task;
        this.assignee = assignee; 
        this.assigneeMail = assigneeMail;
    }
    getVisibility() {
        return this.visibility;
    }
    setVisibility(visibility) {
        this.visibility = visibility;
    }
    getTask() {
        return this.task;
    }
    getAssignee() {
        return this.assignee
    }
    getAssigneeEmail() {
        return this.assigneeEmail
    }
}
// Array that will be keeping a list of our task
let taskArray = [];

// Get the add button
let addButton = document.getElementById("addButton");
// Get the entire form
let list = document.querySelector("#list");
//Listen for the submit button from add to be clicled and collect data and add it to the taskArray
addButton.addEventListener("click", (data) => {
    data.preventDefault();

    let task = document.querySelector('input[id="task"]').value;
    let  assignee = document.querySelector('input[id="assignee"]').value;
    let  assigneeMail = document.querySelector('input[id="assigneeMail"]').value;
    let visibility = true;
    const newTask = new Task(visibility, task, assignee, assigneeMail); 
    taskArray.push(newTask);

    //Display the element
    let newItem = document.createElement("li");
    newItem.innerHTML = task;
    list.appendChild(newItem);

    // Clear all the form collectTasks
    document.getElementById("collectTasks").reset();

    //This is a test
    // console.log(taskArray);
});
/* Removal of a Task from the List
You can add an event listener to the entire form and remove the target upon a click 
*/

list.addEventListener('click', (event) => {
    event.target.remove();
  });

/* 
Functionality of Done 
1. Filter out Task belonging to a particular asignee and send it to them by email
2. Loop through all the elments and some how figure out all the task they have been assigned-
    maybe a funning hasmap could work to keep track of all the assignees and their task, 
    removal will be tricky. 
3. May need to add an event listener to all the list items
*/ 
