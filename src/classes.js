// include options to modify each todo (...)
class Todo {
    constructor(title, description, dueDate, priority, project, isDone=false) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.isDone = isDone;
        this.description = description;
    }
}


class Project {
    list = [];

    constructor(projectName) {
        this.projectName = projectName;
    }

    addTask(task) {
        this.list.push(task);
    }

    get listLength() {
        return this.list.length;
    }
}

const projects = [new Project("Default_Project")];

export { Todo, Project, projects }