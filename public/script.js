// var todoDB = require("../seed.js");

const RESPONSE_DONE = 4;
const STATUS_OK = 200;
// const TODOSLIST_ACTIVE = "todosListActive";
// const TODOSLIST_COMPLETED = "todosListCompleted";
// const TODOSLIST_DELETED = "todosListDeleted";
const TODOLIST_ALL = {"ACTIVE": "todosListActive","COMPLETE":"todosListCompleted","DELETED":"todosListDeleted"};
const NEW_TODO_INPUT_ID = "newToDoInput";

window.onload = getTodosAJAX();

function getTodosAJAX() {
    // console.log("To Be Defined");
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                getToDoElements(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}

function getToDoElements(todosDataJSON) {
    var todosDataObject = JSON.parse(todosDataJSON);
    Object.keys(TODOLIST_ALL).forEach(function (index) {
        var parent = document.getElementById(TODOLIST_ALL[index]);
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
    })
    Object.keys(todosDataObject).forEach(function (index) {
        createTodoElement(index,todosDataObject[index]);
    })
}

function getParticularToDoElements(todosDataJSON,todoStatus) {
    var todosDataObject = JSON.parse(todosDataJSON);
    Object.keys(todosDataObject).forEach(function (index) {
        if (todosDataObject[index].status == todoStatus) {
            createTodoElement(index,todosDataObject[index]);
        }
    })
}

function createTodoElement(index,todoObject) {
    var todoElement = document.createElement("div");
    // todoElement.innerText = todoObject.title;
    todoElement.setAttribute("data-id",index);
    todoElement.setAttribute("class","todoStatus"+todoObject.status);
    if (todoObject.status == "ACTIVE") {
        var completeCheckbox = document.createElement("div");
        completeCheckbox.setAttribute("class","checkbox checkbox-primary");
        // completeCheckbox.setAttribute("class","checkbox-inline");
        var completeCheckboxLabel = document.createElement("label");
        completeCheckboxLabel.setAttribute("for","checkbox"+index);
        completeCheckboxLabel.innerText = todoObject.title;
        completeCheckbox.appendChild(completeCheckboxLabel);
        var completeCheckboxInput = document.createElement("input");
        completeCheckboxInput.setAttribute("type","checkbox");
        completeCheckboxInput.setAttribute("id","checkbox"+index);
        completeCheckboxInput.setAttribute("onclick","completeTodoAjax("+index+")");
        completeCheckbox.appendChild(completeCheckboxInput)
        completeCheckbox.appendChild(completeCheckboxLabel);
        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("type","button");
        deleteButton.setAttribute("class","close");
        deleteButton.setAttribute("onclick","deleteTodoAjax("+index+")");
        deleteButton.innerText = "x";
        completeCheckbox.appendChild(deleteButton);
        todoElement.appendChild(completeCheckbox);
    }
    else if (todoObject.status == "COMPLETE") {
        var completeCheckbox = document.createElement("div");
        completeCheckbox.setAttribute("class","checkbox checkbox-primary");
        // completeCheckbox.setAttribute("class","checkbox-inline");
        var completeCheckboxLabel = document.createElement("label");
        completeCheckboxLabel.setAttribute("for","checkbox"+index);
        completeCheckboxLabel.innerText = todoObject.title;
        completeCheckbox.appendChild(completeCheckboxLabel);
        var completeCheckboxInput = document.createElement("input");
        completeCheckboxInput.setAttribute("type","checkbox");
        completeCheckboxInput.setAttribute("id","checkbox"+index);
        completeCheckboxInput.setAttribute("checked","");
        completeCheckboxInput.setAttribute("onclick","activeTodoAjax("+index+")");
        completeCheckbox.appendChild(completeCheckboxInput)
        completeCheckbox.appendChild(completeCheckboxLabel);
        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("type","button");
        deleteButton.setAttribute("class","close");
        deleteButton.setAttribute("onclick","deleteTodoAjax("+index+")");
        deleteButton.innerText = "x";
        completeCheckbox.appendChild(deleteButton);
        todoElement.appendChild(completeCheckbox);
    }
    else if (todoObject.status == "DELETED") {
        todoElement.innerText = todoObject.title;
    }
    // todoElement.appendChild(formElement);
    var parent = document.getElementById(TODOLIST_ALL[todoObject.status]);
    parent.appendChild(todoElement);
    console.log(todoElement);
    // return todoElement;
}

function addTodosAjax() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    document.getElementById(NEW_TODO_INPUT_ID).value = null;

    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todoTitle=" + encodeURI(title);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                // addToDoElements(TODOSLIST_ACTIVE,xhr.responseText);
                getToDoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function activeTodoAjax(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/active/"+id, true);

    // xhr.open("PUT","/api/todos/"+id, true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // var data = "todoStatus=COMPLETE";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                // addToDoElements(TODOSLIST_COMPLETED,xhr.responseText);
                getToDoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
    // xhr.send(data);
}

function completeTodoAjax(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/complete/"+id, true);

    // xhr.open("PUT","/api/todos/"+id, true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // var data = "todoStatus=COMPLETE";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                // addToDoElements(TODOSLIST_COMPLETED,xhr.responseText);
                getToDoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
    // xhr.send(data);
}

function deleteTodoAjax(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/delete/"+id, true);

    // xhr.open("PUT","/api/todos/"+id, true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // var data = "todoStatus=DELETE";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                // addToDoElements(TODOSLIST_DELETED,xhr.responseText);
                getToDoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
    // xhr.send(data);
}

function toggleCompletedTodosAjax() {
    if (document.getElementById("toggleCompleted").value == "Hide Completed Todos") {
        var parent = document.getElementById(TODOLIST_ALL.COMPLETE);
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
        document.getElementById("toggleCompleted").setAttribute("value","Show Completed Todos");
    }
    else if (document.getElementById("toggleCompleted").value == "Show Completed Todos") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET","/api/todos/complete",true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == RESPONSE_DONE){
                if (xhr.status == STATUS_OK){
                    getParticularToDoElements(xhr.responseText,"COMPLETE");
                }
            }
        }
        xhr.send(data=null);
        document.getElementById("toggleCompleted").setAttribute("value","Hide Completed Todos");
    }
}

function toggleDeletedTodosAjax() {
    if (document.getElementById("toggleDeleted").value == "Hide Deleted Todos") {
        var parent = document.getElementById(TODOLIST_ALL.DELETED);
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
        document.getElementById("toggleDeleted").setAttribute("value","Show Deleted Todos");
    }
    else if (document.getElementById("toggleDeleted").value == "Show Deleted Todos") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET","/api/todos/deleted",true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == RESPONSE_DONE){
                if (xhr.status == STATUS_OK){
                    getParticularToDoElements(xhr.responseText,"DELETED");
                }
            }
        }
        xhr.send(data=null);
        document.getElementById("toggleDeleted").setAttribute("value","Hide Deleted Todos");
    }
}

function handleKeyPress(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        addTodosAjax();
    }
}