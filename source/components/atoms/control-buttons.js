import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

const styles = {
  marginIcon: {
    '& > *': {
      marginRight: 10,
      cursor: 'pointer',
    },
  },
}

const ControlButton = ({ classes, id }) => (
  <div className={classes.marginIcon}>
    <Link to={`/delete/${id}`}>
      <i className="glyphicon glyphicon-remove" style={{ color: '#800' }} title="remove" />
    </Link>
    <Link to={`/update/${id}`}>
      <i className="glyphicon glyphicon-pencil" style={{ color: '#008' }} title="update" />
    </Link>
    <Link to={`/create/${id}`}>
      <i className="glyphicon glyphicon-plus" style={{ color: '#080' }} title="add child task" />
    </Link>
  </div>
)

export default injectSheet(styles)(ControlButton)
