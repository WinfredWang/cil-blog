
let Person = {name:'xx'};
let val = Person.name;


Object.defineProperty(Person, "name", {
    enumerable: true, 
    configurable: false,
    get: function () {
        return val;
    },
    set: function (newVal) {
        console.log('the value changed ', val, ' --> ', newVal);
        val = newVal;
    }
});

Person.name = 'xx';