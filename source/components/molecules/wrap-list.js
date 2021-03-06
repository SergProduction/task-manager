import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import TaskList from './task-list'

const styles = {
  rightLabel: {
    float: 'right',
    '& > *': {
      marginLeft: 5,
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cursor: {
    cursor: 'pointer',
  },
}


const WrapList = props => (
  <div className="panel panel-default">
    <div className="panel-heading">
      Task list
      <div className={props.classes.rightLabel}>
        <Link to="/create">
          <i className="glyphicon glyphicon-plus" style={{ color: '#080' }} />
        </Link>
      </div>
    </div>
    <TaskList />
  </div>
)

export default injectSheet(styles)(WrapList)
