let tasks = [
    {
        name: "Complete HTML Assignment",
        due: new Date("2026-02-01"),
        completed: true
    },
    {
        name: "Prepare for JavaScript Exam",
        due: new Date("2026-02-10"),
        completed: false
    }
];

let currentFilter = "all";

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.sort((a, b) => a.due - b.due);

    filteredTasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.style = `
            background:#f9fafb;
            padding:10px;
            margin-bottom:10px;
            border-radius:6px;
            display:flex;
            justify-content:space-between;
            align-items:center;
        `;

        let text = document.createElement("span");
        text.innerHTML = `
            <strong>${task.name}</strong><br>
            <small>Due: ${task.due.toDateString()}</small>
        `;

        if (task.completed) {
            text.style.textDecoration = "line-through";
            text.style.color = "green";
        }

        let actions = document.createElement("div");

        let checkBtn = document.createElement("button");
        checkBtn.innerText = "✔";
        checkBtn.onclick = () => toggleTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(checkBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(text);
        li.appendChild(actions);

        list.appendChild(li);
    });
}

function addTask() {
    let name = document.getElementById("taskInput").value;
    let date = document.getElementById("dateInput").value;

    if (name === "" || date === "") {
        alert("Please enter task and due date");
        return;
    }

    tasks.push({
        name: name,
        due: new Date(date),
        completed: false
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";

    displayTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

displayTasks();
