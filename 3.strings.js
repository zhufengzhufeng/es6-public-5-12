// es6 模板字符串 特殊的字符串
// 模板字符串取代了原有的字符串拼接功能
let name = 'zfpx';
let age = 9;
// hello~'珠峰'今年9岁了
// let str = 'hello~\'' + name + '\'今年' + age+'岁了';
let str = `hello~'${name}'今年${age}岁了`
console.log(str);

// 可以支持换行 可以支持取值
let name = 'zfpx';
let age = 9;
let ul = `<ul>
  <li>${name}</li>
  <li>${age}</li>
</ul>`;
console.log(ul);
// let ul = '<ul>'+
//   '<li>'+name+'</li>'+
//   '<li>'+age+'</li>'
// +'</ul>'
// console.log(ul);

// 如何自己实现一个类模板字符串的功能
let name = 'zfpx';
let age = 9;
let str = 'hello~${name}今年${age}岁了';
str = str.replace(/\$\{([^}]*)\}/g, function () {
  console.log(arguments)
  return eval(arguments[1]); // with
});
console.log(str);


// 带标签的模板字符 自定义模板字符串的实现
let name = 'zfpx';
let age = 9;
function jw() { // 第一个参数是字符串的数组 第二个参数是第一个变量。。。
  let strings = arguments[0];
  // Array.prototype.slice.call()
  let values = [].slice.call(arguments, 1);
  let str = ''
  for (let i = 0; i < values.length; i++) {
    str += `${strings[i]}*${values[i]}*`;
  }
  str += strings[strings.length - 1];
  return str
}
let str = jw`hello~${name}今年${age}岁了`;

// includes 是否包含
let url = 'http://www.zhufengpeixun.cn/logo.png';
console.log(url.includes('zhufengpeixun'));
// startsWith 以xxx开头
console.log(url.startsWith('http://'))
// endsWith 以xxx结尾
console.log(url.endsWith('.png'))
// padStart padEnd 补全
// 进制转化
setInterval(function () {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let str = `${hour.toString().padStart(2, 0)}:`;
  str += `${minutes.toString().padStart(2, 0)}:`;
  str += `${seconds.toString().padStart(2, 0)}`;
  console.log(str)
}, 1000)