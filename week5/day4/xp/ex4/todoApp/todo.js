class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        const task = {
            description: description,
            completed: false
        };
        this.tasks.push(task);
    }

    markTaskCompleted(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].completed = true;
        }
    }

    listTasks() {
        return this.tasks;
    }
}

const todoListInstance = new TodoList();

export { TodoList, todoListInstance };
