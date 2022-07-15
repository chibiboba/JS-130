



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

   Possible Solution

3. Let's put `reduce` to work with emulating `map` as well. Write a function that works like the `map` function from problem 2. This time, though, use `Array.prototype.reduce` to transform the input array.

   Possible Solution

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

Copy Code

```plaintext
the value of foo is 1
the value of bar is 2
the value of qux is 3
```