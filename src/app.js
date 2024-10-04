import { nodes } from "./dom";
import { projects } from "./classes";


function appendTask(task) {

    const taskContainer = document.createElement("div");
    taskContainer.classList.add(`${task.project}`);

    const valueList = Object.values(task);

    for (let i = 0; i < 4; i++) {
        const taskProp = document.createElement("div");
        taskProp.textContent = valueList[i];
        taskContainer.appendChild(taskProp);
    }

    const isDoneCheckbox = document.createElement("input");
    isDoneCheckbox.type = "checkbox";
    isDoneCheckbox.addEventListener("click", () => {
        task.isDone = task.isDone ? false : true; 
    });

    taskContainer.appendChild(isDoneCheckbox);
    nodes.tasksDiv.appendChild(taskContainer);
        
}


function appendProjects() {
    
    nodes.projectsDiv.textContent = "";

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.style.display = "flex";

        const filterCheckbox = document.createElement("input");
        filterCheckbox.id = `${project.projectName}`;
        filterCheckbox.type = "checkbox";
        filterCheckbox.checked = true;
        
        filterCheckbox.addEventListener("click", () => {
            const taskDivs = document.querySelectorAll(`.${project.projectName}`);

            if (filterCheckbox.checked) {    
                for (const div of taskDivs) {
                    div.style.display = "grid";
                }
            } else {
                for (const div of taskDivs) {
                    div.style.display = "none";
                }
            }
        });

        const projectLabel = document.createElement("label");
        projectLabel.for = filterCheckbox.id;
        projectLabel.textContent = filterCheckbox.id;

        projectDiv.appendChild(filterCheckbox);
        projectDiv.appendChild(projectLabel);

    });
}


export { appendTask, appendProjects };