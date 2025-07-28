import { TodoList } from './todo.js';
const myTodoList = new TodoList();
myTodoList.addTask("Acheter du pain"); 
myTodoList.addTask("Faire la vaisselle");
myTodoList.addTask("Regarder un film");
myTodoList.markTaskCompleted(0);
console.log("Mes tâches :");
const tasks = myTodoList.listTasks();
tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.description} - ${task.completed ? 'Terminée' : 'À faire'}`);
});
