




















































Chapter 11:

45. What is the purpose of JSON.stringify() ?** (Count: 4) 
46. What is the purpose of `JSON.parse()`?** (Count: 4) 
What is serialization and Deserialization

let myObj = {
  name: "John",
  age: 30,
  isAdmin: true,

  isLiker: false,

  address :{
    city: "Noida",
    nearBy: "Metro Station"
  }
}

// Object ---> JSON (JSON.stringify()) also called serialization
let strObj = JSON.stringify(myObj);
console.log(typeof strObj);

// JSON ---> Object (JSON.parse()) also called deserialization.
let myNewObj = JSON.parse(MYJSON);
console.log(myNewObj);





Chapter 08:

Difference between pop() and unshift() method ?
pop()
Removes the last item and returns it.
const arr = [1, 2, 3];
arr.pop(); // returns 3, arr is now [1, 2]

unshift()
Adds item(s) to the beginning of the array.
const arr = [2, 3];
arr.unshift(1); // [1, 2, 3]

shift() method 
Removes the first item and returns it.
const arr = [1, 2, 3];
arr.shift(); // returns 1, arr is now [2, 3]





Iteration :

Topic : For Each
Executes function for each item.
No return value.

let num = [1,2,3,4,5,6,7,8,9,10]

num.forEach((value, index, array)=>{
  console.log(`2 x ${index + 1} = ${value * 2}`)
}) 


Topic : Map Method
Returns new array of transformed elements.
let num = [1,2,3,4,5,6,7,8,9,10]

let newArray = num.map((value, index, array)=>{
  return value * 2
})

console.log(newArray)

Topic: Filter
Returns new array with elements that pass condition.
let num = [1,2,3,4,5,6,7,8,9,10]
 let evenArray = num.filter((value, index, array)=>{
  return value%2 ===0;
 })
 console.log(evenArray);

 Topic: Reduce() method
 Reduces array to a single value.

// Syntax : price.reduce( (accumulator, currentValue, index, array)=>{}, initialValue)
// and initialvalue = accumulator

let price = [1,2,3,4,5];
price.reduce( (accumulator, currentValue, index, array)=>{
    console.log(accumulator, currentValue,index,array)
},0)
// output : 15


Topic: Find() method
let price = [1,2,3,4,5]

const res = price.find((value)=> {
  return value > 2
})
console.log(res);


Topic: Some - koi bhi value condition ko ke a/c thik hai, to true
let fruits = [1,2,3,4,5,6,7,8,90]

let res = fruits.some( (value) => {
  return value >=100
})
console.log(res)

Topic: every - sabhi value agar condition ke true hai, to true print krna
let nums = [23,45,67,8,9,0,0]

const res = num.every((val)=> {
  return val >=0
})
console.log(res);



xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Chapter 06:
Global vs Local Scope

✅ Global Scope
Variables declared outside of any function or block are in the global scope.
Accessible anywhere in the code after their declaration.
If declared using var in the global scope, they become properties of the window object in browsers.

Example:
var a = 10; // global
function show() {
  console.log(a); // 10
}
show();
console.log(window.a); // 10 (in browser)

✅ Local Scope
Variables declared inside a function or block ({}) are scoped to that function or block.
They are not accessible outside that function/block.

Example:
function test() {
  let x = 5; // local
  console.log(x); // 5
}
test();
console.log(x); // ReferenceError: x is not defined


2. 🧭 Lexical Scoping (also called closures)

✅ Definition
Lexical scoping means that the scope of a variable is determined by its position in the source code (during writing, not runtime).
A function remembers the scope in which it was defined, not where it is executed.

Example :

function parent() {
    let parentName = "X";

    console.log(childName); // Nahi access kr skte, parent to child.

    function  child(){
        let childName = "A";
        console.log(childName);
        console.log(parentName); // Access kar skte , Isski ko lexical scoping bolenge.
    }

    return child;
}
let fn = parent();
fn();


=======================




// Topic 01: Hoisting:
// Before executing parent(), JavaScript creates memory.
// ✔ function child()  → Fully Hoisted
// ✔ var company       → Hoisted & initialized with undefined
// ✔ let parentName    → Hoisted but NOT initialized (TDZ)
// ✔ const country     → Hoisted but NOT initialized (TDZ)

