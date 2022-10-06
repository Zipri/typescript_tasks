import React, {FC} from 'react';
import s from './Task.module.css'
import {ITask} from "../../types/types";

interface TIProps {
    task: ITask
}

const TaskItem: FC<TIProps> = ({task}) => {
    return <div className={s.task}>
        <div className={task.completed ? s.completed : s.taskBody}>
            {task.title}
        </div>
        <button className={s.edit}>
            Edit
        </button>
        <button className={s.delete}>
            &times;
        </button>
    </div>
};

export default TaskItem;