// include options to modify each todo (...)
class Todo {
    constructor(title, description, dueDate, priority, project, isDone=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.isDone = isDone;
    }
}


class Project {
    //private property
    #list = [];

    constructor(projectName) {
        this.projectName = projectName;
    }

    appendTask(task) {
        this.#list.push(task);
    }

    get listLength() {
        return this.#list.length;
    }

}

export { Todo, Project }