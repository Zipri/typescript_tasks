import React, {FC, useEffect, useState} from 'react';
import s from './Task.module.css'
import Loader from "../../common/Loader";
import List from "../../common/List";
import TaskItem from "./TaskItem";
import firebase from "firebase/compat/app";
import {firestore} from "../../firebase/firebase";
import DocumentData = firebase.firestore.DocumentData;


interface PTProps {
    user: firebase.User | null
}

const PageTasks: FC<PTProps> = ({user}) => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState<string>('')
    const [tasks, setTasks] = useState<DocumentData[]>([])


    useEffect(() => {
        getTasks()
    }, [])


    async function getTasks() {
        try {
            setLoading(true)
            firestore.collection("tasks").get()
                .then((doc) =>
                    setTasks(doc.docs.map(item => item.data())))
            setLoading(false)
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
    return <div>
        <div className={s.addTask}>
            <input value={value}
                   placeholder={"Write your task here"}
                   onChange={(e) => setValue(e.target.value)}/>
            <button onClick={handleAddTask}>Add</button>
        </div>
        {tasks
            ? <List items={tasks} renderItem={(task: DocumentData) => <TaskItem task={task} key={task.createdAt}/>}/>
            : <h1 style={{textAlign: 'center', color: 'white'}}>No tasks yet</h1>}
    </div>
};

export default PageTasks;