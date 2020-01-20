function LazyMan(name) {
  var obj = {
    name: name,
    id: null,
    queue: [],
    init: function() {
      var _this = obj;
      _this.queue.push({ func: () => console.log(`hi ${name}`), t: 0 });
      setTimeout(() => {
        _this.next()
      }, 0)
    },
    eat: function(shit) {
      var _this = obj;
      _this.queue.push({ func: () => console.log(`eat ${shit}`), t: 0 });
      return _this;
    },
    sleep: function(second) {
      var _this = obj;
      _this.queue.push({ func: () => console.log(`sleep ${second}s...`), t: 0 });
      _this.queue.push({ func: () => console.log(`awake!`), t: second * 1000 });
      return _this;
    },
    sleepFirst: function(second) {
      var _this = obj;
      _this.queue.unshift({ func: () => console.log(`awake!`), t: second * 1000 });
      _this.queue.unshift({ func: () => console.log(`Sleep First ${second}s...`), t: 0 });
      return _this;
    },
    next: function() {
      var _this = obj
      var cur = _this.queue.shift()
      cur && cur.func && setTimeout(() => {
        cur.func()
        _this.next()
      }, cur.t);
    }
  };
  obj.init();
  return obj;
}

LazyMan('hi')
.sleepFirst(2)
.eat('ap')
.sleep(2)
.eat('ap')
