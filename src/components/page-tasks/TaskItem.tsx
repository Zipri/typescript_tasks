import React, {FC} from 'react';
import s from './Task.module.css'
import {ITask} from "../../types/types";

interface TIProps {
    task: ITask,
    deleteTask: (id: string) => Promise<void>
}

const TaskItem: FC<TIProps> = ({task, deleteTask}) => {
    const handleDeleteTask = () => deleteTask(task.id)
    return <div className={s.task}>
        <div className={task.completed ? s.completed : s.taskBody}>
            {task.title}
        </div>
        <button className={s.edit}>
            Edit
        </button>
        <button className={s.delete} onClick={handleDeleteTask}>
            &times;
        </button>
    </div>
};

export default TaskItem;