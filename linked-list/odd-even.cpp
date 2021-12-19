/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        ListNode *headB = head ? head->next : nullptr;
        ListNode *p = head, *q = head ? head->next : nullptr;
        ListNode *lastNodeA = p;
        while(p && q) {
            p->next = q->next;
            if(q->next) {
                q->next = q->next->next;
            }
            if(p->next) {
                p = p->next;
            }
            q = q->next;
        }
        if(p) {
            p->next = headB;
        } else p = headB;
        return head;
    }
};