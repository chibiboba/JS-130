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

- When `let` and `const` variables are hoisted, they are not given an initial value. 

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

# My Summary for Lesson 2

### Charts

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
  
  



