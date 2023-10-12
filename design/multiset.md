
# Multiset

## Problem

Design a `multiset` with `random` function that will give a random element from the multiset.  
The probability to get the number should be linearly proportial to the frequency of occurence of that number in the `multiset`.

## Time Complexity

* `insert`: 
  * Worst Case: $$O(log n)$$
  * Average: $$O(1)$$
* `remove`
  * Worst Case: $$O(log n)$$
  * Average: $$O(1)$$
* `getRandom`
  * Worst Case: $$O(n)$$

```js
var RandomizedCollection = function() {
    this.multiset = new Map();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
    if (this.multiset.has(val)) {
        let count = this.multiset.get(val);
        this.multiset.set(val, count + 1);
        return false;
    }
    this.multiset.set(val, 1);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
    if (this.multiset.has(val)) {
        let newCount = this.multiset.get(val) - 1;

        if (newCount == 0) {
            this.multiset.delete(val);
        } else {
            this.multiset.set(val, newCount);
        }
        return true;
    }
    return false;
};


/**
 * @return {number}
 */
 RandomizedCollection.prototype.getRandom = function() {

    let total = 0;

    let nums = [];

    for (let [_, count] of this.multiset) {
        total += count;
    }
    let rand = Math.floor(Math.random() * total * 10) % total;

    // Now determine where the rand will fall in the map

    let passed = 0;

    console.log(this.multiset)

    for (let [value, count] of this.multiset) {
        passed += count;

        if (passed >= rand) {
            console.log(rand, "Found at", value)
            return value;
        }
    }

    return 0;
};


let r = new RandomizedCollection(0);
console.log(r.insert(1));
console.log(r.insert(2));
console.log(r.insert(2));
console.log(r.insert(3));
console.log(r.getRandom());

```