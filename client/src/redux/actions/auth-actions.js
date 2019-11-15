// import AuthServices from '../../services/auth.services'

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   // USER_LOADING
// } from './types'

// const authServices = new AuthServices()



// /*--------------------------- SIGN UP----------------------------- */
// // export const registerUser = (username, password, history) => dispatch => {
// //   console.log(history)
// //   authServices.signup(username, password)
// //   .then(res => history.push("/login")) // re-direct to login on successful register
// //   .catch(res =>
// //     console.log(res.message)
// //     // dispatch({
// //     //   type: GET_ERRORS,
// //     //   payload: err.response.data
// //     // })
// //   )
// // }


// /*--------------------------- LOG IN----------------------------- */
// export const loginUser = (username, password, history) => dispatch => {
//   authServices.login(username, password)
//   .then(theUser => {
//     dispatch({
//       type: SET_CURRENT_USER,
//       payload: {theUser}
//     })
//     history.push("/")}) // de momento que redireccione a home
//   .catch(err =>
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data
//     })
//   )
// }


// /*--------------------------- LOGGED IN----------------------------- */
// export const fetchUser = () => dispatch => {
//   authServices.loggedin()
//   .then(theUser => {
//     dispatch({
//       type: SET_CURRENT_USER,
//       payload: {theUser}
//     })
//   })  
//   .catch(err =>
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data
//     })
//   )    
// }  


// /*--------------------------- LOG OUT----------------------------- */
// export const logoutUser = (history) => dispatch => {
//   authServices.loggedin()
//   .then(theUser => {
//     dispatch({
//       type: SET_CURRENT_USER,
//       payload: {theUser}
//     })
//   history.push("/")})  
//   .catch(err =>
//     dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data
//     })
//   )    
// }





// // // User loading
// // export const setUserLoading = () => {
// //   return {
// //     type: USER_LOADING
// //   };
// // };