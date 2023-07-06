// Hash Map Initialization person -> task and person -> email and task -> asignee
let assigneeTaskList = new Map();
let assigneeEmailList = new Map();
let taskMap = new Map();

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
    
    if (task != "" && assignee != "" && assigneeMail != "") {
        // Add to map of person to task
        if (assigneeTaskList.size === 0 || !assigneeTaskList.has(assignee)) {
            assigneeTaskList.set(assignee,[task]);
        } else {
            assigneeTaskList.get(assignee).push(task);
            console.log(assigneeTaskList.get(assignee));
        }

        // Add the persons email to map of person -> email 
        if (assigneeEmailList.size === 0 || !assigneeEmailList.has(assignee)) {
            assigneeEmailList.set(assignee,assigneeMail);
        }
    // Map of task to person 
    if (taskMap.size === 0 || !taskMap.has(task)) {
            taskMap.set(task,assignee);

            //Display the element - only want to be displayed if it is unique
            let newItem = document.createElement("li");
            newItem.innerHTML = task;
            list.appendChild(newItem);
        } else {
            window.alert("Task Must be Unique! If you want to assign the same task to two people try adding each persons name to the tast");
        }  
    } else {
        window.alert("All sections of the form must be filled out in order to add a task");
    }
    // Clear all the form collectTasks
    document.getElementById("collectTasks").reset();
});

/* Removal of a Task from the List
You can add an event listener to the entire form and remove the target upon a click 
*/

list.addEventListener('click', (event) => {
    console.log(assigneeEmailList);
    // shows the element removed even thought it has not yet been removed???
    console.log(assigneeTaskList);
    console.log(taskMap);

    let currTask = event.target.innerHTML;
    // For loop Implementation
    // for (let i = 0; i < assigneeTaskList.size; i++) {
    //     for (let j = 0; j < assigneeTaskList[i].length; j++) {
    //         if (assigneeTaskList[i][j] == currTask) {
    //             assigneeTaskList.get(i).splice(j, 1);
    //         }
    //     }
    // }
    //remove task from taskMap
    let currentAssignee = taskMap.get(currTask);
    taskMap.delete(currTask);
    //remove task from hashmap and the persons name
    let index = assigneeTaskList.get(currentAssignee).indexOf(currTask);
    assigneeTaskList.get(currentAssignee).splice(index, 1);
    // if their task list becomes empty remove them from the person -> email map
    if (assigneeTaskList.get(currentAssignee).length === 0 ) {
        assigneeTaskList.delete(currentAssignee)
        assigneeEmailList.delete(currentAssignee);
    }
    //Remove from screen and list
    event.target.remove();
  });

/* 
Functionality of Done - sent email to each asignee with all their asignened task - DOES NOT WORK!!!!
*/ 

function sendSingleEmail(emails, tasks) {
    let params = {
        email: emails,
        task: tasks.join("\n"),
    }
    const serviceID = "service_o1z8mqj";
    const templateID = "template_yr3uae8";

    emailjs.send(serviceID,templateID, params).then(
        res => {
            alert("Assignee were given tasks successfully");
        }).catch(err => console.log(err));
}

function sendEmail() {
    for (let [key,value] of assigneeTaskList) {
            sendSingleEmail(assigneeEmailList.get(key),value);
     }
}
/*
    Have the copy link button copy the address of the current website - Not sure about this
*/
let copy = document.querySelector("#copy");
const protocol = window.location.href;
//console.log(protocol);

copy.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href);

});
/*
    Have the copy link button copy the address of the current website 
*/

function sendInvite() {
    let currEmail = document.querySelector('input[id="invite"]').value;
    let parameters = {
        email: currEmail,
        link: protocol,
    }
    const serviceID = "service_o1z8mqj";
    const templateID = "template_1v05t29";

    emailjs.send(serviceID,templateID, parameters).then(
        res => {
            alert("Assignee were given tasks successfully");
        }).catch(err => console.log(err)); 
}
