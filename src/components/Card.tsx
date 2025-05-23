// import { Card } from "react-bootstrap";
import { Card as BootstrapCard, Button, CardTitle, CloseButton, FormControl} from "react-bootstrap"
import { deleteTask, editTaskName } from "../utils/boardfetch";
import { useState } from "react";
import type { TaskStatus, Task } from "../utils/structure";

const statusOrder : TaskStatus[] = ["todo", "doing", "testing", "done"];

interface Props {
    task : Task,
    onUpdate: () => void;
}

export default function Card({task, onUpdate } : Props){
    const [newName, setNewName] = useState(task.name);
    const [isEditing, setIsEditing] = useState(false);

    const HandleDelete = () => {
        deleteTask(task.name);
        onUpdate();
    }

    const handleRename = () => {
        if (newName.trim() === task.name) {
        // Name hasn't changed, just close the editing mode
        setIsEditing(false);
        return;
        }
        editTaskName(task.name, newName.trim());
        setIsEditing(false);
        onUpdate();
    }

    const moveLeft = () => {
        const idx = statusOrder.indexOf(task.status);
        if (idx > 0) {
            localStorage.setItem(task.name, statusOrder[idx - 1]);
            onUpdate();
        }
    }

    const moveRight = () => {
        const idx = statusOrder.indexOf(task.status);
        if(idx < statusOrder.length - 1){
            localStorage.setItem(task.name, statusOrder[idx+1]);
            onUpdate();
        }
    }

    return (
        <div>
            <BootstrapCard 
                className="p-2 m-2" 
                style={{
                    minHeight: "80px",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    textAlign: "center"
                }}>
                {isEditing ? (
                    <div>
                        <FormControl
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                        <div className="d-flex justify-content-around mt-1">
                            <Button onClick={handleRename} size="sm" variant="success">Save</Button>
                            <Button onClick={() => {
                                setNewName(task.name); // Reset back
                                setIsEditing(false);
                            }} size="sm" variant="secondary">Cancel</Button>
                        </div>
                    </div>
                    ) : (
                        <div >
                           <CloseButton onClick={HandleDelete} style={{position: "absolute", right: "8px", top: "8px", zIndex: 1, fontSize: "0.5rem"}}/>

                            <CardTitle style={{ fontSize: "1rem", wordBreak: "break-word" }}>{task.name}</CardTitle>
                            <div style={{display: "flex", justifyContent: "space-around", marginTop: "1rem" }}>
                                <Button
                                    onClick={moveLeft}
                                    disabled={task.status === "todo"}
                                    variant="primary"
                                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", }}>
                                        &lt;
                                </Button>
                                <Button 
                                    onClick={() => setIsEditing(true)}
                                    variant="primary"
                                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}>
                                        Edit
                                </Button>
                                <Button
                                    onClick={moveRight}
                                    disabled={task.status === "done"}
                                    variant="primary"
                                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}>
                                        &gt;
                                </Button>
                            </div>
                        </div>
                    )
                }
            </BootstrapCard>
        </div>
    )
}