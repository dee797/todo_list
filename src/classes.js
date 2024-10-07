// Refactor: use functions for submit events, have taskIDs, function for finding
// specific task in Project list, module exclusively for adding event listeners
class Todo {
    constructor(title, description, dueDate, priority, projectID, isDone=false, container="") {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectID = projectID;
        this.isDone = isDone;
        this.description = description;
        this.container = container;
    }
}


class Project {
    list = [];

    constructor(projectName, projectID) {
        this.projectName = projectName;
        this.projectID = projectID;
    }

    addTask(task) {
        this.list.push(task);
    }

    removeTask(task) {
        const i = this.list.indexOf(task);
        if (i !== -1) this.list.splice(i, 1);
        else console.log("Task not in project list");
    }

    get listLength() {
        return this.list.length;
    }
}


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


    const createTaskDescDialog = () => {
        const taskDescDialog = document.createElement("dialog");
        const taskDescForm = document.createElement("form");
        const textArea = document.createElement("textarea");
        textArea.name = "newDesc";

        const button1 = document.createElement("button");
        button1.type = "button";
        button1.formMethod = "dialog";
        button1.textContent = "Cancel";
        button1.addEventListener("click", () => {
            taskDescDialog.close();
            taskDescForm.reset();
        });

        const button2 = document.createElement("button");
        button2.type = "submit";
        button1.formMethod = "post";
        button2.textContent = "Submit";

        taskDescDialog.appendChild(taskDescForm);
        taskDescForm.appendChild(textArea);
        taskDescForm.appendChild(button1);
        taskDescForm.appendChild(button2);

        document.body.appendChild(taskDescDialog);

        return {taskDescDialog, taskDescForm, textArea }

    };

    const createPriorityDialog = () => {
        const priorityDialog = document.createElement("dialog");
        const priorityForm = document.createElement("form");
        const pContainer = document.createElement("p");
        pContainer.textContent = "Priority: ";

        const button1 = document.createElement("button");
        button1.type = "button";
        button1.formMethod = "dialog";
        button1.textContent = "Cancel";

        button1.addEventListener("click", () => priorityDialog.close());

        const button2 = document.createElement("button");
        button2.type = "submit";
        button1.formMethod = "post";
        button2.textContent = "Submit";

        const radioBtnList = [];

        for (let i = 0; i < 3; i++) {
            let text;
            let value;
            switch (i) {
                case 0:
                    text = "  High";
                    value = "High";
                    break;
                case 1:
                    text = "  Medium";
                    value = "Medium";
                    break;
                case 2:
                    text = "  Low";
                    value = "Low";
            }

            const label = document.createElement("label");
            label.textContent = text;

            const input = document.createElement("input");
            input.name = "priority";
            input.type = "radio";
            input.required = true;
            input.value = value;

            radioBtnList.push(input);
            label.appendChild(input);
            pContainer.appendChild(label);

        }

        priorityForm.appendChild(pContainer);
        priorityForm.appendChild(button1);
        priorityForm.appendChild(button2);
        priorityDialog.appendChild(priorityForm);

        document.body.appendChild(priorityDialog);

        return { radioBtnList, priorityDialog, priorityForm }
    }


    return { addProjectBtn, addTaskBtn, addProjectDialog, 
            addTaskDialog, projectForm, taskForm,
            cancelProjectBtn, cancelTaskBtn, projectOptions,
            tasksDiv, projectsDiv, createTaskDescDialog,
            createPriorityDialog }
}());


const projects = [];

const setItems = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}


export { Todo, Project, projects, nodes, setItems }