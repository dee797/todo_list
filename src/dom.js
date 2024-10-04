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

    const tasksDiv = document.querySelector("#tasks");

    return { addProjectBtn, addTaskBtn, addProjectDialog, 
            addTaskDialog, projectForm, taskForm,
            cancelProjectBtn, cancelTaskBtn, projectOptions,
            tasksDiv }
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
        if (canDisplay) appendProjects();
    });


    nodes.taskForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.taskForm));
        e.preventDefault();
        nodes.addTaskDialog.close();
        const newTask = new Todo(data.title, data.description, data.dueDate,
            data.priority, data.selectProject);
        
        tasks.push(newTask);
        let projectObj;

        for (const project of projects) {
            if (project.name === data.selectProject) {
                projectObj = project;
                break;
            }
        }

        projectObj.appendTask(newTask);

        const canDisplay = toggleTaskDisplay();
        if (canDisplay) appendTask(newTask);
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
        document.querySelector("#heading").style.display = "none";
        return false;
    } else {
        document.querySelector("#noTasks").style.display = "none";
        document.querySelector("#tasks").style.display = "grid";
        document.querySelector("#heading").style.display = "grid"
        return true;
    }
}



function appendTask(task) {

    const valueList = Object.values(task);

    for (let i = 0; i < 5; i++) {
        const taskProp = document.createElement("div");
        taskProp.textContent = valueList[i];
        nodes.tasksDiv.appendChild(taskProp);
    }

    const isDoneCheckbox = document.createElement("input");
    isDoneCheckbox.type = "checkbox";
    isDoneCheckbox.addEventListener("click", () => {
        task.isDone = task.isDone ? false : true; 
    });

    nodes.tasksDiv.appendChild(isDoneCheckbox);
        
}



function appendProjects() {

    projects.forEach(project => {
        const filterCheckbox = document.createElement("input");
        filterCheckbox.type = "checkbox";
        filterCheckbox.checked = true;
        
        filterCheckbox.addEventListener("click", () => {
            if (filterCheckbox.checked) {    
                for (const task of project.list) {
                    appendTask(task);
                }
            }
        });
    })
}




export { addEvents };