import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {addNewTask, deleteCurrentTask, getTasks} from "../../redux/tasks-reducer";
import firebase from "firebase/compat/app";
import {ITask} from "../../types/types";
import Loader from "../../common/Loader";
import PageTasks from "./PageTasks";

interface PTCProps {
    user: firebase.User | null,
    tasks: ITask[],
    loading: boolean,
    getTasks: (user: firebase.User | null) => Promise<void>,
    addNewTask: (user: firebase.User | null, text: string) => Promise<void>,
    deleteCurrentTask: (id: string) => Promise<void>,
}

const PageTasksContainer: FC<PTCProps> =
    ({user, tasks, loading, getTasks, addNewTask, deleteCurrentTask}) => {

    useEffect(() => {
        getTasks(user)
    }, [user])

    const addTask = (text: string) => addNewTask(user, text)
    const deleteTask = (id: string) => deleteCurrentTask(id)

    if (loading) return <Loader/>
    return <PageTasks user={user} tasks={tasks} addTask={addTask} deleteTask={deleteTask}/>
};

const mapStateToProps = (state: any) => ({
    tasks: state.tasksPage.tasks,
    loading: state.tasksPage.loading
})

export default connect(mapStateToProps, {
    getTasks, addNewTask, deleteCurrentTask
})(PageTasksContainer);