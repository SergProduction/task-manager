import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'

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
  searchTask(){
    const task = this.props.todo.tasks.filter( task => task.id === this.props.todo.crud.id)[0]
    console.log(task)
    return(
      <div>
        <div>
          <h4>title</h4>
          {task.title}
        </div>
        <hr/>
        <div>
          <h4>description</h4>
          {task.description}
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
