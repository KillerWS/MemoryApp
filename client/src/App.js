import React from "react";
import {Container } from '@material-ui/core'
import { BrowserRouter, Route, Routes, } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth"
import Cookies from 'universal-cookie'
import AuthTest from "./components/Auth/AuthTest";
import Main from "./components/Test/Main";


const cookies=new Cookies()

const authToken= cookies.get('falseToken');

const App=()=>{
    // if(!authToken) return <Auth/>

    return(
        <BrowserRouter>
        <Container maxidth="lg">
        <Navbar/>
        
        {/* <Home/> */}
        <Routes>
            <Route path="/" exact element={<Home/>}></Route>
            <Route path="/auth" element={<Auth/>}></Route>
            <Route path="/test" element={<AuthTest/>}></Route>
            <Route path="/Dataflowtest" element={<Main/>}></Route>
        </Routes>

    </Container>
    </BrowserRouter>
    )

}

export default App