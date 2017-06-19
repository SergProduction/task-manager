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
    this.addChild  = this.addChild.bind(this)
  }
  remove(id){
    return (e) => {
      this.props.dispatch( REMOVE(id) )
      this.props.dispatch( CRUD({state: 'remove', id}) )
    }
  }
  update(id){
    return (e) => {
      this.props.dispatch( CRUD({state: 'update', id}) )
    }
  }
  addChild(id){
    return (e) => {
      this.props.dispatch( CRUD({state: 'create', id}) )
    }
  }
  render(){
    let {id} = this.props
    return(
      <div className={this.props.classes.marginIcon}>
        <i className="glyphicon glyphicon-remove" style={{color:'#800'}} onClick={this.remove(id)}   title="remove"></i>
        <i className="glyphicon glyphicon-pencil" style={{color:'#008'}} onClick={this.update(id)}   title="update"></i>
        <i className="glyphicon glyphicon-plus"   style={{color:'#080'}} onClick={this.addChild(id)} title="add child task"></i>
      </div>
    )
  }
}

export default connect(
  state => ({id: state.crud.id})
)(
  injectSheet(styles)(ControlButton)
)