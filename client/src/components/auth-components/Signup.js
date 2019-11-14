import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }


  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name] : value})
    console.log(this.state)
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    console.log('YA casi!!')
  }

  render() {

    const {errors} = this.state
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-4" onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input type="text" className="form-control" id="username" placeholder="Elisabeth Benet"
              name="username" error={errors.username} value={this.state.username} onChange={this.handleInputChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
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

export default Signup