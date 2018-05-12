class Parent{
  constructor(){
    this.name = 'parent';
    return {a:1};
  }
  static b(){
    return 2;
  }
  eat(){
    console.log('eat');
  }
}
class Child extends Parent{ // 要求继承父亲的私有和有公有
  constructor(){
    super(); // Parent.call(this);
    this.age = 9; // 私有属性
  }
  static a(){ // 属于类上的方法
    return 1;
  }
  smoking(){ // 原型上的方法
    console.log('smoking')
  }
}
let child = new Child();
console.log(child);
//1.类只能new
// Class constructor Child cannot be invoked without 'new'
//2.类可以继承公有私有和静态方法
//3.父类的构造函数中返回了一个引用类型会把这个引用类型作为子类的this