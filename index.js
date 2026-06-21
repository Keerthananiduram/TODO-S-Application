let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let data = localStorage.getItem("todoList");

    if (data === null) {
        return [];
    }

    return JSON.parse(data);
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

addTodoButton.onclick = function () {
    addTodo();
};

function addTodo() {

    let userInput = document.getElementById("todoUserInput");

    if (userInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    todosCount++;

    let newTodo = {
        text: userInput.value,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);

    createAndAppendTodo(newTodo);

    userInput.value = "";
}

function onTodoStatusChange(labelId, todoId) {

    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");

    let index = todoList.findIndex(function (todo) {
        return "todo" + todo.uniqueNo === todoId;
    });

    todoList[index].isChecked = !todoList[index].isChecked;
}

function onDeleteTodo(todoId) {

    let todoElement = document.getElementById(todoId);

    todoElement.remove();

    let index = todoList.findIndex(function (todo) {
        return "todo" + todo.uniqueNo === todoId;
    });

    todoList.splice(index, 1);

    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function createAndAppendTodo(todo) {

    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    todoElement.id = todoId;

    todoItemsContainer.appendChild(todoElement);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = todo.isChecked;
    checkbox.classList.add("checkbox-input");

    checkbox.onclick = function () {
        onTodoStatusChange(labelId, todoId);
    };

    todoElement.appendChild(checkbox);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");

    todoElement.appendChild(labelContainer);

    let label = document.createElement("label");
    label.setAttribute("for", checkboxId);
    label.id = labelId;
    label.classList.add("checkbox-label");
    label.textContent = todo.text;

    if (todo.isChecked) {
        label.classList.add("checked");
    }

    labelContainer.appendChild(label);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");

    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
    labelContainer.appendChild(deleteIconContainer);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}