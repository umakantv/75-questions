# Minimum Number of Operations to Make Array Continuous

## Problem Statement

Leetcode: [2009. Minimum Number of Operations to Make Array Continuous](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/)

You are given an integer array nums. In one operation, you can replace any element in nums with any integer.

`nums` is considered continuous if both of the following conditions are fulfilled:

All elements in nums are unique.  
The difference between the maximum element and the minimum element in nums equals nums.length - 1.

For example, nums = [4, 2, 5, 3] is continuous, but nums = [1, 2, 3, 5, 6] is not continuous.

Return the minimum number of operations to make nums continuous.


Example 1:

    Input: nums = [4,2,5,3]  
    Output: 0  
    Explanation: nums is already continuous.  

Example 2:

    Input: nums = [1,2,3,5,6]
    Output: 1
    Explanation: One possible solution is to change the last element to 4.
    The resulting array is [1,2,3,5,4], which is continuous.

Example 3:

    Input: nums = [1,10,100,1000]
    Output: 3
    Explanation: One possible solution is to:
    - Change the second element to 2.
    - Change the third element to 3.
    - Change the fourth element to 4.
    The resulting array is [1,2,3,4], which is continuous.

 

Constraints:

* `1 <= nums.length <= 105`
* `1 <= nums[i] <= 109`



## Solution

```cpp
class Solution {
public:

    int minOperations(vector<int>& nums) {

        vector<int> unique;
        map<int, int> seen;
        for(auto n: nums) {
            if (!seen[n]) {
                seen[n] = 1;
                unique.push_back(n);
            }
        }
        sort(unique.begin(), unique.end());

        // find the mininum number -> max = length - min
        // for each num, check the index for upper_bount of max element
        // for example - for array of length 7, if min = 2
        // and max = 8, and there are 4 unique elements [2, 8]

        vector<int>::iterator low, up;
        int ops = INT_MAX;
        int n = nums.size();

        for (low = unique.begin(); low < unique.end(); low++) {
            int val = *low;
            int maximum = nums.size() + val - 1;
            up = upper_bound(low, unique.end(), maximum);
            int present = up - low;

            ops = min(ops, n - present);

            if (ops < (low - unique.begin())) {
                break;
            }
        }

        return ops;
    }
};
```