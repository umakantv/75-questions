class Node {
    constructor(value) {
        this.value = value;
        this.pre = null;
        this.post = null;
    }
}

var MyLinkedList = function() {
    this.head = null;
    this.tail = null;
    this.size = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    let node = this.getNodeAtIndex(index);

    if (node == null) {
        return -1;
    }

    return node.value;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    let node = new Node(val);

    if (this.tail == null) {
        this.tail = node;
    }
    
    if (this.head != null) {
        this.head.pre = node;
        node.post = this.head;
    }
    this.head = node;
    this.size++;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    let node = new Node(val);

    if (this.head == null) {
        this.head = node;
    }

    if (this.tail != null) {
        node.pre = this.tail;
        this.tail.post = node;
    }

    this.tail = node;
    this.size++;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.getNodeAtIndex = function(index) {
    let node = this.head;
    for (let i = 0; i < index && node != null; i++) {
        node = node.post;
    }
    return node;
}

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {

    if (index > this.size) {
        return;
    }

    if (index == 0) {
        return this.addAtHead(val);
    }
    if (index == this.size) {
        return this.addAtTail(val);
    }

    let node = this.getNodeAtIndex(index);

    let newNode = new Node(val);

    newNode.post = node;
    newNode.pre = node.pre;

    node.pre.post = newNode;
    node.pre = newNode;
    this.size++;
};


MyLinkedList.prototype.deleteAtHead = function() {
    if (this.head != null) {
        // this.head.pre = null;
        this.head = this.head.post;
        this.size--;
    }

    if (this.size == 0) {
        this.tail = null;
    }
}

MyLinkedList.prototype.deleteAtTail = function() {
    if (this.tail != null) {
        this.tail.pre.post = null;
        this.tail = this.tail.pre;
        this.size--;
    }

    if (this.size == 0) {
        this.head = null;
    }
}

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {

    if (index == 0) {
        this.deleteAtHead();
        return;
    }

    if (index == this.size - 1) {
        this.deleteAtTail();
        return;
    }

    let node = this.getNodeAtIndex(index);

    if (node == null) {
        return;
    }

    this.size--;

    if (this.head == node) {
        this.head = null;
    }

    if (this.tail == node) {
        this.tail = null;
    }

    if (node.pre != null) {
        node.pre.post = node.post;
    }

    if (node.post != null) {
        node.post.pre = node.pre;
    }
};

MyLinkedList.prototype.print = function() {
    let node = this.head;
    let list = ['List:'];
    for ( ; node != null; ) {
        list.push(node.value)
        node = node.post;
    }

    console.log(list.join(' '))
}

/** 
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

let list = new MyLinkedList();

list.addAtHead(1)
list.print()
list.addAtTail(3)
list.print()
list.addAtIndex(1, 2)
list.print()
console.log(list.get(1))
list.print()
list.deleteAtIndex(0)
list.print()
console.log(list.get(0))
list.print()


// list.addAtHead(7)
// console.log('addAtHead(7)')
// list.print()
// list.addAtHead(2)
// console.log('addAtHead(2)')
// list.print()
// list.addAtHead(1)
// console.log('addAtHead(1)')
// list.print()
// list.addAtIndex(3,0)
// console.log('addAtIndex(3,0)')
// list.print()
// list.deleteAtIndex(2)
// console.log('deleteAtIndex(2)')
// list.print()
// list.addAtHead(6)
// console.log('addAtHead(6)')
// list.print()
// list.addAtTail(4)
// console.log('addAtTail(4)')
// list.print()
// console.log('get(4)', list.get(4))
// list.print()
// list.addAtHead(4)
// console.log('addAtHead(4)')
// list.print()
// list.addAtIndex(5,0)
// console.log('addAtIndex(5,0)')
// list.print()
// list.addAtHead(6)
// console.log('addAtHead(6)')
// list.print()
