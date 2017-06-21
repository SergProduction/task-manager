import React from 'react';
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {guid} from '../../tools'
import {ADD, ADD_CHILD, ADD_CHILDS, UPDATE} from '../../actions'
import {Link, Redirect} from 'react-router-dom'

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

    if(commands.task.result.length !== 0){
      let childs = []
      for( let name of commands.task.result ){
        let id = guid()        
        childs.push({title: name, description: '', parent, id})

        stringParse = stringParse.replace(`${commands.task.replace + name }"`, `[${name}](#${id})`)
      }
      this.props.dispatch(
        ADD_CHILDS({parent, childs})
      )
      return stringParse
    }
    else{
      return stringParse
    }

  }
  validate(){
    if(!this.title.value){
      this.validTitle.className = 'form-group has-error has-feedback'
      return false
    }else{
      this.validTitle.className = 'form-group'
      return true      
    }
  }
  save(){
    if( !this.validate() ) return false

    let id = guid()
    let description = this.specialCommand(this.description.value, id)
    const method = this.props.match.url.match(/create|update/)[0]
    const { id: currentId } = this.props.match.params

    if( method === 'create' && !currentId){ //newTask
      this.props.dispatch(
        ADD({title: this.title.value, description, id})
        )
    }
    else if( method === 'create' && currentId){ //newTask child
      this.props.dispatch(
        ADD_CHILD({title: this.title.value, description, parent: currentId, id})
      )
    }
    else if( method === 'update' ){ //update
      id = currentId
      description = this.specialCommand(this.description.value, id)
      this.props.dispatch(
        UPDATE({title: this.title.value, description, id})
      )
    }
    
    this.props.history.replace(`/read/${id}`)
  }
  componentWillReceiveProps(nextProps){
    const method = this.props.match.url.match(/create|update/)[0]

    if( method === 'update' ){
      const { id } = this.props.match.params
      const task = nextProps.todo.tasks.filter( task => task.id === id)[0]
      
      this.title.value = task.title
      this.description.value = task.description
    }
  }
  indetify(type){
    const method = this.props.match.url.match(/create|update/)[0]
    
    if( method === 'update' ){
      const { id } = this.props.match.params      
      const task = this.props.todo.tasks.filter( task => task.id === id)[0]
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
          <div className="form-group" ref={validTitle => this.validTitle = validTitle}>
            <label>Title</label>      
            <input type="text" className="form-control" ref={ title => this.title = title} defaultValue={this.indetify('title')}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className={`form-control ${this.props.classes.textarea}`} rows="5" ref={ description => this.description = description} defaultValue={this.indetify('description')}></textarea>
          </div>
          <button className="btn btn-primary" onClick={this.save}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({todo: state})
)(
  injectSheet(styles)(NewDescription)
)
