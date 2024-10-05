import { nodes } from "./dom";
import { projects } from "./classes";


const options = (function () {
    
    const createDetails = task => {
        const detailsBtn = document.createElement("button");
        detailsBtn.textContent = "View/Edit Task Description";

        detailsBtn.addEventListener("click", () => {
            nodes.taskDescForm.reset();
            const textArea = document.querySelector("#taskDescForm textarea");
            textArea.textContent = task.description;
            nodes.taskDescDialog.showModal();
        });

        nodes.taskDescForm.addEventListener("submit", e => {
            const data = Object.fromEntries(new FormData(nodes.taskDescForm));
            e.preventDefault();
            task.description = data.newDesc;
            nodes.taskDescDialog.close();
        })

        return detailsBtn;
    }

    const createPriority = task => {
        const priorityBtn = document.createElement("button");
        priorityBtn.textContent = "Change Priority";
        return priorityBtn;
    }

    const createRemove = task => {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete Task";
        return removeBtn;
    }

    return { createDetails, createPriority, createRemove };

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
    dropDown.appendChild(options.createDetails(task));
    dropDown.appendChild(options.createPriority());
    dropDown.appendChild(options.createRemove());
    
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