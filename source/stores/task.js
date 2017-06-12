import { createStore } from 'redux'

import todoStore from '../reducers/task'
import {guid} from '../tools'


const store = createStore(todoStore, {
  tasks: [
    {
      title:'test1',
      description: 'des Test1',
      id: guid(),
      parent: 0
    },
    {
      title:'test2',
      description: 'des Test2',
      id: guid(),
      parent: 0
    },
    {
      title:'test3',
      description: 'des Test3',
      id: guid(),
      parent: 0
    }
  ],
  crud: {
    type: false,
    id: false
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__())
/*
store.subscribe(() => {
  console.log('subscribe', store.getState())
})
*/

export default store