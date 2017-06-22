import React from 'react'
import { connect } from 'react-redux'
import { REMOVE } from '../../actions'

class RemoveTask extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.dispatch(REMOVE(id))
    this.props.history.replace('/')
  }
  render() {
    return null
  }
}

export default connect()(RemoveTask)
