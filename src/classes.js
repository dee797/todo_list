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

    const taskDescDialog = document.querySelector("#taskDesc");
    const taskDescForm = document.querySelector("#taskDescForm");

    const cancelDescBtn = document.querySelector("#cancelDesc");

    const priorityDialog = document.querySelector("#changePriority");
    const priorityForm = document.querySelector("#priorityForm");

    const cancelPriorityBtn = document.querySelector("#cancelPriority");

    return { addProjectBtn, addTaskBtn, addProjectDialog, 
            addTaskDialog, projectForm, taskForm,
            cancelProjectBtn, cancelTaskBtn, projectOptions,
            tasksDiv, projectsDiv, taskDescDialog,
            taskDescForm, cancelDescBtn, priorityDialog,
            priorityForm, cancelPriorityBtn }
}());



const projects = [];

export { Todo, Project, projects, nodes }