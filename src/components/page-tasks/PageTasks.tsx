import React, {FC, useEffect, useId, useState} from 'react';
import s from './Task.module.css'
import Loader from "../../common/Loader";
import List from "../../common/List";
import TaskItem from "./TaskItem";
import firebase from "firebase/compat/app";
import {firestore} from "../../firebase/firebase";
import {ITask} from "../../types/types";

interface PTProps {
    user: firebase.User | null,
    tasks: ITask[],
    addTask: (text: string) => Promise<void>,
    deleteTask: (id: string) => Promise<void>,
    switchTaskStatus: (id: string, status: boolean) => Promise<void>,
    updateTask: (id: string, text: string) => Promise<void>,
}

const PageTasks: FC<PTProps> =
    ({user, tasks, addTask, deleteTask, switchTaskStatus, updateTask}) => {
        const [value, setValue] = useState<string>('')

        const handleAddTask = () => {
            if (value !== '' && value.trim()) {
                addTask(value.trim())
                setValue('')
            } else {
                alert("Error #13: 'empty task'")
            }
        }

        if (!user) return <h1 style={{textAlign: 'center', color: 'white'}}>Please Sign in</h1>
        return <div>
            <div className={s.addTask}>
                <input value={value}
                       placeholder={"Write your task here"}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') handleAddTask()
                       }}
                       onChange={(e) => setValue(e.target.value)}/>
                <button onClick={handleAddTask}>Add</button>
            </div>
            {tasks?.length
                ? <List items={tasks}
                        renderItem={(task: ITask) => <TaskItem task={task}
                                                               deleteTask={deleteTask}
                                                               switchTaskStatus={switchTaskStatus}
                                                               updateTask={updateTask}
                                                               key={task.id + Math.random()}/>}/>
                : <h1 style={{textAlign: 'center', color: 'white'}}>No tasks yet</h1>}
        </div>
    };

export default PageTasks;