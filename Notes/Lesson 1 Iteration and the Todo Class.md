# Walkthrough: Build a forEach Method

- We'll take what we know about JavaScript and build our own `forEach` function. By now, you're very familiar with the built-in `Array.prototype.forEach` method. We won't try to emulate some of the more subtle behaviors of `forEach`, but we will implement the most important behaviors.

- It may seem a bit silly to reimplement built-in methods, but there's a method to this madness (pun unintended; okay, maybe just a little intentional). Ordinarily, you don't want to "reinvent the wheel" like we're about to do. However, emulating existing functions and methods is a great way to enhance and hone your programming skills. It also helps you learn how these functions work, and that helps you learn how to use them more effectively.

Our `forEach` function won't be part of the `Array` prototype. Thus, we'll have to invoke it differently. Let's compare its use with that of the built-in version:

```js
let arr = [1, 2, 3, 4];

// Array.prototype.forEach
arr.forEach(value => console.log(value * value));

// Our forEach function
forEach(arr, value => console.log(value * value));
```

The output of both functions should be the same:

```plaintext
1
4
9
16
```

`Array.prototype.forEach` iterates through the array and invokes the callback for each element in the array. In each invocation of the callback, `forEach` passes the current iteration element to the callback as an argument. Once the method finishes the iteration, it returns `undefined`.

## Iteration and Callbacks

Let's implement our `forEach` function. Other than taking an array argument, our function should behave the same way. We can get the behavior we need with a `for` loop:

```js
function forEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    callback(array[index]);
    // relying on implicit return to return `undefined`.
  }
}
```

That's it. Note that we're relying on an implicit return to return `undefined`. We could have used `Array.prototype.forEach` to iterate through the array, but that's too much like cheating. In any case, a `for` loop is straightforward and easy.

Let's make sure our `forEach` function behaves the way it should:

```js
function forEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    callback(array[index]);
  }
}

let arr = [1, 2, 3, 4];
forEach(arr, value => console.log(value * value));
```

**Output:**

```plaintext
1
4
9
16
```

Great! It looks like our `forEach` function behaves the same as `Array.prototype.forEach`!

The magic behind our `forEach` function is the same magic that the built-in `forEach` method uses: it doesn't implement the action it performs on each element of the array. Do we increment every value by one? Do we output the element? None of that matters since our `forEach` function only cares about *iterating*. It doesn't care what we do with each element. Generic iteration functions let method callers pass in a callback function that takes care of the specific details of the iteration. All our function has to do is invoke the callback function with the expected arguments (the array element in this case).

##### **My Notes**

```js
let arr = [1, 2, 3, 4];

// Array.prototype.forEach
arr.forEach(value => console.log(value * value));

// Our forEach function
forEach(arr, value => console.log(value * value));

function forEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    callback(array[index]);
    // relying on implicit return to return `undefined`.
  }
}

let arr = [1, 2, 3, 4];
forEach(arr, value => console.log(value * value));

```

- `forEach` abstracts away the mechanics of *iterating* and lets a callback function take care of the specific details of the iteration. 

## Defining The Execution Context

Another feature of `Array.prototype.forEach` is that it lets us set the execution context for the callback function by passing in a second argument, often designated as `thisArg` in JavaScript documentation. For instance:

```js
class Foo {
  constructor(prefix) {
    this.prefix = prefix;
  }

  showItem(item) {
    console.log(this.prefix, item);
  }
}

let foo = new Foo("Item: ");
[1, 2, 3].forEach(foo.showItem, foo);
[4, 5, 6].forEach(foo.showItem);
```

**Output**

```plaintext
Item:  1
Item:  2
Item:  3
TypeError: Cannot read property 'prefix' of undefined
```

Our function should have similar behavior:

```js
forEach([1, 2, 3], foo.showItem, foo);
forEach([4, 5, 6], foo.showItem);
```

**Output**

```plaintext
Item:  1
Item:  2
Item:  3
TypeError: Cannot read property 'prefix' of undefined
```

Hmm... it doesn't work, does it? See if you can make the necessary adjustments on your own. Make sure your code still works with callbacks that don't need an explicit context.

Show Solution

```js
// their solution
function forEach(array, callback, thisArg) {
  for (let index = 0; index < array.length; index += 1) {
    callback.call(thisArg, array[index]);
  }
}

forEach(["a", "b", "c"], item => console.log(item));
forEach([1, 2, 3], foo.showItem, foo);
forEach([4, 5, 6], foo.showItem);
```

```js
// my solution with all code
class Foo {
  constructor(prefix) {
    this.prefix = prefix;
  }

  showItem(item) {
    console.log(this.prefix, item);
  }
}

let foo = new Foo("Item: ");

function forEach(array, callback, thisArg) {
  for (let index = 0; index < array.length; index += 1) {
    callback.call(thisArg, array[index]);
  }
}

forEach(["a", "b", "c"], item => console.log(item));
forEach([1, 2, 3], foo.showItem, foo);
forEach([4, 5, 6], foo.showItem);
```

Output

```
a
b
c
Item:  1
Item:  2
Item:  3
TypeError: Cannot read property 'prefix' of undefined
```

## Adding The Index And Array Arguments

As we've seen, `Array.prototype.forEach` passes to the callback function the value of the current element during iteration. It also passes to the callback the element's index and a reference to the array that invoked `forEach`. The callback is free to ignore those arguments -- and often does -- but you can use them when you need them:

```js
["a", "b", "c"].forEach(function(value, index, arr) {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});
```

**Output**

```plaintext
After a comes b
After b comes c
After c comes undefined
```

Try to modify your `forEach` function so that it passes the index and array to the callback function.

Show Solution

```js
// their solution
function forEach(array, callback, thisArg) {
  for (let index = 0; index < array.length; index += 1) {
    callback.call(thisArg, array[index], index, array);
  }
}

forEach(["a", "b", "c"], function(value, index, arr) {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});
```

```js
// my solution: complete
class Foo {
  constructor(prefix) {
    this.prefix = prefix;
  }

  showItem(item) {
    console.log(this.prefix, item);
  }
}

let foo = new Foo("Item: ");

function forEach(array, callback, thisArg) {
  for (let index = 0; index < array.length; index += 1) {
    let element = array[index];
    callback.call(thisArg, element, index, array);
  }
}

forEach(["a", "b", "c"], function(value, index, arr) {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});
```

## Summary

In this assignment, you learned how to implement the functionality behind the built-in `Array.prototype.forEach` method. In the next assignment, you'll get more practice with emulating built-in methods: we'll tackle the `filter`, `map`, and `reduce` methods specifically.

------

# Practice Problems: Emulating Iteration Methods

Let's get some practice emulating built-in Array methods.

## Basic Emulation Problems

