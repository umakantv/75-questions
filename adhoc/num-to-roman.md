
# Convert Integer to Roman Numeral

## Problem Statement
Problem: https://leetcode.com/problems/integer-to-roman/

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

* `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
* `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
* `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral.

 

### Example 1:

Input: num = 3  
Output: "III"  
Explanation: 3 is represented as 3 ones.  

### Example 2:

Input: num = 58  
Output: "LVIII"  
Explanation: L = 50, V = 5, III = 3.  

### Example 3:

Input: num = 1994  
Output: "MCMXCIV"  
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.  


### Constraints: 
`1 <= num <= 3999`


## Simple Approach

```cpp

class Solution {
public:
    vector<string> letters  = {"I", "V", "X", "L",  "C",  "D", "M"};
    vector<int> nums        = { 1,   5,   10,  50,   100,  500, 1000};

    string prepareString(char x, int times) {
        string s = "";
        for(int i = 0; i < times; i++) {
            s += x;
        }
        return s;
    }

    string repeat(int num, int d, char x) {
        // cout << "Num: " << num << " Divider: " << d << " Letter: " << x << "\n";
        string s = "";
        int times = num / d;
        if (times > 0) {
            s += prepareString(x, times);
            num = num - (d * times); // replace with subtrac
        }
        s += convert(num);
        return s;
    }

    string convert(int num) {
        string s = "";
        if (num >= 1000) {
            s += repeat(num, 1000, 'M');
        } else if (num >= 100) {
            if (num >= 900) {
                s += "CM";
                num -= 900;
            }
            if (num >= 500) {
                s += "D";
                num -= 500;
            }
            if (num >= 400) { // 400 - 499
                s += "CD";
                num -= 400;
            }
            // num is now guaranteed to be 100 - 399
            s += repeat(num, 100, 'C');
        } else if (num >= 10) {
            if (num >= 90) {
                s += "XC";
                num -= 90;
            }
            if (num >= 50) {
                s += "L";
                num -= 50;
            }
            if (num >= 40) {
                s += "XL";
                num -= 40;
            }
            // num is now gauranteed to be 10 - 39
            s += repeat(num, 10, 'X');
        } else if (num >= 1) {
            if (num >= 9) {
                s += "IX";
                num -= 9;
            }
            if (num >= 5) {
                s += "V";
                num -= 5;
            }
            if (num >= 4) {
                s += "IV";
                num -= 4;
            }
            // num is now guaranteed to be 1 - 3
            s += repeat(num, 1, 'I');
        }

        return s;
    }

    string intToRoman(int num) {
        return convert(num);
    }
};
```

## More Logical & Structured Approach

```cpp
class Solution {
public:

    vector<pair<int, string>> sequence = {
        {1000, "M"},
        {900, "CM"},
        {500, "D"},
        {400, "CD"},
        {100, "C"},
        {90, "XC"},
        {50, "L"},
        {40, "XL"},
        {10, "X"},
        {9, "IX"},
        {5, "V"},
        {4, "IV"},
        {1, "I"},
    };

    string repeat(string x, int times) {
        string s = "";
        for(int i = 0; i < times; i++) {
            s += x;
        }
        return s;
    }

    string process(int &num, int d, string x) {
        string s = "";
        if (num >= d) {
            int times = num / d;
            s += repeat(x, times);
            num -= (d * times);
        }
        return s;
    }

    string convert(int num) {
        string s = "";
        if (num < 1) {
            return s;
        }

        for (auto v: sequence) {
            s += process(num, v.first, v.second);
            // cout << s << " num: " << num << "\n";
        }
        return s;
    }

    string intToRoman(int num) {
        return convert(num);
    }
};
```