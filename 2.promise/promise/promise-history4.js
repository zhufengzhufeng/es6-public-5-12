function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called;
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
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
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
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : y => y;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };
    let promise2;
    if (this.status === 'resolved') {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
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
    if (this.status === 'pending') {
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
  // catch接收的参数 只用错误
  catch(onRejected) {
    // catch就是then的没有成功的简写
    return this.then(null, onRejected);
  }
}
Promise.resolve = function (val) {
  return new Promise((resolve, reject) => resolve(val))
}
Promise.reject = function (val) {
  return new Promise((resolve, reject) => reject(val));
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
}
Promise.all = function (promises) {
  return new Promise((resolve,reject)=>{
    let arr = [];
    let i = 0; // i的目的是为了保证获取全部成功，来设置的索引
    function processData(index,data) {
      arr[index] = data;
      i++;
      if (i === promises.length){
        resolve(arr);
      }
    }
    for(let i = 0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data);
      }, reject);
    }
  })
}
Promise.deferred = Promise.defer = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}
module.exports = Promise;


