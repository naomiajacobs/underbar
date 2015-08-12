(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * in implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.splice(Math.max(0, array.length-n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    
    //handles arrays
    if (Array.isArray(collection)) {

      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }

    //else handles objects
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];

    _.each(collection, function(item, index) {

      if (test(item)) { //if item passes test, add it to array

        filtered.push(item);
      }
    });

    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var failed = function(input) {
      
      //returns true if test fails
      return !test(input) ? true : false;
    };

    return _.filter(collection, failed);
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {

    //use unique as intermediate for speed
    var unique = {};
    var results = [];

    _.each(array, function(item, key) {
      unique[key] = item;
    });

    _.each(unique, function(item, key) {
      if (_.indexOf(results, item) < 0) {
        results.push(item);
      }
    });

    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mappedArray = [];

    //applies iterator on each item in collection, then pushes to new array
    _.each(collection, function(value) {
      mappedArray.push(iterator(value));
    });

    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    var initializing = accumulator === undefined;

    _.each(collection, function(item) {

      if (initializing) {

        accumulator = item;
        initializing = false;

      } else {

        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (Array.isArray(collection)) {
      return _.reduce(collection, function(wasFound, item) {
        
        if (wasFound) {
         return true;
        }
        
        return item === target;
      }, false);

    } else {

      var wasFound = false;

      for (var prop in collection) {
        
        if (collection[prop] === target) {
          
          wasFound = true;
          return wasFound;
        }
      }

      return wasFound;
    }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    return !!_.reduce(collection, function(allPass, item) {

      return allPass && (iterator === undefined ? item : iterator(item));

    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {

    return !!_.reduce(collection, function(allPass, item) {

      return allPass || (iterator === undefined ? item : iterator(item));

    }, false);

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

    _.each(arguments, function(item) {

        _.each(item, function(value, key) {

          obj[key] = value;
        });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    _.each(arguments, function(item) {

      _.each(item, function(value, key) {

        if (!(key in obj)) {
          obj[key] = value;
        }
      });
    });

    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    //obj to keep track of previous calls
    var prevCalls = {};

    return function(arg) {

      //if func hasn't been called with the arg yet, run func(arg)
      if (!prevCalls[arg]) {

        prevCalls[arg] = func.apply(this, arguments);
      }

      return prevCalls[arg];
    }; 

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    setTimeout.apply(this, arguments);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    
    //makes copy of array
    var arrayCopy = array.slice();

    //makes target array
    var newArray = [];

    var randomize = function() {
    
      //until newArray has all the elements it needs
      while (newArray.length < array.length) {
        
        //pick a random element from array
        var random = Math.floor(Math.random()*arrayCopy.length);

        //splice it from old
        var next = arrayCopy.splice(random, 1)[0];
        
        //add it to new
        newArray.push(next);

      }

    };

    randomize();

    var checkIfNewOrder = function() {

      if (newArray.join(',') == array.join(',')) { //checks if same order

        //resets arrayCopy and newArray
        arrayCopy = array.slice();
        newArray = [];

        //tries again until newArray is in a different order than array
        randomize();
        checkIfNewOrder();
      }
    };

    checkIfNewOrder();
    
    return newArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

    return _.map(collection, function(item) {
      
      var method = typeof functionOrKey === 'function' ? functionOrKey : item[functionOrKey];
      return method.apply(item, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    var result = [];

    var arrayCopy = collection.slice();
    
    //returns true if item1 should be sorted before item2 (already sorted correctly)
    //returns false if item1 should be sorted after item2
    var compare = function(item1, item2) {

      //default wins if other is undefined
      //preserves current order if both are undefined
      if (item2 === undefined) {
        return true;

      //sorts by iterater prop if iterator is a string
      } else if (typeof iterator === 'string') {

        //returns true if the item1 comes first
        return (item1[iterator] < item2[iterator] || item1[iterator] === item2[iterator]) ? true : false;
      
      //else sorts by result of iterator function
      } else {

        if (iterator(item2) === undefined) {

          return true;

        } else {

          return (iterator(item1) < iterator(item2) || iterator(item1) === iterator(item2)) ? true : false;
        }
      }
    };

    //iterates through array, finds item that should come first, pushes it to new array
    //repeats until all items are used
    var sortItems = function(array) {

      //done sorting
      if (arrayCopy.length === 0) {

        return result;

      } else {

        _.each(arrayCopy, function(value, key) {
          //start assuming the item is first
          var winning = true;

          //compare to all items left in array to see if it's first
          for (var j = 0; j < arrayCopy.length; j++) {

            //skip if item is compared to itself
            if (value === arrayCopy[j]) {
              continue;

            //set winning to false if it fails and break since it's not the first
            //refactor to use some? - wouldn't be able to take advantage of break
            } else if (!compare(value, arrayCopy[j])) {
              winning = false;
              break;
            }
          }

          //if it's first, push it to result and start again on modified array
          //if not, move on to next item
          if (winning) {
            result.push(arrayCopy.splice(key, 1)[0]);
            sortItems(arrayCopy);
          }
        });
      }
    };

    sortItems(arrayCopy);
    return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    //determines longest argument
    var longestArgLength = 0;
    var longestArg;

    _.each(arguments, function(item, key) {
      
      if (item.length > longestArgLength) {
        longestArgLength = item.length;
        longestArg = item;
      }
    });

    var newArray = [];

    var pushItem = function(item, key) {
      newArray[i].push(item[i]);
    };

    for (var i = 0; i < longestArgLength; i++) {

      newArray[i] = [];

      //for each arg, push its nth item to newArray's nth item
      _.each(arguments, pushItem);
    }

    return newArray;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var newArray = [];

    var addItems = function(array) {

      for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          addItems(array[i]);
        } else {
          newArray.push(array[i]);
        }
      }
    };

    addItems(nestedArray);

    return newArray;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var sharedItems = [];

    //finds shortest argument and sets it to shortestArg
    var shortestArg = arguments[0];
    var shortestArgIndex = 0;

    _.each(arguments, function(item, key) {
      if (item.length < shortestArg.length) {
        shortestArg = item;
        shortestArgIndex = key;
      }
    });

    //checks if item contains item in arguments[0]
    var doesContain = function(arg) {
      return _.contains(arg, shortestArg[j]);
    };

    //checks remaining arguments against shortest argument
    for (var j = 0; j < shortestArg.length; j++) {

      //if every other argument contains the item in the shortest argument, push to sharedItems
      var shared = _.every(arguments, doesContain);

      if (shared) {
        sharedItems.push(shortestArg[j]);
      }
    }

    return sharedItems;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

    var onlyInFirst = [];

    //makes array of all arguments except first one
    var otherArguments = [];

    for (var i = 1; i < arguments.length; i++) {
      otherArguments.push(arguments[i]);
    }

    //checks if each item in first arg is unique
    for (var j = 0; j < arguments[0].length; j++) {

      var unique = true;

      for (var k = 0; k < otherArguments.length; k++) {

        //if any other arg contains an item in the first arg, it's not unique
        if (_.contains(otherArguments[k], arguments[0][j])) {

          unique = false;
        }
      }

      //if not in other args, push to final array
      if (unique) {

        onlyInFirst.push(arguments[0][j]);
      }
    }

    return onlyInFirst;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
