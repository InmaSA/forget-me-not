import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import './App.css'
import {Switch, Route} from 'react-router-dom'
import AuthServices from '../src/services/auth.services'

import ProtectedRoute from './components/protected-components/protectedRoute'
import Navbar from './components/layout-components/AppNavbar'
import HomePage from './components/layout-components/HomePage'
import Login from './components/auth-components/Login'
import Signup from './components/auth-components/Signup'
import AddListForm from './components/list-components/addListForm'
import ListDashboard from './components/list-components/listsDashboard'
import List from './components/list-components/list'
import AddItemForm from './components/items-components/addItemForm'

const authServices = new AuthServices()

const App = (props) => {

  if(props.auth.loggedInUser === null || !props.auth.isAuthenticated){
    props.fetchUser()
  }
  
  if(props.auth.isAuthenticated) {
    return (
      <>  
        <Navbar/>

        <div className="container">
          <Switch>
            <ProtectedRoute path="/new-list" exact component={AddListForm}></ProtectedRoute>
            <ProtectedRoute path="/lists" exact component={ListDashboard}></ProtectedRoute>
            <ProtectedRoute path="/:_id" exact component={List}></ProtectedRoute>
            {/* <Route path="/this-list" exact render={match => <List {...match} list_id={list_id}/>}></Route>
            <Route path="/add-items" exact render={match => <AddItemForm />}></Route> */}
            <ProtectedRoute path="/add-items/:_id" exact component={AddItemForm}></ProtectedRoute>
            
            <Route path="/" exact component={HomePage}></Route>
          </Switch>
        </div>
      </>
    )
  }
    return (
      <>
        <Navbar/>

        <div className="container">
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
          </Switch>
        </div>
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
