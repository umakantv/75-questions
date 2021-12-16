class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int ans = nums[0];
        int leftMin = nums[0];
        int leftMax = nums[0];
        
        for(int i = 1; i < nums.size(); i++) {
            if(nums[i] < 0) {
                swap(leftMin, leftMax);
            }
            leftMax = max(leftMax * nums[i], nums[i]);
            leftMin = min(leftMin * nums[i], nums[i]);
            ans = max(ans, leftMax);
        }
        return ans;
    }
};