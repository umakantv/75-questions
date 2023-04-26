
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
        // console.log(this.list)
        let nodeToRemove = this.list.tail;
        this.list.unlink(nodeToRemove);

        this.map.delete(nodeToRemove.key);
    }

    let newNode = new Node(key, value);
    this.list.addToTop(newNode);
    this.map.set(key, newNode);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

let cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));
cache.put(3, 3);
console.log(cache.get(2));
cache.put(4, 4);
console.log(cache.get(1));
console.log(cache.get(3));
console.log(cache.get(4));