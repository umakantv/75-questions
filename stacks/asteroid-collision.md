# Asteroid Collision

Problem Link: [Leetcode](https://leetcode.com/problems/asteroid-collision/)

## Problem Statement
We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

 

Example 1:

> Input: asteroids = [5,10,-5]  
> Output: [5,10]  
> Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.  

Example 2:

> Input: asteroids = [8,-8]  
> Output: []  
> Explanation: The 8 and -8 collide exploding each other.  

Example 3:

> Input: asteroids = [10,2,-5]  
> Output: [10]  
> Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.  

 

Constraints:

`2 <= asteroids.length <= 104`
`-1000 <= asteroids[i] <= 1000`
`asteroids[i] != 0`

## Solution

### Approach 1: Stack

Store the forward moving asteroids in a stack. When we encounter a backward moving asteroid, we repeatedly destroy as many forward moving asteroids as we can.

Note that we need to destroy the forward moving asteroids in the order they were encountered. So we use a stack to store the forward moving asteroids.

There can be three cases when we encounter a backward moving asteroid:

Case 1: The backward moving asteroid is smaller than the forward moving asteroid. In this case, the backward moving asteroid gets destroyed. We do not remove the forward moving asteroid from the stack as it can possibly collide with other backward moving asteroids.

Case 2: Both the colliding asteroids are of the same size. In this case, both the asteroids get destroyed. We remove the forward moving asteroid from the stack.

Case 3: The backward moving asteroid is bigger than the forward moving asteroid. In this case, the backward moving asteroid destroys the forward moving asteroid and we have to keep destroying to forward moving asteroids.

We can do this in one pass.  
We can also do this in two passes. In the first pass, we store the forward moving asteroids in a stack. In the second pass, we destroy the forward moving asteroids as we encounter the backward moving asteroids.


```cpp
class Solution {
public:

    bool collideOnePass(vector<int>& asteroids) {
        bool collided = false;
        vector<pair<int, int>> forward;
        pair<int, int> backward = {0, -1};

        for (int i = 0; i < asteroids.size(); i++) {
            int asteroid = asteroids[i];
            if (asteroid > 0) {
                forward.push_back({asteroid, i});
            } else if (asteroid < 0) {
                // repeatedly destroy as many forward moving asteroids as we can
                while (forward.size()) {
                    pair<int, int> p = forward.back();

                    if (p.first > abs(asteroid)) {
                        // backward moving asteroid gets destroyed
                        asteroids[i] = 0;
                        break;
                    }

                    if (p.first == abs(asteroid)) {
                        // both get destroyed
                        asteroids[i] = 0;
                        asteroids[p.second] = 0;
                        forward.pop_back();
                        break;
                    }

                    if (p.first < abs(asteroid)) {
                        // forward moving asteroid gets destroyed
                        // as we try again the same loop
                        asteroids[p.second] = 0;
                        forward.pop_back();
                    }
                }
            }
        }

        return collided;
    }

    vector<int> asteroidCollision(vector<int>& asteroids) {
        int n = asteroids.size();
        int collided = collideOnePass(asteroids);

        vector<int> result;
        for (int a: asteroids) {
            if (a != 0) {
                result.push_back(a);
            }
        }

        return result;
    }
};
```