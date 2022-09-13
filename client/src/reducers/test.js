const initialState = {name: 'Chris', age:18 };




console.log({...initialState,name:"小Chris"})

localStorage.setItem('profile',initialState)

console.log(localStorage.getItem('profile'))