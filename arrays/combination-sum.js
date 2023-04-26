
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
    let possible = new Array(target+1);

    let present = new Set();

    for (const cd of candidates) {
        present.add(cd);
    }

    // possible[0] = []
    // possible[1] = [ [1] ]
    // possible[2] = [ [1, 1], [2] ]
    // possible[3] = [ [1, 1, 1], [1, 2], [3] ]
    // possible[3] = [ [2, 3] ]

    for (let i = 1; i <= target; i++) {
        let iPossible = [];

        let solutionMaps = [];

        if (present.has(i)) {
            iPossible.push([i]);
        }

        let limit = Math.floor(i/2);

        for (let first = 1; first <= limit; first++) {
            let second = i - first;

            for (const setA of possible[first]) {
                for (const setB of possible[second]) {
                    let sum = [...setA, ...setB];

                    // console.log(first, second);
                    // console.log('Consider', sum, 'for', i, 'with existing', iPossible)
                    // console.log(solutionMaps)

                    sum = sum.sort((a, b) => (a - b));

                    let isDuplicate = false;
                    
                    for (let z = 0; z < iPossible.length; z++) {
                        const td = iPossible[z];

                        if (checkArrayEqual(sum, td)) {
                            isDuplicate = true;
                            // console.log(i, sum, 'Duplicate with existing', td)
                            break;
                        }
                    }

                    if (!isDuplicate) {
                        // console.log(i, 'Added', sum)
                        iPossible.push(sum);
                    }
                    
                }
            }
        }

        possible[i] = iPossible;
    }

    // console.log(possible)
    // for (const p of possible) {
    //     // console.log(p);
    // }

    return possible[target];
};

function checkArrayEqual(a, b) {
    if (a.length != b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }

    return true;
}

function getCountMap(arr) {
    let m = new Map();

    for (const a of arr) {
        if (m.has(a)) {
            m.set(a, m.get(a) + 1);
        } else {
            m.set(a, 1);
        }
    }
    return m;
}

/**
 * 
 * @param {map} a 
 * @param {map} b 
 * @returns 
 */
function checkMapEqual(a, b) {

    b = new Map(Array.from(b))
    for (const [key, value] of a) {
        if (!b.has(key)) {
            return false;
        }
        if (b.get(key) != value) {
            return false;
        }

        b.delete(key);
    }

    if (b.size) {
        return false;
    }
    return true;
}

// let p = combinationSum([2,3,6,7], 7)
// let p = combinationSum([7,3,2], 18)
// let p = combinationSum([7,3,2], 18)
// console.log(p);

// let test = checkMapEqual(new Map([ [6, 1] ], [ [3, 2] ]))