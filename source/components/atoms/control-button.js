import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {CRUD, REMOVE} from '../../actions'

const styles = {
  marginIcon: {
    '& > *': {
      marginRight: 10,
      cursor: 'pointer'
    }
  }
}

class ControlButton extends React.Component {
  constructor(props){
    super(props);
    this.remove  = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.addUnder  = this.addUnder.bind(this)
  }
  remove(id){
    return (e) => {
      this.props.remove(id)
      this.props.crud({state: 'remove', id})
    }
  }
  update(id){
    return (e) => {
      this.props.crud({state: 'update', id})
    }
  }
  addUnder(id){
    return (e) => {
      this.props.crud({state: 'create', id})
    }
  }
  render(){
    let {id} = this.props
    return(
      <div className={this.props.classes.marginIcon}>
        <i className="glyphicon glyphicon-remove" style={{color:'#800'}} onClick={this.remove(id)}></i>
        <i className="glyphicon glyphicon-pencil" style={{color:'#008'}} onClick={this.update(id)}></i>
        <i className="glyphicon glyphicon-plus"   style={{color:'#080'}} onClick={this.addUnder(id)}></i>
      </div>
    )
  }
}

export default connect(
  state => ({id: state.crud.id}),
  dispatch => ({
    crud: CRUD(dispatch),
    remove: REMOVE(dispatch)
  })
)(
  injectSheet(styles)(ControlButton)
)