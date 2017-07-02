import { getAllChilds, initLevel } from '../tools'

export default (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const newTask = Object.assign(
        {},
        action.task,
        {
          parent: false,
          createDate: +new Date(),
          lvl: 0,
        })

      state.tasks.push(newTask)

      // state.tasks = state.tasks.slice()
      return Object.assign({}, state, { tasks: [...state.tasks] })
    }

    case 'ADD_CHILD': {
      const sibling = state.tasks.filter(task => task.parent === action.task.parent)

      const lastSiblingId = sibling.length
        ? sibling[sibling.length - 1].id
        : false

      const i = lastSiblingId
        ? state.tasks.findIndex(task => task.id === lastSiblingId) + 1
        : state.tasks.findIndex(task => task.id === action.task.parent) + 1

      const newChildTask = Object.assign(
        {},
        action.task,
        {
          createDate: +new Date(),
          lvl: initLevel(state.tasks, action.task),
        })

      state.tasks.splice(i, 0, newChildTask)


      // state.tasks = state.tasks.slice()
      return Object.assign({}, state, { tasks: [...state.tasks] })
    }

    case 'ADD_CHILDS': {
      const tasks = state.tasks
      const sibling = tasks.filter(task => task.parent === action.parent)

      const lastSiblingId = sibling.length
        ? sibling[sibling.length - 1].id
        : false

      const index = lastSiblingId
        ? tasks.findIndex(task => task.id === lastSiblingId) + 1
        : tasks.findIndex(task => task.id === action.parent) + 1

      const parent = tasks.filter(task => task.id === action.parent)

      const lvl = parent.length
        ? initLevel(tasks, parent[0]) + 1
        : 1

      const childs = action.childs
        .map(task => Object.assign({}, task, { createDate: Number(new Date()), lvl }))

      tasks.splice(index, 0, ...childs)

      return Object.assign({}, state)
    }

    case 'UPDATE': {
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign({}, task, {
            title: action.task.title,
            description: action.task.description,
          })
        }
        return task
      })

      return Object.assign({}, state, { tasks: newTasks })
    }

    case 'REMOVE': {
      const task = state.tasks.filter(current => current.id === action.id)[0]
      console.log('REMOVE', task, state.tasks)
      const childs = getAllChilds(state.tasks, task).map(child => child.id)
      childs.push(action.id)

      const newTasks = state.tasks.filter(current => !childs.includes(current.id))

      return Object.assign({}, state, { tasks: newTasks })
    }

    default:
      return state
  }
}
