// es6提供的，generator是生成器-> 生成的迭代器

// [Symbol.iterator]后面的函数就叫迭代器函数
// 迭代器函数会返回一个对象 it
let obj = {0:1,1:2,length:2,[Symbol.iterator]:function () {
    let index = 0;
    let that = this;
    return {
      next(){ //对象中必须要返回一个next方法
        return {
          value: 1, // value代表的是值
          done: index++ === that.length // done代表的是是否迭代完成
        }
      }
    }
}}
let arr = [...obj];
console.log(arr);


function read(arr) {
  let index = 0;
  return {
    next(){
      return {
        value:arr[index],
        done:index++ >= arr.length
      }
    }
  }
}
// let it = read(['vue','react','node']);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// * 和 yield一起使用，yield产出
function * gen() { // 可以暂停，调用next才会继续走
  let a = yield '买菜'; // a的结果是买回来的菜
  let b = yield a; // b的结果是做好的菜
  return b; // 返回做好的菜
}
let a = gen('菜'); // 执行后返回的是迭代器
console.log(a.next());
console.log(a.next('买好的菜'));
console.log(a.next('做菜'));
// 第一次调用next传递的参数没有任何意义,下一次next传递的参数 是上次yield的返回值
// 会结合promise来写点功能