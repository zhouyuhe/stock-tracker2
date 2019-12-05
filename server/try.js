var MyObject = function() {
  this.name = "MyObjectName";
  this.myProperty = "property";
};

//   MyObject.prototype.doStuff = function (action) {
//     console.log(this.name + ' is ' + action + '!');
//   }

//   var obj = new MyObject();

//   console.log(obj.name);

// var runner = { name: 'John', myFavoriteActivity: 'running' };
// console.log(MyObject.prototype.doStuff.call(runner, runner.myFavoriteActivity))

// var sayMyName = function () {
//     console.log('My name is ' + this.name);
//   };

//   var jake = {
//     name: 'Jake'
//   }

var sayMyName = sayMyName.bind(jake);
sayMyName();

var MyObject = function() {
  this.name = "MyObjectName";
  this.myProperty = "property";
};

MyObject.prototype.doStuff = function(action) {
  console.log(this.name + " is " + action + "!");
};

var obj = new MyObject();

setTimeout(obj.doStuff, 1000, "awesome"); // prints ' is awesome!' after a 1 second delay.
