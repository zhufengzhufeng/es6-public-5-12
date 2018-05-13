let fs = require('fs'); // fileSystem
function read(url) {
  return new Promise((resolve,reject)=>{
    fs.readFile(url, 'utf8', function (err, data) {
      if(err) reject(err);
      resolve(data);
    })
  })
}
// 如果返回的是promise 那么会取这个promise的结果，如过成功会走外层的promise的下一个then的成功，将数据传递到成功里
// promise 实现链式调用返回的并不是this而是一个新的promise

// 链式调用
// read('1.txt').then((data)=>{
//   return read(data);
// }).then(data=>{
//   console.log(data);
// },err=>{
//   console.log(err);
// });

// read('1.txt').then(data=>{
//   return 100;
// }).then(data=>{
//   throw new Error();
// }).then(data=>{
//   console.log(data);
// },(err)=>{
//   console.log(err);
// }).then(data=>{
//   console.log(data,'123123');
// });
// 如果返回的是一个普通值就会走到写一个then中的成功回调
// 如果有错误产生会走失败的回调
read('1.txt').then(data=>{
}).then(data=>{
  throw new Error();
}).catch(err=>{
  console.log(err);
}).then(data=>{
  throw new Error()
}).then(data=>{
},err=>{
  console.log(err);
});




// fs.readFile('1.txt','utf8',function (err,data) {
//   if(err)return console.log(err);
//   fs.readFile(data, 'utf8', function (err, data) {
//     if (err) return console.log(err);
//     console.log(data);
//   })
// })
