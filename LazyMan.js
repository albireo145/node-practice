function LazyMan(name) {
  var obj = {
    name: name,
    id: null,
    queue: [],
    delay: (fn, t) => {
      return new Promise(resolve => setTimeout(() => {
        fn()
        resolve()
      }, t))
    },
    init: function() {
      var _this = obj;
      if (_this.id) {
        clearTimeout(_this.id);
      }
      _this.queue.push({ func: () => console.log(`hi ${name}`), t: 0 });
      var id = setTimeout(function() {
        var temp = _this.delay(function(){}, 0)
        for(let item of _this.queue) {
          temp = temp.then(() => _this.delay(item.func, item.t))
        }
      }, 0)
      _this.id = id;
    },
    eat: function(shit) {
      var _this = obj;
      if (_this.id) {
        clearTimeout(_this.id);
      }
      _this.queue.push({ func: () => console.log(`eat ${shit}`), t: 0 });
      var id = setTimeout(function() {
        var temp = _this.delay(function(){}, 0)
        for(let item of _this.queue) {
          temp = temp.then(() => _this.delay(item.func, item.t))
        }
      }, 0)
      _this.id = id;
      return _this;
    },
    sleep: function(second) {
      var _this = obj;
      if (_this.id) {
        clearTimeout(_this.id);
      }
      _this.queue.push({ func: () => console.log(`sleep ${second}s...`), t: 0 });
      _this.queue.push({ func: () => console.log(`awake!`), t: second * 1000 });
      var id = setTimeout(function() {
        var temp = _this.delay(function(){}, 0)
        for(let item of _this.queue) {
          temp = temp.then(() => _this.delay(item.func, item.t))
        }
      }, 0)
      _this.id = id;
      return _this;
    },
    sleepFirst: function(second) {
      var _this = obj;
      if (_this.id) {
        clearTimeout(_this.id);
      }
      _this.queue.unshift({ func: () => console.log(`awake!`), t: second * 1000 });
      _this.queue.unshift({ func: () => console.log(`Sleep First ${second}s...`), t: 0 });
      var id = setTimeout(function() {
        var temp = _this.delay(function(){}, 0)
        for(let item of _this.queue) {
          temp = temp.then(() => _this.delay(item.func, item.t))
        }
      }, 0)
      _this.id = id;
      return _this;
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
