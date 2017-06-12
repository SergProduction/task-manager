import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'

import {initLevel} from '../../tools'

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
  },
  child: {
    borderLeftWidth: 1,
    marginLeft: 15
  }
}

let child = (lvl) => ({
  borderLeftWidth: lvl ? '1px' : 0,
  marginLeft: (20 * lvl) + 'px'
})

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.list = this.list.bind(this);
    this.add  = this.add.bind(this)
    this.read = this.read.bind(this);
    this.remove  = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.addUnder  = this.addUnder.bind(this)
    this.state = {tasks:[]}
  }
  componentWillMount(){
    this.state.tasks = this.props.tasks.map( (task, i, tasks) => Object.assign(task, {lvl: initLevel(tasks, task)}) )
  }
  componentWillReceiveProps(nextProps){
    this.state.tasks = nextProps.tasks.map( (task, i, tasks) => Object.assign(task, {lvl: initLevel(tasks, task)}) )    
  }
  add(){
    return (e) => {
      this.props.active({state: 'add', id: false})
    }
  }
  read(id) {
    return (e) => {
      this.props.active({state: 'read', id})
    }
  }
  remove(id){
    return (e) => {
      this.props.remove(id)
    }
  }
  update(id){
    return (e) => {
      this.props.active({state: 'update', id})
    }
  }
  addUnder(id){
    return (e) => {
      this.props.active({state: 'add', id})
    }
  }
  list(){
    return this.state.tasks.map( (task,i) => {
      return (
        <li className="list-group-item" key={i} style={child(task.lvl)}>
          
          <a onClick={this.read(task.id)} className={this.props.classes.cursor}>{task.title}</a>

          <div className={this.props.classes.rightLabel}>
            <i className="glyphicon glyphicon-remove" style={{color:'#800'}} onClick={this.remove(task.id)}></i>
            <i className="glyphicon glyphicon-pencil" style={{color:'#008'}} onClick={this.update(task.id)}></i>
            <i className="glyphicon glyphicon-plus"   style={{color:'#080'}} onClick={this.addUnder(task.id)}></i>
            <span className="label label-primary">Open</span>
          </div>
        </li>
      )
    })
  }
  render(){
    return (
      <ul className="list-group">
        {this.list()}
      </ul>
    )
  }
}

export default connect(
  state => ({tasks: state.tasks}),
  dispatch => ({
    active: ({state, id}) => {
      dispatch({
        type: 'ACTIVE',
        state: state,
        id: id
      })
    },
    remove: (id) => {
      dispatch({
        type: 'REMOVE',
        id: id
      })
    }
  })
)(
  injectSheet(styles)(TaskList)
)