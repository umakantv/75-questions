

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum2 = function(candidates, target) {
    let solutionSets = new Set();
    candidates = candidates.sort((a, b) => (a - b));

    // console.log(candidates);
    recursiveCheck(candidates, 0, target, [], solutionSets);

    // console.log(solutionSets)

    return Array.from(solutionSets);
};

function recursiveCheck(candidates, position, target, usedValues, solutionSets) {

    let prev = -1;
    for (let i = position; i < candidates.length; i++) {
        let num = candidates[i];
        if (num > target) {
            return;
        } else {

            // This will prevent duplicated - at each stage, use only unique value
            if (prev == num) {
                continue;
            }
            let newTarget = target - num;
            let newUsedValues = [...usedValues, num];

            prev = num;

            // console.log(indent, 'Position:', i, target, num, newUsedValues);
            if (newTarget == 0) {
                // console.log(indent, 'Reached');
                solutionSets.add(newUsedValues);
                return;
            } else {
                recursiveCheck(candidates, i + 1, newTarget, newUsedValues, solutionSets);
            }
        }
    }
}

combinationSum2([10,1,2,7,6,1,5], 8);