import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {CRUD} from '../../actions'
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

let expandLvl = (lvl) => ({
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
    const tasks = this.props.tasks.filter( task => !task.parent)
    let expand = {}
    
    for( task of tasks){
      expand[task.id] = false
    }

    this.state = {tasks, expand}
  }
  componentWillReceiveProps(nextProps){
    console.log('update?')
    const tasksIdState = this.state.tasks.map( task => task.id)
    const tasksIdProps = nextProps.tasks.map( task => task.id)
    
    const tasks   = this.state.tasks.filter( task => tasksIdProps.includes(task.id) ) //remove old task
    
    const newTask = nextProps.tasks.filter( task => !task.parent && !tasksIdState.includes(task.id) ) //add task where parent == 0 && add task that is not present in state
    
    this.state.tasks = tasks.concat(newTask) 
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
    const childs = getChilds(this.props.tasks, task)
    const state = this.state.expand[task.id]
      ? 'glyphicon-triangle-bottom '
      : 'glyphicon-triangle-right '
    
    const stateClasses = childs.length
      ?  state
      : 'glyphicon-menu-right ' 
    
    return `glyphicon ${stateClasses} ${this.props.classes.expand}`
  }
  read(id) {
    return (e) => {
      this.props.dispatch( CRUD({state: 'read', id}) )
    }
  }
  list(){
    return this.state.tasks.map( (task,i) => {
      return (
        <li className="list-group-item" key={i} style={expandLvl(task.lvl)}>
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
  state => ({tasks: state.tasks, watch:state.crud.type })
)(
  injectSheet(styles)(TaskList)
)