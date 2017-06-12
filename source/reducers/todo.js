
const taskStore = (state, action) => {
  switch(action.type){
    case 'ADD':
      var newTask = Object.assign({}, action.task, {parent:false})
      state.tasks.push(newTask)
      
      state.tasks = state.tasks.slice()
      return Object.assign({}, state)

    case 'ADD_UNDER':
      var newTask = Object.assign({}, action.task)
      state.tasks.push(newTask)
      
      state.tasks = state.tasks.slice()
      return Object.assign({}, state)
    
    case 'UPDATE':
      console.log(action)
      state.tasks = state.tasks.map(task => {
        if(task.id === action.task.id){
          task.title = action.task.title
          task.description = action.task.description
        }
        return task
      })
      return Object.assign({}, state)
    
    case 'REMOVE':
      state.tasks = state.tasks.filter(task => task.id !== action.id)
      return Object.assign({}, state)

    case 'ACTIVE':
      state.crud.type = action.state
      state.crud.id = action.id ? action.id : false
      
      return Object.assign({}, state)
  }
  return state
}
export default taskStore