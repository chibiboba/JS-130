# Practice Problems: Hoisting and the var Statement

Let's get some practice working with hoisting and `var`.

1. Consider the following code:

   ```js
   var foo = function() {
     console.log("Bye");
   };
   
   function foo() {
     console.log("Hello");
   }
   
   foo();
   ```

   Without running this code, what will it display? Explain your reasoning.

   Solution

2. Consider the following code:

   ```js
   for (var index = 0; index < 2; index += 1) {
     console.log(foo);
     if (index === 0) {
       var foo = "Hello";
     } else {
       foo = "Bye";
     }
   }
   
   console.log(foo);
   console.log(index);
   ```

   Without running this code, what does it print?

   Solution

3. The following code doesn't work:

   ```js
   bar();
   
   var bar = function() {
     console.log("foo!");
   };
   ```

   Without changing the order of the invocation and function definition, update this code so that it works.

   Solution

4. Without running the following code, determine what it logs to the console:

   ```js
   var bar = 82;
   function foo() {
     var bar = bar - 42;
     console.log(bar);
   }
   
   foo();
   ```

   Solution

5. Rewrite the code below using `let` instead of `var`. Your goal here is to change the way the variables are declared without altering the output of the program.

   ```js
   function foo(condition) {
     console.log(bar);
   
     qux = 0.5772;
   
     if (condition) {
       var qux = 3.1415;
       console.log(qux);
     } else {
       var bar = 24;
   
       var xyzzy = function() {
         var qux = 2.7183;
         console.log(qux);
       };
   
       console.log(qux);
       console.log(xyzzy());
     }
   
     qux = 42;
     console.log(qux);
   }
   
   foo(true);
   foo(false);
   ```

   Solution

6. In a process called hoisting, JavaScript appears to reorganize code in such a way that certain declarations and definitions appear to be moved around. While this organization doesn't really occur, it's a useful mental model for understanding scope in a JavaScript program.

   Rewrite the following code in a way that shows what the code would look like if hoisting were a real process that actually reorganized your code. The intent here is to clearly show how and when the various identifiers in this program are defined with respect to the code that actually gets executed.

   ```js
   Pet.prototype.walk = function() {
     console.log(`${this.name} is walking.`);
   };
   
   function Pet(name, image) {
     this.name = name;
     this.image =  image;
   }
   
   class Image {
     constructor(file) {
       this.file = file;
     }
   }
   
   var catImage = new Image("cat.png");
   var pudding = new Pet("Pudding", catImage);
   ```

   Solution

------

# Practice Problems: Closures

