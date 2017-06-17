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
  specialCommand(stringParse, parent){
    let testString = "#### hello? this is task 3 list children task - /task 'task 3.1' - /task 'task 3.2' /help 'help 3.2"
    
    let commands = {
      task: {
        start: /\/task "([\w\s.,"]+)"/g,
        end: /"([\w\s.,"]+)"/,
        replace: '/task "',
        middle: false,
        result: []
      },
      help: {
        start: /\/help/g,
        end: /(\/help)/,
        replace: '\/help',
        middle: false,
        result: []
      }
    }
    
    for( let key in commands){
      commands[key].middle = stringParse.match(commands[key].start)
      if( commands[key].middle ){
        for( let mid of commands[key].middle ){
          let res = mid.match(commands[key].end)[1]
          commands[key].result.push(res)
        }
      }
    }
    console.log(this.props.dispatch)
    if(commands.task.result.length !== 0){
      for( let name of commands.task.result ){
        let id = guid()
        var a = this.props.addChild({title: name, description: '', parent, id})
        console.log('thunk',a)
        stringParse = stringParse.replace(`${commands.task.replace + name }"`, `[${name}](#${id})`)
      }
      return stringParse
    }
    else{
      return stringParse
    }

   }
  save(){
    let id = guid()
    let description = this.specialCommand(this.description.value, id)
    const {type, id:currentId } = this.props.todo.crud
    if( type === 'create' && !currentId){ //newTask
      this.props.add({title: this.title.value, description, id})
    }
    else if( type === 'create' && currentId){ //newTask child
      this.props.addChild({title: this.title.value, description, parent: currentId, id})
    }
    else if( type === 'update' ){ //update
      id = this.props.todo.crud.id
      description = this.specialCommand(this.description.value, id)
      this.props.update({title: this.title.value, description, id})
    }
    this.props.crud({state: 'read', id})
  }
  componentWillReceiveProps(nextProps){
    if( nextProps.todo.crud.type === 'update' ){
      const task = nextProps.todo.tasks.filter( task => task.id === nextProps.todo.crud.id)[0]
      
      this.title.value = task.title
        = task.description
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
