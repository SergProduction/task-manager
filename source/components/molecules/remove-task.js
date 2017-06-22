import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { REMOVE } from '../../actions'

class RemoveTask extends PureComponent {

  componentWillMount() {
    const { id } = this.props.match.params

    this.props.dispatch(REMOVE(id))
    this.props.history.replace('/')
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null
  }
}

export default connect()(RemoveTask)
