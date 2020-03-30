
let todoList = document.querySelector('#todo-list');
let doneList = document.querySelector('#done-list');
let inputElement = document.querySelector('#new-task');

const tasksTodo = JSON.parse(localStorage.getItem('tasksTodo')) || [];
const tasksDone = JSON.parse(localStorage.getItem('tasksDone')) || [];

function addTask(){
    let newTask = inputElement.value;

    tasksTodo.push(newTask);
    inputElement.value = '';

    renderTasks();
    saveToStorage();
}

function renderTasks(){
    todoList.innerHTML = '';

    for(task of tasksTodo){
        let todoTask = document.createElement('li');
        let taskText = document.createTextNode(task);
        let position = tasksTodo.indexOf(task);
        
        todoTask.appendChild(addLabel(position));
        todoTask.appendChild(taskText);
        todoList.appendChild(todoTask);
    }
}

function addLabel(position){
    let labelElement = document.createElement('label');
    let checkboxElement = document.createElement('input');
    let spanElement = document.createElement('span');
    
    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.setAttribute('onclick', `finishTask(${position})`);

    labelElement.appendChild(checkboxElement);
    labelElement.appendChild(spanElement);

    return labelElement;
}

function finishTask(position){
    console.log('Tarefa finalizada');
}

function saveToStorage(){
    localStorage.setItem('tasksTodo', JSON.stringify(tasksTodo));
}

renderTasks();