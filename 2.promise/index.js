function move(ele, position) {
  return new Promise((resolve, reject) => {
    let left = 0;
    let timer = setInterval(() => {
      left += 5;
      if (left >= position) {
        clearInterval(timer);
        ele.style.transform = `translateX(${position}px)`;
        resolve();
      } else {
        ele.style.transform = `translateX(${left}px)`;
      }
    }, 15);
  })
}
// axios,fetch
// 4) async + await
async function m() {
  await move(ball1, 100);
  await move(ball2, 100);
  await move(ball3, 100);
}
m().then(data=>{
  alert('ok');
});

// 3) generator
// function* m() {
//   yield move(ball1, 500);
//   yield move(ball2, 500);
//   yield move(ball3, 500);
// }
// function co(it) {
//   return new Promise((resolve, reject) => {
//     function next(data) {
//       let { done, value } = it.next(data);
//       if (done) return resolve(value);
//       value.then(data => {
//         next(data);
//       }, reject);
//     }
//     next();
//   })
// }


// co(m()).then(data => {
//   alert('ok');
// })



// 2)promise
// move(ball1,500).then(data=>{
//   return move(ball2,500)
// }).then(data=>{
//   return move(ball3,200);
// }).then(data=>{
//   alert('ok');
// })


// 1)callback
// move(ball1,500,function () {
//   move(ball2, 500, function () {
//     move(ball3, 500, function () {
//       alert('动完了');
//     })
//   })
// })