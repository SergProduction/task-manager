import { createStore } from 'redux'

import todoStore from '../reducers/todo'

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4()+s4()+s4()
}

const store = createStore(todoStore, {
  tasks: [
    {
      title:'test1',
      description: 'des Test1',
      id: guid(),
      children : []
    },
    {
      title:'test2',
      description: 'des Test2',
      id: guid(),
      children : []
    },
    {
      title:'test3',
      description: 'des Test3',
      id: guid(),
      children : []
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