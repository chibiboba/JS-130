#### forEach()

- Description Example

  ````markdown
  ```js
  array.forEach(element => {
    console.log(element.foo);
  });
  ```
  
  In this paragraph, the object referenced by `array` invokes the method `forEach`. `forEach` loops through each element in the object and during each iteration, invokes an anonymous callback function, passing the element's value to the callback as an argument. Inside the callback function, the element is known by the parameter name `element name`. The callback function uses the `console.log` method to log the value of `element.foo`. `forEach` method returns undefined.
  ````

- `Array.forEach()`:  loops through each element in an array and during each iteration, executes an anonymous callback function on that array element. 

  - forEach() always returns undefined. 
  - forEach() does not mutate the array. 
  - We pass a **callback** function to forEach as an argument. When forEach() runs, it invokes the call back once for each element, passing the *element's value* as the argument. 

  - syntax

  ```js
  array.forEach(function(element)) { // anonymous function 
  	...        
  });
  
  array.forEach(element => { // anonymous arrow function
    
  });
  ```

  ```javascript
  // Arrow function
  forEach((element) => { ... } )
  forEach((element, index) => { ... } )
  forEach((element, index, array) => { ... } ) // array is the array forEach() was called upon. 
  
  // Callback function
  forEach(callbackFn)
  forEach(callbackFn, thisArg)
  
  // Inline callback function
  forEach(function(element) { /* ... */ })
  forEach(function(element, index) { /* ... */ })
  forEach(function(element, index, array){ /* ... */ })
  forEach(function(element, index, array) { /* ... */ }, thisArg)
  
  ```

#### map()

- Description Example

  ```markdown
  ```js
  let numbers = [1, 2, 3, 4]
  let squares = numbers.map(num => num * num);
  ​```
  
  In this paragraph, variable `numbers` is declared and initiaized to an array `[1, 2, 3, 4]`. On line 3, variable `squares` is declared and initialized to an expression.  In the expression to the right of `=` on line 3, 
  
  The array referenced by `numbers` invokes the `map` function. `map` loops through each element in the array and during each iteration, invokes an anonymous callback function, passing the elements value to the callback as an argument. Inside the callback function, the element is known by the parameter `num`. The callback evaluates the expression `num * num` and returns that value. At the end of the loops, `map` returns a new array based on the returned values from the callback. In this case, `map` returns `[1, 3, 9, 16]`.
  ```

- `Array.map()`: creates a new array by using the results of executing a callback function on each element of an array. 

  - If you don't have a return value, then that iteration will return undefined and the element will be undefined. 
  - Use `Array.map()` when you want to build a new array. 
  - `Array.map()` does not mutate the original array. 

  In this paragraph, variable `numbers` is declared and initiaized to an array `[1, 2, 3, 4]`. On line 3, variable `squares` is declared and initialized to an expression.  In the expression to the right of `=` on line 3, 

  The array referenced by `numbers` invokes the `map` function. `map` loops through each element in the array and during each iteration, invokes an anonymous callback function, passing the elements value to the callback as an argument. Inside the callback function, the element is known by the parameter `num`. The callback evaluates the expression `num * num` and returns that value. At the end of the loops, `map` returns a new array based on the returned values from the callback. In this case, `map` returns `[1, 3, 9, 16]`.

  - Syntax

    ```js
    // Arrow function
    map((element) => { ... } )
    map((element, index) => { ... } )
    map((element, index, array) => { ... } )
    ```


#### filter()

- Description Example

  ```markdown
  ```js
  let numbers = [1, 2, 3];
  let oddNumbers = numbers.filter(num => {
    return num % 2 === 1;
  });
  
  oddNumbers; // => [1, 3]
  ​```
  On line 2, the variable `numbers` is declared and initialized to the array `[1, 2, 3]`. On line 3, variable `oddNumbers` is declared and assigned to the value of an expression. 
  
  In that expression, the array referenced by `numbers` invokes the method `filter`. `filter` loops through each element in the `numbers` array and during each iteration, invokes an anonymous callback function, passing the element's value to the callback as an argument. Inside the callback function, the element is known by the parameter `num`. The callback function returns the value of the expression  `num % 1 === 1` If the callback function returns a truthy value, then the element's value is appended to the new array. At the end of the iterations, `filter` returns the new array `[1, 3]`. This array is assigned to the variable `oddNumbers`. 
  ```

