import { Todo, Project, projects, nodes } from "./classes.js";
import { appendTask, appendProjects } from "./app.js";



function addEvents() {
    nodes.addProjectBtn.addEventListener("click", () => {
        nodes.projectForm.reset();
        nodes.addProjectDialog.showModal();
    });


    nodes.addTaskBtn.addEventListener("click", () => {
        nodes.taskForm.reset();

        if (projects.length === 0) {
            projects.push(new Project("Project 1", 0));
            appendProjects();
            toggleProjectDisplay();
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
    
        const project = projects.find(project => project.projectName === data.projectName);

        if (project !== undefined) alert(`There is already a project named ${data.projectName}.`);
        else {
                nodes.addProjectDialog.close();
                projects.push(new Project(data.projectName, projects.length));
                appendProjects();
                toggleProjectDisplay();
            }
    });


    nodes.taskForm.addEventListener("submit", e => {
        const data = Object.fromEntries(new FormData(nodes.taskForm));
        e.preventDefault();
        nodes.addTaskDialog.close();
        const newTask = new Todo(data.title, data.description, data.dueDate,
            data.priority, data.selectProject);
        
        const projectObj = projects.at(parseInt(data.selectProject));

        projectObj.addTask(newTask);

        appendTask(newTask);
        toggleTaskDisplay();
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
    if (nodes.projectsDiv.textContent === "") {
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



function toggleTaskDisplay() {
    if (nodes.tasksDiv.textContent === "") {
        document.querySelector("#noTasks").style.display = "block";
        document.querySelector("#tasks").style.display = "none";
        document.querySelector("#heading").style.display = "none";
    } else {
        document.querySelector("#noTasks").style.display = "none";
        document.querySelector("#tasks").style.display = "flex";
        document.querySelector("#heading").style.display = "grid";
    }
}



export { addEvents, toggleTaskDisplay, toggleProjectDisplay };