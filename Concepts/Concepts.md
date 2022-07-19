# Spread Syntax

**Spread syntax** (`...`) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```js
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

console.log(sum.apply(null, numbers));
// expected output: 6

```

# toString

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

- Syntax

  ```js
  toString();
  ```

- Return value: a string representing the object. 

- An object's `toString()` method is most commonly invoked when that object undergoes...

  - explicit [type conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion) to a string 

    ```js
    String(obj);
    ```

  - implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) into a string

    ```js
    let obj = [];
    console.log(`${obj}`); // implicit type coeorcion in string interpolation
    ```

- While not as common, the method can be invoked directly (for example, `myObject.toString()`).

- By default `toString()` returns `"[object Type]"`, where `Type` is the object type.

  ```
  const o = new Object().toString() // o is "[object Object]";
  ```

- Can override `toString` by creating a function in place of it. 

  - creating a custom `toString` inside of the constructor / class of the instance object. 

  ```js
  // from OO 21.js
  toString() {
   if (this.isHidden()) return "Hidden";
   return `${this.getRank()} of ${this.getSuit()}`;
  }
  ```

- array.toString()

  ```js
  [1, 2, 3].toString(); // 1,2,3
  ```

# Logging instance object syntax

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

# Raising Exception

[reference](https://launchschool.com/lessons/896d0d67/assignments/f31c1dd8)

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

- Using exceptions to prevent bad inputs may not be best practice because we can avoid passing invalid data around in our program. 
- However we can't prevent someone else who is using our `TodoList` class from calling the method with something other than a `Todo` object. 
- In a later assignment, we'll move the `TodoList` class into a *module* that other programs can use. We may not have control over what those programs do, so raising an exception is appropriate.

# Raising Reference Error

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

-  we raise a `ReferenceError` exception even if the index has the wrong type.
- We may need to validate index numbers elsewhere, so we placed the validation code in a separate method. The method's name begins with a `_`; it's conventional to name methods with a leading underscore when they shouldn't be used from outside the class. The underscore suggests that the method is a *private method*.

# Private method naming convention

- The method's name begins with a `_`: The underscore suggests that the method is a *private method*.

- Private methods shouldn't be used from outside the class. 

  