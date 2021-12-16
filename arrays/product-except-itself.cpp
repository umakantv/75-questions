class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        
        // if(n == 1) return {1};
        vector<int> prefix(n, 1), suffix(n, 1);
        prefix[0] = nums[0];
        suffix[n-1] = nums[n-1];
        for(int i = 0; i < n; i++) {
            if(i > 0) {
                prefix[i] = prefix[i-1] * nums[i];
                suffix[n-1-i] = suffix[n-i] * nums[n-1-i];
            }
        }
        vector<int> ans(n, 1);
        ans[0] = suffix[1];
        ans[n-1] = prefix[n-2];
        
        for(int i = 1; i < n-1; i++) {
            if(i > 0 && i < n-1) {
                ans[i] = prefix[i-1] * suffix[i+1];
            }
        }
        return ans;
    }
};