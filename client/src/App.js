import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import './App.css'
import {Switch, Route} from 'react-router-dom'
import AuthServices from '../src/services/auth.services'

import Navbar from './components/layout-components/AppNavbar'
import HomePage from './components/layout-components/HomePage'
import Login from './components/auth-components/Login'
import Signup from './components/auth-components/Signup'
import addListForm from './components/list-components.js/addListForm'

const authServices = new AuthServices()

const App = (props) => {

  if(props.auth.loggedInUser === null || props.auth.isAuthenticated === false){
    props.fetchUser()
  }
  
  if(props.auth.isAuthenticated == true) {
    return (
      <>
        <Navbar/>

        <Switch>
          <Route path="/new-list" exact component={addListForm}></Route>
          {/* <ProtectedRoute path="/" exact component={HomePage}></ProtectedRoute> */}
          <Route path="/" exact component={HomePage}></Route>
        </Switch>

      </>
    )
  }
    return (
        <>
          <Navbar/>

          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
          </Switch>
        </>
    )


}


App.propTypes = {
  auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth
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
        console.log(err)
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
