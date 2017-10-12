import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Situations from './components/Situations/Situations'
import LevelOne from './components/LevelOne/LevelOne'
import LevelTwo from './components/LevelTwo/LevelTwo'
import LevelThree from './components/LevelThree/LevelThree'
import Contacts from './components/Contacts/Contacts'
import About from './components/About/About'
import Menu from './components/Menu/Menu'
import Alerts from './components/Alert/Alert'
import AlertPage from './components/AlertPage/AlertPage'
import Groups from './components/Groups/Groups.js'



export default (
    <Switch>
        <Route component={Login} exact path='/'/>
        <Route component={Home} exact path='/home'/>
        <Route component={Profile} path='/profile'/>
        <Route component={Situations} path='/situations'/>
        <Route component={LevelOne} path='/levelOne/:id'/>
        <Route component={LevelTwo} path='/levelTwo/:id'/>
        <Route component={LevelThree} path='/levelThree/:id'/>
        <Route component={About} path='/about'/>
        <Route component={Contacts} path='/contacts'/>
        <Route component={Menu} path='/menu'/>
        <Route component={Alerts} exact path='/alerts'/>
        <Route component={AlertPage} path='/alerts/:situationLevel/:senderName/:situation'/>
        <Route component={Groups} path='/groups'/>
    </Switch>
)
