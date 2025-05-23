import type { Task, TaskStatus } from "./structure";

export function addTask(name: string, status: TaskStatus): void {
  localStorage.setItem(name, status);
}

export function editTaskName(oldName: string, newName: string): void {
  const status = localStorage.getItem(oldName) as TaskStatus | null;
  if (!status) return;

  localStorage.removeItem(oldName);
  localStorage.setItem(newName, status);
}

export function moveTask(name: string, newType: TaskStatus): void {
    localStorage.setItem(name, newType);
}

export function deleteTask(name: string):void {
    localStorage.removeItem(name);
}

export function loadTasks(): Record<TaskStatus, Task[]> {
    const tasks : Record<TaskStatus, Task[]> = {
        todo: [],
        doing: [],
        testing: [],
        done: []
    }

    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(!key) continue;

        const status = localStorage.getItem(key) as TaskStatus;
        if(["todo", "doing", "testing", "done"].includes(status)){
            tasks[status].push({name: key, status});
        }

    }
    return tasks;
}

export function deleteBoard(): void {
    localStorage.clear();
}