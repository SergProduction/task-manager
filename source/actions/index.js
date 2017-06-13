const CRUD = dispatch => ({state, id}) => {
  dispatch({
    type: 'CRUD',
    state: state,
    id: id
  })
}

const ADD = dispatch => ({title, description, id}) => {
  dispatch({
    type: 'ADD',
    task: {title, description, id}
  })
}

const ADD_CHILD = dispatch => ({title, description, parent, id}) => {
  dispatch({
    type: 'ADD_CHILD',
    task: {title, description, parent, id}
  })
}

const UPDATE = dispatch => ({title, description, id}) => {
  dispatch({
    type: 'UPDATE',
    task: {title, description, id}
  })
}

const REMOVE = dispatch => id => {
  dispatch({
    type: 'REMOVE',
    id: id
  })
}



export {CRUD, ADD, ADD_CHILD, UPDATE, REMOVE}