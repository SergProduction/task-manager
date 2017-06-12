const initLevel = (arr, el) => {
  let lvl = 0

  function lvlParent(child){
    for(let i=0; i<arr.length; i++){
      if(child.parent == arr[i].id){
        lvl+=1;
        return lvlParent( arr[i] )
      }
    }
    return lvl
  }

  return lvlParent(el)
}

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4()+s4()+s4()
}

export { initLevel, guid }