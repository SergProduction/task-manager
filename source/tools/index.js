const initLevel = (list, parent) => {
  let lvl = 0

  const lvlParent = (child) => {
    for(let i=0; i<list.length; i++){
      if(child.parent === list[i].id){
        lvl+=1;
        return lvlParent( list[i] )
      }
    }
    return lvl
  }

  return lvlParent(parent)
}

const getChilds = (list, parent) => {
  return list.filter(child => child.parent == parent.id)
}

const getAllChilds = (list, parent) => {

  const findChilds = (parent) =>
    list.filter(child => child.parent === parent.id)

  const findAllChilds = (parent) => {
    let all = findChilds(parent)
    for(let child of all){
      const grands = findAllChilds(child)
      all = all.concat(grands)
    }
    return all
  }

  return findAllChilds(parent)
}
/*
const allChilds = (list, parentId) => list
  .filter(item => item.parent === parentId)
  .reduce((all, child) => [].concat(all, child, getAllChildren(list, child.id)), [])
*/
const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4()+s4()+s4()
}

const localStore = {
  save: (value) => window.localStorage.setItem('taskManager', JSON.stringify(value)) ,
  get: () => JSON.parse( window.localStorage.getItem('taskManager') )
}

export { initLevel, guid, localStore, getAllChilds, getChilds }