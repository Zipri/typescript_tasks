import React, {FC, useState} from 'react';
import s from './Task.module.css'
import {ITask} from "../../types/types";
import TextareaAutosize from 'react-textarea-autosize';

interface TIProps {
    task: ITask,
    deleteTask: (id: string) => Promise<void>,
    switchTaskStatus: (id: string, status: boolean) => Promise<void>,
    updateTask: (id: string, text: string) => Promise<void>,
}

const TaskItem: FC<TIProps> = ({task, deleteTask, switchTaskStatus, updateTask}) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(task.title)

    const handleDeleteTask = () => deleteTask(task.id)
    const handleSwitchTaskStatus = () => switchTaskStatus(task.id, task.completed)
    const handleUpdateTask = () => {
        setEditMode(false)
        updateTask(task.id, value)
    }

    return <div className={s.task}>
        {editMode
            ? <TextareaAutosize value={value}
                                autoFocus={true}
                                onBlur={handleUpdateTask}
                                className={s.updateTask}
                                onChange={(e) => setValue(e.target.value)}/>
            : <>
                <div className={task.completed ? s.completed : s.taskBody}
                     onClick={handleSwitchTaskStatus}>
                    {task.title}
                </div>
                {!task.completed && <button className={s.edit} onClick={() => setEditMode(true)}>
                    Edit
                </button>}
                <button className={s.delete} onClick={handleDeleteTask}>
                    &times;
                </button>
            </>}
    </div>
};

export default TaskItem;

