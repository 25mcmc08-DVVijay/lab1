interface Task {
    name: string;
    due: Date;
    completed: boolean;
}

let tasks: Task[] = [
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

let currentFilter: "all" | "completed" | "pending" = "all";

function displayTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement;
    list.innerHTML = "";

    let filteredTasks: Task[] = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.sort((a, b) => a.due.getTime() - b.due.getTime());

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.style.cssText = `
            background:#f9fafb;
            padding:10px;
            margin-bottom:10px;
            border-radius:6px;
            display:flex;
            justify-content:space-between;
            align-items:center;
        `;

        const text = document.createElement("span");
        text.innerHTML = `
            <strong>${task.name}</strong><br>
            <small>Due: ${task.due.toDateString()}</small>
        `;

        if (task.completed) {
            text.style.textDecoration = "line-through";
            text.style.color = "green";
        }

        const actions = document.createElement("div");

        const checkBtn = document.createElement("button");
        checkBtn.innerText = "✔";
        checkBtn.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(checkBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(text);
        li.appendChild(actions);

        list.appendChild(li);
    });
}


function addTask(): void {
    const nameInput = document.getElementById("taskInput") as HTMLInputElement;
    const dateInput = document.getElementById("dateInput") as HTMLInputElement;

    const name: string = nameInput.value;
    const date: string = dateInput.value;

    if (name === "" || date === "") {
        alert("Please enter task and due date");
        return;
    }

    tasks.push({
        name: name,
        due: new Date(date),
        completed: false
    });

    nameInput.value = "";
    dateInput.value = "";

    displayTasks();
}

function toggleTask(index: number): void {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index: number): void {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks(type: "all" | "completed" | "pending"): void {
    currentFilter = type;
    displayTasks();
}

displayTasks();
