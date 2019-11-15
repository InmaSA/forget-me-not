import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css'

import {Switch, Route} from 'react-router-dom'

import Navbar from './components/layout-components/AppNavbar'
import HomePage from './components/layout-components/HomePage'
import Login from './components/auth-components/Login'
import Signup from './components/auth-components/Signup'

class App extends Component {
  constructor() {
    super()
  }

  
  render() {

    return (
      <div>
        <>
          <Navbar/>
  
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
          </Switch>
        </>
  
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps
) (App)
