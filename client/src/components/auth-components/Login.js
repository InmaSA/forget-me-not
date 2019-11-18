import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AuthServices from '../../services/auth.services'

const authServices = new AuthServices()

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name] : value})
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    this.props.loginUser({username, password}, this.props.history)
  }


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-4" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <div>
                <small>{this.props.errors.error}</small>
              </div>
              <label htmlFor="username">Usuario</label>
              <input type="text" className="form-control" id="username" placeholder="Elisabeth Benet"
              name="username" value={this.state.username} onChange={this.handleInputChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Contraseña"
              name="password" value={this.state.password} onChange={this.handleInputChange}></input>
            </div>
            <button type="submit" className="btn btn-primary">Acceder</button>
            <p>¿Aún no tienes cuenta? <Link to="/signup">Regístrate</Link></p>
          </form>
        </div>
    </div>
    )
  }
}


Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = dispatch => {
  return {
    loginUser(userData, history) {
      authServices.login(userData)
      .then(response => {
        dispatch(
          {type:'SET_CURRENT_USER', payload: response.data}
        )
        history.push('/')
      })
      .catch(err => {
        dispatch(
          {type: 'GET_ERRORS', payload: err.response.data.message}
        )
        history.push('/signup')
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Login)