import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'


import WrapList from '../molecules/wrap-list'
import NewDescription from '../molecules/new-description'
import Description from '../molecules/description'
import RemoveTask from '../molecules/remove-task'



const styles = {
  container: {
    padding: 50
  }
}

const Task = (props) => {
  return(
    <div className={props.classes.container}>
      <Router>
        <div className="row">
          <div className="col-md-4">
            <WrapList/>
          </div>
          <div className="col-md-8">
            <Switch>
              <Route path="/read/:id" component={Description}/>
              <Route path="/create" exact component={NewDescription}/>
              <Route path="/create/:id" component={NewDescription} />
              <Route path="/update/:id" component={NewDescription}/>
              <Route path="/delete/:id" component={RemoveTask}/>            
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

/*
            {
              props.watch === 'read'
              ? <Description/>
              : props.watch === 'update' || props.watch === 'create'
              ? <NewDescription/>
              : null
            }
*/

export default connect(
  state => ({watch:state.crud.type}),
)(
  injectSheet(styles)(Task)
)