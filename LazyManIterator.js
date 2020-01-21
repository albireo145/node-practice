// function LazyMan(name) {
//   var obj = {
//     name: name,
//     id: null,
//     queue: [],
//     eat: function(shit) {
//       var _this = obj;
//       _this.queue.push({ func: () => console.log(`eat ${shit}`), t: 0 });
//       return _this;
//     },
//     sleep: function(second) {
//       var _this = obj;
//       _this.queue.push({ func: () => console.log(`sleep ${second}s...`), t: 0 });
//       _this.queue.push({ func: () => console.log(`awake!`), t: second * 1000 });
//       return _this;
//     },
//     sleepFirst: function(second) {
//       var _this = obj;
//       _this.queue.unshift({ func: () => console.log(`awake!`), t: second * 1000 });
//       _this.queue.unshift({ func: () => console.log(`Sleep First ${second}s...`), t: 0 });
//       return _this;
//     },
//     [Symbol.iterator]: function() {
//       var _this = obj
//       return {
//         next: function() {
//           return {
//             value: _this.queue.shift(),
//             done: _this.queue.length === 0
//           }
//         }
//       }
//     },
//     next: async function() {
//       var _this = obj
//       var iterator = _this[Symbol.iterator]()
//       let value, done;
//       do {
//         let next = iterator.next()
//         value = next.value
//         done = next.done
//         await new Promise(resolve => {
//           setTimeout(function() {
//             value.func()
//             resolve()
//           }, value.t)
//         })
//       } while (!done)
//     },
//     init: function() {
//       var _this = obj;
//       _this.queue.push({ func: () => console.log(`hi ${name}`), t: 0 });
//       setTimeout(() => {
//         _this.next()
//       }, 0)
//     },
//   };
//   obj.init();
//   return obj;
// }

class LazyMan {
  constructor(name) {
    this.name = name
    this.queue = []
    this.init()
  }
  eat(shit) {
    this.queue.push({ func: () => console.log(`eat ${shit}`), t: 0 });
    return this
  }
  sleep(second) {
    this.queue.push({ func: () => console.log(`sleep ${second}s...`), t: 0 });
    this.queue.push({ func: () => console.log(`awake!`), t: second * 1000 });
    return this;
  }
  sleepFirst(second) {
    this.queue.unshift({ func: () => console.log(`awake!`), t: second * 1000 });
    this.queue.unshift({ func: () => console.log(`Sleep First ${second}s...`), t: 0 });
    return this;
  }
  [Symbol.iterator]() {
    return {
      next: () => {
        return {
          value: this.queue.shift(),
          done: this.queue.length === 0
        }
      }
    }
  }
  async next() {
    var iterator = this[Symbol.iterator]()
    let value, done;
    do {
      let next = iterator.next()
      value = next.value
      done = next.done
      await new Promise(resolve => {
        setTimeout(function() {
          value.func()
          resolve()
        }, value.t)
      })
    } while (!done)
  }

  init() {
    this.queue.push({ func: () => console.log(`hi ${this.name}`), t: 0 });
    setTimeout(() => {
      this.next()
    }, 0)
  }
}

new LazyMan('hi')
.sleepFirst(2)
.eat('ap')
.sleep(2)
.eat('ap')
