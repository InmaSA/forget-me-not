import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { registerUser } from '../../redux/actions/auth-actions'


class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name] : value})
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    this.props.registerUser({username, password}, this.props.history)
  }

  render() {

    const {errors} = this.state
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-4" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <span>{errors.username}</span>
              <input type="text" className="form-control" id="username" placeholder="Elisabeth Benet"
              name="username" error={errors.username} value={this.state.username} onChange={this.handleInputChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <span>{errors.password}</span>
              <input type="password" className="form-control" id="password" placeholder="Contraseña"
              name="password" error={errors.password} value={this.state.password} onChange={this.handleInputChange}></input>
            </div>
            <button type="submit" className="btn btn-primary">Acceptar</button>
            <p>¿Ya estás registrado? <Link to="/login">Accede a tu cuenta</Link></p>
          </form>
        </div>
      </div>
    )
  }  
}


Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})



export default connect(
  mapStateToProps,
  { registerUser }
) (withRouter(Signup))