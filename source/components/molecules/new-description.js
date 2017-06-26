import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import { guid } from '../../tools'
import { ADD, ADD_CHILD, ADD_CHILDS, UPDATE } from '../../actions'


const styles = {
  textarea: {
    resize: 'vertical',
  },
}

const enhance = compose(
  state => ({ todo: state }),
  injectSheet(styles)
)

const commands = {
  task: {
    start: /\/task "([\w\s.,"]+)"/g,
    end: /"([\w\s.,"]+)"/,
    replace: '/task "',
    middle: false,
    result: [],
  },
  help: {
    start: /\/help/g,
    end: /(\/help)/,
    replace: '\/help',
    middle: false,
    result: [],
  },
}

const specialCommand = (stringParse, parent) => {
  for (const key in commands) {
    commands[key].middle = stringParse.match(commands[key].start)
    if (commands[key].middle) {
      for (const mid of commands[key].middle) {
        const res = mid.match(commands[key].end)[1]
        commands[key].result.push(res)
      }
    }
  }
  let replaceString = ''
  if (commands.task.result.length !== 0) {
    const childs = []
    for (const name of commands.task.result) {
      const id = guid()
      childs.push({ title: name, description: '', parent, id })

      replaceString = stringParse.replace(`${commands.task.replace + name}"`, `[${name}](#${id})`)
    }
    this.props.dispatch(
      ADD_CHILDS({ parent, childs })
    )
    return replaceString
  }

  return replaceString
}

class NewDescription extends Component {

  componentWillReceiveProps(nextProps) {
    const method = this.props.match.url.match(/create|update/)[0]

    if (method === 'update') {
      const { id } = this.props.match.params
      const task = nextProps.todo.tasks.filter(task => task.id === id)[0]

      this.title.value = task.title
      this.description.value = task.description
    }
  }

  validate = () => {
    if (!this.title.value) {
      this.validTitle.className = 'form-group has-error has-feedback'
      return false
    }
    this.validTitle.className = 'form-group'
    return true
  }

  save = () => {
    if (!this.validate()) return false

    let id = guid()
    let description = specialCommand(this.description.value, id)
    const method = this.props.match.url.match(/create|update/)[0]
    const { id: currentId } = this.props.match.params

    if (method === 'create' && !currentId) { // newTask
      this.props.dispatch(
        ADD({ title: this.title.value, description, id })
        )
    }
    else if (method === 'create' && currentId) { // newTask child
      this.props.dispatch(
        ADD_CHILD({ title: this.title.value, description, parent: currentId, id })
      )
    }
    else if (method === 'update') { // update
      id = currentId
      description = specialCommand(this.description.value, id)
      this.props.dispatch(
        UPDATE({ title: this.title.value, description, id })
      )
    }

    this.props.history.replace(`/read/${id}`)
  }

  indentify = (type) => {
    const method = this.props.match.url.match(/create|update/)[0]

    if (method === 'update') {
      const { id } = this.props.match.params
      const task = this.props.todo.tasks.filter(current => current.id === id)[0]

      if (type === 'title') {
        return task.title
      }
      else if (type === 'description') {
        return task.description
      }

      return task.title
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div
            className="form-group"
            ref={(validTitle) => {
              this.validTitle = validTitle
            }}
          >
            <label htmlFor="task-title">Title</label>
            <input
              name="task-title"
              type="text"
              className="form-control"
              ref={(title) => {
                this.title = title
              }}
              defaultValue={this.indentify('title')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              name="task-description"
              className={`form-control ${this.props.classes.textarea}`}
              rows="5"
              ref={(description) => {
                this.description = description
              }}
              defaultValue={this.indentify('description')}
            />
          </div>
          <button className="btn btn-primary" onClick={this.save}>Save</button>
        </div>
      </div>
    )
  }
}

export default enhance(NewDescription)
