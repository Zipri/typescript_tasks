import React, {FC} from 'react';
import s from './Users.module.css'
import {IUser} from "../../types/types";

interface UIProps {
    user: IUser
}

const UserItem: FC<UIProps> = ({user}) => {
    return <div className={s.userBody}>
        {user.id}) {user.username} live in {user.address.city} city and {user.address.street} street
    </div>
};

export default UserItem;