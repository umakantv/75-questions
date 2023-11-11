# Close Strings

## Problem Statement

Leetcode: [1657. Determine if Two Strings Are Close](https://leetcode.com/problems/determine-if-two-strings-are-close)

Two strings are considered close if you can attain one from the other using the following operations:

* Operation 1: Swap any two existing characters.  
    For example, abcde -> aecdb
* Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.  
    For example, `aacabb -> bbcbaa` (all a's turn into b's, and all b's turn into a's)

You can use the operations on either string as many times as necessary.

Given two strings, `word1` and `word2`, return `true` if `word1` and `word2` are close, and `false` otherwise.

 

Example 1:

    Input: word1 = "abc", word2 = "bca"
    Output: true
    Explanation: You can attain word2 from word1 in 2 operations.
    Apply Operation 1: "abc" -> "acb"
    Apply Operation 1: "acb" -> "bca"

Example 2:

    Input: word1 = "a", word2 = "aa"  
    Output: false  
    Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.  

Example 3:

    Input: word1 = "cabbba", word2 = "abbccc"  
    Output: true  
    Explanation: You can attain word2 from word1 in 3 operations.  
    Apply Operation 1: "cabbba" -> "caabbb"  
    Apply Operation 2: "caabbb" -> "baaccc"  
    Apply Operation 2: "baaccc" -> "abbccc"  

 

Constraints:

* `1 <= word1.length, word2.length <= 105`
* `word1` and `word2` contain only lowercase English letters.



## Intuition

### Intuition 1:

If we can swap positions (operation 1), the order of letter does not matter
cabbba is same as aabbbc.
We only care about their frequency.

### Intuition 2:

All letters present in word1 must be present in word2 and no other letters should be present in word2.

### Intuition 3:

Given the frquencies of letters, we can arrange then in any order by operation 2.
aabbbc - a(2), b(3), c(1) can be achieved from abbccc - a(1), b(2), c(3)
Think about the grid game where we swap a piece with its neighbors - all arrangements are possible

We can sort frequencies and compare, if there is a mismatch, strings are not close

## Complexity

* Time complexity: O(n)

* Space complexity: Constant

## Code

```cpp
class Solution {
public:
    bool closeStrings(string word1, string word2) {

        // calculate frequencies
        vector<int> fr1(26, 0), fr2(26, 0);
        for (char a: word1) {
            fr1[a - 'a']++;
        }
        for (char a: word2) {
            fr2[a - 'a']++;
        }

        // Check letter mismatch - order matters
        for (int i = 0; i < 26; i++) {
            // if only one of them is zero
            if ((fr1[i] != 0 && fr2[i] == 0)) {
                return false;
            } else if (fr2[i] != 0 && fr1[i] == 0) {
                return false;
            }
        }

        // Check frequency mismatch - order does not matter
        sort(fr1.begin(), fr1.end());
        sort(fr2.begin(), fr2.end());

        for (int i = 0; i < 26; i++) {
            if (fr1[i] != fr2[i]) {
                return false;
            }
        }

        return true;
    }
};
```