import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {markdown} from 'markdown'

console.log(markdown )
const styles = {
  textarea: {
    resize: 'vertical'
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
      </div>
    )
  }
  render(){
    return(
      <div className="panel panel-default">
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
