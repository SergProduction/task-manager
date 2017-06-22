import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { markdown } from 'markdown'
import dateTemplate from 'date-template'

import ControlPanel from '../atoms/control-panel'


/* eslint-disable react/no-danger */

const styles = {
  textarea: {
    resize: 'vertical',
  },
  rightLabel: {
    float: 'right',
    '& > *': {
      marginLeft: 5,
      cursor: 'pointer',
    },
  },
}

const markdownToHtml = text =>
  ({ __html: markdown.toHTML(text) })

const enhance = compose(
  connect(({ tasks }) => ({ tasks })),
  injectSheet(styles)
)

class Description extends Component {

  searchTask = () => {
    const { id } = this.props.match.params
    const task = this.props.tasks.filter(current => current.id === id)[0]

    return (
      <div>
        <div>
          <h2>{task.title}</h2>
        </div>
        <hr />
        <div>
          <div dangerouslySetInnerHTML={markdownToHtml(task.description)} />
        </div>
        <div className="text-info text-right">
          {dateTemplate('~h~:~m~ ~D~.~M~.~Y~', task.createDate)}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <div className="col-md-6">
              Task control
            </div>
            <div className="col-md-6">
              <ControlPanel id={this.props.match.params.id} />
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-group">
            {this.searchTask()}
          </div>
        </div>
      </div>
    )
  }
}

export default enhance(Description)
