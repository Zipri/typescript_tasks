export interface ITask {
    title: string,
    completed: boolean,
    createdAt: string,
    uid: string,
    id: string
}

export interface IAction {
    type: string,
    tasks: ITask[],
    task: ITask,
    id: string,
    loading: boolean,
    text: string
}