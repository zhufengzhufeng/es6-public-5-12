let P = require('./promise');
let fs = require('fs');
function read(url) {
  let defer = P.defer();
  fs.readFile(url, 'utf8', function (err,data) {
    if(err) defer.reject(err);
    defer.resolve(data);
  });
  return defer.promise;
}
P.race([
  read('./2.promise.js/a.txt'),
  read('./2.promise.js/b.txt'),
]).then((arr)=>{
  console.log(arr);
},err=>{
  console.log(err);
})
// 思考题
// promise:finally