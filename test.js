function emulateBind(context, func) {
  return () => func.call(context);
}

let obj = {};
let boundFunc = emulateBind(obj, function () {
  this.foo = "bar";
});

boundFunc();
console.log(obj); // { foo: 'bar' }