//Elements from the DOM that will be used
let todoList = document.querySelector('#todo-list');
let doneList = document.querySelector('#done-list');
let inputElement = document.querySelector('#new-task');

//Arrays to store the tasks
const tasksTodo = JSON.parse(localStorage.getItem('tasksTodo')) || [];
const tasksDone = JSON.parse(localStorage.getItem('tasksDone')) || [];

renderTasks();
renderTasksDone();

function renderTasks(){
    todoList.innerHTML = '';

    if(tasksTodo.length == 0){
        let todoTask = document.createElement('li');
        let taskText = document.createTextNode(`You don't have any task`);

        todoTask.setAttribute('class', 'center');
        
        todoTask.appendChild(taskText);
        todoList.appendChild(todoTask);
    }
    else{
        for(task of tasksTodo){
            let todoTask = document.createElement('li');
            let taskText = document.createTextNode(task);
            let position = tasksTodo.indexOf(task);
            
            todoTask.appendChild(addLabel(position));
            todoTask.appendChild(taskText);
            todoList.appendChild(todoTask);
        }
    }

}

function renderTasksDone(){
    doneList.innerHTML = '';

    if(tasksDone.length == 0){
        let doneTask = document.createElement('li');
        let taskText = document.createTextNode(`You don't have finished tasks`);

        doneTask.setAttribute('class', 'center');

        doneTask.appendChild(taskText);
        doneList.appendChild(doneTask);

    }
    else{
        for(done of tasksDone){
            let doneTask = document.createElement('li');
            let taskText = document.createTextNode(done);
            let position = tasksDone.indexOf(done);
            
            doneTask.appendChild(addTrashCan(position));
            doneTask.appendChild(taskText);
            doneList.appendChild(doneTask);
        }
    }

}

function addTask(){
    if(inputElement.value === ''){
        return false;
    }
    let newTask = inputElement.value;

    tasksTodo.push(newTask);
    inputElement.value = '';

    renderTasks();
    saveToStorage();
}

function finishTask(position){
    setTimeout(() => {
        tasksDone.push(tasksTodo[position]);
        tasksTodo.splice(position, 1);
        renderTasks();
        renderTasksDone();
        saveToStorage();
    },200);
}

function deleteTask(position){
    tasksDone.splice(position, 1);
    renderTasksDone();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('tasksTodo', JSON.stringify(tasksTodo));
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
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

function addTrashCan(position){
    let iconElement = document.createElement('i');
    let iconText = document.createTextNode('delete');
    
    iconElement.setAttribute('class', 'material-icons trashcan');
    iconElement.setAttribute('onclick', `deleteTask(${position})`);
    iconElement.setAttribute('onmouseover', `changeTrashCan(this)`);
    iconElement.setAttribute('onmouseout', `changeTrashCanBack(this)`);

    iconElement.appendChild(iconText);

    return iconElement;
}

function changeTrashCan(trashCan){
    trashCan.innerHTML = 'delete_forever';
}

function changeTrashCanBack(trashCan){
    trashCan.innerHTML = 'delete';
}








