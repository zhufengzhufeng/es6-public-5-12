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
    if (this.status === 'resolved') {
      onFulFilled(this.value);
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }
    // 当前既没有完成 也没有失败
    if (this.status === 'pending') {
      // 存放成功的回调
      this.onResolvedCallbacks.push(() => {
        onFulFilled(this.value);
      });
      // 存放失败的回调
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
module.exports = Promise;
// 写完promise会测试一下