function parent() {
    
    //Topic 02: Hoisting + Temporal Dead Zone (TDZ)
    console.log(company); //✅ undefined - 'var' is hoisted and initialized with undefined.
    console.log(parentName); // ❌ ReferenceError 
    console.log(country);// ❌ ReferenceError
    // Temporal Dead Zone (TDZ)- parentName is already hoisted,but it has NOT been initialized yet.
    // The time between entering the scope and initializing 'let'and 'const'is called the Temporal Dead Zone (TDZ).

    var company = "CTS";
    let parentName = "X";
    const country = "India";

    function child() {
        let childName = "A";
        //Topic 02: Lexical Scoping
        // child() can access:
        // ✔ Own variables , ✔ Parent variables , ✔ Global variables
        // Because scope is decided.where the function is DEFINED,not where it is CALLED.

    console.log(company); // ✅ Output: CTS - Accessible because company belongs to the Global Scope.
    console.log(parentName);// ✅ Output: X - Accessible because parentName belongs to the Parent (Outer) Scope.
    console.log(country); // ✅ Output: India - Accessible because parentName belongs to the Parent (Outer) Scope.
    console.log(childName); // ✅ Output: A - Accessible because childName belongs to child()'s Own Scope.
    }
    // Topic 02:Lexical Scoping
    console.log(childName); // ❌ ReferenceError -Parent functions cannot access because variables declared inside child().
    // Child → Parent ✅
    // Parent → Child ❌


    // Topic 03: Closure  - We are returning child(), not executing it.Since child() uses company, parentName,and country, JavaScript preserves these variables even after parent() finishes.

    return child;
}
//Topic 04: Closure in Action
// parent() executes
const fn = parent();

// At this point, parent() has finished execution.Normally, its local variables would be destroyed.However, child() still has access to: ✔ company ✔ parentName ✔ country.This ability of a function to remember variables from its outer scope is called a Closure.
// Execute the returned function.
fn();

/*
Output
undefined
ReferenceError
ReferenceError

CTS
X
India
A
*/

1. Hoisting - Hoisting is JavaScript's behavior of processing all declarations before executing the code. During the memory creation phase, memory is allocated for variables and functions.

✅ Function declarations are fully hoisted.
✅ var is hoisted and initialized with undefined.
✅ let and const are hoisted but are not initialized.
In our example

Before parent() starts executing, JavaScript prepares memory like this:
function child() { ... }    // Fully hoisted
var company = undefined;    // Hoisted & initialized
let parentName;             // Hoisted (not initialized)
const country;              // Hoisted (not initialized)
Therefore,
console.log(company); // undefined
works because company already has the value undefined.


2. Temporal Dead Zone (TDZ)
Definition
The Temporal Dead Zone (TDZ) is the period from entering a scope until a let or const variable is initialized.

Although the variable has been hoisted, it cannot be accessed during this period.

Trying to access it results in a ReferenceError.

In our example
console.log(parentName); // ReferenceError
console.log(country);    // ReferenceError

let parentName = "X";
const country = "India";

Execution has entered the scope of parent(), but parentName and country have not yet been initialized.
Therefore, both variables are in the Temporal Dead Zone (TDZ).


3. Lexical Scope
Lexical Scope means a function accesses variables based on where it is defined, not where it is called.
However, an outer function cannot access variables declared inside an inner function.

A function can access:

✔ Its own variables
✔ Variables from its outer (parent) scope
✔ Global variables

JavaScript searches variables in this order:
Own Scope
    ↓
Parent Scope
    ↓
Global Scope

Example
const appName = "Reader App";

function parent() {
    let company = "CTS";

    function child() {
        let childName = "A";
        console.log(childName); // ✅ Own Scope
        console.log(company);   // ✅ Parent Scope
        console.log(appName);   // ✅ Global Scope
    }

    console.log(childName); // ❌ ReferenceError
}

Explanation: child() first searches its own scope (childName).
If not found, it searches the parent scope (company).
If still not found, it searches the global scope (appName).
parent() cannot access childName because JavaScript searches outward, not inward.

 3.1 Global Scope - Variables declared outside all functions and blocks belong to the Global Scope. They can be accessed from anywhere in the program.

