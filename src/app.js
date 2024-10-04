import { nodes } from "./dom";
import { projects } from "./classes";


const taskOptionBtns = (function () {
    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "View/Edit Task Description";

    const priorityBtn = document.createElement("button");
    priorityBtn.textContent = "Change Priority";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete Task";

    return { detailsBtn, priorityBtn, removeBtn };

}());


function appendTask(task) {

    const taskContainer = document.createElement("div");

    const valueList = Object.values(task);

    for (let i = 0; i < 3; i++) {
        const taskProp = document.createElement("div");
        taskProp.textContent = valueList[i];
        taskContainer.appendChild(taskProp);
    }


    const taskProject = document.createElement("div");
    const projectObj = projects.at(task.projectID);
    taskProject.textContent = projectObj.projectName;
    taskContainer.appendChild(taskProject);

    taskContainer.title = projectObj.projectName;

    const isDoneCheckbox = document.createElement("input");
    isDoneCheckbox.type = "checkbox";
    isDoneCheckbox.addEventListener("click", () => {
        task.isDone = task.isDone ? false : true; 
    });
    taskContainer.appendChild(isDoneCheckbox);


    const dropDown = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Options";
    
    dropDown.appendChild(summary);
    dropDown.appendChild(taskOptionBtns.detailsBtn);
    dropDown.appendChild(taskOptionBtns.priorityBtn);
    dropDown.appendChild(taskOptionBtns.removeBtn);
    
    taskContainer.appendChild(dropDown);

    nodes.tasksDiv.appendChild(taskContainer);
        
}


function appendProjects() {

    nodes.projectsDiv.textContent = "";

    projects.forEach(project => {
        const projectContainer = document.createElement("div");
        projectContainer.style.display = "flex";

        const filterCheckbox = document.createElement("input");
        filterCheckbox.id = `${project.projectName}`;
        filterCheckbox.type = "checkbox";
        filterCheckbox.checked = true;
        
        filterCheckbox.addEventListener("click", () => {
            const taskDivs = document.querySelectorAll(`div[title='${project.projectName}']`);

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

        projectContainer.appendChild(filterCheckbox);
        projectContainer.appendChild(projectLabel);
        nodes.projectsDiv.appendChild(projectContainer);

    });
}


export { appendTask, appendProjects };