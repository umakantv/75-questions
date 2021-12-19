class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int a = l1->val + l2->val;
        int val = a % 10;
        int carry = (a - val) / 10;
        ListNode *result = new ListNode(a % 10);
        ListNode *p = l1->next, *q = l2->next, *r = result;
        while(p && q) {
            a = p->val + q->val + carry;
            val = a % 10;
            carry = (a - val) / 10;
            r->next = new ListNode(val);
            r = r->next;
            p = p->next;
            q = q->next;
        }
        p = p ? p : q;
        while(p) {
            a = p->val + carry;
            val = a % 10;
            carry = (a - val) / 10;
            
            r->next = new ListNode(val);
            r = r->next;
            p = p->next;
        }
        while(carry) {
            val = carry % 10;
            carry = carry - val;
            r->next = new ListNode(val);
            r = r->next;
        }
        return result;
    }
};