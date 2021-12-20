class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if(!root) return {};
        int level = 0;
        vector<vector<TreeNode*>> levels;
        levels.push_back({root});
        bool hasChildren = true;
        vector<int> ans;
        
        while(hasChildren) {
            vector<TreeNode*> current = levels[level];
            // cout << current[current.size()-1]->val << "\n";
            ans.push_back(current[current.size()-1]->val);
            
            vector<TreeNode*> newLevel;
            for(int i = 0; i < current.size(); i++) {
                TreeNode* node = current[i];
                if(node->left) newLevel.push_back(node->left);
                if(node->right) newLevel.push_back(node->right);
            }
            hasChildren = newLevel.size();
            levels.push_back(newLevel);
            level++;
        }
        return ans;
        
    }
};