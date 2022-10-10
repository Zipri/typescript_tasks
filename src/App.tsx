import React, {useContext} from 'react';
import './App.css';
import PageUsers from "./components/page-users/PageUsers";
import PageTasks from "./components/page-tasks/PageTasks";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import {AuthContext} from "./firebase/AuthContext";
import {auth} from "./firebase/firebase";
import firebase from "firebase/compat/app";

const App = () => {
    const user = useContext(AuthContext)
    const handleLoginGoogle = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            await auth.signInWithPopup(provider)
        } catch (error) {
            alert(`Oops, something went wrong\n${error}`)
        }
    }
    const loginEmail = async (email: string, password: string) => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            alert(`Oops, something went wrong\n${error}`)
        }
    }
    const registrationEmail = async (email: string, password: string) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
        } catch (error) {
            alert(`Oops, something went wrong\n${error}`)
        }
    }
    const signOut = async () => {
        await auth.signOut();
    }

    return <BrowserRouter>
        <Header user={user} handleLoginGoogle={handleLoginGoogle}
                signOut={signOut} loginEmail={loginEmail} registrationEmail={registrationEmail}/>
        <Routes>
            <Route path='/' element={<PageTasks user={user}/>}/>
            <Route path='/tasks' element={<PageTasks user={user}/>}/>
            <Route path='/users' element={<PageUsers/>}/>
            <Route path='*' element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
        </Routes>
    </BrowserRouter>
}

export default App;
