// let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(123);
  },1000)
});
p.then((data) => {
  console.log('s', data);
}, (err) => {
  console.log('e', err);
});
p.then((data)=>{
  console.log('s',data);
},(err)=>{
  console.log('e',err);
});

