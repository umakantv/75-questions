class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if(root == nullptr) return {};
        
        vector<vector<int>> ans;
        vector<vector<TreeNode*>> levels;
        
        levels.push_back({root});
        bool hasChildren = true;
        int level = 0;
        
        while(hasChildren) {
            vector<TreeNode*> current = levels[level];
            vector<TreeNode*> newLevel;
            vector<int> travel;
            bool flag = false;
            
            for(int i = 0; i < current.size(); i++) {
                TreeNode* node, *p = current[i];
                // insert value node
                if(level % 2) {
                    node = current[current.size()-1-i];
                } else {
                    node = current[i];
                }
                travel.push_back(node->val);
                
                if(p->left) {
                    flag = true;
                    newLevel.push_back(p->left);
                }
                if(p->right) {
                    flag = true;
                    newLevel.push_back(p->right);
                }
            }
            hasChildren = flag;
            levels.push_back(newLevel);
            ans.push_back(travel);
            level++;
        }
        return ans;
    }
};