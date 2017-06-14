import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {CRUD, REMOVE} from '../../actions'
import {initLevel} from '../../tools'

const styles = {
  rightLabel: {
    float: 'right',
    '& > *': {
      marginLeft: 5,
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
    this.read = this.read.bind(this);
    this.state = {tasks:[]}
  }
  componentWillMount(){
    this.state.tasks = this.props.tasks.map( (task, i, tasks) => Object.assign(task, {lvl: initLevel(tasks, task)}) )
  }
  componentWillReceiveProps(nextProps){
    this.state.tasks = nextProps.tasks.map( (task, i, tasks) => Object.assign(task, {lvl: initLevel(tasks, task)}) )    
  }
  read(id) {
    return (e) => {
      this.props.crud({state: 'read', id})
    }
  }
  list(){
    return this.state.tasks.map( (task,i) => {
      return (
        <li className="list-group-item" key={i} style={child(task.lvl)}>
          <a onClick={this.read(task.id)} className={this.props.classes.cursor}>{task.title}</a>
          <div className={this.props.classes.rightLabel}>
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
    crud: CRUD(dispatch),
    remove: REMOVE(dispatch)
  })
)(
  injectSheet(styles)(TaskList)
)