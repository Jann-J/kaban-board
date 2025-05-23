import Button from "react-bootstrap/Button"
import Card from "./Card"
import type { TaskStatus } from "../utils/structure"
import { loadTasks, addTask, deleteBoard } from "../utils/boardfetch"
import { useState } from "react"
import './index.css';


export default function BoardLayout () {
    const [tasks, setTasks] = useState(loadTasks());
    
    const refresh = () => setTasks(loadTasks());

    const handleAdd = (name: string, status: TaskStatus) => {
        addTask(name, status);
        refresh();
    }

    const clearBoard = () => {
        deleteBoard();
        refresh();
    }

    return (
        <div>
        <div className="board-container">
            {(["todo", "doing", "testing", "done"] as TaskStatus[]).map((status) => (
                <div key={status} className="column">
                    <h5 style={{ textAlign: "center" }}>{status.toUpperCase()}</h5>
                    {tasks[status].map((task) => (
                        <Card key={task.name} task={task} onUpdate={refresh} />
                    ))}
                    {status === "todo" && (
                        <Button
                            onClick={() => {
                                const name = prompt("Enter task name");
                                if (name) {
                                    handleAdd(name, status);
                                }
                            }}
                            className="mt-2"
                            size="sm"
                            variant="outline-primary"
                            style={{ width: "100%" }}
                        >
                            + Add Task
                        </Button>
                    )}
                </div>
            ))}
            
        </div>
        <div className='col text-center mt-4'>
            <Button variant='danger' onClick={clearBoard}>Clear Board</Button>
        </div>
        </div>
    )
}