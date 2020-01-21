function add() {
  var args = []
  var func = function() {
    args = [...args, ...Array.from(arguments)]
    return func
  }
  func.valueOf = function() {
    return args.reduce((sum, cur) => sum + cur, 0)
  }
  func.toString = function() {
    return args.reduce((sum, cur) => sum + cur, 0)
  }
  return func
}

console.log(add(1, 2)(3)(4) + 0)
