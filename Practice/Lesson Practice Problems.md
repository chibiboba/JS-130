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