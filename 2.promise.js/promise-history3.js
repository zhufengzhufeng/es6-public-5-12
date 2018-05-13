function resolvePromise(promise2, x, resolve, reject) {
  // 判断x是不是promise
  // 规范里规定了一段代码，这个代码可以实现我们的promise和别人的promise可以进行交互
  if (promise2 === x) { // 不能自己等待自己完成
    return reject(new TypeError('循环引用'));
  }
  // x不是null或者是对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called; // 防止成功后调用失败
    try { // 防止取then是出现异常 Object.defineProperty
      let then = x.then; // 取x的then方法 {then:{}}
      if (typeof then === 'function') { // 如果then是函数我就认为它是promise
        // call 第一个参数是this ，后面的是成功的回调和失败的回调
        then.call(x, y => { // 如果y是promise就继续递归解析promise
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => { // 只要失败了就失败了
          if (called) return;
          called = true;
          reject(r);
        });
      } else { // then是一个普通对象，就直接成功即可1
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else { // x = 123
    resolve(x); // x就是一个普通值
  }
}
class Promise {
  constructor(executor) {
    // 默认状态是等待态
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];
    let resolve = (data) => {
      if (this.status === 'pending') {
        this.value = data;
        this.status = 'resolved';
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }
    let reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    try { // 执行时可能会发生异常
      executor(resolve, reject);
    } catch (e) {
      reject(e); // promise失败了
    }
  }
  then(onFulFilled, onRejected) {
    // 解决onFulFilled,onRejected没有传的问题
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : y => y;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };
    let promise2;
    if (this.status === 'resolved') {
      promise2 = new Promise((resolve, reject) => {
        // 成功的逻辑 失败的逻辑
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
            // 看x是不是promise 如果是promise 取他的结果 作为promise2,成功的结果
            // 如果要是返回一个普通值 作为promise2,成功的结果

            // resolvePromise可以解析x和promise2之间的关系
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
    if (this.status === 'rejected') {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
    // 当前既没有完成 也没有失败
    if (this.status === 'pending') {
      // 存放成功的回调
      promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
        // 存放失败的回调
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      })
    }
    return promise2; // 调用then后返回一个新的promise
  }
}
// promise的语法糖，测试
Promise.deferred = Promise.defer = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}
// npm install promises-aplus-tests -g
// promises-aplus-test 文件名
module.exports = Promise;
// 写完promise会测试一下