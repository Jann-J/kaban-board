export type TaskStatus = "todo" | "doing" | "testing" | "done";

export interface Task {
  name: string;
  status: TaskStatus;
}