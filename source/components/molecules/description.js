import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {markdown} from 'markdown'

import ControlPanel from '../atoms/control-panel'
import dateTemplate from 'date-template'


const styles = {
  textarea: {
    resize: 'vertical'
  },
  rightLabel: {
    float: 'right',
    '& > *': {
      marginLeft: 5,
      cursor: 'pointer'
    }
  }
}

class Description extends React.Component {
  constructor(props){
    super(props)
    this.searchTask = this.searchTask.bind(this)
  }
  markdownToHtml(text){
    let html = { __html: markdown.toHTML(text) }
    return html
  }
  searchTask(){
    console.log('searchTask', this.props.todo.tasks)
    const task = this.props.todo.tasks.filter( task => task.id === this.props.todo.crud.id)[0]
    console.log('searchTask', task)
    return(
      <div>
        <div>
          <h2>{task.title}</h2>
        </div>
        <hr/>
        <div>
          <div dangerouslySetInnerHTML={this.markdownToHtml(task.description)}></div>
        </div>
        <div className="text-info text-right">
          {dateTemplate('~h~:~m~ ~D~.~M~.~Y~', task.createDate)}
        </div>
      </div>
    )
  }
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <div className="col-md-6">
              Task control
            </div>
            <div className="col-md-6">
              <ControlPanel id={this.props.todo.crud.id}/>
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

export default connect(
  state => ({todo:state})
)(
  injectSheet(styles)(Description)
)
