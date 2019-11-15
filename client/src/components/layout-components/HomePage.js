import React, { Component } from 'react'
import {connect} from 'react-redux'

class HomePage extends Component {
  constructor() {
    super()
  }

  render() {

    console.log(this.props)
    return(
      <h1>Bienvenido a Forget me not</h1>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(
  mapStateToProps,
) (HomePage)