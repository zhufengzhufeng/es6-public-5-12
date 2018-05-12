// es6 提供了新的声明方式替代了以前的var
// let const
// 一.var 不支持封闭作用域，会声明到全局作用域上
// 1.函数作用域
// 2.全局作用域
// (function () {
//   for (var i = 0; i < 3; i++) {
//     console.log(i);
//   }
// })();
// console.log(i);
// console.log(window.i);
// ----------------------------
// for(var i = 0; i<3;i++){
//   (function (i) {
//     setTimeout(function () {
//       console.log(i);
//     }, 1000);
//   })(i);
// }
// let和{}配和可以产生一个作用域
// let支持块级作用域声明的变量只会声明在当前作用域内
for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
}
console.log(i);

// let可以解决 作用域污染问题和局部作用域的问题

// 二.在同一个作用域下可以多次声明同一个变量
function b(){
  let a = 3;
}
b();
//Identifier 'a' has already been declared
// 变量被重复声明,如果用let声明过了 就不要再用var了

// 三.域解释问题 变量提升 用let解决这个问题
// 暂存死区,如果作用域内 有这样一个变量 那么这个作用域内就会绑定这个变量，不会继续向上查找了 
let a = 1;
{
  console.log(a);
  let a = 2;
}

// 四.通过const声明的变量不能被修改,不能被修改引用空间
const a = {name:'zfpx'};
a.age = 9;
console.log(a);
// 不能修改变量的地址
