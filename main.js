'use strict';

const inputField = document.querySelector('#input-task');
const addTaskBtn = document.querySelector('#add-task-button');
const tasksList = document.querySelector('#task-list');
//get the array status
let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
localStorage.setItem("tasks", JSON.stringify(tasksArray));
renderList();

// adds the task to the taskArray
function createTask(text){
    const uniqueID = Math.trunc(Date.now() + Math.random());
    tasksArray.push({
        "task": text,
        "id": uniqueID
    });
    renderList();
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// render the list elements
function renderList(){
    tasksList.innerHTML = "";
    for (let task of tasksArray){
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const span = document.createElement('span');
        span.classList.add('task');
        span.textContent = task.task;
        const button = document.createElement('button');
        button.classList.add('delete-btn');
        button.textContent = 'X';
        li.id = task.id;
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(button);
        tasksList.appendChild(li);
    }
}

addTaskBtn.addEventListener('click', function (){
    if(inputField.value!==""){
        createTask(inputField.value);
    }
})

// removing task
document.addEventListener('click', function (e){
    const itemToDelete = e.target;
    if(itemToDelete.classList.contains('delete-btn')){
        const listElement = itemToDelete.parentElement;
        tasksList.removeChild(listElement);
        for(let i=0;i<tasksArray.length;i++){
            if(Number(listElement.id)===tasksArray[i].id){
                console.log(`taskArray es ${tasksArray[i].id} y listElement es ${listElement.id}`)
                tasksArray.splice(i,1);
                localStorage.setItem("tasks", JSON.stringify(tasksArray));
            }
        }
        const task = itemToDelete.previousSibling;
        // remove the li that matches the uniqueID and the object from the taskArray with that same uniqueId
    }
})

// crossing the task
document.addEventListener('click', function (e){
    const itemToCrossOut = e.target;
    if(itemToCrossOut.type === 'checkbox'){
        const itemText = itemToCrossOut.nextSibling;
        itemToCrossOut.checked? itemText.classList.add('crossed'):itemText.classList.remove('crossed');
    }
})



