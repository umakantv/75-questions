class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minimum = prices[0];
        int ans = 0;
        for(int i = 0; i < prices.size(); i++) {
            ans = max(ans, prices[i] - minimum);
            minimum = min(minimum, prices[i]);
        }
        return ans;
    }
};