[Reference](https://launchschool.com/lessons/43f23069/assignments/9362d2cf)

Let's get some practice working with closures.

1. What do the 4 `console.log` statements at the end of this program print? Try to answer without running the code:

   ```js
   let counter = 0;
   
   function makeCounter() {
     return function() {
       counter += 1;
       return counter;
     }
   }
   
   let incrementCounter = makeCounter();
   console.log(incrementCounter());
   console.log(incrementCounter());
   
   incrementCounter = makeCounter();
   console.log(incrementCounter());
   console.log(incrementCounter());
   ```

   Solution

2. Let's modify our program a little by moving the `let` statement into the function returned by `makeCounter`. What do the 4 `console.log` statements at the end of this program print? Try to answer without running the code:

   ```js
   function makeCounter() {
     return function() {
       let counter = 0;
       counter += 1;
       return counter;
     }
   }
   
   let incrementCounter = makeCounter();
   console.log(incrementCounter());
   console.log(incrementCounter());
   
   incrementCounter = makeCounter();
   console.log(incrementCounter());
   console.log(incrementCounter());
   ```

   Solution

3. Let's move the variable declaration into `makeCounter` now. What do the 4 `console.log` statements at the end of this program print? Try to answer without running the code:

   ```js
   function makeCounter() {
     let counter = 0;
   
     return function() {
       counter += 1;
       return counter;
     }
   }
   
   let incrementCounter = makeCounter();
   console.log(incrementCounter());
   console.log(incrementCounter());
   
   incrementCounter = makeCounter();
   console.log(incrementCounter());
   console.log(incrementCounter());
   ```

   Solution

4. We'll now make some changes to how we create the output. What do the 4 `console.log` statements at the end of this program print? Try to answer without running the code:

   ```js
   function makeCounter() {
     let counter = 0;
   
     return function() {
       counter += 1;
       return counter;
     }
   }
   
   let incrementCounter1 = makeCounter();
   let incrementCounter2 = makeCounter();
   
   console.log(incrementCounter1());
   console.log(incrementCounter1());
   
   console.log(incrementCounter2());
   console.log(incrementCounter2());
   ```

   Solution

5. Write a function named `makeMultipleLister` that you can call with a number as an argument. The function should return a new function that, when invoked, logs every positive integer multiple of that number less than 100. It should work like this:

   ```js
let lister = makeMultipleLister(17);
   lister();
   ```
   
   **Output**

   ```plaintext
17
   34
   51
   68
   85
   ```
   
   Show Solution

6. Write a program that uses two functions, `add` and `subtract`, to manipulate a running total. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console. It should work like this:

   ```js
   add(1);       // 1
   add(42);      // 43
   subtract(39); // 4
   add(6);       // 10
   ```

   Show Solution

7. Without running the following code, determine what value it logs on the last line. Explain how the program arrived at that final result.

   ```js
   function foo(start) {
     let prod = start;
     return function (factor) {
       prod *= factor;
       return prod;
     };
   }
   
   let bar = foo(2);
   let result = bar(3);
   result += bar(4);
   result += bar(5);
   console.log(result);
   ```

   Show Solution

8. Write a function named `later` that takes two arguments: a function and an argument for that function. The return value should be a new function that calls the input function with the provided argument, like this:

   ```js
   const logger = message => console.log(message);
   let logWarning = later(logger, "The system is shutting down!");
   logWarning(); // The system is shutting down!
   ```

   Show Solution

9. Write a function named `later2` that takes two arguments: a function and an argument for that function. The return value should be a new function that also takes an argument. The new function should call the input function with the argument provided to `later2` and the argument provided to the returned function. For example

   ```js
   const notify = function(message, when) {
     console.log(`${message} in ${when} minutes!`);
   };
   
   let shutdownWarning = later2(notify, "The system is shutting down");
   shutdownWarning(30); // The system is shutting down in 30 minutes!
   ```

   Show Solution

10. The built-in `Function.prototype.bind` method performs partial function application by allowing you to specify some of the function's arguments when you invoke `bind`. It also permanently binds the new function to a specific execution context with its first argument. That binding is, in a sense, also an example of partial function application. Here, the "argument" we're applying to the function is the function's execution context.

    Write a function that emulates the context binding aspect of `bind`. That is, your version of `bind` should merely call the function with the desired context; it doesn't need to pass any arguments to the function. Here's how you can use your function:

    ```js
    "use strict";
    
    let obj = {};
    let boundFunc = bind(obj, function() {
      this.foo = "bar";
    });
    
    boundFunc();
    console.log(obj); // { foo: 'bar' }
    ```

    Show Solution

------

# Practice Problems: Closures & private data

[Reference](https://launchschool.com/lessons/43f23069/assignments/3df10c91)

1. Create a function named `makeCounterLogger` that takes a number as an argument and returns a function. When we invoke the returned function with a second number, it should count up or down from the first number to the second number, logging each number to the console:

   ```terminal
   > let countlog = makeCounterLogger(5);
   > countlog(8);
   5
   6
   7
   8
   
   > countlog(2);
   5
   4
   3
   2
   ```

   Show Solution

   ```js
   ```

   

2. In this problem, we'll build a simple todo list program that uses the techniques we've seen in this assignment.

   Write a `makeList` function that creates and returns a new function that implements a todo list. The returned function should have the following behavior:

   - When called with an argument that is not already on the list, it adds that argument to the list.
   - When called with an argument that is already on the list, it removes the element from the list.
   - When called without arguments, it prints all of the items on the list. If the list is empty, it prints an appropriate message.

   ```terminal
   > let list = makeList();
   > list();
   The list is empty.
   
   > list("make breakfast");
   make breakfast added!
   
   > list("read book");
   read book added!
   
   > list();
   make breakfast
   read book
   
   > list("make breakfast");
   make breakfast removed!
   
   > list();
   read book
   ```

   ```js
   // test code
   let list = makeList();
   list();
   // The list is empty.
   
   list("make breakfast");
   // make breakfast added!
   
   list("read book");
   // read book added!
   
   list();
   // make breakfast
   // read book
   
   list("make breakfast");
   // make breakfast removed!
   
   list();
   // read book
   ```

   Show Solution

   ```js
   
   ```

## Improving the API

We resume our discussion of closures and private data by taking another look at the `makeList` function we wrote in the practice problems.

Our solution provides a concise but somewhat unclear interface for developers:

```terminal
> let list = makeList();
> list("make breakfast");       // add an item to the list
make breakfast added!

> list();                       // log the list's items
make breakfast

> list("make breakfast");       // remove an item from the list
make breakfast removed!

> list();
The list is empty.
```

The function returned by `makeList` lets the user perform three different actions (adding, removing, and listing) by calling the function with appropriate arguments. It works, but the interface isn't clear. Astonishingly, the single call `list('make breakfast')` performs two entirely different operations based on the current state of the list!

We can improve the interface by returning an Object from `makeList` instead of a function. That lets us create an API that is easy to use and understand:

```terminal
> let list = makeList();
> list.add("peas");
peas added!

> list.list();
peas

> list.add("corn");
corn added!

> list.list();
peas
corn

> list.remove("peas");
peas removed!

> list.list();
corn
```

```js
// test code
let list = makeList();
list.add("peas");
// peas added!

list.list();
//peas

list.add("corn");
//corn added!

list.list();
//peas
//corn

list.remove("peas");
//peas removed!

list.list();
//corn
```

## More Practice Problems

1. Modify the `makeList` function so that it returns an object that provides the interface shown above, including `add`, `list`, and `remove` methods.

   Show Solution

   ```js
   
   ```

2. Notice that our solution to the previous problem lets us access the array of items through the `items` property:

   ```terminal
   > list.items  // items is accessible from outside the object
   ['corn']       // since it is an object property
   ```

   That wasn't the case in the single-function implementation:

   ```terminal
   > list.items;  // items isn't accessible from outside the function
   undefined      // since it is within a closure.
   ```

   Update the implementation from problem 1 so that it retains the use of an object with methods but prevents outside access to the items the object stores internally.

   Show Solution

   ```js
   
   ```

   