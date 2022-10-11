import React, {useEffect, useState} from 'react';
import './App.css';
import PageUsers from "./components/page-users/PageUsers";
import PageTasks from "./components/page-tasks/PageTasks";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import firebase from "firebase/compat/app";
import {auth} from "./firebase/firebase";
import Loader from "./common/Loader";


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
    return <BrowserRouter>
        <Header user={user}/>
        <Routes>
            <Route path='/' element={<PageTasks user={user}/>}/>
            <Route path='/tasks' element={<PageTasks user={user}/>}/>
            <Route path='/users' element={<PageUsers/>}/>
            <Route path='*' element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
        </Routes>
    </BrowserRouter>
}

export default App;
