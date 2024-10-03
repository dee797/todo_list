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

    return { addProjectBtn, addTaskBtn, addProjectDialog, 
            addTaskDialog, projectForm, taskForm,
            cancelProjectBtn, cancelTaskBtn }
}());



function addEvents() {
    nodes.addProjectBtn.addEventListener("click", () => {
        nodes.projectForm.reset();
        nodes.addProjectDialog.showModal();
    });

    nodes.addTaskBtn.addEventListener("click", () => {
        nodes.taskForm.reset();
        nodes.addTaskDialog.showModal();
    });

    nodes.projectForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.projectForm));
        e.preventDefault();
        nodes.addProjectDialog.close();
        projects.push(new Project(data.projectName));
    });

    nodes.taskForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.taskFormForm));
        e.preventDefault();
        nodes.addTaskDialog.close();
        tasks.push(new Todo(data.title, data.description, data.dueDate,
                            data.priority, data.project));
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

export { addEvents };