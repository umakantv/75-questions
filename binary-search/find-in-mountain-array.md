
# Problem Statement

Leetcode: [1095. Find in Mountain Array](https://leetcode.com/problems/find-in-mountain-array/)

(This problem is an **interactive problem**.)

You may recall that an array `A` is a *mountain array* if and only if:
- `A.length >= 3`
- There exists some `i` with `0 < i < arr.length - 1` such that:
* `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
* `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given a mountain array `mountainArr`, return the minimum `index` such that `mountainArr.get(index) == target`.  
If such an `index` does not exist, return `-1`.

You cannot access the mountain array directly. You may only access the array using a `MountainArray` interface:

* `MountainArray.get(k)` returns the element of the array at index k (0-indexed).
* `MountainArray.length()` returns the length of the array.

Submissions making more than `100` calls to `MountainArray.get` will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.




Example 1:

    Input: array = [1,2,3,4,5,3,1], target = 3
    Output: 2
    Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.

Example 2:

    Input: array = [0,1,2,4,2,1], target = 3
    Output: -1
    Explanation: 3 does not exist in the array, so we return -1.

Constraints:

* `3 <= mountain_arr.length() <= 104`
* `0 <= target <= 109`
* `0 <= mountain_arr.get(index) <= 109`

# Intuition

A completely different approach using recursion, optimizing at each recursion step.
Cache is not required for AC, but good to have.

In a range, check the mid element with target.
If target equal to mid, it is possible that the element could be at the left of mid as well.

If target is not equal to mid, check left and right parts recursively.

But we can avoid these steps.

* If the mid is on the increasing slope and `target > mid`, ignore the left part.
* If the mid is on the decreasing slope and `target > mid`, ignore the right part.

```
// mid is on decreasing slow, and target > mid
                5
            4       4
       _3_
    2
1

// mid is on decreasing slope, and target < mid
        5
            4
                _3_           
    2               2
                        1
```

We need check by get the right neighbor of mid, and check whether it's bigger (increasing) or smaller (decreasing) than the mid.
Complexity

* Time complexity: O(log n)
* Space complexity: O(n)



# Solution

```cpp
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *   public:
 *     int get(int index);
 *     int length();
 * };
 */
class Solution {
public:
    int n;
    vector<int> cache;

    int get(int i, MountainArray &mountainArr) {
        if (i >= n) {
            return -1;
        }

        if (cache[i] != -1) {
            return cache[i];
        }
        int num = mountainArr.get(i);
        cache[i] = num;
        return num;
    }

    int checkInRange(int target, MountainArray &mountainArr, int l, int r) {
        int index = -1;
        if (l <= r) {

            int mid = l + (r - l)/2;
            int num = get(mid, mountainArr);

            if (num == target) {
                // let's check the left side as well
                index = checkInRange(target, mountainArr, l, mid-1);
                if (index != -1) {
                    return index;
                }
                return mid;
            }

            if (l == r) {
                return index;
            }
            // right neighbor gauranteed to exist
            int neighbor = get(mid+1, mountainArr);

            // if mid is on the left slope
            // and target is right than num
            if (num < neighbor && target > num) {
                // then we don't need to check the left of mid
            } else {
                int index = checkInRange(target, mountainArr, l, mid-1);
                if (index != -1) {
                    return index;
                }
            }

            // if mid is on the decreasing slope
            // and the target > mid
            if (num > neighbor && target > num) {
                // then we don't need to check the right part
            } else {
                int index = checkInRange(target, mountainArr, mid+1, r);
                if (index != -1) {
                    return index;
                }
            }
        }
        return index;
    }

    int findInMountainArray(int target, MountainArray &mountainArr) {
        n = mountainArr.length();
        cache = vector<int>(n, -1);

        return checkInRange(target, mountainArr, 0, n-1);

        return -1;
    }
};
```