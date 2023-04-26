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
// RandomizedCollection.prototype.getRandom = function() {

//     let nums = [];

//     for (let [value, count] of this.multiset) {
//         nums.push(...(new Array(count).fill(value)));
//     }
//     let n = nums.length;
//     let rand = Math.floor(Math.random() * n * 10) % n;

//     console.log(this.multiset);
//     console.log(nums, rand);

//     return nums[rand];

// };


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