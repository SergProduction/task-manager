import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {CRUD, REMOVE} from '../../actions'
import {initLevel, getChilds, getAllChilds} from '../../tools'

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
  },
  expand: {
    color: '#6868d4',
    marginRight:10,
    '&:hover': {
      color: '#34bba9',
      cursor: 'pointer'
    }
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
    this.expandState = this.expandState.bind(this);
    this.state = {tasks:[], expand: {}}
  }
  componentWillMount(){
    let tasks = this.props.tasks.filter( task => !task.parent)
    let expand = {}
    for( task of tasks){
      expand[task.id] = false
    }
    this.state = {tasks, expand}
  }
  componentWillReceiveProps(nextProps){
    this.state.tasks = nextProps.tasks.map( (task, i, tasks) => Object.assign(task, {lvl: initLevel(tasks, task)}) )    
  }
  expandClick(task){
    return this.state.expand[task.id]
    ? this.expandClose(task)
    : this.expandOpen(task)
  }
  expandOpen(task){
    return (event) => {
      this.setState((prevState, props) => {
        let {tasks} = props
        let childs = getChilds(tasks, task)

        let position = prevState.tasks.findIndex( el => el.id === task.id ) + 1
        let tasksAndChilds = prevState.tasks.slice()

        tasksAndChilds.splice(position, 0, ...childs )

        return {
          tasks: tasksAndChilds,
          expand: {
             ...prevState.expand,
             [task.id]:true
          }
        }
      })
    }
  }
  expandClose(task){
    return (event) => {
      this.setState((prevState, props) => {
        let {tasks} = prevState
        let tasksChildsId = getAllChilds(tasks, task).map(task => task.id)
        let tasksNotChilds = tasks.filter( task => !tasksChildsId.includes(task.id) )
        
        let {expand} = prevState
        Object.keys(prevState.expand).forEach( id => {
          if( tasksChildsId.includes(id) ){
            expand[id] = false
          }
        })

        return {
          tasks: tasksNotChilds,
          expand: Object.assign(expand, {[task.id]: false} )
        }
      })
    }
  }
  expandState(task){
    let childs = getChilds(this.props.tasks, task)
    let state = childs.length
    ? this.state.expand[task.id]
    ? 'glyphicon-triangle-bottom '
    : 'glyphicon-triangle-right '
    : 'glyphicon-menu-right '
    //let state = this.state.expand[id] ? "glyphicon-minus " : "glyphicon-plus "
    return "glyphicon " + state + this.props.classes.expand
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
          <i className={this.expandState(task)} onClick={this.expandClick(task)}></i>
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