import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {markdown} from 'markdown'
import {time} from '../../tools'


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

class TaskControl extends React.Component{
  constructor(props){
    super(props)
    this.stateTaskOpen = this.stateTaskOpen.bind(this)
    this.stateTaskClose = this.stateTaskClose.bind(this)
  }
  stateTaskOpen(e){
    e.preventDefault();
    console.log('stateTaskOpen')
  }
  stateTaskClose(e){
    e.preventDefault();
    console.log('stateTaskClose')
  }
  render(){
    return (
      <div className="dropdown pull-right">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          state 
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><a onClick={this.stateTaskOpen}>Open</a></li>
          <li><a onClick={this.stateTaskClose}>Close</a></li>
        </ul>
      </div>
    )
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
    const task = this.props.todo.tasks.filter( task => task.id === this.props.todo.crud.id)[0]
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
          {time('~h~:~m~ ~D~.~M~.~Y~', task.createDate)}
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
              <div className="pull-right">
                <TaskControl/>
              </div>
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
  state => ({todo:state}),
  dispatch => ({})
)(
  injectSheet(styles)(Description)
)
