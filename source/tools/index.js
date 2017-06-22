
export const initLevel = (list, parent) => {
  let lvl = 0

  const lvlParent = (child) => {
    for (let i = 0; i < list.length; i++) {
      if (child.parent === list[i].id) {
        lvl += 1
        return lvlParent(list[i])
      }
    }
    return lvl
  }

  return lvlParent(parent)
}

export const getChilds = (list, parent) => list.filter(child => child.parent === parent.id)

export const getAllChilds = (list, parent) => {
  let all = getChilds(list, parent)

  for (const childId in all) {
    const child = all[childId]
    const grands = getAllChilds(child)
    all = all.concat(grands)
  }

  return all
}

/*
const allChilds = (list, parentId) => list
  .filter(item => item.parent === parentId)
  .reduce((all, child) => [].concat(all, child, getAllChildren(list, child.id)), [])
*/

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + s4()
}

export const localStore = {
  save: value => window.localStorage.setItem('taskManager', JSON.stringify(value)),
  get: () => JSON.parse(window.localStorage.getItem('taskManager')),
}

