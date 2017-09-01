// var todoDB = require("../seed.js");

const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOSLIST_ACTIVE = "todosListActive";
const TODOSLIST_COMPLETED = "todosListCompleted";
const TODOSLIST_DELETED = "todosListDeleted";
const TODOLIST_ALL = [TODOSLIST_ACTIVE,TODOSLIST_COMPLETED,TODOSLIST_DELETED];
const NEW_TODO_INPUT_ID = "newToDoInput";

window.onload = getActiveTodosAJAX();

function addToDoElements(id,todosDataJSON) {
    var parent = document.getElementById(id);
    var todosDataObject = JSON.parse(todosDataJSON);
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }
    Object.keys(todosDataObject).forEach(function (index) {
        var todoElement = createTodoElement(index,todosDataObject[index]);
        parent.appendChild(todoElement);
    })
}

function createTodoElement(id,todoObject) {
    var todoElement = document.createElement("div");
    todoElement.innerText = todoObject.title;
    todoElement.setAttribute("data-id",id);
    todoElement.setAttribute("class","todoStatus"+todoObject.status);
    if (todoObject.status == "ACTIVE") {
        var completeButton = document.createElement("button");
        completeButton.innerText = "Mark As Complete";
        completeButton.setAttribute("onclick","completeTodoAjax("+id+")");
        completeButton.setAttribute("class","requiresPadding");
        todoElement.appendChild(completeButton);
    }
    if (todoObject.status != "DELETED") {
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("onclick","deleteTodoAjax("+id+")");
        deleteButton.setAttribute("class","requiresPadding");
        todoElement.appendChild(deleteButton);
    }
    // console.log(todoElement);
    return todoElement;
}
function getTodosAjax() {
    getActiveTodosAJAX();
    getCompletedTodosAJAX();
    getDeletedTodosAJAX();
}
function getActiveTodosAJAX() {
    // console.log("To Be Defined");
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos/active",true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                addToDoElements(TODOSLIST_ACTIVE,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}

function getCompletedTodosAJAX() {
    // console.log("To Be Defined");
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos/complete",true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                addToDoElements(TODOSLIST_COMPLETED,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}

function getDeletedTodosAJAX() {
    // console.log("To Be Defined");
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos/deleted",true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                addToDoElements(TODOSLIST_DELETED,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}

// function getTodosAJAX() {
//     // console.log("To Be Defined");
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET","/api/todos",true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == RESPONSE_DONE){
//             if (xhr.status == STATUS_OK){
//                 getToDoElements(xhr.responseText);
//             }
//         }
//     }
//     xhr.send(data=null);
// }
//
// function getToDoElements(todosDataJSON) {
//     //var parent = document.getElementById(id);
//     var todosDataObject = JSON.parse(todosDataJSON);
//     while (parent.hasChildNodes()) {
//         parent.removeChild(parent.firstChild);
//     }
//     Object.keys(todosDataObject).forEach(function (index) {
//         var todoElement = createTodoElement(index,todosDataObject[index]);
//         //parent.appendChild(todoElement);
//     })
// }
//
// function createTodoElement(index,todoObject) {
//     var todoElement = document.createElement("div");
//     todoElement.innerText = todoObject.title;
//     todoElement.setAttribute("data-id",index);
//     todoElement.setAttribute("class","todoStatus"+todoObject.status);
//     if (todoObject.status == "ACTIVE") {
//         var completeButton = document.createElement("button");
//         completeButton.innerText = "Mark As Complete";
//         completeButton.setAttribute("onclick","completeTodoAjax("+index+")");
//         completeButton.setAttribute("class","requiresPadding");
//         todoElement.appendChild(completeButton);
//     }
//     if (todoObject.status != "DELETED") {
//         var deleteButton = document.createElement("button");
//         deleteButton.innerText = "Delete";
//         deleteButton.setAttribute("onclick","deleteTodoAjax("+index+")");
//         deleteButton.setAttribute("class","requiresPadding");
//         todoElement.appendChild(deleteButton);
//     }
//     // console.log(todoElement);
//     return todoElement;
// }

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
                addToDoElements(TODOSLIST_ACTIVE,xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
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
                addToDoElements(TODOSLIST_COMPLETED,xhr.responseText);
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
                addToDoElements(TODOSLIST_DELETED,xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
    // xhr.send(data);
}

function handleKeyPress(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        addTodosAjax();
    }
}