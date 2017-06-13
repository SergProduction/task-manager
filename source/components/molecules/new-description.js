import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {guid} from '../../tools'
import {CRUD, ADD, ADD_CHILD, UPDATE} from '../../actions'


const styles = {
  textarea: {
    resize: 'vertical'
  }
}

class NewDescription extends React.Component {
  constructor(props){
    super(props)
    this.save = this.save.bind(this)
    this.indetify = this.indetify.bind(this)
  }
  save(){
    let id = guid()
    if( this.props.todo.crud.type === 'create' && !this.props.todo.crud.id){
      this.props.add({title: this.title.value, description: this.description.value, id})
    }
    else if( this.props.todo.crud.type === 'create' && this.props.todo.crud.id){
      this.props.addChild({title: this.title.value, description: this.description.value, parent: this.props.todo.crud.id, id})
    }
    else if( this.props.todo.crud.type === 'update' ){
      id = this.props.todo.crud.id
      this.props.update({title: this.title.value, description: this.description.value, id})
    }
    this.props.crud({state: 'read', id})
  }
  componentWillReceiveProps(nextProps){
    if( nextProps.todo.crud.type === 'update' ){
      const task = nextProps.todo.tasks.filter( task => task.id === nextProps.todo.crud.id)[0]
      
      this.title.value = task.title
      this.description.value = task.description
    }
  }
  indetify(type){
    if( this.props.todo.crud.type === 'update' ){
      const task = this.props.todo.tasks.filter( task => task.id === this.props.todo.crud.id)[0]
      if(type == 'title')
        return task.title
      if(type == 'description')
        return task.description
    }
  }
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="form-group">
            <label>Title</label>      
            <input type="text" className="form-control" ref={ title => {this.title = title}} defaultValue={this.indetify('title')}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className={"form-control "+this.props.classes.textarea} rows="5" ref={ description => {this.description = description}} defaultValue={this.indetify('description')}></textarea>
          </div>
          <button className="btn btn-primary" onClick={this.save}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({todo: state}),
  dispatch => ({
    crud: CRUD(dispatch),
    add: ADD(dispatch),
    addChild: ADD_CHILD(dispatch),
    update: UPDATE(dispatch)
  })
)(
  injectSheet(styles)(NewDescription)
)
