"use strict";
const Person = function (firstName, birthYear) {
  //console.log(this);
  this.firstName = firstName;
  this.birthYear = birthYear;
  //Bad practice, never do this. We would have created a copy of this method  and attached it to every single object.
  //this.calcAge= function() {
  //console.log(2037 - this.birthYear);
  //};
};

const jipson = new Person("Jipson", 1982); //Jipson is an instance of person

// new Operator:
//1. New {} is created
//2. function is called, this = {} (This keyword will be set to this newly created object )
//3. {} linked to prototype
//4. function automaticallly return {}

/*
So, basically in the execution context
of the person function, the this keyword will point to the new object 
that was created in step number one => all of this happens
only because we are calling the function using the new operator.
Finally, the last step, is that the object that was created in the beginning
is then automatically returned from the constructor function.
So the function automatically returns that empty object from the beginning.
But actually at this point, the object no longer needs to be empty.
And this is actually the trick
of making the constructor function work.

----------
In classical object oriented programming, an object created from a class 
is called an instance. 
JavaScript doesn't really have classes in the sense of traditional OOP.
However, we did create an object from a constructor function.
*/
const joe = new Person("Joe", 1988); // Joe is an instance of person
const mina = new Person("Mina", 1985); //Mina is an instance of person
console.log(joe, mina);

console.log(jipson instanceof Person);

// Prototypes
console.log(Person.prototype);
/*--------
 Every function in JavaScript will automatically have a property called prototype.
which includes constructor function.

Note1: Function in JS is essentially an object, so that it can have property
Note2: Constructor functions have NO difference with other regular functions until we invoke a constructor 
       function with new keyword

Every object created by a certain constructor function
will be able to get access to all the methods and properties
that is define on the constructors prototype property =>  prototypal inheritance. 
Object always has access to the methods and properties from its prototype => Person.prototype


Person.prototype  is actually not the prototype of person.
Instead, it is what's gonna be used as the prototype of all the objects
that are created with the person constructor function.
-------*/

Person.prototype.calcAge = function () {
  console.log(2047 - this.birthYear);
};

jipson.calcAge();
mina.calcAge();
joe.calcAge();

console.log(jipson.__proto__);
console.log(jipson.__proto__ === Person.prototype);
/*
__proto__
1. Every object in JS have a property called __proto__
2. The __proto__ property of object is essentially the prototype property 
   of the constructor function that create the object
3. __proto__ of object is as same as prototype of function which creates that object
 */
console.log(Person.prototype.isPrototypeOf(jipson)); //true
console.log(Person.prototype.isPrototypeOf(joe)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
// Object.prototype( top of prototype chain)
console.log(jipson.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor); //

//prototype of linked objects property.
/*
1. Person is a constructor function prototype is one of the property 
   in the Person constructor function
2. define a method called calcAge on that prototype property
3. All the object(instance) created by Person constructor function 
   will link to it's prototype

 */
//prototype of the array / proto property

const arr = [3, 5, 6, 5, 1, 4, 6, 7, 7, 8]; // new Array=== []
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

console.log(arr.__proto__ === Array.prototype);
/* All the arrays get access to all  methods.
So each array does not contain all  methods
but instead, each array will inherit these methods
from its prototype. */
/////////////////////////////////////////////////

const Car = function (make, spped) {
  this.make = make;
  this.speed = spped;
};

Car.prototype.accerlate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accerlate();
bmw.brake();
bmw.brake();
bmw.accerlate();
bmw.accerlate();
mercedes.accerlate();
mercedes.accerlate();
mercedes.brake();
////////////////////////////////////////

// ES6 Classes
//class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2047 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes("")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const marta = new PersonCl(" Marta Davis", 1980);
console.log(marta);
marta.calcAge();

console.log(marta.__proto__ === PersonCl.prototype);
/*PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}!`);
};*/

marta.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

const john = {
  name: "John",
  lastName: "Smith",
  yearOfBirth: 1990,
  calculateAge: function () {
    const currentYear = new Date().getFullYear();
    return currentYear - this.yearOfBirth;
  },
};

console.log(john.calculateAge());

//The same example, but with the getter

const Jin = {
  name: "Jin",
  lastName: "Momsen",
  yearOfBirth: 1980,
  get age() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.yearOfBirth;
  },
};

console.log(Jin.age);

//ES6

class CarCL {
  constructor(make, spped) {
    this.make = make;
    this.speed = spped;
  }

  accerlate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCL("Ford", 120);
console.log(ford.speedUS);
ford.accerlate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
