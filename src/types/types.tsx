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
    createdAt: Date,
    uid: string,
    id: string
}