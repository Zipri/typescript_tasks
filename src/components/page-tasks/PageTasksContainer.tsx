import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {getTasks} from "../../redux/tasks-reducer";
import firebase from "firebase/compat/app";
import {ITask} from "../../types/types";
import Loader from "../../common/Loader";
import PageTasks from "./PageTasks";

interface PTCProps {
    user: firebase.User | null,
    tasks: ITask[],
    loading: boolean,
    getTasks: (user: firebase.User | null) => Promise<void>
}

const PageTasksContainer: FC<PTCProps> = ({user, tasks, loading, getTasks}) => {
    useEffect(() => {
        getTasks(user)
    }, [user])


    if (loading) return <Loader/>
    return <PageTasks user={user} tasks={tasks}/>
};

const mapStateToProps = (state: any) => ({
    tasks: state.tasksPage.tasks,
    loading: state.tasksPage.loading
})

export default connect(mapStateToProps, {
    getTasks
})(PageTasksContainer);