Example:
const appName = "Reader App"; // Global Scope

function parent() {
    function child() {
        console.log(appName); // ✅ Reader App
    }
}

Explanation: appName is declared globally.
Both parent() and child() can access it.

 3.2 Function Scope - Every function creates its own Function Scope. Variables declared inside a function can be accessed only inside that function and its child (nested) functions.

Example:
function parent() {
    var company = "CTS";
    let parentName = "X";
    const country = "India";

    function child() {
        console.log(company);      // ✅
        console.log(parentName);   // ✅
        console.log(country);      // ✅
    }
}
console.log(company); // ❌ ReferenceError

Explanation: company, parentName, and country belong to parent()'s function scope.
They are accessible inside parent() and child(), but not outside parent().

 3.3 Block Scope - Variables declared with let and const inside {} belong to the Block Scope and can only be accessed inside that block.

Example
function parent() {
    if (true) {
        let role = "Developer";
        const project = "Pearson";
    }
    console.log(role);    // ❌ ReferenceError
    console.log(project); // ❌ ReferenceError
}

Explanation: role and project exist only inside the if block.

4. Closure
A Closure is the combination of a function, and
the references to its outer (lexical) variables.

Because of a closure, an inner function continues to access variables from its outer scope even after the outer function has finished executing.

In our example
return child;
parent() returns the child function.

Later,
const fn = parent();
fn();

Even though parent() has already finished execution, child() still has access to:
company
parentName
country
So these statements still work:
console.log(company);      // CTS
console.log(parentName);   // X
console.log(country);      // India

JavaScript keeps these variables alive because the returned function still references them.This behavior is called a Closure.














xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Chapter : 05 
What is Function ?
A function in JavaScript is a block of reusable code designed to perform a specific task. You can think of it as a machine: you give it inputs (called arguments), it processes them, and gives you an output (a return value).

Three phases of function :
 function declaration
 function Reference
 function calling

// function declaration
function  sayHello() {
    console.log("Hello world!")
}
sayHello // function reference
sayHello() // function calling


3. Parameters vs Arguments
Parameters: Variables listed in the function definition.
Arguments: Actual values passed to the function when called.

// Function declaration ke time (number1,number2) ye mera parameter hai.
function  add(number1, number2) {
    console.log(number1+number2);
}
add(20,30) // function calling ke waqt jo value(20,30), ye mera arguments hai.




What are different ways to create functions in JavaScript?

JavaScript provides multiple ways to create functions. Each has a different syntax and is used in different situations.
The most common ways are:
4. Annonymose function
5. Arrow Function
6. IIFE (Immediately Invoked function Expression)
7. Function Expression
8. Function Declaration


4.Annonymose function:
An Anonymous Function is a function that does not have a name. It is commonly used as a function expression, callback function, or event handler in JavaScript.

Theory
#00-Does not have a function name.
#01-Can be assigned to a variable and used as a Function Expression.
#02-Can be passed as an argument to another function (callback).
#03-Can be stored in variables, objects, or arrays.
#04-Commonly used in callbacks, event listeners, timers (setTimeout, setInterval), and array methods (map, filter, forEach).
#05-Is not fully hoisted like a Function Declaration because it is assigned to a variable.
#06-Can accept parameters and return values, just like a regular function.

Example :Anonymous Function with Default Parameter (example 03)
const getUsername = function (username = "Aakash") {
  return "Hello " + username;
};
const res = getUsername("Suraj")
console.log(res);
console.log(getUsername());          // Hello Aakash
console.log(getUsername("Rahul"));   // Hello Rahul


Example 01: Anonymous Function (Basic)
const getUsername = function () {
  return "Aakash";
};
console.log(getUsername()); //Aakash

Example 02: Anonymous Function with Parameters
const getUsername = function (username) {
  return "Hello " + username;
};
console.log(getUsername("Rahul")); //Hello Rahul

Example 03:Anonymous Function with Default Parameter
const getUsername = function (username = "Aakash") {
  return "Hello " + username;
};
const res = getUsername("Suraj");
console.log(res); //Hello Suraj
console.log(getUsername()); //Hello Aakash
console.log(getUsername("Rahul")); //Hello Rahul

