# The var Statement

It may surprise you to learn that `let` and `const` are relatively new language features. ES6 introduced these keywords in 2015, but it took a few years before they saw widespread use in applications.

Before `let` and `const` were added to JavaScript, developers declared variables with the `var` statement. While `let` and `const` are now preferred by many developers, there is plenty of old code around that still uses `var`. Inexplicably, some developers even prefer `var`. One way or the other, you will probably have to deal with `var`. Now is as good a time as any to learn about it.

Thus far, we've used the `let` and `const` statements to declare variables. These statements are simple and relatively easy to understand and use; they declare and initialize variables and constants, respectively, and create variables with block scope, which is easy to understand.

> Unless stated otherwise, run the examples in this assignment with Node and a JavaScript file, e.g..: 
>
> ```shell
> $ node example.js
> ```
>
> If you enter code one line at a time in the Node REPL, you may not see the behaviors we want to demonstrate. We'll talk about why this a little later.

## What to Focus On

The `var` statement is no longer as important for JavaScript developers to understand as it once was. However, many older JavaScript programs and some newer programs contain `var` statements. You will undoubtedly encounter such code in your career, so you must understand how `var` works. In particular, you must know how it differs from `let` and `const`.

## The `var` Statement

Superficially, the `var` statement looks a lot like the `let` and `const` statements:

```js
var foo;
var bar = "qux";
var baz = 3.1415;
```

All three of these statements create a variable. The first creates a variable named `foo`, but sets its value to `undefined`. The second creates a variable named `bar` and assigns `"qux"` as its initial value. The last statement creates a variable named `baz` and gives it an initial value of `3.1415`. Compare that with `let` and `const`:

```js
let foo;
let bar = "qux";
const baz = 3.1415;
```

The two `let` statements are similar to the `var` statements. The first creates a variable named `foo` with an initial value of `undefined`, while the second creates one named `bar` with a value of `qux`. The `const` statement creates a variable whose value cannot be changed. The `var` statement provides no way to create constants like `baz`, so that's one significant disadvantage to using `var`. Despite the similarities, the differences between `let` and `var` are more wide-reaching.

##### Note: significant disadvantage to using `var`

- `var` statement provides no way to create constants like `baz`. 

## How do `var` and `let` Differ?

The easiest way to see how `var` and `let` differ is with a couple of examples. First, let's see how they interact with the global object:

```js
//************************************************************
// Use the Node REPL for this example.
// Type the commands one at a time - don't use copy and paste.
//************************************************************

var bar = 42;
console.log(global.bar); // 42
bar += 1;
console.log(global.bar); // 43

let foo = 86;
console.log(global.foo); // undefined
```

- This example shows that using `var` at the top level of a program creates a property on the global object, e.g., `global` in Node or `window` in a browser. Thus, we can use `global.bar` to examine the value of `bar`.
- However, the `let` declaration doesn't add a property to the global object. In fact, it doesn't add a property to any object - it simply creates a variable. Since the `global.foo` doesn't exist, JavaScript returns `undefined` when we try to access it.

- This behavior shows that `let` is safer than `var` when used at the program's top level. Placing properties on the global object may lead to conflicts and bugs; `let` alleviates that issue.

When you use `var` inside a function, the variable is **not** stored as a property of the global object:

```js
function foo() {
  var bar = 42;
  console.log(global.bar); // undefined
}

foo();
```

## Scope and `var`

