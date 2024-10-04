import { Todo, Project, projects } from "./classes.js";
import { appendTask, appendProjects } from "./app.js";


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

    const tasksDiv = document.querySelector("#tasks");
    const projectsDiv = document.querySelector("#projects");

    return { addProjectBtn, addTaskBtn, addProjectDialog, 
            addTaskDialog, projectForm, taskForm,
            cancelProjectBtn, cancelTaskBtn, projectOptions,
            tasksDiv, projectsDiv }
}());



function addEvents() {
    nodes.addProjectBtn.addEventListener("click", () => {
        nodes.projectForm.reset();
        nodes.addProjectDialog.showModal();
    });


    nodes.addTaskBtn.addEventListener("click", () => {
        nodes.taskForm.reset();

        if (projects.length === 0) {
            projects.push(new Project("Project 1", 0));
            toggleProjectDisplay(false);
            appendProjects();
        }

        nodes.projectOptions.textContent = "";
    
        for (const project of projects) {
            const option = document.createElement("option");
            option.textContent = project.projectName;
            option.value = project.projectID;
            nodes.projectOptions.appendChild(option);
        }

        nodes.addTaskDialog.showModal();
    });


    nodes.projectForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.projectForm));
        e.preventDefault();
        nodes.addProjectDialog.close();
        projects.push(new Project(data.projectName, projects.length));
        toggleProjectDisplay(false);
        appendProjects();
    });


    nodes.taskForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.taskForm));
        e.preventDefault();
        nodes.addTaskDialog.close();
        const newTask = new Todo(data.title, data.description, data.dueDate,
            data.priority, data.selectProject);
        
        let projectObj;

        for (const project of projects) {
            if (project.projectID == data.selectProject) {
                projectObj = project;
                break;
            }
        }

        projectObj.addTask(newTask);

        toggleTaskDisplay(false);
        appendTask(newTask);
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



function toggleProjectDisplay(toggleOff) {
    if (toggleOff) {
        document.querySelector("#noProjects").style.display = "block";
        document.querySelector("#projectFilter").style.display = "none";
        document.querySelector("#projects").style.display = "none";
        return false;
    } else {
        document.querySelector("#noProjects").style.display = "none";
        document.querySelector("#projectFilter").style.display = "block";
        document.querySelector("#projects").style.display = "flex";
        return true;
    }
}



function toggleTaskDisplay(toggleOff) {
    if (toggleOff) {
        document.querySelector("#noTasks").style.display = "block";
        document.querySelector("#tasks").style.display = "none";
        document.querySelector("#heading").style.display = "none";
    } else {
        document.querySelector("#noTasks").style.display = "none";
        document.querySelector("#tasks").style.display = "flex";
        document.querySelector("#heading").style.display = "grid";
    }
}



export { addEvents, nodes };