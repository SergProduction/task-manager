import React from 'react'
import injectSheet from 'react-jss'
import ControlButton from './control-buttons'

const styles = {
  inlineChilds: {
    '& > *': {
      display: 'inline-block',
    },
  },
}

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.stateTaskOpen = this.stateTaskOpen.bind(this)
    this.stateTaskClose = this.stateTaskClose.bind(this)
  }
  stateTaskOpen(e) {
    e.preventDefault()
    console.log('stateTaskOpen')
  }
  stateTaskClose(e) {
    e.preventDefault()
    console.log('stateTaskClose')
  }
  render() {
    return (
      <div className={`pull-right ${this.props.classes.inlineChilds}`}>
        <ControlButton id={this.props.id} />
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            state
            <span className="caret" />
          </button>
          <ul className="dropdown-menu pull-right" aria-labelledby="dropdownMenu1">
            <li><a onClick={this.stateTaskOpen}>Open</a></li>
            <li><a onClick={this.stateTaskClose}>Close</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(ControlPanel)
