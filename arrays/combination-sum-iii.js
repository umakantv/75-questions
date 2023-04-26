/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
 var combinationSum3 = function(k, n) {
    let answer = [];

    let arr = new Array(9).fill(0);

    combination(arr, k, n, answer, 0);

    return answer;
};

function combination(arr, k, n, answer, index) {

    if (index > 9) {
        return;
    }

    // if the sum has already become more than n
    let usedCount = 0;
    let sum = 0;

    let set = [];
    
    for (let i = 1; i < 10; i++) {
        if (arr[i-1]) {
            sum = sum + i;
            usedCount++;
            set.push(i);
        }
    }

    if (sum == n && usedCount == k) {
        answer.push(set);
        return;
    }

    if (sum > n) {
        return;
    }

    if (usedCount > k) {
        return;
    }

    // first select num: i+1
    arr[index] = 1;
    combination(arr, k, n, answer, index + 1);

    // then without selecting num: i+1
    arr[index] = 0;
    combination(arr, k, n, answer, index + 1);
}

// let answer = combinationSum3(9, 45);

// console.log(answer)