import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import todoStore from '../reducers/task'
import { guid, localStore } from '../tools'
import { description, title } from './defaults'

const prod = process.env.NODE_ENV === 'production'

const testData = localStore.get() || {
  tasks: [
    {
      title,
      description,
      createDate: Number(new Date()),
      id: guid(),
      parent: false,
      lvl: 0,
    },
  ],
}

const store = createStore(
  todoStore,
  testData,
  prod
    ? applyMiddleware(thunk)
    : compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      )
)

store.subscribe(() => {
  localStore.save(store.getState())
  console.log('subscribe', store.getState())
})


export default store
