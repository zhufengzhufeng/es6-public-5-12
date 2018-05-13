let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
  // executor执行的时候我们外面报了try{}catch但是我们内部代码是异步的，就无法捕获错误了，需要给没个then中的方法都加一个try{}catch{}
  resolve(1)
});
// then方法可以不穿参数
// 值的穿透
p.then(data=>{
  console.log(1);
},err=>{
})
console.log(2);

