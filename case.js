let Promise = require('./14.promise')
let p = new Promise((resolve,reject)=>{
 throw new Error()
});

p.then(data=>{
  console.log('成功')
},err=>{
  console.log(err);
})
