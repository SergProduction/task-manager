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

const time = function( format, oldDate ){ // _format: Y M Dw D h m s
  let date = oldDate ? new Date(oldDate) : new Date();
  let tmp = {
    "~Y~": date.getFullYear(), //год в формате (****)
    "~M~": date.getMonth() + 1, //месяц, от 0 до 11
    "~D~": date.getDate(), // число месяца, от 1 до 31
    "~Dw~": date.getDay(), // номер дня в неделе 0-воскресенье, 6-суббота
    "~h~": date.getHours(),
    "~m~": date.getMinutes(),
    "~s~": date.getSeconds(),
  };
  Object.keys(tmp).forEach( key => {
    if( String(tmp[key]).length == 1 )
      tmp[key] = 0 + String(tmp[key])
  })
  Object.keys(tmp).forEach( key => {
    format = format.replace( key, tmp[key] )
  })
  return format
};

const localStore = {
  save: (value) => window.localStorage.setItem('taskManager', JSON.stringify(value)) ,
  get: () => JSON.parse( window.localStorage.getItem('taskManager') )
}

export { initLevel, guid, time, localStore }