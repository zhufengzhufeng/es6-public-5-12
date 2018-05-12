class Promise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    let resolve = value => {
      if (this.status ==='pending'){
        this.status = 'resolved';
        this.value = value;
      }
    }
    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
      }
    }
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFufilled,onRjected){
    if(this.status === 'resolved'){
      onFufilled(this.value);
    }
    if(this.status === 'rejected'){
      onRjected(this.reason);
    }
  }
}
module.exports = Promise

