import React from "react";
import Header from "./components/Header";
import Footer from './components/Footer'
import { Outlet } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import NotFoundPage from "./pages/NotFoundPage";
import styles from './App.module.scss'

function App(){
    return (
        <Router>
          <Routes>
                <Route path='/' element={<Layout/>} >
                    <Route index element={<Home/>}/>
                    <Route path='favorites' element={<Favorites/>}/>
                    <Route path='history' element={<History/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

function Layout(){
    return (
        <div className={styles.app}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>

    )
}

export default App