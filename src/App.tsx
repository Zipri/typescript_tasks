import React from 'react';
import './App.css';
import PageUsers from "./components/page-users/PageUsers";
import PageTasks from "./components/page-tasks/PageTasks";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
    return <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<PageTasks/>}/>
            <Route path='/tasks' element={<PageTasks/>}/>
            <Route path='/users' element={<PageUsers/>}/>
            <Route path='*' element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
        </Routes>
    </BrowserRouter>
}

export default App;
