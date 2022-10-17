import firebase from "firebase/compat/app";
import {firestore} from "../firebase/firebase";
import {Dispatch} from "redux";
import {IAction, ITask} from "../types/types";

const SET_TASKS = '/SET_TASKS'
const ADD_TASK = '/ADD_TASK'
const DELETE_TASK = '/DELETE_TASK'

const SET_LOADING = '/SET_LOADING'

const initialState = {
    tasks: [],
    loading: true,
}

const tasksReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case SET_TASKS:
            return {...state, tasks: action.tasks}

        case ADD_TASK:
            return {...state, tasks: [...state.tasks, action.task]}

        case DELETE_TASK:
            return {...state, tasks: state.tasks.filter((item: ITask) => item.id !== action.id)}

        case SET_LOADING:
            return {...state, loading: action.loading}

        default:
            return state
    }
}
export default tasksReducer

const setTasks = (tasks: ITask[]) => ({type: SET_TASKS, tasks})
const addTask = (task: ITask) => ({type: ADD_TASK, task})
const deleteTask = (id: string) => ({type: DELETE_TASK, id})
const setLoading = (isLoading: boolean) => ({type: SET_LOADING, isLoading})


export const getTasks = (user: firebase.User | null) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    try {
        if (user) {
            const response = await firestore
                .collection("tasks").where('uid', '==', user?.uid).get()
            const data = response.docs.map(doc => doc.data())
            const buffer: ITask[] = []
            data.forEach(item => buffer.push({
                title: item.title,
                completed: item.completed,
                createdAt: item.createdAt,
                uid: item.uid,
                id: item.id
            }))
            dispatch(setTasks(buffer))
        }
    } catch (error) {
        alert(error)
    } finally {
        dispatch(setLoading(false))
    }
}

export const addNewTask = (user: firebase.User | null, text: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    try {
        const id = user?.uid + Date().toString().split(' ').join('')
        const newTask: ITask = {
            id: id,
            uid: user ? user.uid : 'null',
            title: text,
            completed: false,
            createdAt: Date().toString()
        }
        dispatch(addTask(newTask))
        await firestore.collection("tasks").doc(id).set(newTask)
    } catch (error) {
        alert(error)
    } finally {
        dispatch(setLoading(false))
    }
}

export const deleteCurrentTask = (id: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    try {
        dispatch(deleteTask(id))
        await firestore.collection('tasks').doc(id).delete()
    } catch (error) {
        alert(error)
    } finally {
        dispatch(setLoading(false))
    }
}
