import { Project, Todo, projects, setItems } from "./classes";
import { addEvents, toggleProjectDisplay, toggleTaskDisplay } from "./dom";
import { appendProjects, appendTask } from "./app";
import "./styles.css";



const getItems = () => {
    return JSON.parse(localStorage.getItem("projects"));
}


addEventListener("DOMContentLoaded", () => {
    const items = getItems();
    
    if (items !== null && items.length !== 0) {

        for (const item of items) {
            const newProject = new Project(item.projectName, item.projectID);
            const newProjectList = newProject.list;
            projects.push(newProject);


            for (const task of item.list) {
                const newTask = new Todo(task.title, task.description, task.dueDate,
                                task.priority, task.projectID, task.isDone, task.container);
                newProjectList.push(newTask);
                appendTask(newTask);
            }
        }
        console.log(projects);
        appendProjects();
        toggleTaskDisplay();
        toggleProjectDisplay();
    }
});

addEvents();

addEventListener("beforeunload", () =>  {
    if (getItems()) setItems();
});
