import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import { initLevel, getChilds, getAllChilds } from '../../tools'


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

const enhance = compose(
  connect(state => ({ tasks: state.tasks })),
  injectSheet(styles)
)

const expandLvl = lvl => ({
  borderLeftWidth: lvl ? '1px' : 0,
  marginLeft: `${20 * lvl}px`,
})


class TaskList extends Component {
  state = { tasks: [], expand: {} }

  componentWillMount() {
    const tasks = this.props.tasks.filter(task => !task.parent)
    const expand = {}
    // eslint-disable-next-line
    for (const task of tasks) {
      expand[task.id] = false
    }

    this.state = { tasks, expand }
  }

  componentWillReceiveProps(nextProps) {
    const tasksIdState = this.state.tasks.map(task => task.id)
    const tasksIdProps = nextProps.tasks.map(task => task.id)

    const tasks = this.state.tasks.filter(task => tasksIdProps.includes(task.id)) // remove old task
    const newTask = nextProps.tasks.filter(task => !task.parent && !tasksIdState.includes(task.id))
    // add task where parent == 0 && add task that is not present in state

    this.state.tasks = tasks.concat(newTask)
  }

  expandClick = task =>
    this.state.expand[task.id]
      ? this.expandClose(task)
      : this.expandOpen(task)

  expandOpen = task =>
    () => {
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

  expandClose = task =>
    () => {
      this.setState(({ tasks, expand }) => {
        const newExpand = expand
        const tasksChildsId = getAllChilds(tasks, task).map(current => current.id)
        const tasksNotChilds = tasks.filter(current => !tasksChildsId.includes(current.id))

        Object.keys(expand).forEach((id) => {
          if (tasksChildsId.includes(id)) {
            newExpand[id] = false
          }
        })

        return {
          tasks: tasksNotChilds,
          expand: Object.assign(newExpand, { [task.id]: false }),
        }
      })
    }

  expandState = (task) => {
    const childs = getChilds(this.props.tasks, task)
    const state = this.state.expand[task.id]
      ? 'glyphicon-triangle-bottom'
      : 'glyphicon-triangle-right'

    const stateClasses = childs.length
      ? state
      : 'glyphicon-menu-right'

    return ['glyphicon', stateClasses, this.props.classes.expand].join(' ')
  }

  list = () =>
    this.state.tasks.map(task => (
      <li className="list-group-item" key={task.id} style={expandLvl(task.lvl)}>
        <i role="button" className={this.expandState(task)} onClick={this.expandClick(task)} />
        <Link to={`/read/${task.id}`} className={this.props.classes.cursor}>
          {task.title}
        </Link>
        <div className={this.props.classes.rightLabel}>

          <span className="label label-primary">Open</span>
        </div>
      </li>
      ))

  render() {
    return (
      <ul className="list-group">
        {this.list()}
      </ul>
    )
  }
}

export default enhance(TaskList)

