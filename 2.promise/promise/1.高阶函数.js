// 1).函数可以返回函数

// 类型判断
function isType(type, content) { // [object String]
  let t = Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '');
  return t === type;
}
console.log(isType('String', 'abc'));
console.log(isType('String', 'abc'));

// 需要批量的产生一些方法 isString('abc') isNumber(123);

function isType(type) {
  return function (content) {
    let t = Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '');
    return t === type;
  }
}
let arr = ['String', 'Number', 'Array', 'Object', 'Null'];
let util = {}
arr.forEach(item => {
  util['is' + item] = isType(item)
});
console.log(util.isString('123'));

// 2) 函数可以当作参数传递 典型的callback
// loadash after

// 吃饭一个函数 调用3次后 在执行另一个函数
function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  }
}
let eat = after(3, function () {
  console.log('吃完了');
});
eat();
eat();
// 作业：Promise 异步发展流程
// 当达到某个条件时 执行callback

let fs = require('fs');
// let arr = []; // 相当于在外部声明了一个变量
// function out(d) {
//   arr.push(d);
//   if(arr.length == 2) console.log(arr);
// }
function after(times,callback) {
  let arr = [];
  return function (d) {
    arr.push(d);
    if(arr.length === times) callback(arr);
  }
}
let out = after(2, function (data) {
  console.log(data);
});
fs.readFile('./2.promise.js/a.txt', 'utf8', function (err, data) {
  out(data);
})
fs.readFile('./2.promise.js/b.txt', 'utf8', function (err, data) {
  out(data);
});
// 希望当这个文件都被读取完后 拿到结果