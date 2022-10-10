import React, {FC, useEffect, useState} from 'react';
import s from './Task.module.css'
import Loader from "../../common/Loader";
import List from "../../common/List";
import TaskItem from "./TaskItem";
import firebase from "firebase/compat/app";
import {firestore} from "../../firebase/firebase";
import {ITask} from "../../types/types";


interface PTProps {
    user: firebase.User | null
}

const PageTasks: FC<PTProps> = ({user}) => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState<string>('')
    const [tasks, setTasks] = useState<ITask[]>([])


    useEffect(() => {
        getTasks().then(() => setLoading(false))
    }, [])


    async function getTasks() {
        try {
            setLoading(true)
            if (user) {
                const res = await firestore.collection("tasks")
                    .where('uid', '==', user.uid).get()
                console.log(res.docs.map((doc) => doc.data()))
            }
        } catch (error) {
            alert(error)
        }
    }

    async function addTask(text: string) {
        try {
            await firestore.collection("tasks").add({
                uid: user?.uid,
                title: text,
                completed: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        } catch (error) {
            alert(error)
        }
    }

    const handleAddTask = () => {
        addTask(value).then(() => setValue(''))
    }

    if (loading) return <Loader/>
    if (!user) return <h1 style={{textAlign: 'center', color: 'white'}}>Please Sign in</h1>
    return <div>
        <div className={s.addTask}>
            <input value={value}
                   placeholder={"Write your task here"}
                   onKeyPress={(e) => {if (e.key === 'Enter') handleAddTask()}}
                   onChange={(e) => setValue(e.target.value)}/>
            <button onClick={handleAddTask}>Add</button>
        </div>
        {tasks.length
            ? <List items={tasks}
                    renderItem={(task: ITask) => <TaskItem task={task} key={task.createdAt.toDateString()}/>}/>
            : <h1 style={{textAlign: 'center', color: 'white'}}>No tasks yet</h1>}
    </div>
};

export default PageTasks;