import Button from "react-bootstrap/Button"
import { Form, FormControl } from "react-bootstrap"
import Card from "./Card"
import type { TaskStatus } from "../utils/structure"
import { loadTasks, addTask, deleteBoard } from "../utils/boardfetch"
import { useState } from "react"
import './index.css';


export default function BoardLayout () {
    const [tasks, setTasks] = useState(loadTasks());
    const [add, setAdd] = useState(false);
    const [taskName, setTaskName] = useState("");

    const refresh = () => setTasks(loadTasks());

    const handleAdd = () => {
        if (taskName.trim() === "") return;
        addTask(taskName.trim(), "todo");
        setTaskName("");
        setAdd(false);
        refresh();
    }

    const clearBoard = () => {
        deleteBoard();
        refresh();
    }

    const cancelAdd = () => {
        setTaskName("");
        setAdd(false);
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
                        add ? (
                            <Form className="mt-2">
                                <FormControl
                                        type="text"
                                        placeholder="Enter task name"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        className="mb-2"
                                        autoFocus
                                        style={{ boxShadow: "none" }}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <Button size="sm" variant="primary" onClick={handleAdd} type="submit">
                                            Add
                                        </Button>
                                        <Button size="sm" variant="outline-secondary" onClick={cancelAdd}>
                                            Cancel
                                        </Button>
                                    </div>
                            </Form>
                        ) : ( 
                            <div>
                                <Button
                                    onClick={() => setAdd(true)}
                                    className="mt-2"
                                    size="sm"
                                    variant="outline-primary"
                                    style={{ width: "100%" }}
                                >
                                    + Add Task
                                </Button>
                            </div>
                        )
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