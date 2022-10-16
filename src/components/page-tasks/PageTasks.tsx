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
    tasks: ITask[]
}

const PageTasks: FC<PTProps> = ({user, tasks}) => {
    const [value, setValue] = useState<string>('')

    // useEffect(() => {
    //     getTasks().then((data) => {
    //         setTasks(data?.map(item => ({
    //             title: item.title,
    //             completed: item.completed,
    //             createdAt: item.createdAt,
    //             uid: item.uid,
    //             id: item.id
    //         })))
    //         setLoading(false)
    //     })
    // }, [])


    async function getTasks() {
        try {
            if (user) {
                const response = await firestore
                    .collection("tasks").where('uid', '==', user?.uid).get()
                return response.docs.map(doc => doc.data())
            }
        } catch (error) {
            alert(error)
        }
    }
    async function addTask(text: string) {
        try {
            const newTask = {
                id: user?.uid + Date().toString(),
                uid: user?.uid,
                title: text,
                completed: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
            // @ts-ignore
            setTasks([...tasks, newTask])
            await firestore.collection("tasks").add(newTask)
        } catch (error) {
            alert(error)
        }
    }
    const handleAddTask = () => {
        addTask(value).then(() => setValue(''))
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
                    renderItem={(task: ITask) => <TaskItem task={task} key={task.id+Math.random()}/>}/>
            : <h1 style={{textAlign: 'center', color: 'white'}}>No tasks yet</h1>}
    </div>
};

export default PageTasks;