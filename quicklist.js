// Hash Map Initialization person -> task and person -> email and task -> asignee
let assigneeTaskList = new Map();
let assigneeEmailList = new Map();

// Get the add button
let addButton = document.getElementById("addButton");

// Get the entire form
let list = document.querySelector("#list");

//Listen for the submit button for it to be clicled and collect data and add it to the hashmaps
addButton.addEventListener("click", (data) => {
    data.preventDefault();

    let task = document.querySelector('input[id="task"]').value;
    let  assignee = document.querySelector('input[id="assignee"]').value;
    let  assigneeMail = document.querySelector('input[id="assigneeMail"]').value;
    
    if (task != "" && assignee != "" && assigneeMail != "") {
        //Variable to ensure task are unique
        let change = true;
        
        //check that task does not already exist
        for (let [key,value] of assigneeTaskList) {
            for (let k = 0; k < value.length; k++) {
                if (value[k] === task) {
                    window.alert("Task Must be Unique! If you want to assign the same task to two people try adding each persons name to the tast");
                    change = false;
                    break;
                }
            }
        }

        //If task is valid/unique add it to the list and display
        if (change) {
             // Add assigne to map of person => task
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

            //Displays the element - only want to be displayed if it is unique
            let newItem = document.createElement("li");
            newItem.innerHTML = task;
            list.appendChild(newItem);
        }

        // Clear all the form collectTasks
        document.getElementById("collectTasks").reset();
    } else {
        //info should remain if all is not filled out
        window.alert("All sections of the form must be filled out in order to add a task");
    }
    
});

/* 
    Removal of a Task from the List, cross it out and remove after one second
*/

list.addEventListener('click', (event) => {
    let currTask = event.target.innerHTML;

    // Implement the strike through if a a task is clicked
    let currList = document.querySelectorAll('#list li');
    for (let i = 0; i < currList.length; i++) {
        if (currList[i] != undefined && currList[i].innerHTML === currTask) {
            currList[i].innerHTML = currList[i].innerHTML.strike();
            break;
        }
    }
    
    // Searches and deletes clicked task, assignee is deleted if they have no task assigned to them 
    for (let [key,value] of assigneeTaskList) {
        for (let j = 0; j < value.length; j++) {
            if (value[j] === currTask) {
                assigneeTaskList.get(key).splice(j, 1);
            }
        }
        if (assigneeTaskList.get(key).length === 0) {
            assigneeTaskList.delete(key);
            assigneeEmailList.delete(key);
        }
    }
       
    setTimeout(
        function setTimer() {
            event.target.remove()
        }, 
        1000
    )
    });

/* 
Functionality of Done - sent email to each asignee with all their asignened task 
*/ 

function sendSingleEmail(emails, tasks) {
    let params = {
        email: emails,
        task: tasks.join("\n"),
    }
    const serviceID = "service_o1z8mqj";
    const templateID = "template_yr3uae8";

    emailjs.send(serviceID,templateID, params).catch(err => console.log(err));
}

function sendEmail() {
    for (let [key,value] of assigneeTaskList) {
            sendSingleEmail(assigneeEmailList.get(key),value);
     }
    alert("Assignee were given tasks successfully");
}

/*
    copy link button - copies the address of the current website to user clipboard
*/
let copy = document.querySelector("#copy");
const protocol = window.location.href;
//console.log(protocol);

copy.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href);

});

/*
    User enters an email and invites another person to add to their list
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
