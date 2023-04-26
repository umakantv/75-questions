
# Least Recently Used Cache

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->
We use a `LinkedList` to move the keys with larger rank to the top whenever we use them. Naturally, the keys with the lowest rank key will become the tail.

We also maintain a `map` of key to `node`.

# Approach
This solution `LinkedList` to effectively `read` and `set` in cache in $O(1)$ time.

# Complexity
- Time complexity: $O(1)$
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity: $O(capacity)$
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
```js

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.pre = null;
        this.post = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null; // this will be the eviction key
    }

    addToTop(node) {

        if (this.tail == null) {
            this.tail = node;
        }

        if (this.head != null) {
            this.head.pre = node;
            node.post = this.head;
        }
        this.head = node;
    }

    unlink(node) {
        if (node == null) {
            return;
        }

        let pre = node.pre;
        let post = node.post;

        if (pre != null) {
            pre.post = post;
        }

        if (post != null) {
            post.pre = pre;
        }

        if (this.head == node) {
            this.head = post;
        }

        if (this.tail == node) {
            this.tail = pre;
        }

        node.pre = null;
        node.post = null;
    }

}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cap = capacity;
    this.map = new Map(); // key: node

    this.list = new LinkedList();
    
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) {
        return -1;
    }

    let node = this.map.get(key);
    this.list.unlink(node);
    this.list.addToTop(node);

    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        let node = this.map.get(key);
        node.value = value;
        this.list.unlink(node);
        this.list.addToTop(node);
        return;
    }

    if (this.map.size >= this.cap) {
        let nodeToRemove = this.list.tail;
        this.list.unlink(nodeToRemove);

        this.map.delete(nodeToRemove.key);
    }

    let newNode = new Node(key, value);
    this.list.addToTop(newNode);
    this.map.set(key, newNode);
};

```