1. Write a function that acts like the built-in `Array.prototype.filter` method. For this problem, you only need to emulate the most basic behavior: filtering elements of an array by examining the array values. You don't have to support multiple arguments to the callback function, but feel free to add them if you like. Your function should work like this:

   ```js
   let numbers = [1, 2, 3, 4, 5];
   console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
   console.log(filter(numbers, number => number < 0)); // => []
   console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]
   
   let values = [1, "abc", null, true, undefined, "xyz"];
   console.log(filter(values, value => typeof value === "string"));
   // => [ 'abc', 'xyz' ]
   ```

   Note that the function should not mutate the input array.

   Possible Solution

   ```js
   function filter(array, callback, thisArg) {
     let truthy = [];
     for (let i = 0; i < array.length; i+= 1) {
       let element = array[i];
       if (callback.call(thisArg, element)) {
         truthy.push(element);
       }
     }
     return truthy;
   }
   ```

   ```js
   // their solution
   function filter(array, callback) {
     let filteredItems = [];
     for (let index = 0; index < array.length; index += 1) {
       let value = array[index];
       if (callback(value)) {
         filteredItems.push(value);
       }
     }
   
     return filteredItems;
   }
   ```

   

2. Write a function that acts like the built-in `Array.prototype.map` method. For this problem, you only need to emulate the most basic behavior: transforming the elements of an array by using the array values. You don't have to include the `thisArg` argument or support multiple arguments to the callback function, but feel free to add them if you like. Your function should work like this:

   ```js
   let numbers = [1, 2, 3, 4, 5];
   console.log(map(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
   console.log(map(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
   console.log(map(numbers, () => false));
   // => [ false, false, false, false, false ]
   
   let values = [1, "abc", null, true, undefined, "xyz"];
   console.log(map(values, value => String(value)));
   // => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]
   ```

   Note that the function should not mutate the input array.

   Possible Solution
   
   ```js
   // their solution
   function map(array, callback) {
     let transformedItems = [];
     for (let index = 0; index < array.length; index += 1) {
       transformedItems.push(callback(array[index]));
     }
   
     return transformedItems;
   }
   ```
   
   ```js
   function map(array, callback, thisArg) {
     let newArray = [];
     for (let i = 0; i < array.length; i += 1) {
       let element = array[i];
       newArray.push(callback.call(thisArg, element));
     }
     return newArray;
   }
   ```
   
   

## Emulating and Using the `reduce` Method

