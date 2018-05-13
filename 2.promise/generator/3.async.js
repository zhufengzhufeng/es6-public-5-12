let { promisify } = require('bluebird');
let fs = require('fs');
let read = promisify(fs.readFile);

// async返回的结果是一个promise
// await后面只能跟着promise

// async+await 是generator的语法糖
async function r() {
  let b = await Promise.all([read('a.txt', 'utf8'), read('b.txt', 'utf8')]);
  return b;
};
r().then(data=>{
  console.log(data);
});
// 多个请求并发采用Promise.all的方式
// callback-> promise -> generator -> async + await