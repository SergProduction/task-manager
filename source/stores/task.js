import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import todoStore from '../reducers/task'
import { guid, localStore } from '../tools'

const testData = localStore.get() || {
  tasks: [
    {
      title: 'Hello!',
      description: '### features\n\n- Write markdown style\n- Сreate child tasks\n- Tasks are stored in the local browser store\n- Special commands\n\n[markdawn help (rus)](http://paulradzkov.com/2014/markdown_cheatsheet/)\n\n[markdawn help (en)](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)\n\n#### special commands\n\n- ```/task "name"``` add childs tasks. Expample - ```/task "subtask"```',
      createDate: +new Date(),
      id: guid(),
      parent: false,
      lvl: 0,
    },
  ],
}

const store = createStore(
  todoStore,
  testData,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.subscribe(() => {
  localStore.save(store.getState())
  console.log('subscribe', store.getState())
})


export default store
