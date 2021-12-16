class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        set<int> seen;
        for(int a: nums) {
            if(seen.find(a) != seen.end()) return true;
            seen.insert(a);
        }
        return false;
    }
};