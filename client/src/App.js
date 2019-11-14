import React from 'react'
import './App.css'

import {Switch, Route} from 'react-router-dom'

import Navbar from './components/layout-components/AppNavbar'
import HomePage from './components/layout-components/HomePage'
import Login from './components/auth-components/Login'
import Signup from './components/auth-components/Signup'

function App() {
  return (
    <div>
      <>
        <Navbar/>

        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/singup" exact component={Signup}></Route>
        </Switch>
      </>

    </div>
  )
}

export default App
