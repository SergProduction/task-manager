import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import TaskList from './task-list'

const styles = {
  rightLabel: {
    float: 'right',
    '& > *': {
      marginLeft: 5
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
  cursor:{
    cursor: 'pointer'
  }
}


class WrapList extends React.Component {
  constructor(props) {
    super(props)
    this.add  = this.add.bind(this)
  }
  add(){
    return (e) => {
      this.props.crud({state: 'create', id: false})
    }
  }
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          Task list
          <div className={this.props.classes.rightLabel}>
            <i className="glyphicon glyphicon-plus" style={{color:'#080'}} onClick={this.add()}></i>
          </div>
        </div>
        <TaskList/>
      </div>
    )
  }
}

export default connect(
  state => ({tasks: state.tasks}),
  dispatch => ({
    crud: ({state, id}) => {
      dispatch({
        type: 'CRUD',
        state: state,
        id: id
      })
    }
  })
)(
  injectSheet(styles)(WrapList)
)