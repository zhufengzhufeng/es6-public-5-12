class Promise {
  constructor(executor) {
    // 默认状态是等待态
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    let resolve = (data) => {
      if (this.status === 'pending') {
        this.value = data;
        this.status = 'resolved';
      }
    }
    let reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
      }
    }
    try { // 执行时可能会发生异常
      executor(resolve, reject);
    } catch (e) {
      reject(e); // promise失败了
    }
  }
  then(onFulFilled,onRejected){
    if(this.status === 'resolved'){
      onFulFilled(this.value);
    }
    if(this.status === 'rejected'){
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;

// 写完promise会测试一下