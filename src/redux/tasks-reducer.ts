import firebase from "firebase/compat/app";
import {firestore} from "../firebase/firebase";
import {Dispatch} from "redux";
import {IAction, ITask} from "../types/types";
import {log} from "util";

const SET_TASKS = '/SET_TASKS'
const SET_LOADING = '/SET_LOADING'

const initialState = {
    tasks: [],
    loading: true,
}

const tasksReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }

        case SET_LOADING:
            return {...state, loading: action.loading}

        default:
            return state
    }
}
export default tasksReducer

const setTasks = (tasks: ITask[]) => ({type: SET_TASKS, tasks})
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
        dispatch(setLoading(false))
    } catch (error) {
        alert(error)
    }
}
