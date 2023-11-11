# Reverse Words in a String

## Problem Statement

Leetcode - [151](https://leetcode.com/problems/reverse-words-in-a-string/). Reverse Words in a String

Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

 

Example 1:

> Input: s = "the sky is blue"  
> Output: "blue is sky the"  

Example 2:

> Input: s = "  hello world  "  
> Output: "world hello"  
> Explanation: Your reversed string should not contain leading or trailing spaces.  

Example 3:

> Input: s = "a good   example"  
> Output: "example good a"  
> Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.  

 

Constraints:

* 1 <= s.length <= 104
* s contains English letters (upper-case and lower-case), digits, and spaces ' '.
* There is at least one word in s.

 

Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?


## Solution

```cpp

/**
For a word to start, check at a non-space char:
        * beginning of the string or
        * last character is space
    
For a word to end, check at each character:
    * if space, last character is not space
    * the end of the string with
*/

class Solution {
public:
    void reverse(string &s, int l, int r) {
        for (int i = 0; i < (r-l)/2; i++) {
            int left = l+i;
            int right = r-i;
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
        }
    }

    string reverseWords(string s) {
        vector<pair<int, int>> indices;

        int l = 0;
        int n = s.size();
        int r;
        for (int i = 0; i < n; i++) {

            // start of word
            if (s[i] != ' ') { // if not space
                if (i == 0) {   // if beginning of the string
                    l = 0;
                } else if (s[i-1] == ' ') { // last character is not space
                    l = i;
                }
            }

            if (s[i] != ' ') {
                r = i;
            }

            // if this character is space or last character in the string
            bool endOfWord = false;
            if (s[i] == ' ') {
                // if space, last character is not space
                if (i == 0 || (i > 0 && s[i-1] == ' ')) {
                    continue;
                }
                endOfWord = true;
            } else if (i == n-1) {
                // not space, end of word anyway
                endOfWord = true;
            }

            if (endOfWord) {
                indices.push_back({l, r});
                // cout << "Found word: " << l << " " << r << "\n";
            }

        }

        string ans = "";
        for (int i = indices.size() - 1; i >= 0; i--) {
            auto p = indices[i];
            string word = "";
            for (int j = p.first; j <= p.second; j++) {
                word += s[j];
            }

            ans += word;
            // cout << ans << "\n";
            if (i != 0) {
                ans += " ";
            }
        }

        return ans;
    }
};
```