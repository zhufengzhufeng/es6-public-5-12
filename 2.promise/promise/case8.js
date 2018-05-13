let Q = require('q');
let fs = require('fs');
function read(url) {
  let defer = Q.defer();
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) defer.reject(err);
    defer.resolve(data);
  });
  return defer.promise;
}
Q.all([read('./2.promise.js/a.txt', 'utf8'), read('./2.promise.js/b.txt', 'utf8')]).then(([data,v])=>{
  console.log(data,v);
});
// Promise.resolve
Q.fcall(function () {
  return 123
}).then(data=>{
  console.log(data);
});
// Promise.reject('10000').then(null,(err)=>{
//   console.log(err);
// }).catch(err=>{
//   console.log(err);
// });