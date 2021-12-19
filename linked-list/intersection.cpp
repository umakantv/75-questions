class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int lengthA = 0, lengthB = 0;
        ListNode *p = headA, *q = headB;
        while(p) {
            lengthA++;
            p = p->next;
        }
        while(q) {
            lengthB++;
            q = q->next;
        }
        int diff = abs(lengthA-lengthB);
        ListNode* newHeadA = lengthA > lengthB ? headA : headB;
        if(diff) {
            while(diff) {
                newHeadA = newHeadA->next;
                diff--;
            }
        }
        p = newHeadA;
        q = lengthA > lengthB ? headB : headA;
        while(p && q && p != q) {
            p = p->next;
            q = q->next;
        }
        return p;

    }
};