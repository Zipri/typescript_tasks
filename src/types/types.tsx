interface IAddress {
    street: string,
    city: string,
    zipcode: string,
}

export interface IUserOld {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress
}

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
    loading: boolean
}