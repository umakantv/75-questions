

```cpp
class Solution {
public:
    void moveZeroesWithQueue(vector<int>& nums) {
        deque<int> queue;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                queue.push_back(i);
            } else if (queue.size()) {
                int firstZero = queue.front();
                queue.pop_front();
                nums[firstZero] = nums[i];
                nums[i] = 0;
                queue.push_back(i);
            }
        }
    }
    void moveZeroesWithTwoPointer(vector<int>& nums) {
        int zeroPointer = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) {
                while(zeroPointer < i && nums[zeroPointer] != 0) {
                    zeroPointer++;
                }
                // zeroPointer is guaranteed to be at i
                // or at some index with zero value
                if (nums[zeroPointer] == 0) {
                    int temp = nums[i];
                    nums[zeroPointer] = temp;
                    nums[i] = 0;
                }
            }
        }
    }

    void moveZeroes(vector<int>& nums) {
        return moveZeroesWithTwoPointer(nums);
    }
};
```