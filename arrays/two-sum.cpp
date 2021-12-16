
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int, int> a;
        for(int i = 0; i < nums.size(); i++) {
            int available = a[target - nums[i]];
            if(available) return {available-1, i};
            a[nums[i]] = i+1;
        }
        return {-1, -1};
    }
};

int main () {
	
  return 0;
}