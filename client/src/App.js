import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import './App.css'
import {Switch, Route} from 'react-router-dom'
import AuthServices from '../src/services/auth.services'

import Navbar from './components/layout-components/AppNavbar'
import HomePage from './components/layout-components/HomePage'
import Login from './components/auth-components/Login'
import Signup from './components/auth-components/Signup'

const authServices = new AuthServices()

class App extends Component {
  constructor() {
    super()
  }

  
  render() {

    if(this.props.auth.loggedInUser == null){

      this.props.fetchUser()
    }
    
      return (
          <>
            <Navbar/>
            <div>
                <small>{this.props.errors.error}</small>
              </div>
            <Switch>
              <Route path="/" exact component={HomePage}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/signup" exact component={Signup}></Route>
            </Switch>
          </>
  
      )
  }

}


App.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})


const mapDispatchToProps = dispatch => {
  return {
    fetchUser() {
      authServices.loggedin()
      .then(response => {
        dispatch(
          {type:'LOGGEDIN_USER', payload: response.data}
        )
      })
      .catch(err => {
        dispatch(
          {type: 'GET_ERRORS', payload: err.response.data.message}
        )
        // history.push('/signup')
        // dispatch(
        //   {type:'LOGGEDIN_USER', payload: false}
        // )
        console.log(err)
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
