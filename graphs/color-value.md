

```cpp

class Solution {
public:

    vector<vector<int>> adjList;
    vector<vector<int>> colorValue;
    vector<int> parent;
    string colors;
    int maxColorValue = 1;

    bool hasCycle = false;

    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        parent[v] = u;
    }

    void setup(int n) {
        this->parent = vector<int>(n, -1);
        for (int i = 0; i < n; i++) {
            adjList.push_back(vector<int>());

            vector<int> colors(26, 0);
            int colorIndex = getColorIndex(i);
            colors[colorIndex] = 1;
            colorValue.push_back(colors);
        }
    }

    int getColorIndex(int n) {
        return colors[n] % 97;
    }

    void updateColorValue(int node, int neighbor) {
        int colorIndex = getColorIndex(node);

        for (int i = 0; i < 26; i++) {

            if (i == colorIndex) {
                colorValue[node][i] = max(colorValue[node][i], colorValue[neighbor][i] + 1);
            } else {
                colorValue[node][i] = max(colorValue[node][i], colorValue[neighbor][i]);
            }

            if (colorValue[node][i] > maxColorValue) {
                maxColorValue = colorValue[node][i];
            }
        }
    }

    void dfs(int node, vector<bool>& inStack, vector<bool>& visited) {
        // cout << node << "\n";
        if (inStack[node]) {
            hasCycle = true;
            return;
        }
        inStack[node] = true;

        if (visited[node]) {
            return;
        }

        for (int neighbor: adjList[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, inStack, visited);
                if (hasCycle) {
                    return;
                }
            }
            updateColorValue(node, neighbor);
        }
        visited[node] = true;

        // for back-tracking
        inStack[node] = false;
    }

    int largestPathValue(string colors, vector<vector<int>>& edges) {
        this->colors = colors;
        int n = colors.size();

        setup(n);

        for (vector<int> edge: edges) {
            addEdge(edge[0], edge[1]);
        }

        vector<bool> visited(n, false);
        vector<bool> inStack(n, false);

        for (int i = 0; i < n; i++) {
            if (parent[i] == i) {
                return -1;
            } else if (!visited[i]) {
                dfs(i, inStack, visited);
                if (hasCycle) {
                    return -1;
                }
            }
        }

        if (hasCycle) {
            return -1;
        }

        return maxColorValue;
    }
};

```