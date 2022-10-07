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
    id: number,
    title: string,
    completed: boolean
}