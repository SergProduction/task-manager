import { createStore } from 'redux'

import todoStore from '../reducers/task'
import {guid} from '../tools'

const testData = {
  tasks: [
    {
      title:'test1',
      description: 'des Test1',
      createDate: +new Date(),
      id: guid(),
      parent: 0
    },
    {
      title:'test2',
      description: 'des Test2',
      createDate: +new Date(),
      id: guid(),
      parent: 0
    },
    {
      title:'test3',
      description: 'des Test3',
      createDate: +new Date(),
      id: guid(),
      parent: 0
    }
  ],
  crud: {
    type: false,
    id: false
  }
}

const store = createStore(todoStore, testData, window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__())
/*
store.subscribe(() => {
  console.log('subscribe', store.getState())
})
*/

export default store