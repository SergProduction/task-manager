const CRUD = ({state, id}) => ({
  type: 'CRUD',
  state: state,
  id: id
})

const ADD = ({title, description, id}) => ({
  type: 'ADD',
  task: {title, description, id}
})

const ADD_CHILD = ({title, description, parent, id}) => ({
  type: 'ADD_CHILD',
  task: {title, description, parent, id}
})

const ADD_CHILDS = ({childs, parent}) => ({
  type: 'ADD_CHILDS',
  childs,
  parent
})

const UPDATE = ({title, description, id}) => ({
  type: 'UPDATE',
  task: {title, description, id}
})

const REMOVE = id => ({
  type: 'REMOVE',
  id: id
})



export {CRUD, ADD, ADD_CHILD, ADD_CHILDS, UPDATE, REMOVE}