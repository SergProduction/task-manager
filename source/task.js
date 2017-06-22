import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './stores/task'
import Task from './components/organisms/task'

render(
  (
  <Provider store={store}>
    <Task/>
  </Provider>
  ),
  document.getElementById('root'))
