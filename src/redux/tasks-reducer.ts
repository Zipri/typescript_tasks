import firebase from "firebase/compat/app";
import {firestore} from "../firebase/firebase";
import {Dispatch} from "redux";
import {IAction, ITask} from "../types/types";

const SET_TASKS = '/SET_TASKS'
const ADD_TASK = '/ADD_TASK'
const DELETE_TASK = '/DELETE_TASK'
const SWITCH_TASK_STATUS = '/SWITCH_TASK_STATUS'
const UPDATE_TASK = '/UPDATE_TASK'

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
            return {...state, tasks: [action.task, ...state.tasks]}

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((item: ITask) => item.id !== action.id)
            }

        case SWITCH_TASK_STATUS:
            let buffer: ITask | undefined
            state.tasks.forEach((item: ITask) => {
                if (item.id === action.id) buffer = {
                    title: item.title,
                    completed: !item.completed,
                    createdAt: item.createdAt,
                    uid: item.uid,
                    id: item.id
                }
            })
            if (buffer?.completed) {
                return {
                    ...state,
                    tasks: [...state.tasks.filter((item: ITask) => item.id !== action.id), buffer]
                }
            } else {
                return {
                    ...state,
                    tasks: [buffer, ...state.tasks.filter((item: ITask) => item.id !== action.id)]
                }
            }

        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((item: ITask) => {
                    if (item.id === action.id) item.title = action.text
                    return item
                })
            }

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
const switchTaskStatus = (id: string) => ({type: SWITCH_TASK_STATUS, id})
const updateTask = (id: string, text: string) => ({type: UPDATE_TASK, id, text})

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
            buffer.sort((a, b) => a.completed > b.completed ? 1 : -1);
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

export const switchTaskCompletedStatus = (id: string, status: boolean) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    try {
        dispatch(switchTaskStatus(id))
        await firestore.collection('tasks').doc(id).update({completed: !status})
    } catch (error) {
        alert(error)
    } finally {
        dispatch(setLoading(false))
    }
}

export const updateTaskTitle = (id: string, text: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    try {
        dispatch(updateTask(id, text))
        await firestore.collection('tasks').doc(id).update({title: text})
    } catch (error) {
        alert(error)
    } finally {
        dispatch(setLoading(false))
    }
}
