import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { initLevel, getChilds, getAllChilds } from '../../tools'
import { Link } from 'react-router-dom'

const styles = {
  rightLabel: {
    float: 'right',
    '& > *': {
      marginLeft: 5,
      cursor: 'pointer',
    },
  },
  cursor: {
    cursor: 'pointer',
  },
  child: {
    borderLeftWidth: 1,
    marginLeft: 15,
  },
  expand: {
    color: '#6868d4',
    marginRight: 10,
    '&:hover': {
      color: '#34bba9',
      cursor: 'pointer',
    },
  },
}

const expandLvl = lvl => ({
  borderLeftWidth: lvl ? '1px' : 0,
  marginLeft: `${20 * lvl}px`,
})


class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.list = this.list.bind(this)
    this.expandState = this.expandState.bind(this)
    this.state = { tasks: [], expand: {} }
  }
  componentWillMount() {
    const tasks = this.props.tasks.filter(task => !task.parent)
    const expand = {}

    for (task of tasks) {
      expand[task.id] = false
    }

    this.state = { tasks, expand }
  }
  componentWillReceiveProps(nextProps) {
    const tasksIdState = this.state.tasks.map(task => task.id)
    const tasksIdProps = nextProps.tasks.map(task => task.id)

    const tasks = this.state.tasks.filter(task => tasksIdProps.includes(task.id)) // remove old task
    const newTask = nextProps.tasks.filter(task => !task.parent && !tasksIdState.includes(task.id)) // add task where parent == 0 && add task that is not present in state

    this.state.tasks = tasks.concat(newTask)
  }
  expandClick(task) {
    return this.state.expand[task.id]
    ? this.expandClose(task)
    : this.expandOpen(task)
  }
  expandOpen(task) {
    return (event) => {
      this.setState((prevState, props) => {
        const { tasks } = props
        const childs = getChilds(tasks, task)

        const position = prevState.tasks.findIndex(el => el.id === task.id) + 1
        const tasksAndChilds = prevState.tasks.slice()

        tasksAndChilds.splice(position, 0, ...childs)

        return {
          tasks: tasksAndChilds,
          expand: {
            ...prevState.expand,
            [task.id]: true,
          },
        }
      })
    }
  }
  expandClose(task) {
    return (event) => {
      this.setState((prevState, props) => {
        const { tasks } = prevState
        const tasksChildsId = getAllChilds(tasks, task).map(task => task.id)
        const tasksNotChilds = tasks.filter(task => !tasksChildsId.includes(task.id))

        const { expand } = prevState
        Object.keys(prevState.expand).forEach((id) => {
          if (tasksChildsId.includes(id)) {
            expand[id] = false
          }
        })

        return {
          tasks: tasksNotChilds,
          expand: Object.assign(expand, { [task.id]: false }),
        }
      })
    }
  }
  expandState(task) {
    const childs = getChilds(this.props.tasks, task)
    const state = this.state.expand[task.id]
      ? 'glyphicon-triangle-bottom '
      : 'glyphicon-triangle-right '

    const stateClasses = childs.length
      ? state
      : 'glyphicon-menu-right '

    return `glyphicon ${stateClasses} ${this.props.classes.expand}`
  }
  list() {
    return this.state.tasks.map((task, i) => (
        <li className="list-group-item" key={i} style={expandLvl(task.lvl)}>
          <i className={this.expandState(task)} onClick={this.expandClick(task)}></i>
          <Link to={`/read/${task.id}`} className={this.props.classes.cursor}>
            {task.title}
          </Link>
          <div className={this.props.classes.rightLabel}>

            <span className="label label-primary">Open</span>
          </div>
        </li>
      ))
  }
  render() {
    return (
      <ul className="list-group">
        {this.list()}
      </ul>
    )
  }
}

export default connect(
  state => ({ tasks: state.tasks })
)(
  injectSheet(styles)(TaskList)
)
