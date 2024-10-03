import { Todo, Project } from "./classes.js";

const projects = [new Project("Default Project")];
const tasks = [];



const nodes = (function () {
    const addProjectBtn = document.querySelector("#addProjectBtn");
    const addTaskBtn = document.querySelector("#addTaskBtn");

    const addProjectDialog = document.querySelector("#addProject");
    const addTaskDialog = document.querySelector("#addTask");

    const projectForm = document.querySelector("#projectForm");
    const taskForm = document.querySelector("#taskForm");

    const cancelProjectBtn = document.querySelector("#cancelProject");
    const cancelTaskBtn = document.querySelector("#cancelTask");

    const projectOptions = document.querySelector("#selectProject");

    return { addProjectBtn, addTaskBtn, addProjectDialog, 
            addTaskDialog, projectForm, taskForm,
            cancelProjectBtn, cancelTaskBtn, projectOptions }
}());



function addEvents() {
    nodes.addProjectBtn.addEventListener("click", () => {
        nodes.projectForm.reset();
        nodes.addProjectDialog.showModal();
    });


    nodes.addTaskBtn.addEventListener("click", () => {
        nodes.taskForm.reset();

        for (const project of projects) {
            const option = document.createElement("option");
            option.textContent = project.projectName;
            option.value = project.projectName;
            nodes.projectOptions.appendChild(option);
        }

        nodes.addTaskDialog.showModal();
    });


    nodes.projectForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.projectForm));
        e.preventDefault();
        nodes.addProjectDialog.close();
        projects.push(new Project(data.projectName));
        const canDisplay = toggleProjectDisplay();
        displayProjects(canDisplay);
    });


    nodes.taskForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.taskForm));
        e.preventDefault();
        nodes.addTaskDialog.close();
        tasks.push(new Todo(data.title, data.description, data.dueDate,
                            data.priority, data.selectProject));
        const canDisplay = toggleTaskDisplay();
        displayTasks(canDisplay);
    });


    nodes.cancelProjectBtn.addEventListener("click", () => {
        nodes.addProjectDialog.close();
        nodes.projectForm.reset();
    });


    nodes.cancelTaskBtn.addEventListener("click", () => {
        nodes.addTaskDialog.close();
        nodes.taskForm.reset();
    });

}



function toggleProjectDisplay() {
    if (projects.length === 0) {
        document.querySelector("#noProjects").style.display = "block";
        document.querySelector("#projects").style.display = "none";
        return false;
    } else {
        document.querySelector("#noProjects").style.display = "none";
        document.querySelector("#projects").style.display = "flex";
        return true;
    }
}



function toggleTaskDisplay() {
    if (tasks.length === 0) {
        document.querySelector("#noTasks").style.display = "block";
        document.querySelector("#tasks").style.display = "none";
        return false;
    } else {
        document.querySelector("#noTasks").style.display = "none";
        document.querySelector("#tasks").style.display = "grid";
        return true;
    }
}



function displayTasks(canDisplay) {
    if (canDisplay) {
        tasks.forEach(task => {
            //display tasks
        });
    }
}

export { addEvents };