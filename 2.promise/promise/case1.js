let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
  reject(123);
});
p.then((data)=>{
  console.log('s',data);
},(err)=>{
  console.log('e',err);
});