import React from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav} from 'react-bootstrap'
import PropTypes from 'prop-types'
import AuthServices from '../../services/auth.services'

const authServices = new AuthServices()

const AppNavbar = (props) => {

  if(props.auth.loggedInUser === null || props.auth.isAuthenticated === false){
    props.fetchUser()
  }
  
  if(props.auth.isAuthenticated === false) {
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img width="5%" src="images/icon.jpg" alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Accede</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  } 

  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img width="5%" src="images/icon.jpg" alt="logo"></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Text>Hola de nuevo {props.auth.loggedInUser.username}</Navbar.Text>
          <Nav.Link href="#">Mis listas</Nav.Link>
          <Nav.Link href="/new-list">Crear nueva</Nav.Link>
          <Nav.Link to="/" onClick={props.logoutUser}>Salir</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

AppNavbar.propTypes = {
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
      .catch(err => console.log(err.response.data.message))
    },
    logoutUser() {
      authServices.logout()
      .then(response => {
        dispatch(
          {type:'LOGGEDIN_USER', payload: {}}
        )
      })
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (AppNavbar)