Example 04: Anonymous Function with Multiple Parameters
const add = function (a, b) {
  return a + b;
};
console.log(add(10, 20)); // 30

Example 05: Anonymous Function Stored in a Variable
const greet = function () {
  console.log("Welcome to JavaScript");
};
greet(); //Welcome to JavaScript

Example 06: Anonymous Function as a Callback
setTimeout(function () {
  console.log("Executed after 2 seconds");
}, 2000);
// Output: Executed after 2 seconds


Example 07: Anonymous Function with Array Methods
const fruits = ["🍎", "🍌", "🥭"];
fruits.forEach(function (fruit) {
  console.log(fruit);
});
Output: 🍎
🍌
🥭

5. Arrow Function :
Introduced in ES6, arrow functions are a concise way to write functions.
Point 03:Best suited for callbacks, array methods (map, filter, reduce, forEach), and functions that don't need their own this.
point 04: Cannot use yield, so it cannot be used as a generator function.
Point 02:Uses the => (arrow) syntax instead of the function keyword.
Provides a shorter, cleaner, and more readable way to define functions.
Does not have its own this; it inherits this from the surrounding (lexical) scope.
Point 05:Does not have its own arguments object. To access all arguments, use rest parameters (...args).
Point 06:Cannot be used as a constructor with the new keyword because it has no prototype.

// 1. Arrow function with function body
const consoleFruit = () => {
  console.log("🍎 Apple");
};
consoleFruit();

// 2. Single-line arrow function (implicit return not needed)
const consoleFruit2 = () => console.log("🍌 Banana");
consoleFruit2();

// 3. Single argument (parentheses are optional)
const consoleFruit3 = fruit => console.log(fruit);
consoleFruit3("🍇 Grapes");

// 4. Multiple arguments (parentheses are required)
const consoleFruit4 = (fruit, color) => {
  console.log(`${fruit} is ${color}`);
};
consoleFruit4("🥭 Mango", "Yellow");

6. IIFE (Immediately Invoked function Expression)
An IIFE (Immediately Invoked Function Expression) is a function that is defined and executed immediately after it is created. It is commonly used to create a private scope and avoid polluting the global namespace.

Theory
IIFE stands for Immediately Invoked Function Expression.
It is defined and executed immediately after its creation.
It is wrapped inside parentheses () to make it a function expression.
It helps avoid polluting the global scope.
It creates a private scope, preventing variables from leaking into the global namespace.
It is commonly used for initialization code, one-time execution, and data encapsulation.

Syntax - Case 1 (Without Parameters)
(function () {
  console.log("IIFE");
})();  
// Output : IIFE

Syntax - Case 2 (With Parameters)
(function (name) {
  console.log("Hello " + name);
})("Suraj");
// Output : Hello Suraj

Syntax - Case 3 (Returning a Value)
const result = (function (a, b) {
  return a + b;
})(10, 20);
console.log(result); //30

Syntax - Case 4 (Arrow Function IIFE)
(() => {
  console.log("Arrow Function IIFE");
})();  // Arrow Function IIFE


Interview Tip:
Function Expression
const greet = function () {};
➜ Assigned to a variable and not fully hoisted.


Function Declaration
function greet() {}
➜ Declared with the function keyword and fully hoisted.

7. Function Expression
A Function Expression is a function that is assigned to a variable. It can be either anonymous or named.

Case 1: Anonymous Function Expression
const greet = function () {
  console.log("Hello");
};
greet(); // Hello

Case 2: Function Expression with Parameters
const add = function (a, b) {
  return a + b;
};
console.log(add(10, 20)); // 30

Case 3: Function Expression with a Default Parameter
const greet = function (name = "Aakash") {
  return `Hello, ${name}!`;
};
console.log(greet());        // Hello, Aakash!
console.log(greet("Bob"));   // Hello, Bob!

Case 4: Named Function Expression
Note: Here, sayHello is the function's internal name, while greet is the variable used to call it.
const greet = function sayHello(name) {
  return `Hello, ${name}!`;
};
console.log(greet("Bob")); // Hello, Bob!


