import React, {useEffect, useState} from 'react';

import Loader from "../../common/Loader";
import List from "../../common/List";
import UserItem from "./UserItem";
import {IUserOld} from "../../types/types";

const PageUsers = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<IUserOld[]>([])

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers () {
        try {
            setLoading(true)
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then((json: IUserOld[]) => {
                    setUsers(json)
                    setLoading(false)
                })
        } catch (error) {alert(error)}
    }

    if (loading) return <Loader/>
    return <div>
        <List items={users} renderItem={(user: IUserOld) => <UserItem user={user} key={user.id}/>}/>
    </div>
};

export default PageUsers;