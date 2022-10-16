import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import firebase from "firebase/compat/app";
import {auth} from "./firebase/firebase";
import Loader from "./common/Loader";
import PageTasksContainer from "./components/page-tasks/PageTasksContainer";


const App = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false)
        })

    }, [])

    if (loading) return <Loader/>
    return <div>
        <Header user={user}/>
        <PageTasksContainer user={user}/>
    </div>
}

export default App;