Important:
Key Points: Not hoisted: Cannot be called before the line it's defined. Can be anonymous or named.

❗ Difference Example:
sayHi();       // ✅ Works
function sayHi() {
  console.log("Hi!");
}

sayHello();    // ❌ TypeError: sayHello is not a function
const sayHello = function() {
  console.log("Hello!");
};


8. Function Declaration
A Function Declaration is a function that is declared using the function keyword followed by a function name. It is fully hoisted, so it can be called before its declaration.

Case 1: Basic Function Declaration
function greet() {
  console.log("Hello");
}
greet(); // Hello

Case 2: Function Declaration with Parameters
function add(a, b) {
  return a + b;
}
console.log(add(10, 20)); // 30


Case 3: Function Declaration with Default Parameter
function greet(name = "Aakash") {
  return `Hello, ${name}!`;
}
console.log(greet());      // Hello, Aakash!
console.log(greet("Bob")); // Hello, Bob!




9. Pure Function and Impure Function -- 
✅ Pure Function = Same Input → Same Output + No Side Effects
❌ Impure Function = Depends on/Changes External State or Has Side Effects

Pure Function -- A Pure Function is a function that always returns the same output for the same input and has no side effects. It does not modify or depend on any external state or variables.
Pure functions are predictable, easier to test, debug, and reuse.

Example :
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5


Impure Function -- An Impure Function is a function that may return different outputs for the same input because it has side effects. It modifies or depends on external state or variables

Example :01
let count = 0;
function increment() {
  count++;
  return count;
}
console.log(increment()); // 1
console.log(increment()); // 2

Example :02
function getRandom() {
  return Math.random();
}
console.log(getRandom());
console.log(getRandom());


xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Operator :
 1. Arithmetic Operators
 2. Assignment Operators
 3. Comparison Operators
 4. Logical Operators
 5. Ternary Operator
 6. String Operators
 7. Type Operators


=================================
Data-types have two category: Primitive and Non-Primitive
Number 01: Primitive Data Types ()
Quick : Difference between '', "" and ``

//1. String - 'hello', "JS"
let username = 'Suraj, "hello"' //o/p: suraj,"hello"
let para = `Hello world      
this is suraj
what is going here
kya haal chal hai`    // o/p : using this jaise hum likhenge line by waise output same.
console.log (para);
//2.Number - 42, 3.14, NaN
let age = 20;
console.log(age);
//3.Boolean - true, false
let isProgrammer = true;
console.log(isProgrammer) // true
//4.Null -intentional absence of value
let empty = null;
console.log(empty)
//5.UnDefined -declared but not assigned
let notAssigned;
//6.BigInt- large integers: 123n
let big = 123456789012345678901234567890n;
//7.Symbol - unique value (ES6)
let uniqueId = Symbol("id");

Number 02:Non-Primitive or Reference-Type
//1.Array 
const fruits = ["🍎", "🍌", "🍇", "🍒"];
console.log(fruits);
//2.Object 
let obj = { name: "Alice",
    age:20,
    isProgrammer=true
 };
console.log(obj);
//3.Function
let greet = () => console.log("Hi");
function add() {
    console.log(10+20)
}
add() //output:30





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Important :
1.Re-Declare
2.Re-Assinged

Number 01 : var (old way)
var title = "Let's Learn JavaScript";
// Variable re-declare: Haan kar skte hai
var title = "This is one more title";
// Variable re-Assigned: Haan kar skte hai
title = "JavaScript";
console.log(title)

Number 02: let (new Way)

// Declare a variable :
let isDone = "yes";
// Re-declare a variable : Nahi kar skte
let isDone = "No";
// Re-Assinged a Variable : haan Kar skte hai.
isDone = "No"

Number 03: const (Modern and New way)

// Declare a variable :
const PI = 3.14;
// Re-declare a variable : nahi kar skte
const PI = 3.14;
// Re-Assinged a variable: nahi kar skte 
PI = 7.14;





JavaScript ? 



Programming and Coding :

what is programming language ?
A way to give command to you system. 
    1. Understand by humans 
    2. Understand by computers as well.

