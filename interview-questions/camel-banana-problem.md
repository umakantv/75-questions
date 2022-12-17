
## Camel Banana Problem

You have a camel which you want to use to transport `total` Bananas for `distance` kms.  

Your camel eats `1` banana upon traveling each KMs.  
Find the max number of bananas that can be safely transported.

```js
/**
 * 
 * @param {object}
 * @returns {number}
 */
function tranfer({
    distance = 1000,
    total = 3000,
    limit = 1000,
    tripLength = 250,
} = {}) {

    let remainingDistance = distance;
    let remainingBananas = total;

    let it = 0;

    while (remainingDistance > 0) {

        it++;
        // Check if the remaining distance can be travelled without multiple trips

        if (remainingBananas <= limit) {
            remainingBananas = remainingBananas - remainingDistance; // camel takes tax
            remainingDistance = 0;
        } else {
            // Need to run through multiple trips of distance tripLength
            let totalCarry = remainingBananas;
            remainingBananas = 0;
            let turn = 0;
            while (totalCarry > 0) {
                turn++;
                let carry = Math.min(totalCarry, limit);
                let tripCost = tripLength;
                if (totalCarry - carry > 0) {
                    tripCost = 2 * tripLength;
                }

                totalCarry = totalCarry - carry;
                remainingBananas = remainingBananas + carry - tripCost;
                // console.log(it, turn, remainingBananas);
            }

            remainingDistance = remainingDistance - tripLength;
        }
        console.log('Iteration', it);
        console.log('Distance Traveled', distance - remainingDistance);
        console.log('Remaining Bananas', remainingBananas);
    }

    console.log(remainingBananas + 1);

    return remainingBananas + 1;
}

tranfer({
    distance: 1000,
    total: 3000,
    limit: 1000,
    tripLength: 1,
})
```