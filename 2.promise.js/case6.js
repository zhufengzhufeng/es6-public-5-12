//  let Promise = require('./promise');

// let p = new Promise((resolve,reject)=>{
//   reject('err');
// })

// p.then().then().catch(r=>{
//   console.log(r);
// }).then(data=>{
//   console.log('data',data);
// })

Promise.resolve('hello').then(data=>{
  console.log(data);
})