import React from 'react'
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import AuthServices from '../src/services/auth.services'

// const authServices = new AuthServices()


const HomePage = () => {

  return(
    <h1>Bienvenido a Forget me not</h1>
  )

}

// HomePage.propTypes = {
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// }


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})


// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUser() {
//       authServices.loggedin()
//       .then(response => {
//         dispatch(
//           {type:'LOGGEDIN_USER', payload: response.data}
//         )
//       })
//       .catch(err => {
//         dispatch(
//           {type: 'GET_ERRORS', payload: err.response.data.message}
//         )
//         console.log(err)
//       })
//     }
//   }
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps
) (HomePage)