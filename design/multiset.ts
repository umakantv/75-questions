class Multiset {

    multiset: Map<number, Set<number>>;
    list: number[];

    constructor() {
        this.list = new Array();
        this.multiset = new Map<number, Set<number>>();
    }

    // inserts and returns true if val is inserted for the first time
    insert(val: number): boolean {
        let position = this.list.length;
        this.list.push(val);

        let indices = this.multiset.get(val);

        // this is the first time val is inserted
        if (indices == undefined) {
            this.multiset.set(val, new Set([position]));
            return true;
        }

        // val is already present in multiset
        let size = indices.size;
        indices.add(position);

        if (size == 0) {
            return true;
        }
        return false;
    }

    // removes and returns true if val was present in multiset
    remove(val: number): boolean {
        if (this.list.length == 0) return false;

        let indices = this.multiset.get(val);
        if (indices == undefined) return false;

        if (indices.size == 0) return false;

        let valIndices = Array.from(indices);

        // val is preset at valIndex in this.list
        let valIndex = valIndices.pop();

        // this should never happen as we maintain the invariant that indices.size > 0
        if (valIndex == undefined) return false;

        let lastValueIndex = this.list.length - 1;
        let lastValue = this.list.pop() as number;

        // the number we are trying to remove is also the number at the end of the list
        if (lastValue != val)
        {
            this.list[valIndex] = lastValue;
        }

        // move the lastValue to valIndex in list and set
        this.multiset.get(lastValue)?.delete(lastValueIndex);
        // neet to sort them as JS set are not sorted
        let finalIndices = Array.from(this.multiset.get(lastValue) as Set<number>);
        finalIndices.sort();
        this.multiset.set(lastValue, new Set(finalIndices));

        indices.delete(valIndex); // remove the valIndex from set

        return true;
    }

    getRandom(): number {
        let n = this.list.length;
        let randomIndex = Math.floor(Math.random() * 10 * n) % n;
        return this.list[randomIndex];
    }
}

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */


function stringify(data: any) {
    return JSON.stringify(data, (key, val) => {
        if (val instanceof Map) {
            let obj: any = {};
            for (const [k, v] of val.entries()) {
                obj[k] = v;
            }
            return obj;
        } else if (val instanceof Set) {
            return Array.from(val);
        } else {
            return val;
        }
    }, 2);
}

var obj = new Multiset()

var result = obj.insert(1)
console.log(result, stringify(obj.multiset), obj.list)
result = obj.remove(2)
console.log(result, stringify(obj.multiset), obj.list)
result = obj.insert(2)
console.log(result, stringify(obj.multiset), obj.list)
var result2 = obj.getRandom()
console.log(result2, stringify(obj.multiset), obj.list)
result = obj.remove(1)
console.log(result, stringify(obj.multiset), obj.list)
result = obj.insert(2)
console.log(result, stringify(obj.multiset), obj.list)
result2 = obj.getRandom()
console.log(result2, stringify(obj.multiset), obj.list)


// Output
// [null,true,false,true,false,false,false,true,true,true,false,1,1,1,1,2,1,2,2,2,2]
// Expected
// [null,true,false,true,false,false,false,true,true,true,true,1,1,1,1,1,1,1,1,1,1]