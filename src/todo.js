// include options to modify each todo (...)
class Todo {
    constructor(title, description, dueDate, priority, isDone=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
    }
}


class Project {
    //private properties
    #projectName = "";
    #list = [];

    appendTask(task) {
        this.#list.push(task);
    }

    get projectName() {
        return this.#projectName;
    }

    set projectName(name) {
        if (name === "") alert("Project must have a name.")
        else this.#projectName = name;
    }

    get listLength() {
        return this.#list.length;
    }

}

export { Todo, Project }