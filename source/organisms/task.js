import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'

import WrapList from '../molecules/wrap-list'
import NewDescription from '../molecules/new-description'
import Description from '../molecules/description'


const styles = {
  marginTop: {
    marginTop: 50
  }
}

const Task = (props) => {
  return(
    <div className={"container " + props.classes.marginTop}>
      <div className="row">
        <div className="col-md-6">
          <WrapList/>
        </div>
        <div className="col-md-6">
          {
            props.watch === 'read'
            ? <Description/>
            : <NewDescription/>
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