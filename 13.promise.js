let p = new Promise((resolve,reject)=>{
  resolve('成功');
});
//一个promise可以then多次
p.then(data=>{
  console.log(data);
});
p.then(data=>{
  console.log(data);
})
p.then(data => {
  console.log(data);
});

let fs = require('fs'); // fileSystem
function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    })
  })
}
// Promise.all方法调用后会返回一个新的promise
// 并发的
// race赛跑,处理多请求只取最快的
// Promise.race([read('1.txt'),read('2.txt')]).then((data)=>{
//   console.log(data);
// },err=>{
//   console.log(err);
// });
// Promise.resolve() 返回一个成功的promise
// Promise.reject() 返回一个失败的promise
Promise.reject('123').then(null,data=>{
  console.log(data);
});