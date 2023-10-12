# Maximum Consecutive 1s

## Problem Statement

Leetcode: [Maximum Consecutive III](https://leetcode.com/problems/max-consecutive-ones-iii/)

Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

Example 1:

    Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
    Output: 6
    Explanation: [1,1,1,0,0,1,1,1,1,1,1]

Example 2:

    Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
    Output: 10
    Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]


## Solution

Approach: Sliding Window Technique

```cpp
class Solution {
public:

    int longestOnes(vector<int>& nums, int k) {
        int n = nums.size();
        int l = 0, r = 0, zeroes = 0;
        int result = 0;

        while (r < n) {
            if (nums[r] == 0) {
                zeroes++;
            }

            while (l < r && zeroes > k) {
                if (nums[l] == 0) {
                    zeroes--;
                }
                l++;
            }

            if (zeroes <= k) { // if nums[l] == 0
                result = max(result, r - l + 1);
            }
            r++;
        }
        return result;
    }
};
```
