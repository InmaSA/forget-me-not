import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ItemServices from '../../services/item.services'

const itemServices = new ItemServices()

class List extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const url = this.props.match.url
    const list_id = url.slice(-24)
    this.props.getAlltheItems(list_id)
  }


  render() {
    console.log(this.props.items.items)
    return (
      <h5>La lista está lista!</h5>
    )
  }
}

List.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  items: state.items
})

const mapDispatchToProps = dispatch => {
  return {
    getAlltheItems(list_id) {
      itemServices.getAllItems(list_id)
      .then(response => {
        dispatch(
          {type:'GET_ITEMS_IN_LIST', payload: response.data}
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
) (List)
