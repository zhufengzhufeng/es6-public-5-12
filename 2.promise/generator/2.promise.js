let {promisify} = require('bluebird');
let fs = require('fs');
let read = promisify(fs.readFile);
function * gen() {
  let b = yield read('a.txt','utf8');
  let c = yield read(b,'utf8'); 
  return c;
}
// co 可以帮你执行promise
// let co = require('co');
function co(it) {
  // 异步递归怎么实现
  return new Promise((resolve,reject)=>{
    function next(data){ // next是为了实现异步迭代
      let { value, done } = it.next(data);
      if(!done){
        value.then((data=>{
          // 当第一个promise执行完再继续执行下一个next
          next(data);
        }), reject); // 有一个失败了就失败了
      }else{ // 迭代成功后将成功的结果返回
        resolve(value);
      }
    }
    next();
  });
}
co(gen()).then(data=>{
  console.log(data);
});

// it.next().value.then(data=>{
//   it.next(data).value.then(data=>{
//     console.log(it.next(data).value);
//   })
// })

// generator相当于把一个函数拆分成若干个部分执行，执行第一次时，将指针指向下一段代码，直到结束位置

// 如果再generator中调用另一个generator 就需要用 yield *
function *a() {
  yield '1';
  yield '2';
}
function* b() {
  yield '3';
  yield *a()
  yield '4';
}
let it = b();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


