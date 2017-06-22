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
      <i className="glyphicon glyphicon-remove" style={{ color: '#800' }} title="remove"></i>
    </Link>
    <Link to={`/update/${id}`}>
      <i className="glyphicon glyphicon-pencil" style={{ color: '#008' }} title="update"></i>
    </Link>
    <Link to={`/create/${id}`}>
      <i className="glyphicon glyphicon-plus" style={{ color: '#080' }} title="add child task"></i>
    </Link>
  </div>
)

export default injectSheet(styles)(ControlButton)