Before tackling the problems, you may want to read [this article](https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/) on the `Array.prototype.reduce` method. We discussed `reduce` in the [Introduction to Programming with JavaScript book](https://launchschool.com/books/javascript/read/arrays#iterationmethods). The article will refresh your memory about `reduce`, and show you some of its power. (You can ignore the section on asynchronous functions.)

------

#### [this article](https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/) about `Array.prototype.reduce` method notes

- `reduce` is the swiss army knife of array iterators
  - From practice problems: Not limited to simple accumulation-style processing, but can perform a wide variety of different tasks with it. For instance, you can emulate many of the standard Array methods, including `filter`, `map`, and more.
  - Can build most of other iterator methods with it like `map()` `filter()` or `flatMap()`
  - is tricky because its so different from `map` and `filter`
  
- Definition
  - The **reduce()** method executes a **reducer** function (that you provide) on each element of the array, resulting in single output value.
    - If no initial value is specified, accumulator's value is index 0, and current value is at index 1. If an initial value is specified, that’s the starting value of accumulator, and current value is at index 0. 
    - Whatever the reducer function returns is the 'carry value' of the accumulator. 
  - Most basic behavior: reducing the elements of an array down to a single value based on the original array values. 


- Syntax for `reduce()`

  ```js
  reduce((accumulator, currentValue, index, array) => { … }, initialValue)
  
  reduce((acc, cv) => acc + cv, initialValue)
  
  reduce(reducerFn, initialValue)
  ```

- Syntax for the reducer function

  ```js
  function reducerFn(accumulator, arrayElement) {
    // code
  }
  ```

  - The reducer function is the first parameter we pass to `reduce()`. 
  - The reducer function takes an accumulator value as well as current array element( current value).
  - Accumulator is represents a 'carry' value: it contains whatever was returned last time the reducer function was called. If the reducer function hasn't been called yet, then it contains the initial value. 

- Add or multiply numbers together with `reduce`


    - When we pass `add()` in as the reducer the accumulator maps to the `a` part of `a + b`. `a` *just so happens* to contain the running total of all the previous items.

  ```js
  function add(a, b) {
      return a + b;
  }
  
  function multiply(a, b) {
      return a * b;
  }
  
  const sampleArray = [1, 2, 3, 4];
  
  const sum = sampleArray.reduce(add, 0);
  console.log(‘The sum total is:’, sum);
  // ⦘ The sum total is: 10
  
  const product = sampleArray.reduce(multiply, 1);
  console.log(‘The product total is:’, product);
  // ⦘ The product total is: 24
  ```

- power of `reduce()` is that the `accumulator` and `arrayElement` don't have to be the same type. 

  - For example, our accumulator might be a string, while our array contains numbers
  - Accumulator value doesn't have a be a simple type (like numbers or strings). It can't be a structured type like an array or plain ol' JavaScript object (POJO). 

  ```js
  function fizzBuzzReducer(acc, element) {
      if (element % 15 === 0) return `${acc}Fizz Buzz\n`;
      if (element % 5 === 0) return `${acc}Fizz\n`;
      if (element % 3 === 0) return `${acc}Buzz\n`;
      return `${acc}${element}\n`;
  }
  
  const nums = [
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15
  ];
  
  console.log(nums.reduce(fizzBuzzReducer, ''));
  ```

  ```plain text
  // output
  1
  2
  Buzz
  4
  Fizz
  Buzz
  7
  8
  Buzz
  Fizz
  11
  Buzz
  13
  14
  Fizz Buzz
  ```

- Interesting things we can do with `reduce`

  - Convert an array to an object
  - Unfold to a larger array
  - Make two calculations in one traversal
  - Combine mapping and filtering into one pass
  - Run asynchronous functions in sequence(ignore this)

##### Convert an array to an object

- We can use `.reduce()` to convert an array to a POJO. 
- This can be handy if you need to do lookups of some sort. 
- Say we had a list of people

```js
const peopleArr  = [
    {
        username:    'glestrade',
        displayname: 'Inspector Lestrade',
        email:       'glestrade@met.police.uk',
        authHash:    'bdbf9920f42242defd9a7f76451f4f1d',
        lastSeen:    '2019-05-13T11:07:22+00:00',
    },
    {
        username:    'mholmes',
        displayname: 'Mycroft Holmes',
        email:       'mholmes@gov.uk',
        authHash:    'b4d04ad5c4c6483cfea030ff4e7c70bc',
        lastSeen:    '2019-05-10T11:21:36+00:00',
    },
    {
        username:    'iadler',
        displayname: 'Irene Adler',
        email:       null,
        authHash:    '319d55944f13760af0a07bf24bd1de28',
        lastSeen:    '2019-05-17T11:12:12+00:00',
    },
];
```

In some circumstances, it might be convenient to look up user details by their username. To make that easier, we can convert our array to an object.

```js
function keyByUsernameReducer(acc, person) {
    return {...acc, [person.username]: person}; // expand accumulator object because we only want its contents, the key value pairs instead of an object {}. 
}
const peopleObj = peopleArr.reduce(keyByUsernameReducer, {});
console.log(peopleObj);
// ⦘ {
//     "glestrade": {
//         "username":    "glestrade",
//         "displayname": "Inspector Lestrade",
//         "email":       "glestrade@met.police.uk",
//         "authHash":    "bdbf9920f42242defd9a7f76451f4f1d",
//          "lastSeen":    "2019-05-13T11:07:22+00:00"
//     },
//     "mholmes": {
//         "username":    "mholmes",
//         "displayname": "Mycroft Holmes",
//         "email":       "mholmes@gov.uk",
//         "authHash":    "b4d04ad5c4c6483cfea030ff4e7c70bc",
//          "lastSeen":    "2019-05-10T11:21:36+00:00"
//     },
//     "iadler":{
//         "username":    "iadler",
//         "displayname": "Irene Adler",
//         "email":       null,
//         "authHash":    "319d55944f13760af0a07bf24bd1de28",
//          "lastSeen":    "2019-05-17T11:12:12+00:00"
//     }
// }
```

In this version, I’ve left the username as part of the object. But with a small tweak you can remove it (if you need to).

##### Unfold a small array to a larger array

- Can use `.reduce()` to transform short arrays into longer ones. 
  - This can be handy if you’re reading data from a text file.
  - Example 1: Imagine we’ve read a bunch of plain text lines into an array. We’d like to split each line by commas, and have one big list of names.


```js
const fileLines = [
    'Inspector Algar,Inspector Bardle,Mr. Barker,Inspector Barton',
    'Inspector Baynes,Inspector Bradstreet,Inspector Sam Brown',
    'Monsieur Dubugue,Birdy Edwards,Inspector Forbes,Inspector Forrester',
    'Inspector Gregory,Inspector Tobias Gregson,Inspector Hill',
    'Inspector Stanley Hopkins,Inspector Athelney Jones'
];

function splitLineReducer(acc, line) { // acc is accumulator, line is element.
    return acc.concat(line.split(/,/g)); // concatenates the array. 
}
const investigators = fileLines.reduce(splitLineReducer, []);
console.log(investigators);
// ⦘ [
//   "Inspector Algar",
//   "Inspector Bardle",
//   "Mr. Barker",
//   "Inspector Barton",
//   "Inspector Baynes",
//   "Inspector Bradstreet",
//   "Inspector Sam Brown",
//   "Monsieur Dubugue",
//   "Birdy Edwards",
//   "Inspector Forbes",
//   "Inspector Forrester",
//   "Inspector Gregory",
//   "Inspector Tobias Gregson",
//   "Inspector Hill",
//   "Inspector Stanley Hopkins",
//   "Inspector Athelney Jones"
// ]
```

- Or, we can use `.reduce()` to create our own `flatMap()` function.

```js
function flatMap(f, arr) {
    const reducer = (acc, item) => acc.concat(f(item));
    return arr.reduce(reducer, []);
}

const investigators = flatMap(x => x.split(','), fileLines);
console.log(investigators);

```

- > `.flatMap()` is a proposal, it's not available in Internet Explorer or Edge. You pass it a function that returns an array an it will squish all the results together into a flat array.

  - `Flatmap` abstracts away the mechanics of iterating and lets a callback function take are of the specific details of the iteration. 
  - here we pass the callback function to `flatmap` which essentially becomes the reducer function for `reduce`. 
  - This is the way to build functions using `reduce`. 

So, `.reduce()` can help us make longer arrays out of short ones. But it can also cover for missing array methods that aren’t available. 

##### Make two calculations in one traversal

- Sometimes we need to make two calculations based on a single array. For example, we might want to calculate the maximum *and* the minimum for a list of numbers. We could do this with two passes like so:

  ```js
  const readings = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
  const maxReading = readings.reduce((x, y) => Math.max(x, y), Number.MIN_VALUE);
  const minReading = readings.reduce((x, y) => Math.min(x, y), Number.MAX_VALUE);
  console.log({minReading, maxReading});
  // ⦘ {minReading: 0.2, maxReading: 5.5}
  ```

- This requires traversing our array twice. But, there may be times when we don’t want to do that. Since `.reduce()` lets us return any type we want, we don’t have to return a number. We can encode two values into an object. Then we can do two calculations on each iteration and only traverse the array once:

  ```js
  const readings = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
  function minMaxReducer(acc, reading) {
      return {
          minReading: Math.min(acc.minReading, reading),
          maxReading: Math.max(acc.maxReading, reading),
      };
  }
  const initMinMax = {
      minReading: Number.MAX_VALUE, // 1.7976931348623157e+308
      maxReading: Number.MIN_VALUE, //5e-324
  };
  const minMax = readings.reduce(minMaxReducer, initMinMax);
  console.log(minMax);
  // ⦘ {minReading: 0.2, maxReading: 5.5}
  ```

  - The trouble with this particular example is that we don’t really get a performance boost here. We still end up performing the same number of calculations. But, there are cases where it might make a genuine difference. For example, if we’re combining `.map()` and `.filter()` operations…

##### Combine mapping and filtering into one pass

```js
const peopleArr  = [
    {
        username:    'glestrade',
        displayname: 'Inspector Lestrade',
        email:       'glestrade@met.police.uk',
        authHash:    'bdbf9920f42242defd9a7f76451f4f1d',
        lastSeen:    '2019-05-13T11:07:22+00:00',
    },
    {
        username:    'mholmes',
        displayname: 'Mycroft Holmes',
        email:       'mholmes@gov.uk',
        authHash:    'b4d04ad5c4c6483cfea030ff4e7c70bc',
        lastSeen:    '2019-05-10T11:21:36+00:00',
    },
    {
        username:    'iadler',
        displayname: 'Irene Adler',
        email:       null,
        authHash:    '319d55944f13760af0a07bf24bd1de28',
        lastSeen:    '2019-05-17T11:12:12+00:00',
    },
];
```

Using the same `peopleArr` from before. We’d like to find the most recent login, *excluding* people without an email address. One way to do this would be with three separate operations:

1. Filter out entries without an email; then
2. Extract the `lastSeen` property; and finally
3. Find the maximum value.

Putting that all together might look something like so:

```js
function notEmptyEmail(x) {
   return (x.email !== null) && (x.email !== undefined);
}

function getLastSeen(x) {
    return x.lastSeen;
}

function greater(a, b) { // returns greater value
    return (a > b) ? a : b;
}

const peopleWithEmail = peopleArr.filter(notEmptyEmail);
const lastSeenDates   = peopleWithEmail.map(getLastSeen);
const mostRecent      = lastSeenDates.reduce(greater, '');

console.log(mostRecent);
// ⦘ 2019-05-13T11:07:22+00:00
```

Now, this code is perfectly readable and it works. For the sample data, it’s just fine. But if we had an enormous array, then there’s a chance we might start running into memory issues. This is because we use a variable to store each intermediate array. 

If we modify our reducer callback, then we can do everything in one pass:

```js
function notEmptyEmail(x) {
   return (x.email !== null) && (x.email !== undefined);
}

function greater(a, b) {
    return (a > b) ? a : b;
}
function notEmptyMostRecent(currentRecent, person) { 
  // If person element has an email, then return the greater of accumulator(currentRecent) & currentvalue (person.lastSeen). Else return accumulator value. 
    return (notEmptyEmail(person))
        ? greater(currentRecent, person.lastSeen)
        : currentRecent;
}

const mostRecent = peopleArr.reduce(notEmptyMostRecent, '');

console.log(mostRecent);
// ⦘ 2019-05-13T11:07:22+00:00
```

In this version we traverse the array just once. But it may not be an improvement if the list of people is always small. My recommendation would be to stick with `.filter()` and `.map()` by default. If you identify memory-usage or performance issues, *then* look at alternatives like this.

------

#### Optional Video 

[link](https://www.youtube.com/watch?v=kC3AasLEuBA&ab_channel=AllThingsJavaScript%2CLLC)

Note that the last example in this video uses concepts we haven't seen yet, but the explanation is good.

```js
const scores = [90, 30, 20, 75, 85, 95, 0, 55, 60, 40];

let minMax = scores.reduce((acc, score) => [Math.min(acc[0], score), Math.max(acc[1], score)], [100, 0]); 
// [100, 0] is the initial value

console.log(minMax); // [0, 95]
```

<img src="C:\Users\jenny\AppData\Roaming\Typora\typora-user-images\image-20220714233234706.png" alt="image-20220714233234706" style="zoom:50%;" />

- spread operator:  expand accumulator object because we only want its contents(properties and values), the key value pairs instead of an object {}. 
- Use brackets `[]` to get the computed value. Because we don't want `"person.username"` as the key name. We want the computed value to be the key name. 

------

#### Problems

1. Write a function that acts like the built-in `Array.prototype.reduce` method. For this problem, you only need to emulate the most basic behavior: reducing the elements of an array down to a single value based on the original array values. The result may be a primitive value, an object, or another array. You don't have to include the `thisArg` argument or support multiple arguments to the callback function, but feel free to add them if you like. Your function should work like this:

   ```js
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
   ```

   Note that the function should not mutate the input array. Don't forget to account for the initialValue argument!

   > If you're a little fuzzy on how `reduce` works and what it's used for, check out [this optional video](https://www.youtube.com/watch?v=kC3AasLEuBA). Note that the last example in this video uses concepts we haven't seen yet, but the explanation is good.

   Hint: Pay attention to how `Array.prototype.reduce` deals with the initial value argument.

   - If no initial value is specified, accumulator's value is index 0, and current value is at index 1. If an initial value is specified, that’s the starting value of accumulator, and current value is at index 0. 

   Possible Solution

   ```JS
   // Their solution
   function reduce(array, callback, initialValue) {
     let accumulator = initialValue;
     let index = 0;
   
     if (accumulator === undefined) {
       accumulator = array[0];
       index = 1;
     }
   
     while (index < array.length) {
       accumulator = callback(accumulator, array[index]);
       index += 1;
     }
   
     return accumulator;
   }
   ```

   ```js
   // first attempt -> success!
   function reduce(array, reducerFn, initialValue = false) {
     let acc;
     if (!initialValue) {
       acc = array[0];
       for (let i = 1; i < array.length; i += 1) {
         let elem = array[i];
       	acc = reducerFn(acc, elem);
     	}
       return acc;
     } else {
       acc = initialValue;
       for (let i = 0; i < array.length; i += 1) {
         let elem = array[i];
       	acc = reducerFn(acc, elem);
     	}
       return acc;
     }
   }
   ```

   ```js
   // 2nd try
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
   ```

2. `Array.prototype.reduce` can be an incredibly useful function. You're not limited to simple accumulation-style processing, but can perform a wide variety of different tasks with it. For instance, you can emulate many of the standard Array methods, including `filter`, `map`, and more.

   Let's try it. Write a function that works like the `filter` function from problem 1. This time, though, you should use `Array.prototype.reduce` to filter the input array.

   ```js
   let numbers = [1, 2, 3, 4, 5];
   console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
   console.log(filter(numbers, number => number < 0)); // => []
   console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]
   
   let values = [1, "abc", null, true, undefined, "xyz"];
   console.log(filter(values, value => typeof value === "string"));
   // => [ 'abc', 'xyz' ]
   ```

   Possible Solution

   ```js
   function filter(array, callback) {
     return array.reduce((filteredItems, value) => {
       if (callback(value)) {
         filteredItems.push(value);
       }
       return filteredItems;
     }, []);
   }
   ```

   As you can see, this is very similar to the `filter` function in our solution to problem 1. The chief difference is that we now use `Array.prototype.reduce` to iterate over the array elements, and use an array as the accumulator (`filteredItems`) and the final return value.

   ```js
   // first attempt --> works
   function filter(array, callback) {
     let reducerFn = function (acc, elem) {
       if (callback(elem)) {
         return [...acc, elem];
       } else {
         return acc;
       }
     }
     return array.reduce(reducerFn, []);
   }
   ```

   ```js
   // redo
   function filter(array, callback) {
     return array.reduce((filteredItems, elem) => {
       if (callback(elem)) {
         filteredItems.push(elem);
       }
       return filteredItems;     
     }, []);
   }
   ```

   

3. Let's put `reduce` to work with emulating `map` as well. Write a function that works like the `map` function from problem 2. This time, though, use `Array.prototype.reduce` to transform the input array.

   ```js
   let numbers = [1, 2, 3, 4, 5];
   console.log(map(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
   console.log(map(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
   console.log(map(numbers, () => false));
   // => [ false, false, false, false, false ]
   
   let values = [1, "abc", null, true, undefined, "xyz"];
   console.log(map(values, value => String(value)));
   // => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]
   ```

   Possible Solution

   ```js
   // their solution
   function map(array, callback) {
     return array.reduce((transformedItems, value) => {
       transformedItems.push(callback(value));
       return transformedItems;
     }, []);
   }
   ```

   ```js
   // first attempt
   function map(array, callback) {
     return array.reduce((acc, cv) => {
       acc.push(callback(cv));
       return acc; // remember to return accumulator, because push returns new length of the array
     }, []);
   }
   ```

   

## Want Some More Practice?

That's it for our prepared practice problems. If you want further practice, see the [MDN Documentation for Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Many of the built-in Array methods are good emulation candidates.

If you get bored emulating the Array methods, see if you can write some functions that manipulate objects instead of arrays. For instance, here's a version of `forEach` that operates on objects:

Show Function

```js
function objForEach(object, callback) {
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      callback(property, object[property]);
    }
  }
}

let obj = { foo: 1, bar: 2, qux: 3 };
objForEach(obj, (property, value) => {
  console.log(`the value of ${property} is ${value}`);
});
```

**Output**

```plaintext
the value of foo is 1
the value of bar is 2
the value of qux is 3
```

------

# Build a TodoList Class: Getting Started

In this assignment, we'll start working on a simple todo list project. The project contains two classes: a `TodoList` class and a `Todo` class. `TodoList` objects contain a collection (an array) of `Todo` objects. We'll finish building the project in subsequent assignments.

We'll reuse this code in later lessons, so make sure that you create a git repository for it and push it to the remote repository. For best results, create a new repository just for this project. In particular, don't nest the repo inside another repo; if you already created a repo for this course, put the new repo elsewhere.

## The Todo Class

> Summary
> `Todo` objects. 
>
> - We can create them, mark them as done or undone, query them, display them, and retrieve their title. 
> - That's plenty of functionality without much code.

Let's examine the `Todo` class first:

todolist.js

```js
// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}
```

Objects created by our `Todo` class contain a title and a boolean flag that indicates whether the todo is "done." We also have some methods that we can use to set, unset, and interrogate the `done` attribute; they aren't strictly needed, but they provide a better and safer interface when working with `Todo` objects. We'll use the `Todo` class to encapsulate todo items, and our `TodoList` class to maintain the collection of `Todo` objects.

### Creating and Displaying a Todo

We can use the `Todo` constructor to create todos and the `toString` method to format them in a manner suitable for display:

```js
// omitted code

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");

console.log(todo1.toString());
console.log(todo2.toString());
console.log(todo3.toString());
```

```none
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym
```

Note that we use `toString` on lines 7-9 to create the string representations of our todo objects. Without `toString`, our output wouldn't look very good:

```js
// omitted code

console.log(todo1);
console.log(todo2);
console.log(todo3);
```

```plaintext
Todo { title: 'Buy milk', done: false }
Todo { title: 'Clean room', done: false }
Todo { title: 'Go to the gym', done: false }
```

We can also use the `String` function to accomplish the same formatting as `toString`: 

- This is because an object's`toString` is invoked when `String()` is invoked. 

```js
// omitted code
console.log(String(todo1));
console.log(String(todo2));
console.log(String(todo3));
```

### Marking a Todo as Done or Not Done

Let's say that we've bought some milk and want to mark the `Buy milk` todo as done. For that, we can use the `markDone` method:

todolist.js

Copy Code

```js
// omitted code

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");

todo1.markDone();

console.log(todo1.toString());
console.log(todo2.toString());
console.log(todo3.toString());
```

Copy Code

```plaintext
[X] Buy milk
[ ] Clean room
[ ] Go to the gym
```

We can also mark a previously completed todo as not done:

todolist.js

Copy Code

```js
// omitted code

todo1.markUndone();

console.log(todo1.toString());
console.log(todo2.toString());
console.log(todo3.toString());
```

Copy Code

```plaintext
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym
```

### Querying a Todo's Completion Status

The `isDone` method determines whether a `Todo` object is marked as done:

todolist.js

Copy Code

```js
// omitted code

todo2.markDone();
console.log(todo2.isDone() ? "The todo is done." : "The todo is not done.");

todo2.markUndone();
console.log(todo2.isDone() ? "The todo is done." : "The todo is not done.");
```

Copy Code

```plaintext
The todo is done.
The todo is not done.
```

### Retrieve a Todo's Title

The `getTitle` method returns the title of a `Todo` object:

todolist.js

Copy Code

```js
// omitted code

console.log(todo2.getTitle()); // => 'Clean room'
```

As with the methods used to manipulate and query the done status, we don't need this method. We could easily access the title directly with `todo.title`. We'll talk more about why we provide methods for such tasks in the next assignment.

That's pretty much it for our `Todo` objects. We can create them, mark them as done or undone, query them, display them, and retrieve their title. That's plenty of functionality without much code.

Before proceeding, delete all the testing code from your JavaScript file. We'll add more tests in a few minutes. For now, all you need is the `Todo` class.

## The TodoList Class

Let's turn our attention to our *collection* class, `TodoList`. Why build a custom class instead of using a simple array of `Todo` objects? We could do that. However, a custom collection class lets us add properties and methods that are specific to *todo lists*. For example, our todo list may have a title or a due date, and we may want to create an outstanding todos report. We can also impose specific requirements on the objects that we can put on the list. For instance, we can restrict the `TodoList` contents to just `Todo` objects. After all, it doesn't make much sense to place a `Circle` object on a todo list. With some effort, we can accomplish these tasks with arrays, but it's more natural to use a custom object type.

Let's get started with the `TodoList` class:

todolist.js

```js
// omitted code

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  // rest of class needs implementation
}

let list = new TodoList("Today's Todos");
console.log(list); // TodoList { title: "Today's Todos", todos: [] }
```

Our class uses an array to track `Todo` objects. However, that can change in the future without changing the `TodoList` interface. The interface consists of the methods and properties intended for use by code that isn't part of the class.

We'll leave the rest of the implementation to you. Use the code below to help guide you through writing the methods that `TodoList` needs.

### Creating a TodoList Object

We've already completed this part for you with the `constructor` method.

todolist.js 

```js
// The Todo class
// Your TodoList class

let list = new TodoList("Today's Todos");
console.log(list);
```

```plaintext
TodoList { title: "Today's Todos", todos: [] }
```

### Add a Todo to a TodoList Object

The `add` method appends todos to the end of the list. It raises an error if the argument isn't a `Todo` object.

todolist.js

Copy Code

```js
// Omitted code

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
console.log(list);

list.add(1); // delete this line after testing it
```

```plaintext
list: TodoList {
  title: "Today's Todos",
  todos: [
    Todo { title: 'Buy milk', done: false },
    Todo { title: 'Clean room', done: false },
    Todo { title: 'Go to the gym', done: false },
    Todo { title: 'Go shopping', done: false }
  ]
}

TypeError: can only add Todo objects
```

- Take note of the syntax of when you log an instance object of a class. Puts the name of Constructor before the object. 

```js
class Cat {
  constructor() {
    this.sat = 'yes';
    this.set = [];
  }
  
}

let cat = new Cat();
console.log(cat); // Cat { sat: 'yes', set: [] }
```

Show Possible Solution

```js
class TodoList {
  // Omitted code

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }

    this.todos.push(todo);
  }
}
```

We raise a `TypeError` exception when the argument isn't a `Todo` object to indicate that the argument has the wrong type.

> We had a brief discussion of exceptions in the [Introduction to Programming With JavaScript book](https://launchschool.com/books/javascript/read/more_stuff#exceptions). However, in the book, we mentioned that using exceptions to prevent bad inputs may not be best practice. After all, we can avoid passing invalid data around in our program. However, we can't prevent someone else who is using our `TodoList` class from calling the method with something other than a `Todo` object.
>
> In a later assignment, we'll move the `TodoList` class into a *module* that other programs can use. We may not have control over what those programs do, so raising an exception is appropriate.
>
> We'll discuss exceptions in more detail in a later lesson.

### How Many Todos are on the TodoList?

The `size` method returns the number of todos on the list.

todolist.js

Copy Code

```js
// Omitted code

console.log(list.size());  // 4
```

Show Possible Solution

```js
class TodoList {
  // Omitted code

  size() {
    return this.todos.length;
  }
}
```

### Get the First and Last Todos From a TodoList

The `first` and `last` methods return the first and last todo items from a todo list. If the list is empty, they each return `undefined`.

todolist.js

Copy Code

```js
// Omitted code

console.log(list.first());
console.log(list.last());

let emptyList = new TodoList("Empty List");
console.log(emptyList.first());
console.log(emptyList.last());
```

Copy Code

```plaintext
Todo { title: 'Buy milk', done: false }
Todo { title: 'Go shopping', done: false }
undefined
undefined
```

Show Possible Solution

### Get the Todo at Index Position

The `itemAt` method returns the todo item at a given index position in the todo list. It raises an error if the argument is missing, invalid, or out of range.

todolist.js

Copy Code

```js
// Omitted code

console.log(list.itemAt(1));
```

Copy Code

```plaintext
Todo { title: 'Clean room', done: false }
```

todolist.js

Copy Code

```js
// Omitted code

console.log(list.itemAt("a")); // delete this line after testing it
```

Copy Code

```plaintext
ReferenceError: invalid index: a
```

todolist.js

Copy Code

```js
// Omitted code

console.log(list.itemAt(55)); // delete this line after testing it
```

Copy Code

```plaintext
ReferenceError: invalid index: 55
```

Show Possible Solution



```js
class TodoList {
  // Omitted code

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) { // _ in name suggests a "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}
```

##### Throwing reference errors and private methods

For simplicity, we raise a `ReferenceError` exception even if the index has the wrong type. A more nuanced treatment might raise a `TypeError` in that case, but a `ReferenceError` is sufficient for our purposes. (We'll talk more about throwing exceptions in the next lesson.)

We may need to validate index numbers elsewhere, so we placed the validation code in a separate method. The method's name begins with a `_`; it's conventional to name methods with a leading underscore when they shouldn't be used from outside the class. The underscore suggests that the method is a ***private method*.**

### Mark a Todo at Index Position As Done or Not Done

The `markDoneAt` method marks the todo item at a given index position as done. `markUndoneAt` does the opposite: it marks the item as not done. Both methods raise an error if the argument is missing, invalid, or out of range.

todolist.js

Copy Code

```js
// Omitted code

list.markDoneAt(1);
console.log(list);

list.markUndoneAt(1);
console.log(list);
```

Copy Code

```plaintext
TodoList {
  title: "Today's Todos",
  todos: [
    Todo { title: 'Buy milk', done: false },
    Todo { title: 'Clean room', done: true },
    Todo { title: 'Go to the gym', done: false },
    Todo { title: 'Go shopping', done: false }
  ]
}
TodoList {
  title: "Today's Todos",
  todos: [
    Todo { title: 'Buy milk', done: false },
    Todo { title: 'Clean room', done: false },
    Todo { title: 'Go to the gym', done: false },
    Todo { title: 'Go shopping', done: false }
  ]
}
```

todolist.js

Copy Code

```js
// Omitted code

list.markDoneAt(); // delete this line after testing it
```

Copy Code

```plaintext
ReferenceError: invalid index: undefined
```

todolist.js

Copy Code

```js
// Omitted code

list.markUndoneAt(55); // delete this line after testing it
```

Copy Code

```plaintext
ReferenceError: invalid index: 55
```

Show Possible Solution

todolist.js

```js
class TodoList {
  // Omitted code

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }
}
```

##### `itemAt` already handles index validation.

Since `itemAt` already handles index validation, we don't need to check the index in these two methods explicitly.

### Are All Todos Done?

The `isDone` method returns `true` if all of the todos in a todo list are done, `false` if any are not.

todolist.js

Copy Code

```js
// Omitted code

console.log(list.isDone()); // false

list.markDoneAt(0);
list.markDoneAt(1);
list.markDoneAt(2);
list.markDoneAt(3);
console.log(list.isDone()); // true

list.markUndoneAt(2);
console.log(list.isDone()); // false
```

Show Possible Solution

There are several ways to write this method. One way is to filter the todo list for todos that aren't done; if there are no undone todos, then all todos are done:

```js
class TodoList {
  // Omitted code

  isDone() {
    let done = this.todos.filter(todo => !todo.isDone());
    return done.length === 0;
  }
}
```

That's not particularly elegant, and the negated condition makes it a little hard to follow. Instead, we can use `Array.prototype.every`; this method returns true if the callback returns true for every element in the array. That makes for code that is easier to read:

```js
class TodoList {
  // Omitted code

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }
}
```

### Remove and Return the First or Last Todo from the List

The `shift` method removes and returns the first todo from a todo list, while `pop` removes and returns the last todo. Both methods return `undefined` if the todo list is empty.

todolist.js

Copy Code

```js
// Omitted code

console.log(list.shift());
console.log(list.pop());
console.log(list);

console.log(emptyList.shift());
console.log(emptyList.pop());
console.log(emptyList);
```

Copy Code

```plaintext
Todo { title: 'Buy milk', done: true }
Todo { title: 'Go shopping', done: true }
TodoList {
  title: "Today's Todos",
  todos: [
    Todo { title: 'Clean room', done: true },
    Todo { title: 'Go to the gym', done: false }
  ]
}
undefined
undefined
TodoList { title: 'Empty List', todos: [] }
```

Show Possible Solution

```js
class TodoList {
  // Omitted code

  shift() {
    return this.todos.shift(); // need explicit return statement
  }

  pop() {
    return this.todos.pop();
  }
}
```



### Remove and Return a Todo by Index Position

The `removeAt` method removes the `Todo` object with the specified index number. It returns a single-element array that contains the deleted `Todo` object. It raises an error if the index is omitted or invalid.

`removeAt` should actually return just the deleted `Todo` object, not an array. We'll ignore that error since we discovered it a bit late.

todolist.js

Copy Code

```js
// Omitted code

// First, let's create some new todos.
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
list.add(todo5);
list.add(todo6);
console.log(list);

console.log(list.removeAt(2));
console.log(list.removeAt(0));
console.log(list.removeAt(1));
console.log(list);

list.removeAt(100); // delete this line after testing it
```

Copy Code

```plaintext
TodoList {
  title: "Today's Todos",
  todos: [
    Todo { title: 'Clean room', done: true },
    Todo { title: 'Go to the gym', done: false },
    Todo { title: 'Feed the cats', done: false },
    Todo { title: 'Study for Launch School', done: false }
  ]
}
[ Todo { title: 'Feed the cats', done: false } ]
[ Todo { title: 'Clean room', done: true } ]
[ Todo { title: 'Study for Launch School', done: false } ]
TodoList {
  title: "Today's Todos",
  todos: [ Todo { title: 'Go to the gym', done: false } ]
}

ReferenceError: invalid index: 100
```

Show Possible Solution

### Render the Todo List as a String Suitable for Display

todolist.js

Copy Code

```js
// Omitted code

list.add(todo1);
list.add(todo2);
list.add(todo4);
list.add(todo5);
list.add(todo6);
console.log(`${list}`);
```

Copy Code

```plaintext
---- Today's Todos ----
[ ] Go to the gym
[X] Buy milk
[X] Clean room
[X] Go shopping
[ ] Feed the cats
[ ] Study for Launch School
```

Show Possible Solution

### Our Solution

Here's our complete solution to the requirements shown above. Your solution may differ:

Show Our Solution

Feel free to play around to get a feel for the todo list behaviors, but make sure you keep a working copy if you prefer to use your code later on.

Delete any testing code before moving on.

------

# Build a TodoList Class: Add a forEach Method

Given the code from the previous assignment, implement a `forEach` method in the `TodoList` class, that is, `TodoList.prototype.forEach`. It should behave in much the same way as the familiar `Array.prototype.forEach` works. You can use the `forEach` function that we built earlier, or you can use the built-in method instead. The method should take a callback function and call it once for each `Todo` object in the list, invoking the callback with the `Todo` object as an argument. For example:

todolist.js

```js
// Omitted code

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

list.forEach(todo => console.log(todo.toString()));
```

```plaintext
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym
[ ] Go shopping
[ ] Feed the cats
[ ] Study for Launch School
```

### Possible Solution

Show

todolist.js

```js
class TodoList {
  forEach(callback) {
    this.todos.forEach(todo => callback(todo));
  }
}
```

A slightly better way to write the above method is as follows:

todolist.js

```js
class TodoList {
  forEach(callback) {
    this.todos.forEach(callback);
  }
}
```

This approach avoids creating a new callback function for the `this.todos.forEach` invocation. By the time we realized there was a better way, we had already reused this code in multiple courses, so retroactively fixing the code isn't worthwhile given that this is a very small improvement.

Feel free to use this "improved" version of `forEach` in your own code.

We could also use the `for` loop version we wrote earlier:

```js
forEach(callback) {
  for (let index = 0; index < this.size(); index += 1) {
    callback(this.todos[index]);
  }
}
```

However, since the `todos` property is an array, the `Array.prototype.forEach` method makes the most sense. Each `Todo` object in the `TodoList` gets passed to the callback function.

Don't confuse the call to `Array.prototype.forEach` with the definition of `TodoList.prototype.forEach`. They're similar methods, but the `TodoList` version only works with the `Todo` objects maintained by the list. The `Array.prototype` version works with all arrays.

### What Does That Give Us?

We now have a standard way to iterate through the todos on a todo list:

```js
list.forEach(todo => {
  // Do something with each todo
});
```

### What's the Point?

Why go through all that trouble? Why don't we iterate through the list using `Array.prototype.forEach` on `list.todos` directly?

```js
list.todos.forEach(todo => {
  // Do something
});
```

Look carefully at the difference between these last two method calls. 

- In the first, we use `list.forEach` to invoke the `forEach` method from `TodoList.prototype`. 

  ```js
  list.forEach(todo => {
    // Do something with each todo
  });
  ```

  - we don't have to access the internal state of the `TodoList` object. 
  -  **encapsulation**: we should hide implementation details from users of the class. 
  - We should neither encourage them to manipulate or use its internal state nor let them become dependent on its implementation. Instead, we want users to use the **interface** (i.e., the methods) that we provided for them.

- In the second, we reach into the `TodoList` object and pull out the array that contains the `Todo` items, then invoke `Array.prototype.forEach` on that array.

  ```js
  list.todos.forEach(todo => {
    // Do something
  });
  ```

  - If we change `list.todos` to something other than an array -- perhaps a database --, this code wouldn't work anymore.
  - That's why it's better to use `TodoList.prototype.forEach` and update the interface(method) that we provide for them. Users won't see any change if they use `TodoList.prototype.forEach`. Implementation details are thus hidden. 

There's not much difference in terms of functionality or system resource usage. However, in most cases, it's easier to work with methods defined by the `TodoList` class. More importantly, we don't have to access the internal state of the `TodoList` object. That's the idea behind **encapsulation**: we should hide implementation details from users of the class. We should neither encourage them to manipulate or use its internal state nor let them become dependent on its implementation. Instead, we want users to use the **interface** (i.e., the methods) that we provided for them.

For example, when we want to add a new todo to the list, it's better to use `TodoList.prototype.add` rather than pushing a `Todo` to the `todos` instance property directly. If everybody uses the `add` method to add new todos, we can enforce the requirement that only `Todo` objects are present on the todo list. If we don't supply the `add` method and everybody updates the array directly, we can't enforce that rule.

For much the same reason that we prefer to use the `add` method, we should also prefer to use `TodoList.prototype.forEach` in favor of reaching into the `TodoList` object to access the `todos` array. If we later decide to use something other than an array -- perhaps a database -- our users may not be able to use `list.todos.forEach` anymore. However, we can update our version of `forEach` to behave as though we had an array; we only have to determine a way to iterate over the todo objects. Our users won't see any change at all if they use `TodoList.prototype.forEach`.

#### Private Data

- Private data is not a language feature .
- Can only be accomplished using other features like : "closure" and "immediately invoked function expressions"
- Treat methods as one way to hide implementation details. Although they don't hide things particularly well in JavaScript but instead rely on trust rather than concealing and preventing access.
- The entire goal of creating a class and encapsulating logic in it is to hide implementation details and contain ripple effects when things change. 
- Use the provided interface -- when a class has methods that provide the behaviors and actions you need-- instead of accessing the properties directly. 

It's possible to create private data in JavaScript. That is, you can define data in an object that is not accessible from outside that object. Unfortunately, defining and using private data can be awkward and complicated. The concept of private data in JavaScript isn't built-in to JavaScript. It is something that you can only accomplish by using other features, such as "closure" and "immediately invoked function expressions." We'll see a little bit of this in the next lesson.

The fact that private data is not a language feature makes the discussion of encapsulation somewhat hypothetical. Unless you employ one of the messy data-hiding techniques, all of your implementation details are public. You can't prevent other developers from using the private parts of your implementation.

Nevertheless, we'll treat methods as one way to hide implementation details. They don't hide things particularly well in JavaScript but instead rely on trust rather than concealing and preventing access.

When a class has methods that provide the behaviors and actions you need, you should use those methods instead of accessing the properties directly. Even if it's easier or produces cleaner code to use the properties, you should choose to use the methods that are provided by the interface. For instance, suppose the `Array` type had a `size()` method to determine the length of an array. It doesn't, but if it did, it would be better practice to use that method instead of accessing the `length` property directly. Likewise, the users of your classes should use the methods that you provide. They should refrain from using the object's properties.

The entire goal of creating a class and encapsulating logic in it is to hide implementation details and contain ripple effects when things change. Keep in mind that JavaScript doesn't implement encapsulation in a way that directly supports private data and methods. Use the provided interface -- the methods -- instead whenever possible.

------

# Build a TodoList Class: Add a filter Method

In this assignment, we'll continue to work with our `TodoList` and `Todo` classes. This time, we'll build a `TodoList.prototype.filter` method that works like the built-in `Array.prototype.filter` method or the `filter` method that you built earlier in this lesson. We'll use the `filter` method like this:

todolist.js

```js
let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

let doneTodos = list.filter(todo => todo.isDone());
console.log(doneTodos);
```

The code, once you write the `filter` method, should produce this output:

```plaintext
[
  Todo { title: 'Buy milk', done: true },
  Todo { title: 'Feed the cats', done: true }
]
```

That's an array that contains all done todos from `list`. In this case, there are two done todos, so the array has two elements.

Hint

Use `TodoList.prototype.forEach` from the previous lesson to iterate over the todos in the todo list. While you can use `Array.prototype.filter` inside `TodoList.prototype.filter`, that adds an additional dependency on the implementation you use for `TodoList`. If you later decide to change the implementation for `TodoList` to use something other than an array, you only need to update `forEach`, not `filter`.

### Possible Solution

Show

```js
class TodoList {
  // omitted code

  filter(callback) {
    let selectedTodos = [];
    this.forEach(todo => {
      if (callback(todo)) {
        selectedTodos.push(todo);
      }
    });

    return selectedTodos;
  }
}

```

### A Better Return Value

We've learned that the built-in `Array.prototype.filter` method returns an array, which is natural and expected. It also lets us chain `Array.prototype` method calls together. For instance:

```js
let arr = [1, 2, 3, 4, 5];
arr.filter(number => number % 2 === 1)
   .forEach(number => console.log(number));
```

**Output**

```plaintext
1
3
5
```

We can chain methods like this since `Array.prototype.filter` returns an `Array` object, so we can use that array to call `Array.prototype.forEach`. We can keep chaining methods as long as we understand what object we're working with at each step in the chain.

Contrast how we can chain `Array.prototype.filter` with how we can use our `TodoList.prototype.filter` method:

```js
list.filter(todo => todo.isDone()).first();
```

The `filter` method returns an array, not a `TodoList` object, so this code fails when we try to call `first` on the return value. It doesn't follow the usual pattern. In other words, the `TodoList.prototype.filter` method should, in theory, return a `TodoList` object, not an `Array`.

Your next task is to refine `TodoList.prototype.filter` so that it still works as intended: it should return a new `TodoList` object, not an array.

**Hint**: Notice that `Array.prototype.filter` returns a *new* object. It's a non-destructive method that doesn't change the original array. However, keep in mind that the returned objects are the same objects as the matching objects in the original array: if you mutate one of the objects in the returned array, that mutation will show up in the original array as well.

### Possible Solution, Part 2

Show

```js
todolist.jsCopy Code
class TodoList {
  // omitted code

  filter(callback) {
    let newList = new TodoList(this.title); // title should be same as current list.
    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });

    return newList;
  }
}

// omitted code

console.log(list.filter(todo => todo.isDone()).first());
// => Todo { title: 'Buy milk', done: true }
```

Though we're creating a new TodoList object instead of a new Array object, the logic for invoking the callback remains the same.

------

# Build a TodoList Class: More Methods

At this point, your classes should have the following methods:

| TodoList Class   | Todo Class    |
| :--------------- | :------------ |
| `constructor`    | `constructor` |
| `add`            | `markDone`    |
| `size`           | `markUndone`  |
| `first`          | `isDone`      |
| `last`           | `toString`    |
| `itemAt`         | `getTitle`    |
| `markDoneAt`     |               |
| `markUndoneAt`   |               |
| `isDone`         |               |
| `shift`          |               |
| `pop`            |               |
| `removeAt`       |               |
| `toString`       |               |
| `forEach`        |               |
| `filter`         |               |
| `_validateIndex` |               |

Let's add a few more methods that can piggy-back off the `forEach` and `filter` methods. Implement the following methods:

- **`findByTitle(title)`**

  Returns the first `Todo` object from the list that matches the string `title`. Returns `undefined` if there is no such todo.

  ```js
  ```

  

- **`allDone()`**

  Returns a new `TodoList` object that contains all of the done todos.

- **`allNotDone()`**

  Returns a new `TodoList` object that contains all of the undone todos.

- **`markDone(title)`**

  Mark the first `Todo` object on the list that matches the string `title` as done. Do nothing if there are no matching todos on the list.

- **`markAllDone()`**

  Mark every todo on the list as done.

- **`markAllUndone()`**

  Mark every todo on the list as not done.

- **`toArray()`**

  Return a *copy* of the array of `Todo` items.

With the exception of `TodoList.prototype.toArray`, you should use either `TodoList.prototype.forEach` or `TodoList.prototype.filter` or another method that uses one of those in your implementations. For `toArray`, you can use any approach that returns a copy of the array.

Be sure to test your code! We'll talk more about testing in the next lesson, but for now, you can get a head start by trying to design your own tests.

```js
// -----------------------------Test Code -----------------------------

// Omitted code

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

// console.log(list.filter(todo => todo.isDone()).first());
// // => Todo { title: 'Buy milk', done: true }

// console.log(list.findByTitle("Feed the cats"));
// // Todo { title: 'Feed the cats', done: true }

// console.log(list.allDone());

// console.log(list.allNotDone());

// list.markDone("Clean room");
// list.markDone("wut");
// console.log(list.allDone());

// list.markAllDone();
// console.log(list);

// list.markAllUndone();
// console.log(list);

// console.log(list.toArray());
```

Possible Solution

------

# Build a TodoList Class: Final Code

We now have a `Todo` class that represents a todo item and a collection class called `TodoList` that represents a collection of `Todo` objects. Todo lists can perform a variety of actions that you'd expect from a collection class. Our implementation uses an array as the storage mechanism, but we can change it to another mechanism or data structure in the future without affecting any code that uses it, providing that code sticks to the `TodoList` interface (i.e., the methods we've provided).

We also included several methods that can take a callback function as an argument so that collaborators can provide iteration or selection criteria at method invocation time. That makes our class generic and robust.

Here's our final code:

todolist.js

```js
// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach(todo => callback(todo));
  }

  filter(callback) {
    let newList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });

    return newList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  _validateIndex(index) { // _ in name indicates "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}
```

**Don't delete this code.** We'll use it later in this course.
