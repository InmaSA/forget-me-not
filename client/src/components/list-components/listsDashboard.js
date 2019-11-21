import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import ListServices from '../../services/list.services'

const listServices = new ListServices()


class ListDashboard extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getAlltheLists(this.props.auth.loggedInUser._id)
  }


  render() {
    const theLists = this.props.lists.allLists

    if(theLists.length === 0) {
      return (
        <p>Aún no tienes listas creadas. Comienza ahora en <Link to="/new-list">Crear nueva lista</Link>.</p>
      )
    }
    return (
      <>
        <h1>Estas son tus listas preciosa</h1>
        <section className="row">
          {
            theLists.map(elm => 
              <article key={elm._id} className="col-lg-3 col-md-6">
                <img width="30%" src="images/note.png" alt="note icon"></img>
                <h3>{elm.listName}</h3>
                <Link to={elm._id}>Ver</Link>
              </article>
              )  
          }
        </section>

      </>
    )
  } 
}

ListDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    getThisListName(list_id) {
      listServices.getOneList(list_id)
      .then(response => {
        dispatch(
          {type: 'FIND_THIS_LIST', payload: response.data}
        )
      })
      .catch(err => {
        dispatch(
          {type: 'GET_ERRORS', payload: err.response.data.message}
        )
        console.log(err.response.data.message)
        })  
    },
    getAlltheLists(user_id) {
      listServices.getAllLists(user_id)
      .then(response => {
        dispatch(
          {type:'GET_USER_LISTS', payload: response.data}
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
) (ListDashboard)