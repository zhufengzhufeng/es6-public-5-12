let fs = require('fs');
let Promise = require('./promise');
function read() {
   // 好处就是解决嵌套问题
   // 坏处错误处理不方便了
    let defer = Promise.defer();
    fs.readFile('./2.promise.js/a.txt','utf8',(err,data)=>{
      if(err)defer.reject(err);
      defer.resolve(data)
    });
    return defer.promise;
}
read().then(data=>{
  console.log(data);
});


// catch() Promise.all() Promise.race() Promise.resolve()
// Promise.reject();

// bluebird Q

// generator co + promise;
// async await

// 写一个例子