A much more significant difference is that `let` is **block-scoped**, while `var` is **function-scoped**. A block-scoped variable is only visible within the block where it is declared; in JavaScript, a block is code delimited by curly braces, `{...}`. (Remember: [not everything between braces is a block](https://launchschool.com/books/javascript/read/variables#variablescope).) A function-scoped variable is visible within the function where it is declared. This difference in scope can lead to unexpected behavior when using `var`:

```js
function foo() {
  if (true) {
    var a = 1;
    let b = 2;
  }

  console.log(a); // 1
  console.log(b); // ReferenceError: b is not defined
}

foo();
```

Whoa! That **is** different. What's going on here? Why can we access variable `a` when it's declared inside the `if` statement's block, but we can't access `b` even though it is declared in the same block? That doesn't make much sense.

The answer is that `var` creates a variable with function scope, while `let` creates a variable with block scope. Thus, `a` is available everywhere in the function, but `b` is only available in the block.

That has a peculiar side effect when we use `var`. Consider this code:

```js
function foo() {
  if (false) {
    var a = 1;
  }

  console.log(a); // undefined
}

foo();
```

Even though the code on line 3 never runs, we still create a variable named `a` with function scope. Furthermore, since we're not initializing `a`, it receives a default value of `undefined` instead of `1`. Thus, line 7 displays `undefined`.

Though the difference in scope explains these behaviors, we also need to know how function-scope and block-scope work. That's where hoisting enters the picture. We'll get to that in the next two assignments.

Are you curious why we insisted that you use the Node REPL for the example at the beginning of this section? Let's see what happens when we put that code in a file and run it from the command line:

global.js

```js
var bar = 42;
console.log(global.bar);
bar += 1;
console.log(global.bar);

let foo = 86;
console.log(global.foo);
```

```shell
$ node global.js
undefined
undefined
undefined
```

Other than some deleted comments, our code hasn't changed. However, the results have. This time, we see `undefined` instead of `42` and `43` when we log the value of `global.bar`. This is a peculiarity of Node -- when you run a JavaScript program file with Node, Node "wraps" your code in a function that looks like this:

```js
(function (exports, require, module, __filename, __dirname) {
  // your code is here
});
```

Can you see why `bar` isn't defined in `global`? Think about it for a moment.

So, what's going on? The issue here is that your code is running inside a function. If you use `var` inside a function, it creates a function-scoped variable, not a global variable. Thus, the variable doesn't show up as a property of the global object.

Since the Node REPL doesn't use this wrapper function, `var` declarations at the top level are stored in the global object.

The effect of the wrapper function may sound like a bizarre edge case that won't affect you, but it probably will someday soon. This is because the wrapper function, or its absence, is the source of most problems involving differing behavior in the REPL and a program file.

------

##### Note: Scoping reminder 

[reference](https://launchschool.com/books/javascript/read/variables#variablescope)

- A variable's **scope** determines where it is available in a program. The location where you declare a variable determines its scope.

- Variables declared with `let` or `const` have **block scope**.

-  A **block** is a related set of JavaScript statements and expressions between a pair of opening and closing curly braces. 

  - Alternate definition: code delimited by curly braces  `{...}` 

  ```js
  if (expression) {  // block starts at {
    doSomething();   // block body
  }                  // block ends here
  ```

- Not everything between curly braces is technically a block. For instance, the braces that surround an object literal do not define a block. 

- Technically, the braces that surround a function body don't define a block either, though it is convenient to think of function bodies as blocks. 

  - Function bodies are not technically blocks. However, they look and behave so much like blocks that many developers do not distinguish between them.
  - While there are similarities between blocks, function bodies, and, to a lesser degree, object literals, the term *block* usually refers to executable code between braces, including function bodies:

  ```js
  {
    // this is a block
    let foo = 42;
    console.log(foo);
  }
  
  if (answer === 'yes') {
    // this is a block
    console.log('yes');
  } else {
    // so is this
    console.log('nope');
  }
  
  while (answer !== 'no') {
    // this is a block
    doSomething();
  }
  
  function foo() {
    // not technically a block. However, we can treat it as a block.
    let foo = 42;               // foo has block scope
    console.log(foo);
  }
  
  let foo = {
    // this is not a block
    bar: 42,
  };
  ```

- In general, blocks appear in `if...else`, `while`, `do...while`, `for`, `switch`, and `try...catch` statements, or by themselves (as in the first example above).

- You can define variables in an `if...else` block scope and the variable is available in the entire block scope. 

  ```js
  let b = 0;
  if (b) {
    let a = 1;
    console.log(a);
  } else {
    a = 2;
    console.log(a); // 2
  }
  ```

------

##### Note: summary

- `var` is function scoped whereas `let` and `const` are block scoped.

Differing behavior in the REPL and a program file.

- using `var` at the top level of a program creates a property on the global object. 
  - Running code line by line in the Node REPL demonstrates this. 
  - Since the Node REPL doesn't use a wrapper function, `var` declarations at the top level are stored in the global object.
- When you use `var` inside a function, the variable is **not** stored as a property of the global object.
  - Running the code by putting it in file and running it from the command line, we get different results. 
  - When you run a JavaScript program file with Node, Node "wraps" your code in a function. --> **hoisting**
  -  If you use `var` inside a function, it creates a function-scoped variable, not a global variable. Thus, the variable doesn't show up as a property of the global object.

------

## Summary

In this assignment, we introduced the `var` statement. Though the `var` statement is mostly "on the way out," it hasn't been deprecated as of 2019. In fact, it will probably still be around for a very long time to come.

Coming up next, we'll look more deeply at the concept of scope and how it applies to declarations in JavaScript.

# More About Scope

Now that we know about the `var` statement, let's take a closer look at scope. Our primary purpose in this assignment is to reduce the ambiguity involved in the language surrounding scope in JavaScript. To do that, we'll describe scope as three separate but related concepts.

Run the examples in this assignment with Node and a JavaScript file, e.g.:

```shell
node example.js
```

Do not use the Node REPL as it may interfere with the behaviors we want to demonstrate.

## What to Focus On

Scope is a fundamental concept in all computer languages. However, the terminology can sometimes be a little confusing, especially in JavaScript. Thus, you should focus on understanding scope:

- What do we mean by declared scope, visibility scope, and lexical scope?
- What do we mean by global scope and local scope?
- What do we mean by inner scope and outer scope?
- What do we mean by function scope and block scope when talking about declared scope?
- What do we mean by function scope and block scope when talking about visibility scope?

## Declared Scope vs. Visibility Scope vs. Lexical Scope

We use terms like global scope, local scope, function scope, block scope, inner scope, and outer scope when we talk about scope. Unfortunately, the terminology can be fluid and confusing. For instance, a variable can be declared with block scope by using the `let` keyword. If that declaration is inside a function, it has local scope. It can also have function scope if the declaration isn't inside a block. The variable can also have global scope if the declaration is at the topmost level of the program, outside all functions and blocks. To make matters worse, we can also talk about inner scope and outer scope. For instance, if you have a function that declares a variable, that variable is in the function's inner scope. However, the function can also reference variables from the surrounding scope, i.e., the function's outer scope.

What's a new developer to do? One way to help keep things straight is to look at scope as having three subtly different but related meanings.

In one sense, scope refers to where a particular identifier -- a variable, function, or class name -- is available for use by your code. We can call this the **visibility scope**. If a variable is available throughout your code, then it has global scope. Otherwise, it has local scope.

In another sense, scope refers to how a particular identifier is declared. We'll call this the **declared scope**. For instance, we use the `let` keyword to declare variables with block scope, and use `var` to declare variables with function scope. Knowing the declared scope lets us determine where a variable is available.

Finally, scope can refer to the lexical structure of your code. We'll call this the **lexical scope**. The lexical scope distinguishes between variables that are declared inside a function or block and the variables that are declared outside of that function or block. Lexical scope is especially important with closure, as we'll learn later.

> The terms *visibility scope* and *declared scope* are terms of convenience. You probably won't find either term used outside of Launch School. *Lexical scope* is widely used.

Though the visibility, declared, and lexical scopes have different meanings, there is considerable overlap. For instance, if we use `let` to declare variables with block scope at the topmost level of the program, then those variables also have global scope:

```js
let foo = 1;
let bar = 2;
console.log(foo, bar);
```

However, if we rearrange that code so part of it is inside a block, we get something different:

```js
let bar = 2;

if (true) {
  let foo = 1;
  console.log(foo, bar);
}
```

Here, both `foo` and `bar` are again declared with block scope. However, `foo` now has local scope for its visibility scope. Confusingly, we can also say that its visibility is block scope. Furthermore, `foo` in this example is in the block's inner scope, while `bar` is in its outer scope.

Let's explore these scopes in some more detail.

### Chart 

Different types of scopes use different frames of reference. 

| Types of scope | Terms                                           | Definition                                                   |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| Declared       | block / function                                | How a particular identifier is declared                      |
| Visibility     | global /  local / (local block/ local function) | Where a particular identifier -- a variable, function, or class name -- is available for use by your code. Combination of how each variable is declared and on the lexical location of each declaration. |
| Lexical        | Inner / outer                                   | How the structure of your code determines what variables can be accessed from any specific place in the program. |

- Use declared scope when you're talking about how an identifier is declared.
- Use visibility scope when you're talking about the visibility of a specific identifier.
- Use lexical scope when you want to talk about whether something is "in scope" -- that is, whether it is available for use.

### Declared Scope

Declared scope concerns how a variable is declared:

-  `let`, `const`, `class` declare variables with **block scope**
-  `var`, or `function`  declare variables with **function scope**.

 Even if the variable is declared outside of a function or block, it has either block or function scope:

```js
let foo1 = 1;        // declared scope is block scope
var bar1 = 2;        // declared scope is function scope

if (true) {
  let foo2 = 3;      // declared scope is block scope
  var bar2 = 4;      // declared scope is function scope
}

function xyzzy() {  // declared scope is function scope
  let foo3 = 5;     // declared scope is block scope
  var bar3 = 6;     // declared scope is function scope

  if (true) {
    let foo4 = 7;   // declared scope is block scope
    var bar4 = 8;   // declared scope is function scope
  }
}
```

Note that the declared scope of each variable above is determined solely by which keyword was used to declare it: `let` or `var`.

### Visibility Scope

Visibility scope concerns where a variable is visible. Where a particular identifier -- a variable, function, or class name -- is available for use by your code.

- The visibility scope is determined as a combination of how each variable is declared and on the lexical location of each declaration.
- Use visibility scope when you're talking about the visibility of a specific identifier.

This can be either **global scope** or **local scope** (inside a function or a block). We will sometimes also talk about **local function scope** and **local block scope** when discussing the local visibility scope. However, we will often omit the word "local".

- Global scope: a variable is available throughout your code.  
- Local scope: inside a function or a block.

Let's revisit the previous example to see how it applies to visibility scope:

```js
let foo1 = 1;        // visibility scope is global
var bar1 = 2;        // visibility scope is global

if (true) {
  let foo2 = 3;      // visibility scope is local (local block)
  var bar2 = 4;      // visibility scope is global
}

function xyzzy() {  // visibility scope is global
  let foo3 = 5;     // visibility scope is local (local function)
  var bar3 = 6;     // visibility scope is local (local function)

  if (true) {
    let foo4 = 7;   // visibility scope is local (local block)
    var bar4 = 8;   // visibility scope is local (local function)
  }
}
```

We usually talk about the visibility scope when we talk about the scope of a particular variable. Thus, we can say the `foo1` and `bar1` have global scope, but `foo3` and `bar3` have local scope.

### Lexical Scope

Lexical scope concerns how the structure of your code determines what variables are accessible or inaccessible at any point in the program. 

- What variables can be accessed from any specific place in the program.
- Use lexical scope when you want to talk about whether something is "in scope" -- that is, whether it is available for use.
- Lexical scope includes both **inner scope** and **outer scope**.

Let's use two simplified examples to see how lexical scope works. It'll be easier to see what's happening and to explain. We'll start with some code that uses `let`:

```js
let foo1 = 1;     // outer scope of xyzzy, outer scope of if block on line 3

if (true) {
  let foo2 = 3;   // inner scope of if block on line 3
}

function xyzzy() {
  let foo3 = 5;   // inner scope of xyzzy, outer scope of if block on line 10

  if (true) {
    let foo4 = 7; // inner scope of if block on line 10
  }
}
```

Here, `foo1` is in the outer scope with respect to both the `if` statement on line 3 and the function declaration on line 7. On the other hand, `foo2` is in the inner scope of the `if` statement on line 3. The `foo3` variable is in the inner scope of the function, but it is also in the outer scope of the `if` statement on line 10. Meanwhile, `foo4` is in the inner scope of the `if` statement on line 10.

Let's see what happens when we use `var` instead of `let`:

```js
var bar1 = 1;     // outer scope of xyzzy, outer scope of if block on line 3

if (true) {
  var bar2 = 3;   // outer scope of xyzzy, outer scope of if block on line 3
}

function xyzzy() {
  var bar3 = 5;   // inner scope of xyzzy, outer scope of if block on line 10

  if (true) {
    var bar4 = 7; // inner scope of xyzzy, outer scope of if block on line 10
  }
}
```

Here, both `bar1` and `bar2` are in the outer scope with respect to both the `if` statement on line 3 and the function declaration on line 7. Even though `bar2` is declared inside the `if` block, it uses the `var` statement to do so, which creates a function-scoped variable. In the same way, both `bar3` and `bar4` are in the inner scope of the function.

We usually talk about lexical scope when we want to talk about what variables can be accessed from any specific place in the program.

##### Combined example

```js
var bar1 = 1;  // outer scope of xyzzy, outer scope of if block on line 3
let foo1 = 1;  // outer scope of xyzzy, outer scope of if block on line 3

if (true) {
  var bar2 = 3;   // outer scope of xyzzy, outer scope of if block on line 3
  let foo2 = 3;   // inner scope of if block on line 3
}

function xyzzy() {
  var bar3 = 5;   // inner scope of xyzzy, outer scope of if block on line 10
  let foo3 = 5;   // inner scope of xyzzy, outer scope of if block on line 10

  if (true) {
    var bar4 = 7; // inner scope of xyzzy, outer scope of if block on line 10
    let foo4 = 7; // inner scope of if block on line 10
  }
}

console.log(bar2); // 3
```



## How to Talk About Scope

**Don't stress!** As confusing as scope terminology can be, it usually isn't as difficult to talk about as you might think. It's usually a matter of understanding your frame of reference:

- Use declared scope when you're talking about how an identifier is declared.
- Use visibility scope when you're talking about the visibility of a specific identifier.
- Use lexical scope when you want to talk about whether something is "in scope" -- that is, whether it is available for use.

Think of it a little bit like giving directions to your home:

- "Go to 37373 SW Couch St"
- "Turn right at the mailbox, and I'm the 3rd house on the right."
- "Catch the #77 bus from downtown."
- "Buy a plane ticket to Seattle."
- "Set your controls for the heart of the sun, but stop at the 3rd rock."

These are all valid directions to where you might live, just using different frames of reference.

## Summary

In this assignment, we refined the concept of scope to include declared scope, visibility scope, and lexical scope. This refinement lets us discuss scope with a bit less fuzziness.

In the next assignment, we'll talk about hoisting. Hoisting is an important mental model that lets JavaScript better understand how scope works.

------

# Hoisting

In this assignment, we'll examine how scope appears to work in JavaScript. Much of JavaScript's behavior regarding scope can be described by talking about something called hoisting. At it's core, hoisting isn't particularly difficult to understand; however, the behavior that arises from hoisting can be confusing, especially when `var` declarations are present.

Run the examples in this assignment with Node and a JavaScript file, e.g.:

```shell
node example.js
```

Do not use the Node REPL as it may interfere with the behaviors we want to demonstrate.

## What to Focus On

Hoisting is vital for JavaScript developers to understand, particularly in programs that use `var` statements and function declarations. In your career, you will undoubtedly encounter such code, so you must understand the role that hoisting plays. In particular, you should be able to answer these questions:

- What is hoisting?
- How do `var`, `let`, and `const` interact with hoisting? How do they differ?
- How do functions and classes interact with hoisting? How do they differ?
- What part does hoisting play in the way a specific program works?
- How does hoisting really work?

## What is Hoisting?

JavaScript engines operate in two main phases: a **creation phase** and an **execution phase**. 

- **Creation phase**: finds all of the identifiers in your code and determines their scope at that time.
  - finds all identifier declarations and records the names and designate their scopes.
  - **Hoisting** occurs in this phase: declarations get hoisted to the top of their defined scope.
  - “Function declarations and function variables are always moved (‘hoisted’) to the top of their JavaScript scope by the JavaScript interpreter”. 
  - In a process called **hoisting**, JavaScript appears to reorganize code in such a way that certain declarations and definitions appear to be moved around. While this organization doesn't really occur, it's a useful mental model for understanding scope in a JavaScript program.
  - Processing occurs from the top down during the creation phase.
- **Execution phase**: program runs code line - by- line. 
  - JS knows what variables exist and where they are in scope.
  - Code acts like the declarations were moved to the top of their respective scope. 
  - When the execution phase occurs, JavaScript no longer cares about declarations. It does care about initialization and function/class definitions, but not the declarations themselves. The identifiers are already known, and their scope is already known. JavaScript merely needs to look up the identifiers as required.

The execution phase occurs when the program runs code line-by-line. That's what most people mean when they talk about a program's execution. However, before the execution phase begins, the creation phase does some preliminary work. One of those work items is to find all of the variable, function, and class *declarations*. When it encounters each of these identifiers, it records the name and designates its scope.

> The creation phase is sometimes erroneously(mistakenly) called the compilation phase.

When the execution phase begins, JavaScript knows what variables exist and where they are in scope. From the developer's perspective, the code acts like the declarations were moved to the top of their respective scope. In particular, function-scoped declarations are moved to the function's beginning, and block-scoped declarations are moved to the block's start. We call this process **hoisting**.

The effect of hoisting is that all the declarations get hoisted -- raised, lifted, moved -- to the top of their defined scope. That's why the following code works:

```js
console.log(getName());

function getName() {
  return "Pete";
}
```

JavaScript sees the `getName` function declaration during the creation phase and hoists it to the program's top. Hence, the above code is effectively rearranged as:

```js
function getName() {
  return "Pete";
}

console.log(getName());
```

It's important to realize that **hoisting doesn't change the program**. It merely executes the program in a manner that makes it seem like the code was rearranged.

## The Temporal Dead Zone

Variables declared with the `let`, `const`, and `var` statements are also hoisted. There is one significant difference between how hoisting works with `var` compared to how it works with `let` and `const`.

When a `var` variable is hoisted, JavaScript gives it an initial value of `undefined`. If you try to access the value assigned to a `var` variable before the original statement with the `var` declaration gets executed, JavaScript returns `undefined`.

```js
console.log(bar); // undefined
var bar = 3;
console.log(bar); // 3
```

When `let` and `const` variables are hoisted, they are not given an initial value at all. Instead, they are left in an "unset" state; that is, they are "not defined." (Don't say "undefined," though - that's confusing since `undefined` is also a value.) Such unset variables are said to be in the **Temporal Dead Zone**, or the **TDZ**. Such variables remain in the TDZ until the initialization code runs during the execution phases.

If you try to access a `let` or `const` variable that is still in the TDZ, you'll get an error:

```js
console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
let foo;
```

```js
console.log(qux); // ReferenceError: Cannot access 'qux' before initialization
const qux = 42;
```

It's interesting to note that the error message differs if you don't declare the variable at all:

```js
console.log(baz); // ReferenceError: baz is not defined
```

This demonstrates that JavaScript is aware of the `foo` variable in the first snippet and recognizes that it hasn't been set to a value yet. JavaScript can tell that `baz` hasn't been declared in the third snippet, so the error message is different.

------

#####  hoisting with `var`

- When a `var` variable is hoisted, they are given initial value of `undefined`. 

  - Variable declarations get hoisted but their assignment expressions don’t. Assignment expression is initialized to `undefined`. 

  - Trying to access the value of `var` variable before the original statement with the `var` declaration gets executed will return `undefined`. 

    ```js
    console.log(bar); // undefined
    var bar = 3;
    console.log(bar); // 3
    ```

    ```js
    // equivaent code
    var bar = undefined;
    console.log(bar); 
    bar = 3;
    console.log(bar); 
    ```
  
  - If the assignment expression is a function definition, the function definition is assigned to `undefined`. 
  
    ```js
    console.log(bar); // undefined
    var bar = function () {}
    ```
    
    ```js
    // equivalent code
    var bar = undefined;
    console.log(bar);
    bar = function () {};
    ```
    
    


##### hoisting with `let` and `const`

- When `let` and `const` variables are hoisted, they are not given an initial value (not initialized!!). 

  - Unset variables are in the **Temporal Dead Zone**(TDZ). 

  - The variables remain in the TDZ until initialization code runs during the execution phase. (either initializing to `undefined` or the given assignment expression). 

  - Trying to access a variable in TDZ will result in a specific error. The specific error indicates JS knows of the existence of variables in TDZ that haven't been initialized to a value yet.

    ```js
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    let foo;
    ```

  - It's interesting to note that the error message differs if you don't declare the variable at all:

    ```js
    console.log(baz); // ReferenceError: baz is not defined
    ```

- Code example with no hoisting.

  - When you <u>execute</u> a variable declared with `let`, JS initializes the variable to a value of  `undefined`.

    ```js
    let a;
    console.log(a); // logs undefined, line 2 is execution statement
    ```

  - But if the variable is hoisted, the variable is still in the TDZ and is not defined yet. 

    ```js
    console.log(a);
    let a;
    ```

## Hoisting for Function Declarations

##### Entire function body is hoisted

- If we want to call a function before its body is defined, we need to use a function declaration. 

- JavaScript hoists function declarations to the top of the scope. In fact, it hoists the entire function declaration, including the function body:

```javascript
console.log(hello());

function hello() {
  return 'hello world';
}
```

is equivalent to:

```javascript
function hello() {
  return 'hello world';
}

console.log(hello());      // logs "hello world"
```

Function declarations have function scope. That's another way of saying that hoisting also occurs with nested functions:

```js
function foo() {
  return bar();

  function bar() {
    return 42;
  }
}
```

Even though `bar` is declared at the end of `foo`, we can still call `bar` at the beginning of the function. That's because hoisting makes the `bar` declaration available throughout `foo`. 

- When function declaration is hoisted but the function is not defined, the function is initialized to value of `undefined`. 

```js
if (false) {
  function baz(){}
};

console.log(baz); // undefined --> baz is declared but not defined.
baz(); // TypeError
```

Line 5 logs `undefined` because `baz` is declared but never defined.

Line 6 throws a `TypeError` because the function declaration is hoisted to the top of the function scope.

------

##### Rule: Never nest function declarations inside non-function blocks. 

Since you can get different behaviors with the same code, you shouldn't try to nest function declarations inside non-function blocks. If you must nest a function inside a block, use a function expression.

While JavaScript functions have function scope, the specific hoisting behavior you'll see when you nest a function inside a block (such as an `if` statement) is inconsistent. ES6 standardized how such functions are treated, but it can still vary from depending on how your program is written. Before ES6, the behavior wasn't just inconsistent, it was undefined entirely. Creators of JavaScript engines were free to do whatever they wanted to do.

Consider the following code:

```js
function foo() {
  if (true) {
    function bar() {
      console.log("bar");
    }
  } else {
    function qux() {
      console.log("qux");
    }
  }

  console.log(bar);
  bar();

  console.log(qux);
  qux();
}
foo();
```

What do you think happens here? Take a moment to think about it.

Depending on several factors, any of the following results may occur:

1.

```plaintext
[Function: bar]
bar
undefined
TypeError: qux is not a function
```

- The first one is the one that occurs when we run code in file with node.
- The function `qux` is never defined as the if statement never reaches the `else` condition. 
- `qux` is declared but not defined as a function yet.
- The error is a `TypeError` because the function declaration is hoisted to the top of the parent function scope. If the function is never declared, then you will get a `ReferenceError` message.

```js
function foo() {
  if (true) {
    function bar() { // function bar is declared here.
      console.log("bar");
    }
  } else { // condition is not reached.
    function qux() { // qux is is declared here.
      console.log("qux"); 
    }
  }

  console.log(bar); // logs the bar function
  bar(); // logs 'bar'

  console.log(qux); // undefined --> qux is not 
  qux(); // TypeError: qux is declared but not defined as a function yet.
}
foo();
```

2.

```plaintext
[Function: bar]
bar
[Function: qux]
qux
```

```js
function foo() {
  if (true) {
    function bar() { // function bar is declared here.
      console.log("bar");
    }
  } else {
    function qux() {
      console.log("qux"); // function delcarations have function scope, so qux is on the outer scope of the if/else block 
    }
  }

  console.log(bar); // logs the bar function
  bar(); // logs 'bar'

  console.log(qux); // logs qux 
  qux(); // 'qux'
}
foo();
```

3.

```plaintext
undefined
TypeError: bar is not a function
```

```js
function foo() {
  if (true) {
    function bar() {
      console.log("bar");
    }
  } else {
    function qux() {
      console.log("qux");
    }
  }

  console.log(bar);
  bar();

  console.log(qux);
  qux();
}
foo();
```

4.

```plaintext
ReferenceError: bar is not defined
```

```js
function foo() {
  if (true) {
    function bar() {
      console.log("bar");
    }
  } else {
    function qux() {
      console.log("qux");
    }
  }

  console.log(bar); // cant access bar from inside the block
  bar();

  console.log(qux);
  qux();
}
foo();
```

You may even get a syntax error with some implementations.

Since you can get different behaviors with the same code, you shouldn't try to nest function declarations inside non-function blocks. If you must nest a function inside a block, use a function expression.

> - Rule: Function Declarations are officially prohibited within non-function blocks (such as if) . However all browsers allow them and interpret them in different ways.
>
>   - For example the following code snippet in Firefox 3.6 throws an error because it interprets the Function Declaration as a Function Statement (see above) so `x` is not defined. However in IE8, Chrome 5 and Safari 5 the function `x` is returned (as expected with standard Function Declarations).
>
>     ```js
>     function foo() {
>         if(false) {
>             function x() {};
>         }
>         return x;
>     }
>     console.log(foo()); // undefined
>     ```

------

##### Stack overflow info

[reference](https://stackoverflow.com/questions/73049240/why-does-this-code-output-undefined-and-then-raise-a-typeerror?noredirect=1#comment129017612_73049240)

- Hoisting for function declarations works similarly to variables declared with `var`. 
  - Function & `var` scope the same way. 
  - Function declarations, like `var` declarations, have function scope. 
- Functions are hoisted to the top of the function scope, but are defined in order of execution.
- Function declarations that are hoisted but not defined are initialized with value of `undefined`. Only during code execution are they defined. 

```js
if (false) {
  function baz(){}
};

console.log(baz); // undefined --> baz is declared but not defined.
baz() // TypeError
```

Line 5 logs `undefined` because `baz` is declared but never defined.

Line 6 throws a `TypeError` because the function declaration is hoisted to the top of the function scope. If the function is never declared, then you will get a `ReferenceError` message.

> Another way to look at this `function x() {}` has the same scope as `var x = 1`, and if you `console.log(x)` before it's assigned you would get `undefined`. IOW: function & var scope the same way. So in modern JS, what you normally now do is -> `const x = 1` or `let x = 1`, and this will make them `block` scoped, you can do the same for functions `const x = () => {}` 
>
> -Keith

## Hoisting for Function Expressions

- Function expressions often involve assigning a function to a declared variable. Those variables obey the usual hoisting rules for variable declarations. 
  - Value of hoisted identifier depends on how the variable is declared. Variable identifier is hoisted but the function definition may be initialized to `undefined` or in the TDZ.
- Function expressions don't hoist the function body, only function declarations do. 

Thus:

```javascript
console.log(hello());

var hello = function () {
  return 'hello world';
};
```

is equivalent to:

```javascript
var hello; // hello is declared and initialized to undefined

console.log(hello());    // raises "TypeError: hello is not a function"

hello = function () {
  return 'hello world';
};
```

```js
console.log(hello); // undefined

var hello = function () {
  return 'hello world';
};
```

```js
console.log(hello); // ReferenceError: Cannot access 'hello' before initialization

let hello = function () {
  return 'hello world';
};
```



## Hoisting for Classes

#### Class Declarations

When JavaScript encounters a class declaration, the class name gets hoisted, but the definition of the class does not. Much like `let` and `const` variables, `class` declarations live in the TDZ until their definition code is executed.

```js
console.log(Hello); // ReferenceError: Cannot access 'Hello' before initialization
class Hello {}
```

- Example of class declaration during hoisting

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

  ```js
  function Pet(name, image) {
    this.name = name;
    this.image =  image;
  }
  
  let Image;
  var catImage;
  var pudding;
  
  Pet.prototype.walk = function() {
    console.log(`${this.name} is walking.`);
  };
  
  Image = class {
    constructor(file) {
      this.file = file;
    }
  };
  
  catImage = new Image("cat.png");
  pudding = new Pet("Pudding", catImage);
  ```

  Explanation: This is an okay representation of what actually happens during the creation phase. In this code, `Image` is now a variable declared with `let`. If we were to log the values, it shows that `Image` is in the unset TDZ, whereas `catImage` and `pudding` are initialized to `undefined`.

  ```js
  function Pet(name, image) {
    this.name = name;
    this.image = image;
  }
  console.log(catImage); // undefined
  console.log(Image); // ReferenceError: Cannot access 'Image' before initialization
  
  let Image;
  var catImage;
  var pudding;
  
  Pet.prototype.walk = function () {
    console.log(`${this.name} is walking.`);
  };
  
  Image = class {
    constructor(file) {
      this.file = file;
    }
  };
  
  catImage = new Image("cat.png");
  pudding = new Pet("Pudding", catImage);
  ```

#### Class Expressions

Hoisting for class expressions is similar: the variable name gets hoisted, but the definition doesn't get assigned to the name until the expression is evaluated.

Class expressions also involve assigning a function to a declared variable. Those variables obey the usual hoisting rules for variable declarations.

```js
console.log(hello); // ReferenceError: Cannot access 'hello' before initialization
let hello = class Hello {}
```

- `hello` is in the TDZ until the expression is evaluated. 

```js
console.log(hello); // undefined
var hello = class Hello { }
```

- `hello` is initialized to `undefined`. 

## Hoisting Variable and Function Declarations

##### Edge Case: What happens when a `var` variable and a function declaration have the same name? 

- In that case, the function declaration gets hoisted to the top of the program and the variable declaration gets discarded. 
  - The *variable declaration* gets discarded, but reassignment will still go through. 
- (Some people say that the function declaration gets hoisted above the variable declaration, but it's more correct to say that the variable declaration gets discarded.)

Consider the following code snippets. A slight change in code results in a significant change in the outcome. Let's look at the hoisted versions of these snippets too:

snippet1

```javascript
bar();             // logs "world"
var bar = 'hello';

function bar() {
  console.log('world');
}
```

snippet1

```javascript
function bar() {
  console.log('world');
}

bar();
bar = 'hello';
```

snippet2

```javascript
var bar = 'hello';
bar();             // raises "TypeError: bar is not a function"

function bar() {
  console.log('world');
}
```

snippet2

```javascript
function bar() {
  console.log('world');
}

bar = 'hello';
bar();
```

Notice that we no longer have a declaration for the `bar` variable. Instead, the function declaration is at the top of the hoisted code, and the <u>reassignments</u> to `bar` both replace the function object with a string value. In the first snippet, we call `bar` before we reassign it to a string, so the code logs `world`. However, in the second snippet, `bar` is no longer a function when we try to invoke it, so we get an error.

##### Edge Case: What if `var` variable and function declaration have different names?

- Function declarations get hoisted above variable declarations.

## Best Practice to Avoid Confusion

Hoisting can introduce confusion and subtle bugs if you don't pay careful attention. However, if you follow a few simple rules, you'll avoid many headaches:

- Whenever possible, use `let` and `const` instead of `var`: avoid the confusion and subtle behaviors that can occur with `var`.

- If you must use `var`, declare all of the variables at the top of the scope:

  ```javascript
  function foo() {
    var a = 1;
    var b = 'hello';
    var c;
  
    // main code
  }
  ```

- If you can use `let` and `const`, declare them as close to their first usage as possible:

  ```javascript
  function foo(bar) {
    console.log("Hello world!");
  
    let result;
    if (bar) {
      let squaredBar = bar * bar;
      result = squaredBar + bar;
    } else {
      result = "bar hasn't been set";
    }
  
    return result;
  }
  
  console.log(foo(3));           // 12
  console.log(foo(undefined));   // bar hasn't been set
  ```

- Declare functions before calling them:

  ```javascript
  function foo() {
    return 'hello';
  }
  
  foo();
  ```

## Hoisting Isn't Real

WHAT!!!? After all that, you're telling me that hoisting isn't real? Yup.

Hoisting is really just a mental model that almost all JavaScript developers use to explain how scope works. There is no actual hoisting process in JavaScript. It wasn't even mentioned in the ECMAScript standards until recently. Even now, it's barely mentioned in passing. What's more, the mental model of hoisting is not perfect. There are edge cases for which hoisting doesn't provide a satisfactory explanation for how JavaScript works.

##### Edge Case 1: accessing a variable before it's declared

- Rule: Function declarations get hoisted above variable declarations. 

In fact, hoisting breaks down in some situations. Consider this code:

```javascript
bar();              // logs undefined
var foo = 'hello';

function bar() {
  console.log(foo);
}
```

The equivalent hoisted code -- assuming that function declarations get hoisted above variable declarations -- will look like this: 

```javascript
function bar() { 
  console.log(foo);
}

var foo; // bar gets hoisted above foo

bar();          // logs undefined
foo = 'hello';
```

Here, it looks like the function is accessing `foo` before it is declared. If we assume that hoisting is a real process, then this code shouldn't work -- we shouldn't be able to access a variable before it's declared. However, the code does work and logs `undefined` as shown.

There are ways to adjust our mental model for hoisting to accommodate this situation, but there are other edge cases as well. Clearly, hoisting is something of an approximation for what really happens.

The behavior that we try to explain with hoisting is merely a consequence of JavaScript's two phases: the creation and execution phases. As described earlier, the creation phase finds all of the identifiers in your code and determines their scope at that time.

When the execution phase occurs, JavaScript no longer cares about declarations. It does care about initialization and function/class definitions, but not the declarations themselves. The identifiers are already known, and their scope is already known. JavaScript merely needs to look up the identifiers as required.

##### Edge Case 2: Nothing gets hoisted

Consider this code:

```js
boo();

function boo() {
  console.log("Boo!");
}
```

JavaScript only encounters one declaration during the creation phase: the `boo` function on line 3. It puts the name `boo` in the global scope. The first thing that happens during the execution phase is that JavaScript encounters `boo()` on line 1. Since line 1 is in the global scope, JavaScript looks in the global scope for an identifier named `boo`. That name exists since it was found during the creation phase. Therefore, JavaScript only needs to call the `boo` function.

The interesting thing here is that nothing got hoisted! All that happened is that the creation phase noticed that `boo` belonged to the global scope, so it recorded an appropriate entry. Nothing got moved around in your code.

##### Edge Case 3: conflict with `let`

Summarized:  processing occurs from the top down during the creation phase, so`SyntaxError` occurs on line 3. 

Let's see what happens when there's a conflict between a function declaration and a variable declaration using `let`. Recall that you can't have two declarations with the same name if one of those names is declared by `let`. Given this information, what do you think happens if you run this code?

```js
let foo = "hello";

function foo() {
  console.log("hello");
}
```

If you said that the `foo` function on lines 3-5 was hoisted above the variable declaration on line 1, you might expect a `SyntaxError` on line 1 complaining that the identifier `foo` already exists. That's a natural response since you've learned that function declarations get hoisted above variable declarations.

That's not what happens, though. Syntax errors usually occur during the creation phase -- before "hoisting" affects the code. Since processing occurs from the top down during the creation phase, JavaScript first finds the `foo` variable on line 1. When the creation phase reaches the function declaration on lines 3-5, JavaScript already knows about the `foo` identifier, so it complains that `foo` has already been declared. The error occurs on line 3, not line 1.

Let's reverse those declarations:

```js
function foo() {
  console.log("hello");
}

let foo = "hello";
```

This time, the `foo` function is seen first during the creation phase, so the error doesn't occur until JavaScript reaches line 5.

Because of subtle discrepancies like this, some people find it easier to think about the creation phase rather than hoisting. In some ways, hoisting is easier to understand, but the hoisting model has some issues, as seen above. Nevertheless, the concept of hoisting is still a valuable mental model. Don't be afraid to use it to explain how a program works. Just be clear that nothing in JavaScript is rearranging your code.

In the remainder of the curriculum, we will talk about hoisting as an actual process. You should consider that as a given in future assignments, quizzes, and assessments. If we ask you about hoisting, don't try to argue that there is no such thing.

Keep in mind that we may ask you to explain how hoisting really works, so don't neglect this section.

## More hoisting examples

```js
bar();              // ReferenceError: Cannot access 'foo' before initialization
let foo = 'hello';

function bar() {
  console.log(foo);
}
```

For more hoisting examples, check out [this blog](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/).

##### Question 1: functions with same names

JavaScript supports overriding not overloading, meaning, that if you define two functions with the same name, the last one defined will override the previously defined version and every time a call will be made to the function, the last defined one will get executed.

```js
function foo(){
    function bar() {
        return 3;
    }
    return bar();
    function bar() {
        return 8;
    }
}
console.log(foo()); // 8
```

##### Question 2: duplicate `var` declarations

```js
function foo(){
    var bar = function() {
        return 3;
    };
    return bar();
    var bar = function() {
        return 8;
    };
}
console.log(foo()); // 3
```

##### Question 3:

```js
console.log(foo()); // 3
function foo(){
    var bar = function() {
        return 3;
    };
    return bar();
    var bar = function() {
        return 8;
    };
}
```

##### Question 4:

```js
function foo(){
    return bar();
    var bar = function() {
        return 3;
    };
    var bar = function() {
        return 8;
    };
}
console.log(foo()); // [Type Error: bar is not a function]
```

```js
//**Simulated processing sequence for Question 4**
function foo(){
    //a declaration for each function expression
    var bar = undefined;
    var bar = undefined;
    return bar(); //TypeError: "bar not defined"
    //neither Function Expression is reached
}
console.log(foo());
```



------

##### **What is a Function Declaration?**

**Function Declaration**: defines a named function variable without requiring variable assignment. 

- Function Declarations occur as standalone constructs and cannot be nested within non-function blocks.
- It’s helpful to think of them as siblings of Variable Declarations. 
- Just as Variable Declarations must start with “var”, Function Declarations must begin with “function”.

```js
function bar() {
    return 3;
}
```

ECMA 5 (13.0) defines the syntax as
**function** *Identifier* ( *FormalParameterList*opt ) { *FunctionBody* }

The function name is visible within it’s scope and the scope of it’s parent (which is good because otherwise it would be unreachable)

```js
function bar() {
    return 3;
}
 
bar(); //3
bar  //function
```

------

##### **What is a Function Expression?**

A **Function Expression** defines a function as a part of a larger expression syntax (typically a variable assignment )

-  Functions defined via Functions Expressions can be named or anonymous. 
- Function Expressions must not start with “function” (hence the parentheses around the self invoking example below). 

```js
//anonymous function expression
var a = function() {
    return 3;
}
 
//named function expression
var a = function bar() {
    return 3;
}
 
//self invoking function expression
(function sayHello() {
    alert("hello!");
})();
```

ECMA 5 (13.0) defines the syntax as
**function** *Identifier*opt ( *FormalParameterList*opt ) { *FunctionBody* }

- (though this feels incomplete since it omits the requirement that the containing syntax be an expression and not start with “function”)

- The function name (if any) is not visible outside of it’s scope (contrast with Function Declarations).

------

##### **So what’s a Function Statement?**

Its sometimes just a pseudonym for a Function Declaration. However as [kangax](http://yura.thinkweb2.com/named-function-expressions/#function-statements) pointed out, in mozilla a Function Statement is an extension of Function Declaration allowing the Function Declaration syntax to be used anywhere a statement is allowed. It’s as yet non standard so not recommended for production development

------

**About that quiz….care to explain?**

OK so Question 1 uses function declarations which means they get hoisted…

##### **Wait, what’s Hoisting?**

To quote [Ben Cherry’s excellent article](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting): “Function declarations and function variables are always moved (‘hoisted’) to the top of their JavaScript scope by the JavaScript interpreter”.

When a function declaration is hoisted the entire function body is lifted with it, so after the interpreter has finished with the code in Question 1 it runs more like this:

```js
function foo(){
    function bar() {
        return 3;
    }
    return bar();
    function bar() {
        return 8;
    }
}
console.log(foo()); // 8
```

```js
//**Simulated processing sequence for Question 1**
function foo(){
    //define bar once
    function bar() {
        return 3;
    }
    //redefine it
    function bar() {
        return 8;
    }
    //return its invocation
    return bar(); //8
}
alert(foo());
```

##### **But…but…we were always taught that code after the return statement is unreachable**

In JavaScript execution there is Context (which ECMA 5 breaks into LexicalEnvironment, VariableEnvironment and ThisBinding) and Process (a set of statements to be invoked in sequence). Declarations contribute to the VariableEnvironment when the execution scope is entered. They are distinct from Statements (such as **return**) and are not subject to their rules of process.

##### **Do Function Expressions get Hoisted too?**

That depends on the expression. Let’s look at the first expression in Question 2:

```js
var bar = function() { // function definition is not hoisted.
    return 3;
};
```

The left hand side (*var bar*) is a Variable Declaration. Variable Declarations get hoisted but their Assignment Expressions don’t. 

- So when **bar** is hoisted the interpreter initially sets `var bar = undefined`. The function definition itself is not hoisted.

(ECMA 5 12.2 A variable with an *initializer* is assigned the value of its *AssignmentExpression* when the *VariableStatement* is executed, not when the variable is created.)

Thus the code in Question 2 runs in a more intuitive sequence:

```js
function foo(){
    var bar = function() {
        return 3;
    };
    return bar();
    var bar = function() {
        return 8;
    };
}
console.log(foo()); // 3
```

```js
//**Simulated processing sequence for Question 2**
function foo(){
    //a declaration for each function expression
    var bar = undefined;
    var bar = undefined;
    //first Function Expression is executed
    bar = function() {
        return 3;
    };
    // Function created by first Function Expression is invoked
    return bar();
    // second Function Expression unreachable
}
alert(foo()); //3
```

##### **Ok I think that makes sense. By the way, you’re wrong about Question 3. I ran it in Firebug and got an error**

Try saving it in an HTML file and running it over Firefox. Or run it in IE8, Chrome or Safari consoles. Apparently the Firebug console does not practice function hoisting when it runs in its “global” scope (which is actually not global but a special “Firebug” scope – try running “this == window” in the Firebug console).

Question 3 is based on similar logic to Question 1. This time it is the **foo** function that gets hoisted.

##### **Now Question 4 seems easy. No function hoisting here…**

Almost. If there were no hoisting at all, the TypeError would be “bar not defined” and not “bar not a function”. There’s no function hoisting, however there *is* variable hoisting. Thus **bar** gets declared up front but its value is not defined. Everything else runs to order.

```js
function foo(){
    return bar();
    var bar = function() {
        return 3;
    };
    var bar = function() {
        return 8;
    };
}
console.log(foo()); // [Type Error: bar is not a function]
```

```js
//**Simulated processing sequence for Question 4**
function foo(){
    //a declaration for each function expression
    var bar = undefined;
    var bar = undefined;
    return bar(); //TypeError: "bar not defined"
    //neither Function Expression is reached
}
alert(foo());
```

##### **What else should I watch out for?**

Function Declarations are officially prohibited within non-function blocks (such as if) . However all browsers allow them and interpret them in different ways.

For example the following code snippet in Firefox 3.6 throws an error because it interprets the Function Declaration as a Function Statement (see above) so x is not defined. However in IE8, Chrome 5 and Safari 5 the function x is returned (as expected with standard Function Declarations).

```js
function foo() {
    if(false) {
        function x() {};
    }
    return x;
}
alert(foo());
```

##### **I can see how using Function Declarations can cause confusion but are there any benefits?**

Well you could argue that Function Declarations are forgiving – if you try to use a function before it is declared, hoisting fixes the order and the function gets called without mishap. But that kind of forgiveness does not encourage tight coding and in the long run is probably more likely to promote surprises than prevent them. After all, programmers arrange their statements in a particular sequence for a reason.

##### **And there are other reasons to favour Function Expressions?**

How did you guess?

a) Function Declarations feel like they were intended to mimic Java style method declarations but Java methods are very different animals. In JavaScript functions are living objects with values. Java methods are just metadata storage. Both the following snippets define functions but only the Function Expression suggests that we are creating an object.

```javascript
//Function Declaration
function add(a,b) {return a + b};
//Function Expression
var add = function(a,b) {return a + b};
```

b) Function Expressions are more versatile. A Function Declaration can only exist as a “statement” in isolation. All it can do is create an object variable parented by its current scope. In contrast a Function Expression (by definition) is part of a larger construct. If you want to create an anonymous function or assign a function to a prototype or as a property of some other object you need a Function Expression. Whenever you create a new function using a high order application such as [curry](https://javascriptweblog.wordpress.com/2010/04/05/curry-cooking-up-tastier-functions/) or [compose](https://javascriptweblog.wordpress.com/2010/04/14/compose-functions-as-building-blocks/) you are using a Function Expression. Function Expressions and Functional Programming are inseparable.

```js
//Function Expression
var sayHello = alert.curry("hello!");
```

##### **Do Function Expressions have any drawbacks?**

Typically functions created by Function Expressions are unnamed. For instance the following function is anonymous, *today* is just a reference to an unnamed function:

```js
var today = function() {return new Date()}
```

Does this really matter? Mostly it doesn’t, but as [Nick Fitzgerald](http://fitzgeraldnick.com/weblog/) has pointed out debugging with anonymous functions can be frustrating. He suggests using Named Function Expressions (NFEs) as a workaround:

```js
var today = function today() {return new Date()}
```

However as Asen Bozhilov points out (and Kangax [documents](http://yura.thinkweb2.com/named-function-expressions/#jscript-bugs)) NFEs do not work correctly in IE < 9

##### **Conclusions?**

Badly placed Function Declarations are misleading and there are few (if any) situations where you can’t use a Function Expression assigned to a variable instead. However if you must use Function Declarations, it will minimize confusion if you place them at the top of the scope to which they belong. I would never place a Function Declarations in an **if** statement.

Having said all this you may well find yourself in situations where it makes sense to use a Function Declaration. That’s fine. Slavish adherance to rules is dangerous and often results in tortuous code. Much more important is that you understand the concepts so that you can make your own informed decisions. I hope this article helps in that regard.

Comments are very welcome. Please let me know if you feel anything I’ve said is incorrect or if you have something to add.

## Summary

In this assignment, we had a wide-ranging discussion of hoisting. Since hoisting's most glaring effects occur in conjunction with `var` statements, the concept isn't as important as it once was. However, hoisting still occurs in JavaScript, even when you don't use `var`, so you can't ignore it completely.

In the next assignment, we'll get some practice dealing with hoisting and `var`. We'll then move on and explore a completely different topic: strict mode.

------

- [Courses](https://launchschool.com/course_catalog)
- [JS130 More JavaScript Foundations](https://launchschool.com/courses/165307a8)
- [Advanced Concepts](https://launchschool.com/lessons/43f23069)
- \5. Practice Problems: Hoisting and the var Statement

Give us your feedback

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

   This code logs `Bye` on line 9. 

   The code is equivalent to the following: 

   ```js
   function foo() {
     console.log("Hello");
   }
   
   foo = function() {
     console.log("Bye");
   };
   
   foo(); // 'Bye' 
   ```

   This code first defines a variable `foo` whose value is a function expression, then declares a function with the same name as the variable. When a variable and function declaration has the same name, the function declaration is hoisted to the top of the program and the variable declaration is discarded. Variable `foo` is reassigned to the first function from the original code as its value which displays `Bye` when invoked. 

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

   ```js
   // working notes
   for (var index = 0; index < 2; index += 1) { // index is on outer scope of for loop on line 1 (inner scope can access variables from outer scope)
     console.log(foo);
     if (index === 0) {
       var foo = "Hello"; // foo is on the outer scope 
     } else {
       foo = "Bye";
     }
   }
   
   console.log(foo); // Bye
   console.log(index); // 1
   ```

   This code logs

   ```
   undefined
   Hello
   Bye
   2
   ```

   On line 4, variable `foo` is declared with `var`, so it has function scope. This means it's outside the scope of the `if` statement on line 3. The variable is available before the declaration on line 4, in the `if...else` block, as well as the code after the `for` loop. On the first execution of line 2, `foo` is defined due to hoisting so it has an initial value of `undefined`. On the second execution, `foo` has been set to `Hello`. Finally when the loop exits, the value of `foo` is Bye. 

3. The following code doesn't work:

   ```js
   bar(); // TypeError: bar is not a function
   
   var bar = function() {
     console.log("foo!");
   };
   ```

   Without changing the order of the invocation and function definition, update this code so that it works.

   Solution

   ```js
   // what happens during hoisting
   var bar = undefined;
   bar();
   
   bar = function() {
     console.log("foo!");
   };
   ```

   ```js
   // solution
   bar();
   
   function bar() {
     console.log("foo!");
   }
   ```

   If we want to call a function before its body is defined, we need to use a function declaration. 

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

   ```js
   // Hoisting treats code as though we wrote it like this
   function foo() {
     var bar = undefined;
     bar = bar - 42; // undefined - 42 results in NaN
     console.log(bar);
   }
   var bar = undefined;
   bar = 82;
   foo(); // NaN
   ```

   This code logs `NaN`, because `bar` is `undefined` when we try to subtract `42` from it. That operation reassigns `bar` to `Nan`, which is what is logged to the console. 

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

   ```
   undefined
   3.1415
   42
   undefined
   0.5772
   2.7183
   undefined
   42
   ```

   Solution

   ```js
   function foo(condition) {
     let bar;
   
     console.log(bar);
   
     let qux = 0.5772;
   
     if (condition) {
       qux = 3.1415;
       console.log(qux);
     } else {
       bar = 24;
   
       let xyzzy = function() {
         let qux = 2.7183; // variable shadowing
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

   ```js
   function Pet(name, image) {
     this.name = name;
     this.image =  image;
   }
   
   let Image;
   var catImage = undefined;
   var pudding = undefined;
   
   Pet.prototype.walk = function() {
     console.log(`${this.name} is walking.`);
   };
   
   
   Image = class {
     constructor(file) {
       this.file = file;
     }
   }
   
   catImage = new Image("cat.png");
   pudding = new Pet("Pudding", catImage);
   ```

   You may have struggled a bit with the way that the `Image` class got hoisted. However, recall that only the class's name gets hoisted; the class doesn't get defined until the definition is executed. Thus, we have to create a variable for the class name, then later assign it a class expression.

   There are other ways to depict the effect of hoisting with this code. For instance, the following code is also correct:

   ```js
   var Pet;
   let Image;
   var catImage;
   var pudding;
   
   Pet = function(name, image) {
     this.name = name;
     this.image =  image;
   };
   
   // omitted code...
   ```

   Explanation: This is an okay representation of what actually happens during the creation phase. In this code, `Image` is now a variable declared with `let`. If we were to log the values, it shows that `Image` is in the unset TDZ, where as `catImage` and `pudding` are initialized to `undefined`.

   ```js
   function Pet(name, image) {
     this.name = name;
     this.image = image;
   }
   console.log(catImage); // undefined
   console.log(Image); // ReferenceError: Cannot access 'Image' before initialization
   
   let Image;
   var catImage;
   var pudding;
   
   Pet.prototype.walk = function () {
     console.log(`${this.name} is walking.`);
   };
   
   Image = class {
     constructor(file) {
       this.file = file;
     }
   };
   
   catImage = new Image("cat.png");
   pudding = new Pet("Pudding", catImage);
   ```

   

------

# My Summary So far

### Hoisting Charts

| Type                                      | How its hoisted                                              | Scope          |
| ----------------------------------------- | ------------------------------------------------------------ | -------------- |
| `var`                                     | Variable identifier get hoisted but their assignment expressions is initialized to `undefined`. | function scope |
| Function declarations                     | Entire declaration including body(function definition) is hoisted. | function scope |
| Function declarations that aren't defined | Function name is hoisted, but its definition initialized to `undefined`. | function scope |
| Function expressions                      | Function expressions don't hoist the function body, only function declarations do.  Value of hoisted identifier depends on how the variable is declared. Variable identifier is hoisted but the function definition may be initialized to `undefined` or in the TDZ. | depends        |
| `let` `const`                             | Variable identifier is in the TDZ; not defined to any initial value. The variable remains in the TDZ until initialization(definition) code is executed. | block scope    |
| Class declarations                        | Class identifier is hoisted  at the top of the block scope in an "unset" state (TDZ). The class name gets hoisted, but the (body) definition of the class does not. Class declarations live in the TDZ until their definition code is executed. | block scope    |
| Class expression                          | Variable identifier is hoisted but the class expression definition may be initialized to `undefined` or in the TDZ. | depends        |

| Edge cases about hoisting                                   | How its hoisted                                              | Scope |
| ----------------------------------------------------------- | ------------------------------------------------------------ | ----- |
| `var` variable and function declaration have same name      | Function declaration gets hoisted to the top of the program and the variable declaration gets discarded. |       |
| `var` variable and function declaration have different name | Function declarations are hoisted above variable declarations. |       |
| Functions with same names                                   | The same way during creation phase, from top to down. Last defined function overrides previous ones. |       |
| Duplicate `var` declarations                                | `var` identifiers are hoisted and initialized to `undefined`. The variables are then assigned the value of its assignment expression when the variable statement is executed. |       |

### Hoisting Rules

- Function declarations are hoisted above variable names. 
- If `var` variable and function declaration have same name, the function declaration gets hoisted to the top of the program and the variable declaration gets discarded. 
- If functions have the same name, the last defined function is executed. 
- If there are duplicate `var` declarations...
- `var` variable declaration 

### Other Rules to remember

- As soon as a variable is declared it has the value of `undefined` --> remember that hoisting rules are separate from regular rules like this. 

- Math operations on `undefined` result in `NaN`.

- If you execute a variable declared with `let`, JS initializes the variable to a value of  `undefined`.

  ```js
  let a;
  console.log(a); // undefined
  ```

  But if the variable is hoisted, the variable is still in the TDZ and is not defined yet. 

  ```js
  console.log(a);
  let a;
  ```

  

### Edge Cases

##### Functions with same names 

- Rule: Overriding: if you define two functions with the same name, the last one defined will override the previously defined version and every time a call will be made to the function, the last defined one will get executed.

- Example

  ```js
  function foo(){
      function bar() {
          return 3;
      }
      return bar();
      function bar() {
          return 8;
      }
  }
  console.log(foo()); // 8
  ```

  ```js
  //**Simulated processing sequence**
  function foo(){
      //define bar once
      function bar() {
          return 3;
      }
      //redefine it
      function bar() {
          return 8;
      }
      //return its invocation
      return bar(); //8
  }
  alert(foo());
  ```

##### Duplicate `var` declarations

- General Rule: Variables with an initializer is assigned the value of its assignment expression when the variable statement is executed, not when the variable is created.

- Specific rule about variables declared with `var` : the variable declaration is hoisted but the assignment expressions is initialized to `undefined`.

- Duplicate `var` variable declarations means the `var` identifiers are hoisted and initialized to `undefined`. The variables are then assigned the value of its assignment expression when the variable statement is executed. 

- Example 1

  ```js
  function foo(){
      var bar = function() {
          return 3;
      };
      return bar();
      var bar = function() {
          return 8;
      };
  }
  console.log(foo()); // 3
  ```

  ```js
  //**Simulated processing sequence**
  function foo(){
      //a declaration for each function expression
      var bar = undefined;
      var bar = undefined;
      //first Function Expression is executed
      bar = function() {
          return 3;
      };
      // Function created by first Function Expression is invoked
      return bar();
      // second Function Expression unreachable
  }
  alert(foo()); //3
  ```

- Example 2

  ```js
  var a = 1;
  var a = 2;
  
  console.log(a); // 2
  ```

  ```js
  // hoisting
  var a = undefined;
  var a = undefined;
  a = 1;
  a = 2;
  
  console.log(a); // 2
  ```

- Example 3

  ```js
  var a = 1;
  console.log(a); // 1
  var a = 2;
  ```

  ```js
  // equivalent to
  var a = undefined;
  var a = undefined;
  a = 1;
  console.log(a); // 1
  a = 2;
  ```
  
- Example 4

  ```js
  console.log(a); // undefined
  
  var a = 1;
  ```

  ```js
  // equivalent to 
  var a = undefined;
  console.log(a); // undefined
  a = 1;
  ```

------

# Strict Mode

Please take some time to read through the Launch School Gist [Modern JavaScript: Strict Mode](https://launchschool.com/gists/406ba491). Using strict mode will help you find and fix errors before they become mysterious bugs that plague your application for years.

## Modern JavaScript: Strict Mode

By now, you're well familiar with JavaScript's quirks, and in particular, the booby traps that arise from making simple mistakes, such as these:

- You forget to declare a variable before assigning it.
- You forget to use `this` when assigning an object property.
- You use a number that begins with `0`.
- You attempt to assign a value to a JavaScript keyword or value.

Issues such as these, and more, can't be fixed without breaking a lot of existing code. Fortunately, we're not stuck with **sloppy mode** (an unofficial term); instead, JavaScript ES5 introduced **strict mode**, which is an optional mode that modifies the semantics of JavaScript and prevents certain kinds of errors and syntax.

## What to Focus On

Conceptually, strict mode is both easy to understand and use. However, you must be aware of how it changes the behavior of JavaScript and your code. There isn't much to master, but you do need to know how to use strict mode in your code. Going forward, you should try to use strict mode whenever possible.

You should focus on the following:

- What is strict mode? How does it differ from sloppy mode?
- How do you enable strict mode at the global or function level?
- Describe how code behaves under both strict and sloppy mode.
- When is strict mode enabled automatically?
- When should you use (or not use) strict mode?

## What Does Strict Mode Do?

##### Strict mode makes three significant changes to JavaScript semantics:

- Strict mode eliminates some **silent errors** that occur in sloppy mode by changing them to throw errors instead. Silent errors occur when a program does something that is unintended, but continues to run as though nothing is wrong. This can lead to incorrect results or errors much later in execution that are subsequently difficult to track down.
- Strict mode prevents some code that can inhibit JavaScript's ability to optimize a program so that it runs faster.
- Strict mode prohibits using names and syntax that may conflict with future versions of JavaScript.

##### These changes offer several benefits to JavaScript developers:

- They prevent or mitigate bugs.
- They help make debugging easier.
- They help your code run faster.
- They help you avoid conflicts with future changes to the language.

In a few moments, we'll take a closer look at some of the specific changes that strict mode enables. We won't cover them all in detail, just the ones that you're most likely to encounter. First, though, let's learn how to enable strict mode.

##### Semantic changes that occur in strict mode & their advantages

- You cannot create global variables implicitly.
  - Prevents typos.
  - Undeclared variables will raise `ReferenceError`
- Functions won't use the global object as their implicit context. (most significant change)
  - Helps you spot bugs caused by context loss which result in silent errors.
  - Prevents **silent error**: Since the implicit `this` is set to `undefined` for function invocations, will raise `TypeError` if you accidentally set variables on `undefined`, compared to setting on global object in sloppy mode.
- Forgetting to use `this` in a method raises an error.
  - Prevents silent error. 
  - Results in `ReferenceError` rather than a silent error of variable being set on global object. 
- Leading zeros on numeric integers are illegal.
  - Leading zeros raise `ReferenceError`. 
  - Don't want JS to interpret numbers as octal literals.

## Enabling Strict Mode

 **pragma**: language construct that tells a compiler, interpreter, or other translator to process the code in a different way. 

- Pragmas aren't part of the language, and often use odd syntax like `"use strict"` does.
- The `"use strict"` statement is an example of a pragma. 

```js
"use strict";
```

- Strict mode is easy to turn on either at the global level of a program or at the individual function level. To enable strict mode, add this weird bit of code to the beginning of the program file or function definition
  - Yes, those quotes are required. They can be single or double quotes, but one way or the other, you must include them. 
  - Note that you can't use backticks.
  - Note also that nested functions inherit strict mode from the surrounding scope.
  - You must specify the `"use strict"` pragma at the very beginning of the file or function. You can't enable it partway through a program or function:
  - In particular, note that you can not enable strict mode for a block. You can only enable strict mode at the very beginning of a file or function.
  - Once you enable strict mode, **you can't disable it later** in the same program or function.
  - Strict mode is lexically scoped: it applies only to the code that enables it. When invoking a function that exists outside the scope - that function runs on whatever mode it originally has. 


global strict mode

```js
"use strict";

// The rest of the program. Everything from here to the end of
// the file runs in strict mode.

function foo() {
  // strict mode is enabled here too.
}

// Strict mode is still enabled
foo();
```

function strict mode

```js
function foo() {
  'use strict';

  // The rest of the function. Everything from here to the end of
  // the function runs in strict mode.
}

// Strict mode is disabled unless you defined it globally.
foo();
```

- JavaScript enables strict mode automatically within the body of a `class`; there is no way to prevent that behavior. The same thing happens with JavaScript modules, which we'll discuss in a later assignment.

>  If you haven't encountered JavaScript classes yet, you will do so later.

- Strict mode is lexically scoped; that is, it only applies to the code that enables it. 

  - When invoking a function that exists outside the scope - that function runs on whatever mode it originally has. 

  For instance:

```js
function foo() {
  "use strict";
  // All code here runs in strict mode
}

function bar() {
  // All code here runs in sloppy mode
  foo(); // This invocation is sloppy mode, but `foo` runs in strict mode
  // All code here runs in sloppy mode
}
```

In this example, even though `bar` runs in sloppy mode and calls `foo`, `foo` runs in strict mode. Similar behavior applies when calling a sloppy mode function from a strict mode function:

```js
function foo() {
  // All code here runs in sloppy mode
}

function bar() {
  "use strict";
  // All code here runs in strict mode
  foo(); // This invocation is strict mode, but `foo` runs in sloppy mode
  // All code here runs in strict mode
}
```

Here, `foo` runs in sloppy mode even though we call it from a strict mode function.

------

### Implicit Global Variables

- Undeclared variables implicitly become global variables - properties of the global object that act like global variables. 

- This feature is disabled by strict mode. Strict mode doesn't let us create variables without declaring them. 

  - Disabling this feature helps prevent typos. 

  - Thus, undeclared variables will raise an error

    ```js
    // ReferenceError: aVariab1eWithALongName is not defined
    ```

Anybody with even minimal experience with JavaScript is aware that JavaScript automatically creates a variable for you when you assign it to a value without first declaring the variable. For instance:

```js
function foo() {
  bar = 3.1415;
}

foo();
console.log(bar); // 3.1415
```

JavaScript defines undeclared variables like `bar` as global variables. No matter where your code initializes an undeclared variable, it becomes a global variable.

Note that we're using the term *global variable* a little loosely here. In actuality, JavaScript defines undeclared variables as properties of the global object. Such properties act like global variables, though -- you can access them from anywhere in your program.

Creating global variables in such a willy-nilly fashion can easily lead to bugs; it's far too easy to overwrite a variable that is intended to be globally available.

Strict mode disables this feature by not letting you create variables without explicitly declaring them. For instance, the following program raises an error when we try to assign `bar`:

```js
"use strict";

function foo() {
  bar = 3.1415; // ReferenceError: bar is not defined
}

foo();
console.log(bar);
```

Raising an error like this may seem like a nuisance. Why would you want to make your program raise errors? Errors prevent your program from running to completion. However, they also alert you to something that may be wrong.

Suppose you do want to define `bar` as a global variable. How would you do that in strict mode? The answer is easy: declare it explicitly:

```js
"use strict";

let bar;

function foo() {
  bar = 3.1415;
}

foo();
console.log(bar); // 3.1415
```

This behavior also helps identify misspelled names. If you declare a variable with one name, then later try to reassign it with a misspelled name, sloppy mode will create a new global variable. Consider this code:

```js
let aVariableWithALongName = 2.71828;

// a bunch of omitted code here

aVariab1eWithALongName = 3.14159;
console.log(aVariableWithALongName); // 2.71828; should be 3.13159
```

Can you see why that code doesn't produce the expected result? Look closely at the variable name on line 5. Look closer if you don't see it. The problem here is that the variable name on line 5 has a typo, and it's a typo that is difficult to see with most fonts: the digit `1` in the variable name should be the letter `l`. Thus, line 5 creates a global variable instead of reassigning the variable as intended. Misspellings can be especially hard to find in large programs that use the same name repeatedly. If you've been burned by this problem before, you know what we mean.

Strict mode may help you identify this problem:

```js
"use strict";

let aVariableWithALongName = 2.71828;

// a bunch of omitted code here

aVariab1eWithALongName = 3.14159; // ReferenceError: aVariab1eWithALongName is not defined
console.log(aVariableWithALongName);
```

With the addition of strict mode, it's easy to see where the problem lies. You may still have difficulty seeing the typo, but at least you know that there's a problem with that name.

Note that strict mode can't help you if both spellings are the names of declared variables:

```js
"use strict";

let all = 42;
let a11 = false;

all = true; // Did we mean a11? There's no way to tell, so no error.
```

### Implicit Context In Functions

- Strict mode is better than sloppy mode. 
- Strict mode helps you spot bugs caused by context loss which result in silent errors. 
- Since the implicit `this` is set to `undefined` for function invocations, will raise `TypeError` if you accidentally set variables on `undefined`, compared to setting on global object in sloppy mode which results in a **silent error**. 
- This is the most significant change to JS semantics. 

Consider the following code:

```js
let obj = {
  a: 5,
  go() {
    this.a = 42;
  },
};

let doIt = obj.go;
doIt(); // invoking go as regular function call
console.log(obj.a); // 5
```

In sloppy mode, this code fails to set `obj.a` to `42` since we invoke the `go` method with function call syntax. Thus, the implicit execution context, `this`, is set to the global object.

In strict mode, using function call syntax on a method sets `this` set to `undefined`. Thus, `this.a` raises an exception:

```js
"use strict";

let obj = {
  a: 5,
  go() {
    this.a = 42; // TypeError: Cannot set property 'a' of undefined
  },
};

let doIt = obj.go;
doIt();
console.log(obj.a); // 5
```

This change to JavaScript's semantics may be the most significant change of all under strict mode. It probably won't break your code, but it should help you spot bugs caused by context loss much sooner.

### Forgetting to Use `this`

Consider the following code:

```js
function Child(age) {
  this.age = age;
};

Child.prototype.setAge = function(newAge) {
  age = newAge;
}

let leigh = new Child(5);
leigh.setAge(6);
console.log(leigh.age); // 5; expected 6
```

In this code, we forgot to use `this` on line 6 when we tried to assign a new age to the object. Instead of updating the `age` instance property on `leigh`, though, we created a global variable named `age`. Once again, strict mode comes to the rescue:

```js
"use strict";

function Child(age) {
  this.age = age;
};

Child.prototype.setAge = function(newAge) {
  age = newAge; // ReferenceError: age is not defined
}

let leigh = new Child(5);
leigh.setAge(6);
console.log(leigh.age);
```

### Leading Zeros

- Strict mode prevents numbers from beginning with `0` because don't want JS to interpret numbers as octal number. 

-  Strict mode also prevents any number literal from beginning with `0` or `-0` except for `0` itself (or `0` with a decimal component, e.g., `0.123`).

- Throws error if we use leading zeros.

  ```js
  // SyntaxError: Octal literals are not allowed in strict mode.
  ```

If you use a literal integer that begins with `0` but doesn't contain the digits `8` or `9`, sloppy mode JavaScript interprets it as an octal number:

```js
console.log(1234567);  // 1234567
console.log(01234567); // 342391 (the same as octal 0o1234567)
```

This behavior is often undesirable, though its less troublesome now that modern versions of JavaScript default to decimal when using `parseInt`. In some older versions, `parseInt("01234567")` would return `342391`, which could be a problem if the string came from an external source (such as the keyboard).

With strict mode, numbers that look like octal numbers raise an error:

```js
"use strict";

console.log(1234567);   // 1234567
console.log(0);         // This is okay
console.log(0.123);     // So is this
console.log(-0.123);    // So is this
console.log(01234567);  // SyntaxError: Octal literals are not allowed in strict mode.
console.log(089);       // SyntaxError: Numbers can't begin with 0
console.log(01.23);     // SyntaxError: Numbers can't begin with 0
console.log(-01234567); // SyntaxError: Octal literals are not allowed in strict mode.
console.log(-089);      // SyntaxError: Numbers can't begin with 0
console.log(-01.23);    // SyntaxError: Numbers can't begin with 0
```

Note that strict mode also prevents any number literal from beginning with `0` or `-0` except for `0` itself (or `0` with a decimal component, e.g., `0.123`).

### Other Strict Mode Differences

In addition to the changes described above, strict mode:

- (*) prevents you from using function declarations in blocks.
- (*) prevents declaring two properties with the same name in an object.
- prevents declaring two function <u>parameters</u> with the same name.
- prevents using some newer **reserved keywords**, such as `let` and `static`, as variable names.
- prevents you from using the `delete` operator on a variable name.
- forbids binding of `eval` and `arguments` in any way.
- disables access to some properties of the `arguments` object in functions.
- disables the `with` statement, a statement whose use is not recommended even in sloppy mode.

(*) These prohibitions were in effect for ES5, but both are now allowed. However, we recommend that you avoid declaring functions inside blocks and declaring multiple properties with the same name. ESLint will flag these problems.

## When Should I Use Strict Mode?

Use strict mode in any new code that you write. If you're adding new functions to an old codebase, it's safe to use function-level strict mode in the new functions, and you probably should do so. However, if you're not creating a new function in that old codebase, you probably shouldn't try to use strict mode. The changes in semantics, particularly those having to do with variable declarations, `this`, and silent failures, can easily break code that otherwise works well.

For brevity, most of the shorter examples in the rest of this course won't show the `"use strict";` pragma. We'll show the pragma in some longer examples as well as any code where the pragma is needed to run properly. You, however, should use the pragma in your code so you can get in the habit of using it.

## Practice Problem

If you haven't completed JS130 or JS225 yet, you may have a bit of trouble with this problem. Do the best you can, but don't spend a huge amount of time trying to fix everything.

The following code runs in sloppy mode:

```js
SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
RANKS = ["2", "3", "4", "5", "6", "7", "8", "9",
         "10", "Jack", "Queen", "King", "Ace"];

function createDeck() {
  allCards = () => {
    return this.SUITS.reduce((deck, suit) => {
      this.RANKS.forEach(rank => deck.push(`${rank} of ${suit}`));
      return deck;
    }, []);
  };

  deck = allCards();
  shuffle(deck);

  return deck;
}

function shuffle(deck) {
  for (counter = 0; counter < 0400; counter += 1) {
    randomIndex1 = randomCardIndex();
    randomIndex2 = randomCardIndex();
    tempCard = deck[randomIndex1];
    deck[randomIndex1] = deck[randomIndex2];
    deck[randomIndex2] = tempCard;
  }

  function randomCardIndex() {
    return Math.floor(Math.random() * this.deck.length);
  }
}

console.log(createDeck());
```

Rewrite this code to run in strict mode.

Solution

```js
"use strict";

const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9",
               "10", "Jack", "Queen", "King", "Ace"];

function createDeck() {
  const allCards = () => {
    return SUITS.reduce((deck, suit) => {
      RANKS.forEach(rank => deck.push(`${rank} of ${suit}`));
      return deck;
    }, []);
  };

  let deck = allCards();
  shuffle(deck);

  return deck;
}

function shuffle(deck) {
  for (let counter = 0; counter < 256; counter += 1) {
    let randomIndex1 = randomCardIndex();
    let randomIndex2 = randomCardIndex();
    let tempCard = deck[randomIndex1];
    deck[randomIndex1] = deck[randomIndex2];
    deck[randomIndex2] = tempCard;
  }

  function randomCardIndex() {
    return Math.floor(Math.random() * deck.length);
  }
}

console.log(createDeck());
```

We had to make several changes:

- Add the `"use strict"` pragma.
- Use `let` or `const` to declare all variables.
- Remove `this` from `this.RANKS`, `this.SUITS`, and `this.deck`.

If the original code didn't make you recoil in horror, it should have. Between the lack of variable declarations, the misuse of `this`, and the global `deck` variable, that code was a mess.

## Summary

In this assignment, we introduced strict mode and compared it with the traditional JavaScript semantics unofficially known as **sloppy** mode. You should use strict mode in any new code or functions that you write, but avoid using it when you're merely updating old code.

Semantic changes that occur in strict mode

In our discussion, we looked at some of the semantic changes that occur when using strict mode. In particular:

- You cannot create global variables implicitly.
- Functions won't use the global object as their implicit context.
- Forgetting to use `this` in a method raises an error.
- Leading zeros on numeric integers are illegal.

Strict mode makes other changes as well, but the above changes are the most important for most JavaScript developers.

Strict mode gets enabled automatically inside ES6 classes.

In the next assignment, we'll talk about closure.

------

# Closures

In this assignment, we'll learn about a crucial concept in JavaScript: closures. 

**Closures** let a function access a variable that was in lexical scope at the function's definition point even when that variable is no longer in scope. 

You may not realize it, but you've been using closures every time you've defined a function that accesses a variable from its outer scope.

## What to Focus On

Mastery of closures is essential. The concept is one of the most important in JavaScript. Once you have a firm grasp on variable scope, closures are conceptually simple. In practice, though, they can be tricky, especially if you think of them as a runtime feature. Technically, they are a mix of lexical and runtime features, but it's easier to understand them as a purely lexical feature for now. They're an artifact of the code's structure, not how the code runs.

You should focus on the following:

- What is a closure?
- What is in a closure?
- When is a closure created?
- What is the relationship between closures and scope?
- What do we mean when we say that closures are defined lexically?
- What is partial function application?

## A Brief Review of Scope

Before we dive into closures, let's take a few minutes to review scope. You may also want to review the More About Scope assignment earlier in this lesson.

By now, you're well-acquainted with scope. It's nearly impossible to program in any language without understanding how scope works in that language. You have to know what variables you can access from any point in your code, and perhaps more importantly, which ones you can't.

As you may recall, there are different terms we use when discussing scope. We're going to focus on lexical scope in this section.

Back in the [JS101 assignment on Variable Scope](https://launchschool.com/lessons/64655364/assignments/7c0087dd), we learned that code in a function's body could access variables declared in the function's surrounding scope. That is, a function has access to its **outer scope**. We also learned that variables declared within a function's body aren't accessible outside the function. Code that isn't part of the function body can't access variables declared in the function's **inner scope**.

Together, these behaviors mean that a function can access any variable in its inner or outer scope. This behavior follows lexical rules based on the structure of the code; you can see at a glance whether a variable is in scope at some point in the program:

```js
let foo0 = 1;
console.log(foo0);        // in scope
// console.log(foo1);     // not in scope; would fail
// console.log(foo2);     // not in scope; would fail
// console.log(foo3);     // not in scope; would fail

function bar1() {
  let foo1 = 2;
  console.log(foo0);      // in scope
  console.log(foo1);      // in scope
  // console.log(foo2);   // not in scope; would fail
  // console.log(foo3);   // not in scope; would fail

  function bar2() {
    let foo2 = 3;
    console.log(foo0);    // in scope
    console.log(foo1);    // in scope
    console.log(foo2);    // in scope
    // console.log(foo3); // not in scope; would fail
  }

  function bar3() {
    let foo3 = 4;
    console.log(foo0);    // in scope
    console.log(foo1);    // in scope
    // console.log(foo2); // not in scope; would fail
    console.log(foo3);    // in scope
  }
}
```

In this example, we can see that `foo0` in the outermost scope is available everywhere in the program, including the nested `bar2` and `bar3` functions; however, the remaining variables are not accessible. Similarly, `foo1` is available in the inner scopes of `bar1`, `bar2`, and `bar3`, but not from the outermost scope. Finally, `foo2` is available inside `bar2` and `foo3` is available inside `bar3`, but neither variable is accessible elsewhere.

##### Functions are also variables and have scope

Keep in mind that `bar1`, `bar2`, and `bar3` are variables as well. The scope of `bar1` is the same as `foo0`. Meanwhile, `bar2` and `bar3` have the same scope as `foo1`. That is, `bar1` is accessible everywhere, just like `foo0` is accessible everywhere. Similarly, both `bar2` and `bar3` are accessible from anywhere inside `bar1`, `bar2`, or `bar3`, just like `foo1` is accessible anywhere in `bar1`, `bar2`, or `bar3`. The idea that you can access a function's name from within that function may seem a little odd at first, but recall that functions can call themselves via [recursion](https://launchschool.com/books/javascript/read/loops_iterating#recursion). Thus, it makes sense that `bar1`, for instance, is in scope in the inner scope of `bar1`.

Note that hoisting plays a part in determining the scope of names. In our example, "bar2" and "bar3" are in scope everywhere inside "bar1" since function declarations get hoisted to the top of the enclosing scope. Since JavaScript hoists variable declarations, the name would still be in scope had we used function expressions. However, they would be unusable, uninitialized variables:

```js
// function declaration
function go1() {
  go2(); // go2 is in scope, initialized, and usable
  function go2() {
    console.log(go2);
  }
}
```

```js
// variable declaration with let
function go1() {
  go2(); // go2 is in scope but uninitialized and unusable --> throws ReferenceError
	// ReferenceError: Cannot access 'go2' before initialization
  let go2 = function() {
    console.log(go2);
  }
}
```

Thus, the second example above throws an error even though `go2` is in scope.

```js
// variable declaration with let
function go1() {
  go2(); // go2 is in scope but initialized to undefined --> throws a TypeError
  // TypeError: go2 is not a function
  var go2 = function() {
    console.log(go2);
  }
}
```

## Closures

Why spend so much time talking about scope when we're supposed to be learning about closures? What is a closure anyway?

The reason behind the discussion on scope is that closures and lexical scope are intimately related.

- Closures use the lexical scope in effect at a function's definition point to determine what variables that function can access. 
- What variables are in scope during a function's execution depend on the closure formed by the function's <u>definition.</u> 

It's somewhat circular reasoning, but it's impossible to separate the two.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) defines **closure** as "the combination of a function and the lexical environment within which that function was [defined]." You can think of closure as a function combined with any variables from its lexical scope that the function needs. In other words, if a function uses a variable that is not declared or initialized in that function, then that variable will be part of the closure (provided it exists).

> Note that the MDN definition of closure uses the term "declared" where we say "defined." Since closure occurs with both function declarations and function expressions, the term "declared" as used on MDN is incorrect. Please use our modified version of the quote.

Closures are created when you define a function or method. The closure essentially *closes over* its environment -- what's in lexical scope. In effect, the function definition and all the identifiers in its lexical scope become a single entity called a closure. When the function is invoked, it can access any variables it needs from that environment. That is, the function can use variables from the lexical scope where the function was defined. **Even if those variables aren't in the lexical scope where you invoke the function, it can still access them.**

Note that closures only close over the variables that the function needs. If the function uses the variable `foo`, but the outer scope contains both `foo` and `bar`, only `foo` will be included in the closure.

Wait a minute. How can you use variables that aren't in scope? Doesn't scope govern what variables you can use? Yes, that's true, but it's a little imprecise. When we say that a variable is no longer in scope, we mean that it isn't in scope at the point in your program where you invoke the function. However, closure and scope are lexical concepts. Where you invoke a function is unimportant; where you define the function is. A closure includes the variables it needs from the scope where you defined the function. Those variables may not be in scope when you invoke the function, but they're still available to the function.

##### Closure & Scope

- **Lexical scope**:  the ability for a function scope to access variables from the parent scope / Function has access to variables that are defined in its calling context. 

- Circular Reasoning: scope uses closure and closure uses lexical scope. 

  - Closures use the lexical scope in effect at a function's definition point to determine what variables that function can access. 

  - What variables are in scope during a function's execution depend on the closure formed by the function's <u>definition.</u> 


### Summary

##### Definition

- **Closure**: combination of function and lexical environment within which the function was [defined] in. 
- Closures are created when you define a function or method. 
  - Whenever you declare a new function and assign it to a variable, you store the function definition, *as well as a closure*. The closure contains all the variables that are in scope at the time of creation of the function.

- The closure essentially *closes over* its environment -- what's in lexical / surrounding scope. 
  - The function definition and all the identifiers in its lexical scope become a single entity called a closure.
  - Note that closures only close over the variables that the function needs. If the function uses the variable `foo`, but the outer scope contains both `foo` and `bar`, only `foo` will be included in the closure.
  - A closure includes the variables it needs from the scope **<u>where you defined</u>** the function. Those variables may not be in scope when you invoke the function, but they're still available to the function.
- When the function is invoked, it can access any variables it needs from that environment. That is, the function can use variables from the lexical scope where the function was defined.  
- **Even if those variables aren't in the lexical scope where you invoke the function, it can still access them.**
  - It's important to remember that closure definitions are purely lexical. Closures are based on your program's structure, not by what happens when you execute it. 
  - Even if you never call a particular function, that function forms a closure with its surrounding scope.

##### Why closures?


- Functions that return functions are perhaps the most powerful feature of closure in JavaScript.
  - Returning a function allows for private variables --> data protection. 
- Using closures to restrict data access. 

##### How can we use variables that aren't in scope?

- When we say that a variable is no longer in scope, we mean that it isn't in scope at the point in your program where you invoke the function. 
- However, closure and scope are lexical concepts. Where you invoke a function is unimportant; <u>where you define</u> the function is. 
- A closure includes the variables it needs from the scope where you defined the function. Those variables may not be in scope when you invoke the function, but they're still available to the function.

##### Current value of variable

- If a variable is in the closure, JS can follow the <u>pointer</u> and get the current value of the variable. 
- Value of variables are subject to change based on what function invocation does with it! 
  - The value of the variable of the function, depends on how that function was invoked. 
  - Sometimes two functions have separate local variables in their closures, sometimes two functions close over the same variable at same time, resulting in only one shared variable in their closures. 

### A Helpful Mental Model

Closures are defined when a function is defined. 

- When you define a function, JavaScript finds all of the variable names it needs from the lexical scope that contains the function definition. 
- It then takes those names and places them inside a special **"envelope" object** that it attaches to the function object. 
- Each name in the envelope is a <u>pointer to the original variable</u>, not the value it contains.
- When a function encounters a variable name during execution, JS first checks for local variables (variables in local scope ) by a given name, then it looks to the closure if it can't find it. 
  - Looking into closure means it peeks to see whether the variable is mentioned there. 
  - If it is, JS can follow the <u>pointer</u> and get the current value of the variable. 

Pointer to variables

- JS can internally point to variables.
- JS needs a pointer to variable so it can see changes made to what the variable references.

"Envelope" is not a term that you're likely to encounter elsewhere. It's just our word for how this mental model of closure works. We won't use it after the next assignment.

The phrase "pointer to the ... variable" may seem odd. We usually think of variables as pointers to objects, not as something that we can point to. We can point to the object that a variable references, but we can't point to the variable. That's the way JavaScript is defined. However, internally, [JavaScript] can do anything it needs to do, including pointing to variables. In this case, it needs a pointer to the variable so that it can see any changes made to what the variable references or contains:

```js
let numbers = [1, 2, 3];

function printNumbers() {
  console.log(numbers);
}

printNumbers(); // => [ 1, 2, 3 ]

numbers = [4, 5];
printNumbers(); // => [ 4, 5 ]
```

If the closure pointed to the value instead of the variable, it can't tell that we reassigned `numbers` on line 9. This is also true for primitive values: we need a pointer to the variable so the closure can see any changes.

```js
let number = 42;

function printNumber() {
  console.log(number);
}

printNumber(); // => 42

number = 3.1415;
printNumber(); // => 3.1415
```

We'll return to this concept in a few minutes.

When a function encounters a variable name during execution, it first looks inside its local scope for that name. If it can't find the name, it peeks inside the envelope to see whether the variable is mentioned there. If it is, JavaScript can follow the pointer and get the current value of the variable. 

In fact, this is how scope works in JavaScript: it first checks for local variables by a given name, then it looks to the closure if it can't find it. All that stuff about looking at outer scopes until you reach the global scope all happens when the closure is defined.

##### What about variables that are in scope when you invoke a function? 

- Can the function access them? If those variables were in scope at the definition point, then yes, it can. 
- However, if those variables weren't in scope when you <u>defined</u> the function, then the function cannot access them. They're not listed in the envelope since it was created when the function was defined. 
- Only variables that are in scope when you define the function are available to the function.

##### Diagram

Karis wrote a very short article on the envelope model of closure, complete with helpful diagrams. [Check it out!](

![img](https://miro.medium.com/max/1400/1*Hr7NK9J-74rv4_TRSTAxag.png)



### Examples of Closure

**Invoke a function in a way that lets it access something that isn't in scope**. 

Okay, then, how can we invoke a function in a way that lets it access something that isn't in scope? Recall that, in JavaScript, functions are first-class objects. We can assign them to variables, pass them as function arguments, and use them as function return values. That means that we don't have to execute a function in the same scope in which we defined it; we can call it from a completely different part of the program. This is easiest to see with a higher-order function that returns a function object. For instance:

##### Example: higher- order function that returns a function object

Functions that return functions are perhaps the most powerful feature of closure in JavaScript.

```js
function foo() {
  let name = "Pete";
  return function() {
    console.log(name);
  };
}

let printPete = foo();
printPete(); // Pete
```

In this example, we first call `foo` and capture its return value, a function that logs the value of the `name` variable defined in the lexical scope of `foo`. At a minimum, the closure formed by the returned function's definition contains a pointer to `name` in its envelope. That pointer means that `name`'s value won't get discarded when `foo` is done.

Though `name` is out of scope when `foo` finishes, the returned function has an envelope that contains a pointer to `name`. Thus, the function can still follow the pointer to the original variable, and find its current value, and that lets `printPete()` print `Pete'.

##### Simple example: 

function accessing variable from surrounding scope 

- Is an example of closure but not a risky one because many developers see this as a pure scoping issue.
- Even at Launch School, we may not accept an example that can be explained entirely with scope. Be safe and use a more complete example, one that brings closure into it.

Let's consider a simpler example of closure:

```js
let counter = 0;

function incrementCounter() {
  counter += 1;
}

incrementCounter();
incrementCounter();
console.log(counter); // 2
```

At first glance, this code seems to illustrate variable scope: a function can access a variable in its surrounding scope. However, the reason why it can do that is that the function definition forms a closure that includes the variables it needs from the outer scope: namely, `counter`. Thus, `incrementCounter` can access and update the `counter` variable.

If a job interviewer asks you to provide an example of closure, this simple example may be a risky choice. Many JavaScript developers see this as a pure scoping issue. However, it really is closure at work, just in an unfamiliar context for some developers. If you use an example like this one, you may be challenged on it. You will have to defend your statement that it really is a closure. If your explanation isn't accepted, you may be in a spot of trouble.

Even at Launch School, we may not accept an example that can be explained entirely with scope. Be safe and use a more complete example, such as the next one below. There's no way to explain the behavior in that code by relying entirely on scope. You have to bring closure into it.

A closure is not a snapshot of the program state. As we saw a little earlier, each time you invoke a function, it sees the most recent values of the variables in its envelope. Thus, if a variable's value changes, the closure ensures that the function sees the new value, not the old one. Thus, `incrementCounter` increments the `counter` variable from `1` to `2` during its second invocation.

In most programs, you would probably return the `incrementCounter` function from another function:

```js
function makeCounter() {
  let counter = 0;

  return function() {
    counter += 1;
    return counter;
  }
}

let incrementCounter = makeCounter();
console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 2
```

Note that `counter` is now a private variable in the sense that we can not access it directly. The only way to determine its value is to call the function that `makeCounter` returns, but that also increments the variable. This form of data protection is a big reason why returning a function from another function is so powerful.

##### Example: create two functions from a higher-order function

What happens if we create two functions from `makeCounter`?

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

console.log(incrementCounter1()); // 1
console.log(incrementCounter1()); // 2
console.log(incrementCounter1()); // 3

console.log(incrementCounter2()); // 1
console.log(incrementCounter2()); // 2

console.log(incrementCounter1()); // 4
```

As you can see, each of the closures (from the two created functions) gets its own copy of `counter`. This happens because each invocation of `makeCounter` creates a new local variable named `counter`. Thus, each returned closure has its own variable.

##### Example: two functions that close over same variable at same time

Let's look at a more subtle example. What happens if we return two functions that close over the same variable at the same time?

```js
function makeCounter() {
  let counter = 0;

  const fun1 = function() {
    counter += 1;
    return counter;
  }

  const fun2 = function() {
    counter += 2;
    return counter;
  }

  return [fun1, fun2];
}

let funs = makeCounter();
let fun1 = funs[0];
let fun2 = funs[1];
console.log(fun1()); // 1
console.log(fun2()); // 3
```

Here, both of the functions returned by `makeCounter` close over the same `counter` variable, so they share it. On line 20, we call the first function, which increments `counter` by 1. On line 21, we increment that same counter by 2, so the result is 3.

Let's look at one final example:

```js
let oddNumbers = [];
let array = [1, 2, 3, 4, 5, 6, 7];
array.forEach(number => {
  if (number % 2 === 1) {
    oddNumbers.push(number);
  }
});
```

You've seen code like this before. It may not be obvious, but you're using closure when you pass the callback function to `Array.prototype.forEach`. The callback gets invoked somewhere in the heart of JavaScript's implementation of `forEach`. However, it still has access to the `oddNumbers` array since the callback forms a closure with its surrounding scope. The closure also provides access to `array` though the callback doesn't use it in this example.

It's important to remember that closure definitions are purely lexical. Closures are based on your program's structure, not by what happens when you execute it. Even if you never call a particular function, that function forms a closure with its surrounding scope.

##### practice problem: When closure plays no part 

```js
function makeCounter() {
  return function() {
    let counter = 0;
    counter += 1;
    return counter;
  }
}

let incrementCounter = makeCounter();
console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 1

incrementCounter = makeCounter();
console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 1
```

All four `console.log` calls print `1`. Since `counter` is declared and initialized in the function returned by `makeCounter`, closure plays no part in its execution. Instead, `counter` gets created and initialized to `0` each time we call `incrementCounter`.

## Partial Function Application

In the last section, we saw several ways in which closures play a part in our programs. Let's take a brief look at a more useful application of closures.

Consider the following code:

```js
function add(first, second) {
  return first + second;
}

function makeAdder(firstNumber) {
  return function(secondNumber) {
    return add(firstNumber, secondNumber);
  };
}

let addFive = makeAdder(5);
let addTen = makeAdder(10);

console.log(addFive(3));  // 8
console.log(addFive(55)); // 60
console.log(addTen(3));   // 13
console.log(addTen(55));  // 65
```

In this program, the `makeAdder` function creates and returns a new function that, in turn, calls and returns the return value of calling `add` with two arguments. What's interesting here is that we define the first number when we call `makeAdder`. We don't provide the second number until later when we call the function that `makeAdder` returns.

A function such as `makeAdder` is said to use **partial function application**. It applies some of the function's arguments (the `add` function's `first` argument here) when called, and applies the remaining arguments when you call the returned function. Partial function application refers to the creation of a function that can call a second function with fewer arguments than the second function expects. The created function applies the remaining arguments.

Partial function application is most useful when you need to pass a function to another function that won't call the passed function with enough arguments. It lets you create a function that fills in the gaps by applying the missing elements. For instance, suppose you have a function that downloads an arbitrary file from the Internet. The download may fail, so the function also expects a callback function that it can call when an error occurs:

```js
function download(locationOfFile, errorHandler) {
  // try to download the file
  if (gotError) {
    errorHandler(reasonCode);
  }
}

function errorDetected(url, reason) { // this function is passed to download
  // handle the error
}

download("https://example.com/foo.txt", /* ??? */);
```

Our error handling function, `errorDetected`, takes two arguments, but `download` only passes one argument to the error handler. Suppose the `download` function is part of a 3rd party library that you can't modify. You can turn to partial function application to get around the single-argument limitation:

```js
function download(locationOfFile, errorHandler) {
  // try to download the file
  if (gotError) {
    errorHandler(reasonCode);
  }
}

function errorDetected(url, reason) { 
  // handle the error
}

function makeErrorHandlerFor(locationOfFile) {
  return function(reason) {
    errorDetected(locationOfFile, reason);
  };
}

let url = "https://example.com/foo.txt";
download(url, makeErrorHandlerFor(url));
```

The `download` function now calls the partially applied function returned by `makeErrorHandlerFor`, and `errorDetected` gets both arguments it needs.

In this simple example, partial function application may be overkill. However, if you need to use `errorDetected` in several different locations, partial function application can save you a lot of time and effort. You don't have to create an error handler function for each situation.

Rather than creating a `makeErrorHandlerFor` function, you can use `bind` to perform partial function application. In most cases, `bind` is all you need.

```js
let url = "https://example.com/foo.txt";
download(url, errorDetected.bind(null, url));
```

You may encounter the term **partial function** as an alternative to *partial function application* or *partially applied function*. In some cases, this usage may refer to partial function application, but it can also refer to a completely different and unrelated concept. Try not to get confused by this verbal similarity.

##### My Notes

Definition

- **Partial function application** refers to the creation of a function that can call a second function, with fewer arguments than the second function expects. The created function applies the remaining arguments [ when it is called, by calling on the second function which expects more arguments]. 

  - To clarify: the created function expects fewer arguments than the second function that it calls. 
  - In other words: The created function calls the second function with more arguments than the created function itself expects.
  - Partial function application requires a reduction in the **number of arguments** you have to provide when you call a function.
  - Partial function application is most useful when you need to pass a function to another function that won't call the passed function with enough arguments. It lets you create a function that fills in the gaps by applying the missing elements. (Example 2).
  - Also useful when you need to call a function many times with the same arguments.

- Example 1

  - `makeAdder` creates a [return] function that only expects one argument, yet the created return function calls another function `add` with two arguments. The function `makeAdder` creates & returns is a **partially applied function.** 
  - `makeAdder` is said to use **partial function application**. It applies some of the function's arguments (the `add` function's `first` argument here) when called, and applies the remaining arguments when you call the returned function. 

  ```js
  function add(first, second) {
    return first + second;
  }
  
  function makeAdder(firstNumber) {
    return function(secondNumber) {
      return add(firstNumber, secondNumber);
    };
  }
  
  let addFive = makeAdder(5);
  let addTen = makeAdder(10);
  
  console.log(addFive(3));  // 8
  console.log(addFive(55)); // 60
  console.log(addTen(3));   // 13
  console.log(addTen(55));  // 65
  ```

- Example 2 : 

  -  Suppose you have a function that downloads an arbitrary file from the Internet. The download may fail, so the function also expects a callback function that it can call when an error occurs. 

  ```js
  function download(locationOfFile, errorHandler) {
    // try to download the file
    if (gotError) {
      errorHandler(reasonCode); // errorHandler isn't passed enough arguments
    }
  }
  
  function errorDetected(url, reason) { 
    // handle the error
  }
  
  download("https://example.com/foo.txt", /* ??? */);
  ```

  - `errorDetected` is supposed to be passed as argument to function `download` for its `errorHandler` parameter. Problem is, `errorHandler` isn't passed enough arguments.
  - Our error handling function, `errorDetected`, takes two arguments, but `download` only passes one argument to the error handler. 
  - Suppose the `download` function is part of a 3rd party library that you can't modify. You can turn to partial function application to get around the single-argument limitation:

  ```js
  function download(locationOfFile, errorHandler) {
    // try to download the file
    if (gotError) {
      errorHandler(reasonCode);
    }
  }
  
  function errorDetected(url, reason) { 
    // handle the error
  }
  
  function makeErrorHandlerFor(locationOfFile) {
    return function(reason) {
      errorDetected(locationOfFile, reason);
    };
  }
  
  let url = "https://example.com/foo.txt";
  download(url, makeErrorHandlerFor(url));
  ```

  - The `download` function now calls the partially applied function returned by `makeErrorHandlerFor`, and `errorDetected` gets both arguments it needs.
  - `makeErrorHandlerFor` creates a partially applied function. `makeErrorHandlerFor` uses partial function application because creates and returns a new function that only takes one argument `reason`, yet that new function calls on another function with more arguments (`locationOfFile` and `reason`)than supplied to that new [returned] function. 

##### `bind` partial function application

- Use `bind` to perform partial function application

  - Reminder: The **`bind()`** method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

  - Reminder: Partial function application refers to the creation of a function that can call a second function, with fewer arguments than the second function expects.

  -  `bind` performs partial function application by creating a new function that will call on the original function. The original function will be permanently called with previously given argument(s)  preceding any newly provided arguments. 
    
    - The original function is the "second function" and it expects more arguments than the new function. 
    
    > The built-in `Function.prototype.bind` method performs partial function application by allowing you to specify some of the function's arguments when you invoke `bind`. It also permanently binds the new function to a specific execution context with its first argument. That binding is, in a sense, also an example of partial function application.
    
  - Rather than creating a `makeErrorHandlerFor` function, you can use `bind` to perform partial function application. In most cases, `bind` is all you need.

  ```js
  let url = "https://example.com/foo.txt";
  download(url, errorDetected.bind(null, url));
  ```


------

### Recognizing Partial Function Application

Partial function application requires a reduction in the **number of arguments** you have to provide when you call a function. If the number of arguments isn't reduced, it isn't partial function application. For instance, consider this code:

```js
function makeLogger(identifier) {
  return function(msg) {
    console.log(identifier + ' ' + msg);
  };
}
```

Here, `console.log` takes exactly one argument and the function returned by `makeLogger` also takes exactly one argument. Since there is no difference in the number of arguments, we don't have partial function application.

However, if we change the code to use two arguments when calling `console.log`, we do have partial function application:

```js
function makeLogger(identifier) {
  return function(msg) { // created function --> partially applied function
    console.log(identifier, msg); // the second function it calls. 
  };
}
```

In this case, we only need to pass one argument to the function returned by `makeLogger`. That function, in turn, calls `console.log` with two arguments, so it is partial function application.

## What are Closures Good For?

We've seen several examples in this assignment, including callbacks, partial function application, and creating private data. In addition, here are some other things made possible by closures: we'll meet most (but not all) of these later in the curriculum:

- Currying (a special form of partial function application)
- Emulating private methods
- Creating functions that can only be executed once
- Memoization (avoiding repetitive resource-intensive operations)
- Iterators and generators
- The module pattern (putting code and data into modules)
- Asynchronous operations

## Optional Reading



If you're feeling a little uncertain about closures, we've found an article that may help. In [I never understood JavaScript closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8), the author walks you through all the steps in understanding closure.

The author claims that his final example is partial function application, but it doesn't quite fit with our definition. You can ignore that.

The author also uses the term "backpack" for what we call an envelope.

Also, he sometimes uses *argument* and *parameter* interchangeably.

##### Before we start

Some concepts are important to grok before you can grok closures. One of them is the *execution context*.

[This article](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/) has a very good primer on Execution Context. To quote the article:

> When code is run in JavaScript, the environment in which it is executed is very important, and is evaluated as 1 of the following:
>
> **Global code** — The default environment where your code is executed for the first time.
>
> **Function code** — Whenever the flow of execution enters a function body.
>
> (…)
>
> (…), let’s think of the term `execution context` as the environment / scope the current code is being evaluated in.

In other words, as we start the program, we start in the global execution context. Some variables are declared within the global execution context. We call these global variables. When the program calls a function, what happens? A few steps:

1. JavaScript creates a new execution context, a local execution context.
2. That local execution context will have its own set of variables, these variables will be local to that execution context.
3. The new execution context is thrown onto the *execution stack*. Think of the execution stack as a mechanism to keep track of where the program is in its execution.

When does the function end? When it encounters a `return` statement or it encounters a closing bracket `}`. When a function ends, the following happens:

1. The local execution contexts pops off the execution stack

2. The functions sends the return value back to the calling context. The calling context is the execution context that called this function, it could be the global execution context or another local execution context. It is up to the calling execution context to deal with the return value at that point. The returned value could be an object, an array, a function, a boolean, anything really. If the function has no `return` statement, `undefined` is returned.

3. The local execution context is destroyed. This is important. Destroyed. All the variables that were declared within the local execution context are erased. They are no longer available. That’s why they’re called local variables.

   (What if two functions close over same variable? is the local variable destroyed before second function is invoked.)

##### A very basic example

Before we get to closures, let’s take a look at the following piece of code. It seems very straightforward, anybody reading this article probably knows exactly what it does.

```js
let a = 3;
function addTwo(x) {
	let ret = x + 2;
  return ret;
}
let b = addTwo(a);
console.log(b);
```

In order to understand how the JavaScript engine really works, let’s break this down in great detail.

1. On line 1 we declare a new variable `a` in the global execution context and assign it the number `3`.
2. Next it gets tricky. Lines 2 through 5 are really together. What happens here? We declare a new variable named `addTwo` in the global execution context. And what do we assign to it? A function definition. Whatever is between the two brackets `{ }` is assigned to `addTwo`. The code inside the function is not evaluated, not executed, just stored into a variable for future use.
3. So now we’re at line 6. It looks simple, but there is much to unpack here. First we declare a new variable in the global execution context and label it `b`. As soon as a variable is declared it has the value of `undefined`.
4. Next, still on line 6, we see an assignment operator. We are getting ready to assign a new value to the variable `b`. Next we see a function being called. When you see a variable followed by round brackets `(…)`, that’s the signal that a function is being called. Flash forward, every function returns something (either a value, an object or `undefined`). Whatever is returned from the function will be assigned to variable `b`.
5. But first we need to call the function labeled `addTwo`. JavaScript will go and look in its *global* execution context memory for a variable named `addTwo`. Oh, it found one, it was defined in step 2 (or lines 2–5). And lo and behold variable `addTwo` contains a function definition. Note that the variable `a` is passed as an argument to the function. JavaScript searches for a variable `a` in its *global* execution context memory, finds it, finds that its value is `3` and passes the number `3` as an argument to the function. Ready to execute the function.
6. Now the execution context will switch. A new local execution context is created, let’s name it the ‘addTwo execution context’. The execution context is pushed onto the call stack. What is the first thing we do in the local execution context?
7. You may be tempted to say, “A new variable `ret` is declared in the *local* execution context”. That is not the answer. The correct answer is, we need to look at the parameters of the function first. A new variable `x` is declared in the local execution context. And since the value `3` was passed as an argument, the variable x is assigned the number `3`.
8. The next step is: A new variable `ret` is declared in the *local* execution context. Its value is set to undefined. (line 3)
9. Still line 3, an addition needs to be performed. First we need the value of `x`. JavaScript will look for a variable `x`. It will look in the local execution context first. And it found one, the value is `3`. And the second operand is the number`2`. The result of the addition (`5`) is assigned to the variable `ret`.
10. Line 4. We return the content of the variable `ret`. Another lookup in the *local* execution context. `ret` contains the value `5`. The function returns the number `5`. And the function ends.
11. Lines 4–5. The function ends. The local execution context is destroyed. The variables `x` and `ret` are wiped out. They no longer exist. The context is popped of the call stack and the return value is returned to the calling context. In this case the calling context is the global execution context, because the function `addTwo` was called from the global execution context.
12. Now we pick up where we left off in step 4. The returned value (number `5`) gets assigned to the variable `b`. We are still at line 6 of the little program.
13. I am not going into detail, but in line 7, the content of variable `b` gets printed in the console. In our example the number `5`.

That was a very long winded explanation for a very simple program, and we haven’t even touched upon closures yet. We will get there I promise. But first we need to take another detour or two.

##### Lexical scope.

We need to understand some aspects of lexical scope. Take a look at the following example.

```
1: let val1 = 2
2: function multiplyThis(n) {
3:   let ret = n * val1
4:   return ret
5: }
6: let multiplied = multiplyThis(6)
7: console.log('example of scope:', multiplied)
```

The idea here is that we have variables in the local execution context and variables in the global execution context. One intricacy of JavaScript is how it looks for variables. If it can’t find a variable in its *local* execution context, it will look for it in *its* calling context. And if not found there in *its* calling context. Repeatedly, until it is looking in the *global* execution context. (And if it does not find it there, it’s `undefined`). Follow along with the example above, it will clarify it. If you understand how scope works, you can skip this.

1. Declare a new variable `val1 `in the global execution context and assign it the number `2`.
2. Lines 2–5. Declare a new variable `multiplyThis `and assign it a function definition.
3. Line 6. Declare a new variable `multiplied `in the global execution context.
4. Retrieve the variable `multiplyThis `from the global execution context memory and execute it as a function. Pass the number `6 `as argument.
5. New function call = new execution context. Create a new local execution context.
6. In the local execution context, declare a variable `n `and assign it the number 6.
7. Line 3. In the local execution context, declare a variable `ret`.
8. Line 3 (continued). Perform an multiplication with two operands; the content of the variables `n` and `val1`. Look up the variable `n` in the local execution context. We declared it in step 6. Its content is the number `6`. Look up the variable `val1` in the local execution context. The local execution context does not have a variable labeled `val1`. Let’s check the calling context. The calling context is the global execution context. Let’s look for `val1` in the global execution context. Oh yes, it’s there. It was defined in step 1. The value is the number `2`.
9. Line 3 (continued). Multiply the two operands and assign it to the `ret` variable. 6 * 2 = 12. `ret` is now `12`.
10. Return the `ret` variable. The local execution context is destroyed, along with its variables `ret` and `n`. The variable `val1 `is not destroyed, as it was part of the global execution context.
11. Back to line 6. In the calling context, the number `12` is assigned to the `multiplied `variable.
12. Finally on line 7, we show the value of the `multiplied` variable in the console.

So in this example, we need to remember that a function has access to variables that are defined in its calling context. The formal name of this phenomenon is the lexical scope.

##### A function that returns a function

In the first example the function `addTwo` returns a number. Remember from earlier that a function can return anything. Let’s look at an example of a function that returns a function, as this is essential to understand closures. Here is the example that we are going to analyze.

```
 1: let val = 7
 2: function createAdder() {
 3:   function addNumbers(a, b) {
 4:     let ret = a + b
 5:     return ret
 6:   }
 7:   return addNumbers
 8: }
 9: let adder = createAdder()
10: let sum = adder(val, 8)
11: console.log('example of function returning a function: ', sum)
```

Let’s go back to the step-by-step breakdown.

1. Line 1. We declare a variable `val` in the global execution context and assign the number `7` to that variable.
2. Lines 2–8. We declare a variable named `createAdder` in the global execution context and we assign a function definition to it. Lines 3 to 7 describe said function definition. As before, at this point, we are not jumping into that function. We just store the function definition into that variable (`createAdder`).
3. Line 9. We declare a new variable, named `adder`, in the global execution context. Temporarily, `undefined` is assigned to `adder`.
4. Still line 9. We see the brackets `()`; we need to execute or call a function. Let’s query the global execution context’s memory and look for a variable named `createAdder`. It was created in step 2. Ok, let’s call it.
5. Calling a function. Now we’re at line 2. A new local execution context is created. We can create local variables in the new execution context. The engine adds the new context to the call stack. The function has no arguments, let’s jump right into the body of it.
6. Still lines 3–6. We have a new function declaration. We create a variable `addNumbers` in the local execution context. This important. `addNumbers` exists only in the local execution context. We store a function definition in the local variable named `addNumbers`.
7. Now we’re at line 7. We return the content of the variable `addNumbers`. The engine looks for a variable named `addNumbers` and finds it. It’s a function definition. Fine, a function can return anything, including a function definition. So we return the definition of `addNumbers`. Anything between the brackets on lines 4 and 5 makes up the function definition. We also remove the local execution context from the call stack.
8. Upon `return`, the local execution context is destroyed. The `addNumbers` variable is no more. The function definition still exists though, it is returned from the function and it is assigned to the variable `adder`; that is the variable we created in step 3.
9. Now we’re at line 10. We define a new variable `sum` in the global execution context. Temporary assignment is `undefined`.
10. We need to execute a function next. Which function? The function that is defined in the variable named `adder`. We look it up in the global execution context, and sure enough we find it. It’s a function that takes two parameters.
11. Let’s retrieve the two parameters, so we can call the function and pass the correct arguments. The first one is the variable `val`, which we defined in step 1, it represents the number `7`, and the second one is the number `8`.
12. Now we have to execute that function. The function definition is outlined lines 3–5. A new local execution context is created. Within the local context two new variables are created: `a` and `b`. They are respectively assigned the values `7` and `8`, as those were the arguments we passed to the function in the previous step.
13. Line 4. A new variable is declared, named `ret`. It is declared in the local execution context.
14. Line 4. An addition is performed, where we add the content of variable `a` and the content of variable `b`. The result of the addition (`15`) is assigned to the `ret` variable.
15. The `ret` variable is returned from that function. The local execution context is destroyed, it is removed from the call stack, the variables `a`, `b` and `ret` no longer exist.
16. The returned value is assigned to the `sum` variable we defined in step 9.
17. We print out the value of `sum` to the console.

As expected the console will print 15. We really go through a bunch of hoops here. I am trying to illustrate a few points here. First, a function definition can be stored in a variable, the function definition is invisible to the program until it gets called. Second, every time a function gets called, a local execution context is (temporarily) created. That execution context vanishes when the function is done. A function is done when it encounters `return` or the closing bracket `}`.

##### Finally, a closure

Take a look a the next code and try to figure out what will happen.

```js
function createCounter() {
	let counter = 0;
	const myFunction = function() {
    counter = counter + 1
		return counter;
	}
	return myFunction;
}
const increment = createCounter();
const c1 = increment();
const c2 = increment();
const c3 = increment()
console.log('example increment', c1, c2, c3);
```

Now that we got the hang of it from the previous two examples, let’s zip through the execution of this, as we expect it to run.

1. Lines 1–8. We create a new variable `createCounter` in the global execution context and it get’s assigned function definition.
2. Line 9. We declare a new variable named `increment` in the global execution context..
3. Line 9 again. We need call the `createCounter` function and assign its returned value to the `increment` variable.
4. Lines 1–8 . Calling the function. Creating new local execution context.
5. Line 2. Within the local execution context, declare a new variable named `counter`. Number `0` is assigned to `counter`.
6. Line 3–6. Declaring new variable named `myFunction`. The variable is declared in the local execution context. The content of the variable is yet another function definition. As defined in lines 4 and 5.
7. Line 7. Returning the content of the `myFunction` variable. Local execution context is deleted. `myFunction` and `counter` no longer exist. Control is returned to the calling context.
8. Line 9. In the calling context, the global execution context, the value returned by `createCounter` is assigned to `increment`. The variable increment now contains a function definition. The function definition that was returned by `createCounter`. It is no longer labeled `myFunction`, but it is the same definition. Within the global context, it is labeled`increment`.
9. Line 10. Declare a new variable (`c1`).
10. Line 10 (continued). Look up the variable `increment`, it’s a function, call it. It contains the function definition returned from earlier, as defined in lines 4–5.
11. Create a new execution context. There are no parameters. Start execution the function.
12. Line 4. `counter = counter + 1`. Look up the value `counter` in the local execution context. We just created that context and never declare any local variables. Let’s look in the global execution context. No variable labeled `counter` here. Javascript will evaluate this as `counter = undefined + 1`, declare a new local variable labeled `counter` and assign it the number `1`, as `undefined` is sort of `0`.
13. Line 5. We return the content of `counter`, or the number `1`. We destroy the local execution context, and the `counter` variable.
14. Back to line 10. The returned value (`1`) gets assigned to `c1`.
15. Line 11. We repeat steps 10–14, `c2` gets assigned `1` also.
16. Line 12. We repeat steps 10–14, `c3` gets assigned `1` also.
17. Line 13. We log the content of variables `c1`, `c2` and `c3`.

Try this out for yourself and see what happens. You’ll notice that it is not logging `1`, `1`, and `1` as you may expect from my explanation above. Instead it is logging `1`, `2` and `3`. So what gives?

Somehow, the increment function remembers that `counter `value. How is that working?

Is `counter `part of the global execution context? Try `console.log(counter)` and you’ll get `undefined`. So that’s not it.

Maybe, when you call `increment`, somehow it goes back to the the function where it was created (`createCounter`)? How would that even work? The variable `increment` contains the function definition, not where it came from. So that’s not it.

So there must be another mechanism. **The Closure.** We finally got to it, the missing piece.

Here is how it works. Whenever you declare a new function and assign it to a variable, you store the function definition, *as well as a closure*. The closure contains all the variables that are in scope at the time of creation of the function. It is analogous to a backpack. A function definition comes with a little backpack. And in its pack it stores all the variables that were in scope at the time that the function definition was created.

So our explanation above was *all wrong*, let’s try it again, but correctly this time.

```
1: function createCounter() {
 2:   let counter = 0
 3:   const myFunction = function() {
 4:     counter = counter + 1
 5:     return counter
 6:   }
 7:   return myFunction
 8: }
 9: const increment = createCounter()
10: const c1 = increment()
11: const c2 = increment()
12: const c3 = increment()
13: console.log('example increment', c1, c2, c3)
```

1. Lines 1–8. We create a new variable `createCounter` in the global execution context and it get’s assigned function definition. Same as above.
2. Line 9. We declare a new variable named `increment` in the global execution context. Same as above.
3. Line 9 again. We need call the `createCounter` function and assign its returned value to the `increment` variable. Same as above.
4. Lines 1–8 . Calling the function. Creating new local execution context. Same as above.
5. Line 2. Within the local execution context, declare a new variable named `counter`. Number `0` is assigned to `counter`. Same as above.
6. Line 3–6. Declaring new variable named `myFunction`. The variable is declared in the local execution context. The content of the variable is yet another function definition. As defined in lines 4 and 5. Now we also create a *closure* and include it as part of the function definition. The closure contains the variables that are in scope, in this case the variable `counter` (with the value of `0`).
7. Line 7. Returning the content of the `myFunction` variable. Local execution context is deleted. `myFunction` and `counter` no longer exist. Control is returned to the calling context. So we are returning the function definition *and its closure*, the backpack with the variables that were in scope when it was created.
8. Line 9. In the calling context, the global execution context, the value returned by `createCounter` is assigned to `increment`. The variable increment now contains a function definition (and closure). The function definition that was returned by `createCounter`. It is no longer labeled `myFunction`, but it is the same definition. Within the global context, it is called `increment`.
9. Line 10. Declare a new variable (`c1`).
10. Line 10 (continued). Look up the variable `increment`, it’s a function, call it. It contains the function definition returned from earlier, as defined in lines 4–5. (and it also has a backpack with variables)
11. Create a new execution context. There are no parameters. Start execution the function.
12. Line 4. `counter = counter + 1`. We need to look for the variable `counter`. Before we look in the *local* or *global* execution context, let’s look in our backpack. Let’s check the closure. Lo and behold, the closure contains a variable named `counter`, its value is `0`. After the expression on line 4, its value is set to `1`. And it is stored in the backpack again. The closure now contains the variable `counter` with a value of `1`.
13. Line 5. We return the content of `counter`, or the number `1`. We destroy the local execution context.
14. Back to line 10. The returned value (`1`) gets assigned to `c1`.
15. Line 11. We repeat steps 10–14. This time, when we look at our closure, we see that the `counter` variable has a value of 1. It was set in step 12 or line 4 of the program. Its value gets incremented and stored as `2` in the closure of the increment function. And `c2` gets assigned `2`.
16. Line 12. We repeat steps 10–14, `c3` gets assigned `3`.
17. Line 13. We log the content of variables `c1`, `c2` and `c3`.

So now we understand how this works. The key to remember is that when a function gets declared, it contains a function definition and a closure. The closure is a collection of all the variables in scope at the time of creation of the function.

You may ask, does any function has a closure, even functions created in the global scope? The answer is yes. Functions created in the global scope create a closure. But since these functions were created in the global scope, they have access to all the variables in the global scope. And the closure concept is not really relevant.

When a function returns a function, that is when the concept of closures becomes more relevant. The returned function has access to variables that are not in the global scope, but they solely exist in its closure.

##### Not so trivial closures

Sometimes closures show up when you don’t even notice it. You may have seen an example of what we call partial application. Like in the following code.

```
let c = 4
const addX = x => n => n + x
const addThree = addX(3)
let d = addThree(c)
console.log('example partial application', d)
```

In case the arrow function throws you off, here is the equivalent.

```
let c = 4
function addX(x) {
  return function(n) {
     return n + x
  }
}
const addThree = addX(3)
let d = addThree(c)
console.log('example partial application', d)
```

We declare a generic adder function `addX` that takes one parameter (`x`) and returns another function.

The returned function also takes one parameter and adds it to the variable `x`.

The variable `x` is part of the closure. When the variable `addThree` gets declared in the local context, it is assigned a function definition and a closure. The closure contains the variable `x`.

So now when `addThree` is called and executed, it has access to the variable `x` from its closure and the variable `n` which was passed as an argument and is able to return the sum.

In this example the console will print the number `7`.

![img](https://miro.medium.com/max/1400/1*ZrJKJqBsksWd-8uKM9OvgA.png)

##### Conclusion

The way I will always remember closures is through **the backpack analogy**. When a function gets created and passed around or returned from another function, it carries a backpack with it. And in the backpack are all the variables that were in scope when the function was declared.

> *If you enjoyed reading this, don’t forget the applause. 👏*
> Thank you.

## Intertwine of concepts( my notes)

##### Closure & Scope

- **Lexical scope**:  the ability for a function scope to access variables from the parent scope / Function has access to variables that are defined in its calling context. 

- Circular Reasoning: scope uses closure and closure uses lexical scope. 

  - Closures use the lexical scope in effect at a function's definition point to determine what variables that function can access. 

  - What variables are in scope during a function's execution depend on the closure formed by the function's <u>definition.</u> 

##### Closure & Execution Context

- When a function is called, JS creates a new execution context, a local execution context with its own set of local variables. 
- When the function finishes running (hits a `return` statement or returns `undefined` ), the local execution context object is destroyed, and local variables that were declared are erased. 
- $very time a function gets called, a local execution context is (temporarily) created. That execution context vanishes when the function is done. A function is done when it encounters `return` or the closing bracket `}`.

##### Scope & Execution Context

- **Lexical scope**:  the ability for a function scope to access variables from the parent scope / Function has access to variables that are defined in its calling context. 

- Fundamentally, **scope is function-based while context is object-based**. 
- In other words, scope pertains to the variable access of a function when it is invoked and is unique to each invocation. Context is always the value of the this keyword, which is a reference to the object that “owns” the currently executing code.

##### Scope & Execution Context & Closure

- In other words, a closure gives you access to an outer function's scope from an inner function. 
- Closure is a function that allows you to access to the parent function scope, even though it's been removed from the execution context stack.

## Summary

In this assignment, we've introduced the crucial concept of closures. Though closures and scope are distinct concepts, closures are entangled intimately with scope. You can understand scope well enough to use it without understanding closures, but a complete understanding requires understanding both.

We also learned about partial function application, a technique that can be useful when you need to call a function many times with the same arguments.

In our next assignment, we'll give you some practice working with closures. Afterward, we'll learn how to leverage closures to define private data and methods in objects.

------

# Practice Problems: Closures

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

   ```
   1
   2
   3
   4
   ```

   The four `console.log` calls print `1`, `2`, `3`, and `4` respectively. Since `counter` has global scope, its value gets set to `0` only once, and closure ensures that the function returned by `makeCounter` contains an envelope[object] with a pointer to that variable. Each invocation of `incrementCounter` assigns `counter` to a new value that is the previous value plus 1.

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

   ```
   1
   1
   1
   1
   ```

   All four `console.log` calls print `1`. Since `counter` is declared and initialized in the function returned by `makeCounter`, closure plays no part in its execution. Instead, `counter` gets created and initialized to `0` each time we call `incrementCounter`.

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

   ```
   1
   2
   1
   2
   ```

   The first invocation of `makeCounter` creates and returns a function that closes over a `counter` variable. The second invocation of `makeCounter` creates another function that closes over its own copy of the `counter` variable. The two invocations of `makeCounter` each return a function that has access to their own respective local variable named `counter`. 

   Their explanation: In this case, the first call to `console.log` prints `1`, the second prints `2`, and the third and fourth print `1` and `2` again. This time, the two invocations of `makeCounter` each return a function that has access to a local variable named `counter`, but, in both cases, the variable is distinct. See the next problem to understand why.

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

   ```
   1
   2
   1
   2
   ```

   Each invocation of `makeCounter` defines a function with its own closure and access to a local variable `counter` which has an initial value of `0`. 

   Their explanation: Curiously, the results are the same as in the previous problem: `1`, `2`, `1`, `2`. It demonstrates that each returned function has an independent copy of the `counter` variable. They are, in fact, two different variables entirely; they just have the same name. When we increment the `counter` variable from `incrementCounter1`'s envelope, it has no effect on the one in `incrementCounter2`'s envelope.

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

   ```js
   function makeMultipleLister(num) {
     return () => {
       for (let multiple = num; multiple < 100; multiple += num) {
           console.log(multiple);
       }
     }
   }
   ```

   

6. Write a program that uses two functions, `add` and `subtract`, to manipulate a running total. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console. It should work like this:

   ```js
   add(1);       // 1
   add(42);      // 43
   subtract(39); // 4
   add(6);       // 10
   ```

   Show Solution

   ```js
   let total = 0;
   
   function add(number) {
     total += number;
     console.log(total);
   }
   
   function subtract(number) {
     total -= number;
     console.log(total);
   }
   ```

   

7. Without running the following code, determine what value it logs on the last line. Explain how the program arrived at that final result.

   ```js
   function foo(start) {
     let prod = start;
     return function (factor) {
       prod *= factor;
       return prod;
     };
   }
   
   let bar = foo(2); // a function 
   let result = bar(3); // 6
   result += bar(4); // 6 + (6 * 4 = 24) = 30
   result += bar(5); // 30 + (24 * 5) = 150
   console.log(result); // 150
   ```

   Show Solution

   On line 9, we create a function that we assign to the `bar` variable. This function takes a single argument, multiplies it with a variable named `prod`, and returns the result. Even though `prod` is out of scope when we call `bar`, closure lets `bar` retain access to `prod`.

   On line 10, we call the returned function with a value of `3`. Due to closure, the function has access to `prod`, which is currently set to `2`. It multiplies `prod` by `3`, and returns the new value of `prod`, i.e., `6`. We assign the return value to `result`.

   On line 11, we again call the returned function, but this time with an argument of `4`. Since we set `prod` to `6` in the previous call, we end up multiplying `6` by `4`, and setting `prod` to the result, `24`. We then return that value and add it to the previous result, `6`, which produces a `result` of `30`.

   Line 12 is similar. This time, we multiply `prod` (whose value is `24`) by `5`, and set `prod` to the result, `120`. We then return `120` and add it to the previous `result` value of `30`, which produces the final value of `150`.

8. Write a function named `later` that takes two arguments: a function and an argument for that function. The return value should be a new function that calls the input function with the provided argument, like this:

   ```js
   const logger = message => console.log(message);
   let logWarning = later(logger, "The system is shutting down!");
   logWarning(); // The system is shutting down!
   ```

   Show Solution

   ```js
   function later(func, argumeny) {
     return () => func(argument);
   }
   ```

   

9. Write a function named `later2` that takes two arguments: a function and an argument for that function. The return value should be a new function that also takes an argument. The new function should call the input function with the argument provided to `later2` and the argument provided to the returned function. For example

   ```js
   const notify = function(message, when) {
     console.log(`${message} in ${when} minutes!`);
   };
   
   let shutdownWarning = later2(notify, "The system is shutting down");
   shutdownWarning(30); // The system is shutting down in 30 minutes!
   ```

   Show Solution

   ```js
   function later2(func, argument) {
     return secondArgument => func(argument, secondArgument);
   }
   ```

   

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

    ```js
    function emulateBind(context, func) {
      return () => func.call(context);
    }
    ```

    w/ test code

    ```js
    function emulateBind(context, func) {
      return () => func.call(context);
    }
    
    // test code
    let obj = {};
    let boundFunc = emulateBind(obj, function() {
      this.foo = "bar";
    });
    
    boundFunc();
    console.log(obj); // { foo: 'bar' }
    ```


# Closures and Private Data

Now that we know what closures are, we're ready to put them to work. In this assignment, we'll focus on how we can use closures to define private data in JavaScript objects.

## What to Focus On

This assignment is relatively short, though it does have some exercises practice problems that may take some time to work through. However, there are only a few concepts of importance. In particular, you should be able to:

- Write code that uses closure to create private data.
- Explain why private data is desirable.
- Be able to identify code that gives users of your code a way to alter private data.

## Private Data

- **Private data** is when you can't access a local variable that's part of a closure from anywhere other than, the function that has access to that variable. 

As we've learned, functions combine with the environment at their definition point to form closures. A closure lets a function access its definition environment regardless of when and where the program invokes the function. For instance, here's some code that uses a closure to increment and log a number with each call:

```js
function makeCounter() {
  var count = 0;       // declare a new variable
  return function() {
    count += 1;        // references count from the outer scope
    console.log(count);
  };
}
```

We're using `var` in this example merely for a change of pace. It makes no difference whether we use `var` or `let` in this code. Actually, we're using `var` so we don't have to change the image below.

Since `makeCounter` returns a function, we use it like this:

```js
var counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

Let's take a closer look at that code:



![Function scopes](https://d3905n0khyu9wc.cloudfront.net/images/function_scope1.png)



We mention garbage collection in the above image. That isn't technically correct, so please ignore it. We'll talk about garbage collection a little later.

Note that `count` is private data for the function returned by `makeCounter()`. The closure makes it *impossible* to access the value of `count` from elsewhere:

```js
var counter = makeCounter();
console.log(counter.count); // undefined
console.log(count);         // ReferenceError: count is not defined
```

On the other hand, the function returned by `makeCounter()` can access and update `counter` without any problems.

Let's get some practice.

## Practice Problems

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
   function makeCounterLogger(start) {
     return (finish) => {
       let num;
       if (start <= finish) {
         for (num = start; num <= finish; num += 1) {
           console.log(num);
         }
       } else {
         for (num = start; num >= finish; num -= 1) {
           console.log(num);
         }
       }
     };
   }
   
   let countlog = makeCounterLogger(5);
   countlog(8);
   countlog(2);
   ```

   

2. In this problem, we'll build a simple todo list program that uses the techniques we've seen in this assignment.

   Write a `makeList` function that creates and returns a new function that implements a todo list. The returned function should have the following behavior:

   - When called with an argument that is not already on the list, it adds that argument to the list.
   - When called with an argument that is already on the list, it removes the element from the list.
   - When called without arguments, it prints all of the items on the list. If the list is empty, it prints an appropriate message.

   ```js
   function makeList() {
     return function (arg = 'empty') {
       let list = [];
       if (arg === 'empty') {
         list.forEach(item => console.log(item));
       } else {
         if (list.some(value => value === arg)) {
         	let index = list.indexOf(arg);
         	list.splice(index, 1);
       	} else {
         	list.push(arg);
       }
     };
   }
   ```

   

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

   Show Solution

   ```js
   function makeList() {
     let list = [];
   
     return function (arg) {
       if (arg) {
         let index = list.indexOf(arg);
         if (index) {
           list.splice(index, 1);
           console.log(`${arg} removed!`);
         } else {
           list.push(arg);
           console.log(`${arg} added!`);
         }
       } else if (list.length === 0) {
         console.log('list is empty');
       } else {
         list.forEach(item => console.log(item));
       }
     };
   }
   ```

   ```js
   // their solution
   function makeList() {
     let items = [];
   
     return function(newItem) {
       let index;
       if (newItem) {
         index = items.indexOf(newItem);
         if (index === -1) {
           items.push(newItem);
           console.log(newItem + " added!");
         } else {
           items.splice(index, 1);
           console.log(newItem + " removed!");
         }
       } else if (items.length === 0) {
         console.log("The list is empty.");
       } else {
         items.forEach(item => console.log(item));
       }
     };
   }
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
   function makeList() {
     return {
       todo: [],
   
       add(arg) {
         let index = this.todo.indexOf(arg);
         if (index === -1) {
           this.todo.push(arg);
           console.log(`${arg} added!`);
         }
       },
   
       remove(arg) {
         let index = this.todo.indexOf(arg);
         if (index) {
           this.todo.splice(index, 1);
           console.log(`${arg} removed!`);
         }
       },
   
       list() {
         if (this.todo.length === 0) {
           console.log('The list is empty')
         } else {
           this.todo.forEach(item => console.log(item));
         }
       }
     };
   }
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
   function makeList() {
     let todo = [];
     return {
       add(arg) {
         let index = todo.indexOf(arg);
         if (index === -1) {
           todo.push(arg);
           console.log(`${arg} added!`);
         }
       },
   
       remove(arg) {
         let index = todo.indexOf(arg);
         if (index) {
           todo.splice(index, 1);
           console.log(`${arg} removed!`);
         }
       },
   
       list() {
         if (todo.length === 0) {
           console.log('The list is empty')
         } else {
           todo.forEach(item => console.log(item));
         }
       }
     };
   }
   
   ```

   

## Why Do We Need Private Data?

- Private data protects data integrity because it forces developers to use the intended interface. 
- Private data prevents user of an object from becoming dependent on the implementation. 
  - Other developers shouldn't care that the todo-list object stores todos in an array, and code shouldn't encourage them to depend on it. 
  - Instead, object should supply an API that lets other developers manipulate the todo-list regardless of its implementation. 
  - If implementation later changes, API should remain the same. 
- You shouldn't rely on private data to keep sensitive information hidden, because even when you restrict access, it's easy to expose data by returning references to that data. 
  -  Encryption is the only reasonably safe way to protect such data.

As we've seen, you have choices about how to organize your code and data. Using closures to restrict data access is an excellent way to force other developers to use the intended interface. By keeping the collections private, we enforce access via the provided methods.

Restricting access helps protect data integrity since developers must use the interface. In this simple case, data integrity isn't a huge concern. However, the code forces you to use `add` to add an item to the list, which ensures that we can log every addition.

Private data also helps prevent the user of an object from becoming dependent on the implementation. Other developers shouldn't care that a todo-list object stores todos in an array, and your code shouldn't encourage them to depend on it. Instead, your object should supply an API that lets other developers manipulate the todo-list regardless of its implementation. If you later change the implementation, your API should remain the same.

Be careful though. Even when you restrict access, it's easy to expose data by returning references to that data. For instance, if you return a reference to the todos array from our todo-list, that reference can now be used to store invalid data in the todo-list:

```js
let arr = todoList.getAllTodos();
arr[0] = undefined;
```

If you're lucky, the invalid data is benign; however, bad actors often use such opportunities to make malicious changes to data.

```js
let arr = todoList.getAllTodos();
while (arr.length > 0) {
  arr.pop(); // objects are pass by reference --> change to object changes all the objects that reference the original object
}
```

You shouldn't rely on private data to keep sensitive information hidden. Encryption is the only reasonably safe way to protect such data. Modern debuggers, such as the ones built-in to your browser, let you step through a program and inspect data at every step, and that makes even private data visible. Program errors can also expose private data, quite by accident.

## Summary

In this lesson, we've learned how to use closures to create functions and objects that use private data, and we've talked about why that ability is useful. In the next lesson, we'll examine the concept of immediately invokable function expressions, better known as IIFEs.

------

# Immediately Invoked Function Expressions

We're now ready to learn about one of JavaScript's most unusual features: immediately invoked function expressions. These expressions let you define and execute a function in a single step. They let you use variable and function names that won't conflict with other names in your code.

## What to Focus On

This assignment is also a short one. However, the concepts discussed are needed often. In particular, you should be able to answer these questions:

- What are IIFEs?
- How do you use them?
- How do you use IIFEs to create private scopes?
- How do you use blocks to create private scopes?
- How do you use IIFEs to create private data?

## What Are IIFEs and How Do You Use Them?

An **IIFE** or **immediately invoked function expression** is a function that you define and invoke simultaneously. In JavaScript, we use a special syntax to create and execute an IIFE:

```js
(function() {
  console.log('hello');
})();                     // => hello
```

In this code, we've added a pair of parentheses around a function definition. We then invoke the function by appending a second pair of parentheses. Without the parentheses around the function definition, we may get a syntax error when we try to invoke the function:

Invalid Syntax

```js
function() {
  console.log('hello');
}();                      // SyntaxError: Unexpected token
```

A little later, we'll show you an example where the surrounding parentheses aren't necessary. However, you should always use them to more clearly show that you're running an IIFE.

## Parentheses

In JavaScript, surrounding a value with parentheses `( )` doesn't change the value. You're well familiar with using parentheses to invoke functions and define a function's parameters, but they can show up elsewhere. When they do, they act as a grouping control; they control the order of evaluation in an expression:

```node
> (3)
= 3

> (['apple', 'carrot'])
= ["apple", "carrot"]
```

In these two examples, the parentheses didn't affect the results. However, in more complex code, they can:

```node
> (3 + 5) * 2
= 16

> 3 + (5 * 2)
= 13
```

In the first example, the parentheses tell JavaScript to evaluate `3 + 5` first, then multiply the result by `2`. In the second, they evaluate `5 * 2` first, then add that result to `3`. Note that these expressions produce different results.

With IIFEs, the parentheses around the function definition tell JavaScript that we first want to evaluate the function as an expression. We then take the return value of the expression and use function call parentheses to invoke the function.

All functions, including IIFEs, can take arguments and return values:

```js
(function(number) {
  return number + 1;
})(2);                    // 3
```

## IIFE Style Issues

You may sometimes see a slightly different style for IIFEs:

```js
(function() {
  console.log('hello');
}());
```

Here, the argument list is inside the outer set of parentheses. As with the original style, they let JavaScript distinguish between an ordinary function declaration and an IIFE. JavaScript handles this style the same as with the earlier approach. However, the style makes what is happening less apparent. You should use the style that we showed earlier.

We can omit the parentheses around an IIFE when the function definition is an expression that doesn't occur at the beginning of a line (recall the earlier invalid syntax example):

```js
let foo = function() {
  return function() {
    return 10;
  }() + 5;
}();

console.log(foo);       // => 15
```

Again, this style makes it less apparent that we're working with an IIFE. Use parentheses here as well:

```js
let foo = (function() {
  return (function() {
    return 10;
  })() + 5;
})();

console.log(foo);       // => 15
```

## Using IIFEs With Arrow Functions

IIFEs work with all kinds of functions, including arrow functions:

```js
((first, second) => first * second)(5, 6); // => 30
```

## Creating Private Scopes With IIFEs

The world is full of messy code; you must learn how to work with it. Suppose you're working with a messy JavaScript program and need to add some code to the program. The program, together with your changes, looks something like this:

```js
// thousands of lines of messy JavaScript code!

// here you need to find and log the largest even number in an array

// more messy JavaScript code
```

This task seems simple, so let's take a stab at it:

```js
// thousands of lines of messy JavaScript code!

let array = [5, 10, 12, 7, 9, 6, 24, -10, -200, 37];
let largest = -Infinity;
for (let index = 0; index < array.length; index += 1) {
  if ((array[index] % 2) === 0 && (array[index] > largest)) {
    largest = array[index];
  }
}
console.log(largest); // 24

// more messy JavaScript code
```

This code has a subtle problem. Can you spot it?

Solution

Since functions create new lexical scopes, let's try to put the variable inside a function. That should hide it from the rest of the program since the outer scope doesn't have access to the inner scope:

```js
// thousands of lines of messy JavaScript code!

function findLargest() {
  let array = [5, 10, 12, 7, 9, 6, 24, -10, -200, 37];
  let largest = -Infinity;
  for (let index = 0; index < array.length; index += 1) {
    if ((array[index] % 2) === 0 && (array[index] > largest)) {
      largest = array[index];
    }
  }

  return largest;
}

console.log(findLargest()); // 24

// more messy JavaScript code
```

This function works, and it successfully isolates `array` and `largest` from any other declarations in the program. However, it too has a problem. Can you identify it?

Solution

We can solve this dilemma by converting the function declaration into an IIFE:

```js
// thousands of lines of messy JavaScript code!

console.log((function() {
  let array = [5, 10, 12, 7, 9, 6, 24, -10, -200, 37];
  let largest = -Infinity;
  for (let index = 0; index < array.length; index += 1) {
    if ((array[index] % 2) === 0 && (array[index] > largest)) {
      largest = array[index];
    }
  }

  return largest;
})()); // 24

// more messy JavaScript code
```

This code works! It has a private scope for `array` and `largest` so that they don't clash with any other variables. Since the function is unnamed, it also doesn't clash with any other names.

We can also pass values into the IIFE as arguments during invocation:

```js
// thousands of lines of messy JavaScript code!

console.log((function(array) {
  let largest = -Infinity;
  for (let index = 0; index < array.length; index += 1) {
    if ((array[index] % 2) === 0 && (array[index] > largest)) {
      largest = array[index];
    }
  }

  return largest;
})([5, 10, 12, 7, 9, 6, 24, -10, -200, 37])); // 24

// more messy JavaScript code
```

## Using Blocks For Private Scope

In ES6 JavaScript and later, you can use blocks to create private scopes. For instance:

```js
// thousands of lines of messy JavaScript code!

{
  let array = [5, 10, 12, 7, 9, 6, 24, -10, -200, 37];
  let largest = -Infinity;
  for (let index = 0; index < array.length; index += 1) {
    if ((array[index] % 2) === 0 && (array[index] > largest)) {
      largest = array[index];
    }
  }
  console.log(largest); // 24
}

// more messy JavaScript code
```

Within the block created by the outer braces, `array`, `largest`, and `index` all have a private, local scope. They won't interfere with any other variables by the same name.

Although blocks are a more straightforward way to create private scopes, existing code often relies on IIFEs to achieve that result. Thus, you need to understand both techniques.

## Using IIFEs to Define Private Data

IIFEs also let us create functions with private data. Of course, we can already do that without IIFEs. In some cases, though, IIFEs lead to simpler code that is more convenient to use.

Consider this code:

```js
function makeUniqueIdGenerator() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  }
};

let makeUniqueId = makeUniqueIdGenerator();
makeUniqueId(); // => 1
makeUniqueId(); // => 2
makeUniqueId(); // => 3
```

With IIFEs, we can rewrite this code as:

```js
const makeUniqueId = (function() {
  let count = 0;
  return function() {
    ++count;
    return count;
  };
})();

makeUniqueId(); // => 1
makeUniqueId(); // => 2
makeUniqueId(); // => 3
```

The IIFE lets us eliminate the `makeUniqueIdGenerator` function and also eliminates the separate invocation of the function.

How does that code work? First, we define a function that creates and returns a function that relies on closure to keep `count` private. We then invoke the first function to create the function that uses `count`. We then assign `makeUniqueId` to the new function so we can invoke it as needed.

It may be a little hard to understand this pattern at first, but you should learn it well. It's used often in real-world JavaScript code.

In the What To Focus On section above, we mentioned that you should be able to answer these two very similar questions:

1. How do you use IIFEs to create private scopes?
2. How do you use IIFEs to create private data?

As similar as those two questions sound, they refer to different concepts. When we talk about private scope, we're talking about how you can use scope to prevent some code from making accidental changes to variables in its outer scope. When we discuss private data, we're talking about encapsulation: making local data inaccessible from the code's outer scope.

## Summary

In this assignment, we've introduced one of JavaScript's oddest features: immediately invoked function expressions. They may be odd, but that doesn't mean that they aren't useful. For instance, we learned how we could use an IIFE to create a private scope and avoid conflicts with existing names. We also learned how to create private data with IIFEs.

In the next assignment, you'll get some practice working with IIFEs. Afterward, we'll move on and look at some handy shorthand notation that modern JavaScript provides.