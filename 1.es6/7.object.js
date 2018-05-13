let name = {name:"zfpx"};
let age = {age:9};
let obj = Object.assign(name,age);// 浅拷贝
console.log({...name,...age});

// __proto__ 链
// 再es6中可以再对象内 直接操作__proto__
let obj1 = { name: "zfpx" };
let obj2 = { age: 9 };
// obj1.__proto__ = obj2;
Object.setPrototypeOf(obj1,obj2);
console.log(Object.getPrototypeOf(obj1));
let obj2 = {
   age: 9,
   name:'jw'
};
let obj = {
  name:'zfpx',
  getPName(){ // 可以通过super关键字获取到父属性
    return super.name
  },
  __proto__:obj2
}
console.log(obj.getPName());



