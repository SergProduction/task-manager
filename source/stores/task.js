import { createStore } from 'redux'

import todoStore from '../reducers/task'
import {guid, localStore} from '../tools'

const testData = localStore.get() || {
  tasks: [
    {
      title:'Hello!',
      description: '### features\n- Write markdown style\n- Сreate child tasks\n- Tasks are stored in the local browser store',
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

store.subscribe(() => {
  localStore.save( store.getState() )
  console.log('subscribe', store.getState())
})


export default store