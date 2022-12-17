# Amazon Interview Questions - SDE I
## Left View of Binary Tree
```
        a
    b       c
  d  e     f
    g  h
     i 
    j k
```

```cpp
struct Node {
    int val;
    Node *left, *right;
    Node(int a): val(a), left(nullptr), right(nullptr) {}
};

void printLeftView(Node* root) {
    if(!root) return;
    vector<vector<Node*>> levels; // [ [a], [b, c], [d, e, f] ]
    int level = 0;
    // insert initial level [a]
    levels.push_back({root});
    bool hasChildren = true;
    while(hasChildren) {
        vector<Node*> current = levels[level];
        vector<Node*> newLevel;
        cout << current[0]->val << "\n";
        for(int i = 0; i < current.size(); i++) {
            Node *p = current[i];
            if(p->left) {
                newLevel.push_back(p->left);
            }
            if(p->right) {
                newLevel.push_back(p->right);
            }
        }
        hasChildren = newLevel.size();
        levels.push_back(newLevel);
        level++;
    }
}

```
---

## Music Player

[S1, S2, S3, S4.  . . . . ., Sn]
N Songs.

Your player should play a song randomly.

The song once played, should not be repeated for next K times.
```cpp
class MusicPlayer {
    
    private :
     int k;
     vector<Song> songsList;
     queue<Song> history;   
    
    public :
    MusicPlayer(vector<Song>& songsList, int k) {
        this.songsList = songsList;
        this.k = k;
    }
    
    public Song play() {
        // implement
        // it <- random(0, size of the set songsList);
        Song s = songsList[it]; // O(1)
        swap(songsList[it], songsList[songsList.size()-1]);
        songsList.remove(songsList.size()-1); // O(1)
        history.push_back(s); // O(1)
        
        // O(1)
        if(history.size()>k) {
            Song s = history.front();
            history.pop_front();
            songsList.push_back(s);
        }
        
        return s;
        
        // somehow choose a song91
    }
    
    
} 

```
## Min in all the Streams

S1 : 1, 2, 3, 4, 5,51 . . .  
S2 : 1,10,20,30 . . .  
.  
.  
.  
Sn : 14,20,23,45,66 . . .  

So : 1,1,2,3,4,5,10,14,20,20,23 . .. .

```cpp
// Stream
// S1.getNext() -> 1 // O(1)33
// S1.getNext() -> 2 // 

vector<Stream> streams;
void sortStreams(vector<Stream>& streams) {
    priority_queue<> myStreams
    
    pair<Number, index>
    // vector<int> pausedNumbers;
    while(true) {
        . . . .
        cout << . . 
    }
}
````