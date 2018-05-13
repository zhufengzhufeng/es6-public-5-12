let bluebird = require('bluebird');
// promise化 帮我们把一个异步方法转化成promise方法
let fs = require('fs');
function promisifyAll(obj) { // 全部promise化
    for(let key in obj){
      if(typeof obj[key] === 'function'){
        obj[key + 'Async'] = promisify(obj[key]);
      }
    }
}
let r = promisifyAll(fs);
fs.readFileAsync('./2.promise.js/a.txt','utf8').then(data=>{
   console.log(data);
});

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve,reject)=>{
      fn(...args,function (err,data) {
        if(err)reject(err);
        resolve(data);
      })
    });
  }
}
// /// node的回调函数第一个参数永远是err  error-first
// let read = promisify(fs.readFile); //promisify在内部会给fs.readFile加上一个回调函数
// read('./2.promise.js/a.txt','utf8').then(data=>{
//   console.log(data);
// });
