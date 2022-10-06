import React, {useEffect, useState} from 'react';
import {IUser} from "../../types/types";
import Loader from "../../common/Loader";
import List from "../../common/List";
import UserItem from "./UserItem";

const PageUsers = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers () {
        try {
            setLoading(true)
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then((json: IUser[]) => {
                    setUsers(json)
                    setLoading(false)
                })
        } catch (error) {alert(error)}
    }

    if (loading) return <Loader/>
    return <div>
        <List items={users} renderItem={(user: IUser) => <UserItem user={user} key={user.id}/>}/>
    </div>
};

export default PageUsers;