- `Array.filter()`:  returns a new array that includes all the elements that were returned as truthy through a testing (callback) function. Returns an empty array if no elements passed the testing function. 

  - Definition `Array.filter()`:  iterates over each element in an array and invokes & executes a callback function on that element. If the callback function returns a truthy value, then that element's value is appended to the new array. If the callback function doesn't return a truthy value, the function does nothing. At the end of this function, the new array is returned. So if none of the elements return truthy, then `Array.filter()` returns an empty array`[]`. 

  - Syntax

    ```js
    // Arrow function
    filter((element) => { ... } )
    filter((element, index) => { ... } )
    filter((element, index, array) => { ... } )
    
    ```

  ```terminal
  > [1, 2, 3].filter(element => element > 4)
  []
  ```

  - `Array.filter()` does not mutate the original array. 

#### find()

- Description Example

  ```markdown
  ```js
  const array1 = [5, 12, 8, 130, 44];
  const found = array1.find(element => element > 10);
  ​```
  
  In this paragraph, the object referenced by `array1` invokes the method `find`. `find` loops through each element in the object and during each iteration, invokes an anonymous callback function, passing the element's value to the callback as an argument. Inside the callback function, the element is known by the parameter name `element`. `find` executes the callback function until a truthy value is returned.  In this example, during the iteration the condition `element > 10` evaluates as true and returns that truthy value, execution of the callback function stops and `find` returns the value of that `element`, which is 12. 
  ```

- `Array.find()`: executes a testing / callback function for each index in an array until a truthy value is returned. `find` returns the value of that element. If no truthy value is returned, `find` returns `undefined`. 

  - returns the **value of the first element** in an array that passes(textbook word: satisfies) the testing (callback) function. If no element satisfies the testing function, `undefined` is returned. 

  ```js
  const array1 = [5, 12, 8, 130, 44];
  
  const found = array1.find(element => element > 10);
  
  console.log(found);
  // expected output: 12
  
  ```

#### reduce()

- The **reduce()** method executes a **reducer** function (that you provide) on each element of the array, resulting in single output value.

  - If no initial value is specified, accumulator's value is index 0, and current value is at index 1. If an initial value is specified, that’s the starting value of accumulator, and current value is at index 0. 
  - Whatever the reducer function returns is the 'carry value' of the accumulator. 

- Syntax

  ```javascript
  reduce((accumulator, current value, index, array) => { … }, initialValue)
  
  reduce((acc, cv) => acc + cv)
  
  reduce(reducerFn, initialValue)
  ```

#### sort()

- The **`sort()`** method sorts the elements of an array *[in place](https://en.wikipedia.org/wiki/In-place_algorithm)* and returns the reference to the same array, now sorted. 

  - The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
  - Sorts *uppercase letters* before lowercase

- Syntax

  - If want to sort a before b, sorting in ascending order (a less than b), Return - 1. 

  - If want to compare a and b as numbers, ascending order, Return a - b. 

    ```js
    const numbers = [4, 2, 5, 1, 3];
    numbers.sort((a, b) => a - b);
    console.log(numbers);
    
    // [1, 2, 3, 4, 5]
    ```

  ```js
  // Functionless
  sort()
  
  // Arrow function
  sort((a, b) => { /* ... */ } )
  
  // Compare function
  sort(compareFn)
  
  // Inline compare function
  sort(function compareFn(a, b) { /* ... */ })
  ```

  ```js
  function compare(a, b) {
    if (a is less than b by some ordering criterion) {
      return -1;
    }
    if (a is greater than b by the ordering criterion) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }
  ```

  

  