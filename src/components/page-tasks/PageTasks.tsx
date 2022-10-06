import React, {useEffect, useState} from 'react';
import s from './Task.module.css'
import {ITask} from "../../types/types";
import Loader from "../../common/Loader";
import List from "../../common/List";
import TaskItem from "./TaskItem";

const PageTasks = () => {
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState<ITask[]>([])

    useEffect(() => {
        getTasks()
    }, [])


    async function getTasks () {
        try {
            setLoading(true)
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
                .then(response => response.json())
                .then((json: ITask[]) => {
                    setTasks(json)
                    setLoading(false)
                })
        } catch (error) {alert(error)}
    }

    if (loading) return <Loader/>
    return <div>
        <form className={s.addTask}>
            <input/>
            <button>Add</button>
        </form>
        <List items={tasks} renderItem={(task: ITask) => <TaskItem task={task} key={task.id}/>}/>
    </div>
};

export default PageTasks;