let numbers = [1, 2, 3, 4, 5];
console.log(reduce(numbers, (accum, number) => accum + number));   // => 15
console.log(reduce(numbers, (prod, number) => prod * number));     // => 120
console.log(reduce(numbers, (prod, number) => prod * number, 3));  // => 360
console.log(reduce([], (accum, number) => accum + number, 10));    // => 10
console.log(reduce([], (accum, number) => accum + number));
// => undefined

let stooges = ["Mo", "Larry", "Curly"];
console.log(reduce(stooges, (reversedStooges, stooge) => {
  reversedStooges.unshift(stooge);
  return reversedStooges;
}, []));
// => ["Curly", "Larry", "Mo"]

function reduce(array, reducerFn, initialValue) {
  let acc = initialValue;
  let index = 0;
  if (acc === undefined) {
    acc = array[0];
    index = 1;
  }

  while (index < array.length) {
    acc = reducerFn(acc, array[index]);
    index += 1;
  }
  return acc;
}