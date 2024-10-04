// include options to modify each todo (...)
class Todo {
    constructor(title, description, dueDate, priority, projectID, isDone=false) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectID = projectID;
        this.isDone = isDone;
        this.description = description;
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

    get listLength() {
        return this.list.length;
    }
}

const projects = [];

export { Todo, Project, projects }