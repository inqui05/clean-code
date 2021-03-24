//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".new-task__input"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.querySelector(".tasks"); //ul of #incomplete-tasks
var completedTasksHolder = document.querySelector(".tasks_finished"); //completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");
    listItem.classList.add('tasks__item');
    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbx
    checkBox.classList.add('tasks__done');
    //label
    var label = document.createElement("p"); //label
    label.classList.add('tasks__title');
    //input (text)
    var editInput = document.createElement("input"); //text
    editInput.classList.add('tasks__fix');
    editInput.classList.add('tasks_input');
    //button.edit
    var editButton = document.createElement("button"); //edit button
    editButton.classList.add('tasks__edit');

    //button.delete
    var deleteButton = document.createElement("button"); //delete button
    deleteButton.classList.add('tasks__delete');
    var deleteButtonImg = document.createElement("img"); //delete button image
    deleteButtonImg.classList.add('tasks__delete-image');

    label.innerText = taskString;
    label.className = 'tasks__title';

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "tasks__edit";

    deleteButton.className = "tasks__delete";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};



var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task-input:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

};

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('.tasks__fix');
    var label = listItem.querySelector(".tasks__title");
    var editBtn = listItem.querySelector(".tasks__edit");
    var containsClass = listItem.classList.contains("tasks__item_edit");
    //If class of the parent is .edit-mode
    if (containsClass) {
        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        label.classList.remove('tasks__title_invisible');
        editInput.classList.remove('tasks__fix_visible');
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        label.classList.add('tasks__title_invisible');
        editInput.classList.add('tasks__fix_visible');
        editBtn.innerText = "Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("tasks__item_edit");
};


//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

};


//Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    this.parentNode.querySelector('.tasks__title').classList.toggle("tasks__title_line-through");
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

};


var taskIncomplete = function () {
    console.log("Incomplete Task...");

    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    this.parentNode.querySelector('.tasks__title').classList.toggle("tasks__title_line-through");
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};



var ajaxRequest = function () {
    console.log("AJAX Request");
};

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    //select ListItems children
    var checkBox = taskListItem.querySelector(".tasks__done");
    var editButton = taskListItem.querySelector(".tasks__edit");
    var deleteButton = taskListItem.querySelector(".tasks__delete");

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.