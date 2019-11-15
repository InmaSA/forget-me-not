import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-4" action="/login" method="GET">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input type="text" className="form-control" id="username" placeholder="Elisabeth Benet"></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Contraseña"></input>
            </div>
            <button type="submit" className="btn btn-primary">Acceder</button>
            <p>¿Aún no tienes cuenta? <Link to="/signup">Regístrate</Link></p>
          </form>
        </div>
    </div>
    )
  }
}

export default Login