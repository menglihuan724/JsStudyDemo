function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype = {
    hobby: ['running', 'football'],
    sayName: function () {
        console.log(this.name);
    }
    ,
    sayAge: function () {
        console.log(this.age);
    }
}
;
var p1 = new Person('Jack', 20);
//p1:'Jack',20; __proto__: ['running','football'],sayName,sayAge
var p2 = new Person('Mark', 18);
p1.sayAge()