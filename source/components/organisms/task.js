import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'

import WrapList from '../molecules/wrap-list'
import NewDescription from '../molecules/new-description'
import Description from '../molecules/description'


const styles = {
  container: {
    padding: 50
  }
}

const Task = (props) => {
  return(
    <div className={props.classes.container}>
      <div className="row">
        <div className="col-md-4">
          <WrapList/>
        </div>
        <div className="col-md-8">
          {
            props.watch === 'read'
            ? <Description/>
            : props.watch === 'update' || props.watch === 'create'
            ? <NewDescription/>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({watch:state.crud.type}),
  dispatch => ({})
)(
  injectSheet(styles)(Task)
)