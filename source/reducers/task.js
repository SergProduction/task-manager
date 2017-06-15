import {getAllChilds, getChilds} from '../tools';

const taskStore = (state, action) => {
  switch(action.type){
    case 'ADD':
      var newTask = Object.assign({}, action.task, {parent:false, createDate: +new Date()})
      state.tasks.push(newTask)
      
      state.tasks = state.tasks.slice()
      return Object.assign({}, state)

    case 'ADD_CHILD':
      console.log(state.tasks, action.task)
      
      var sibling = state.tasks.filter( task => task.parent === action.task.parent )
      
      var lastSiblingId = sibling.length
      ? sibling[ sibling.length - 1 ].id
      : false

      var i = lastSiblingId
      ? state.tasks.findIndex( task => task.id == lastSiblingId ) + 1
      : state.tasks.findIndex( task => task.id == action.task.parent ) + 1

      var newChildTask = Object.assign({}, action.task, {createDate: +new Date()})
      state.tasks.splice(i, 0, newChildTask )
      

      state.tasks = tasks.slice()
      return Object.assign({}, state)
    
    case 'UPDATE':
      state.tasks = state.tasks.map(task => {
        if(task.id === action.task.id){
          task.title = action.task.title
          task.description = action.task.description
        }
        return task
      })
      return Object.assign({}, state)
    
    case 'REMOVE':
      console.log('REMOVE')
      let task = state.tasks.filter(task => task.id === action.id)[0]
      
      let childs = getAllChilds(state.tasks, task).map(child => child.id)
      childs.push(action.id)

      state.tasks = state.tasks.filter(task => !childs.includes(task.id) )
      return Object.assign({}, state)

    case 'CRUD':
      state.crud.type = action.state
      state.crud.id = action.id ? action.id : false
      
      return Object.assign({}, state)
  }
  return state
}
export default taskStore