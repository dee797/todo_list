import { projects, nodes, setItems } from "./classes";
import { toggleTaskDisplay } from "./dom";


const options = (function () {
    
    const changeDetails = task => {
        const detailObjects = nodes.createTaskDescDialog();
        const detailsBtn = document.createElement("button");
        detailsBtn.textContent = "View/Edit Task Description";

        detailsBtn.addEventListener("click", () => {
            detailObjects.taskDescForm.reset();
            detailObjects.textArea.textContent = task.description;
            detailObjects.taskDescDialog.showModal();
        });

        detailObjects.taskDescForm.addEventListener("submit", e => {
            const data = Object.fromEntries(new FormData(detailObjects.taskDescForm));
            e.preventDefault();
            task.description = data.newDesc;
            detailObjects.taskDescDialog.close();
            setItems();

        });

        return detailsBtn;
    }

    const changePriority = task => {
        const priorityObjects = nodes.createPriorityDialog();
        const priorityBtn = document.createElement("button");
        priorityBtn.textContent = "Change Priority";

        priorityBtn.addEventListener("click", () => {
            priorityObjects.priorityForm.reset();
            const option = priorityObjects.radioBtnList.find(option => option.value === task.priority);
            option.checked = true;

            priorityObjects.priorityDialog.showModal();
        });

        priorityObjects.priorityForm.addEventListener("submit", e => {
            const data = Object.fromEntries(new FormData(priorityObjects.priorityForm));
            e.preventDefault();
            task.priority = data.priority;

            const children = task.container.children;
            const priorityDiv = children.item(2);
            priorityDiv.textContent = task.priority;

            priorityObjects.priorityDialog.close();
            setItems();

        });

        return priorityBtn;
    }

    const removeTask = task => {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete Task";

        removeBtn.addEventListener("click", () => {
            const projectObj = projects.at(task.projectID);
            projectObj.removeTask(task);

            task.container.remove();

            toggleTaskDisplay();
            setItems();
        });

        return removeBtn;
    }

    return { changeDetails, changePriority, removeTask };

}());


function appendTask(task) {

    const taskContainer = document.createElement("div");
    const projectObj = projects.at(task.projectID);
    taskContainer.classList.add(projectObj.projectName.split(" ").join("_"));

    const valueList = Object.values(task);

    for (let i = 0; i < 3; i++) {
        const taskProp = document.createElement("div");
        taskProp.textContent = valueList[i];
        taskContainer.appendChild(taskProp);
    }


    const taskProject = document.createElement("div");
    taskProject.textContent = projectObj.projectName;
    taskContainer.appendChild(taskProject);


    const isDoneCheckbox = document.createElement("input");
    isDoneCheckbox.type = "checkbox";
    isDoneCheckbox.addEventListener("click", () => {
        task.isDone = task.isDone ? false : true;
        setItems();
    });
    
    isDoneCheckbox.checked = task.isDone ? true : false;
    taskContainer.appendChild(isDoneCheckbox);


    const dropDown = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Options";
    
    dropDown.appendChild(summary);
    dropDown.appendChild(options.changeDetails(task));
    dropDown.appendChild(options.changePriority(task));
    dropDown.appendChild(options.removeTask(task));
    
    taskContainer.appendChild(dropDown);

    nodes.tasksDiv.appendChild(taskContainer);
    task.container = taskContainer;

    setItems();
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
            const taskDivs = document.querySelectorAll(`div.${project.projectName.split(" ").join("_")}`);

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
        projectLabel.setAttribute("for", filterCheckbox.id);
        projectLabel.textContent = filterCheckbox.id;

        projectContainer.appendChild(filterCheckbox);
        projectContainer.appendChild(projectLabel);
        nodes.projectsDiv.appendChild(projectContainer);

    });   
    
    setItems();
}


export { appendTask, appendProjects };