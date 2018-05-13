let P = require('./promise');
let p = new P((resolve, reject) => {
  resolve();
});
// 会取promise的返回结果作为外层下一次then的参数
// 如果返回的是普通值 直接把值作为外层下一次then的参数
// then方法调用后，返回的是一个新的promise
p.then((data) => {
  return new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
      reject('1234565');
    }))
  })
}, err => {
  console.log('p1:err', err);
}).then((data)=> {
  console.log(data);
},err=>{
  console.log('e',err);
})