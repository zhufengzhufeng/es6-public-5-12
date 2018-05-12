// Promise es6的
// generator async await 都需要学promise;
// koa generator async await
// axios redux-saga promise
// fetch

// Promise是一种异步流程的控制手段
// 1.回调地狱，代码难以维护 第一个的输出是第二个的输入
// promise链式调用
// 2.promise可以支持多个并发的请求，获取并发请求中的数据
// 3.这个promise可以解决异步的问题，本身不能说promise是异步的

// promise(承诺)关键字 resolve 成功 reject 失败 pending 等待态
// 如果一旦promise成功了就不能失败，相反也是一样的
// 只有状态是等待的状态时 才可以转化状态
// 每一个promise的实例上都有一个then方法,then方法中有两个参数，一个参数叫成功的函数 ，一个是失败的函数
// promise中发生错误 就会执行失败态
// promise可以实现不在传递回调函数了
// 事件环
// Promise只有一个参数 叫excutor执行器，默认new时就会调用

let p = new Promise((resolve,reject)=>{ 
  // 默认promise中的executor是同步执行的
   resolve('买');
});
// then方法是异步调用的，事件环
p.then((value)=>{ // value成功的原因
  console.log(1);
},(err)=>{ // err失败的原因
});
console.log(2);