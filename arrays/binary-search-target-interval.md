```cpp
class Solution {
public:

    // lower_bound - the first element not smaller than target
    int lower_bound(vector<int>& nums, int target) {
        int l = 0, n = nums.size(), r = n-1;
        int leftMost = -1;

        while (l <= r) {
            int mid = l + (r-l)/2;
            if (nums[mid] > target) {
                r = mid - 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else if (nums[mid] == target) {
                leftMost = mid;
                r = mid-1;
            }
        }
        return leftMost;
    }

    // this is not exactly same as std::upper_bound
    // upper_bound - the first element strictly larger than target
    int upper_bound(vector<int>& nums, int target) {
        int l = 0, n = nums.size(), r = n-1;
        int rightMost = -1;

        while (l <= r) {
            int mid = l + (r-l)/2;

            if (nums[mid] > target) {
                r = mid - 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else if (nums[mid] == target) {
                rightMost = mid;
                l = mid + 1;
            }
        }
        return rightMost;
    }

    vector<int> searchRange(vector<int>& nums, int target) {
        if (nums.size() == 0) {
            return {-1, -1};
        }

        int left = lower_bound(nums, target);
        int right = upper_bound(nums, target);

        return {left, right};
    }
};
```