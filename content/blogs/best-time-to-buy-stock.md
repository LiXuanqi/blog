---
title: Best time to buy stock
date: 2019-01-19
description: "Hello World"
tags: ["Algorithm"]
visible: true
---

## Best Time to Buy and Sell Stock

[Leetcode 121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

When we meet a lower price, we try to buy it, and update the lowest price of buying.

When we meet a higher price, we try to sell it, and update the max profit.

```java
class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        int lowest = Integer.MAX_VALUE;
        for (int price : prices) {
            if (price < lowest) {
                lowest = price;
            } else {
                int diff = price - lowest;
                maxProfit = Math.max(maxProfit, diff);
            }
        }
        return maxProfit;
    }
}
```

## Best Time to Buy and Sell Stock II

[Leetcode 122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

Because we know the prices at the beginning, which means we have the ability to predict the future. So in every round, we try to see the next day's price. we only do the transaction (buy this day, sell next day) when we can make the positive profit. Otherwise, we do nothing.

```java
class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}
```

## Best Time to Buy and Sell Stock III

[Leetcode 123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

The difficulty is how to define the `dp[][]`
There are 5 status:

```
1 ===== buy ====> 2 ===== sell ====> 3 ===== buy =======> 4 ====== sell =====> 5
```

NOTICE:

1. 'Integer.MIN_VALUE' represents impossible.(can't use 0, it creats bug when second buy)
2. `long[][] dp` to avoid that `Integer.MIN_VALUE - prices[i]` makes overflow.
3. when we find the final result, we only check status which are after selling such as 3 and 5.

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) {
            return 0;
        }
        long[][] dp = new long[prices.length][5];
        // dp[i][j]
        // i - day
        // j =
        // 0: none
        // 1: have one
        // 2: none
        // 3: have two
        // 4: none
        dp[0][1] = -prices[0];
        dp[0][2] = Integer.MIN_VALUE;
        dp[0][3] = Integer.MIN_VALUE;
        dp[0][4] = Integer.MIN_VALUE;
        for (int i = 1; i < prices.length; i++) {
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
            dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
            dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
            dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
        }
        int ans = 0;
        for (int i = 0; i < dp.length; i++) {
                ans = Math.max(ans, (int) dp[i][2]);
                ans = Math.max(ans, (int) dp[i][4]);

        }
        return ans;
    }
}
```

## Best Time to Buy and Sell Stock IV

[Leetcode 188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

1. when `k * 2 >= prices.length`, we can do transactions as many as we want, it's similar to `Best Time to Buy and Sell Stock II`. We need to check this case, because when k is too much, it will cost too much memory for `dp[][]`.
2. Otherwise, it's similar to `Best Time to Buy and Sell Stock III`.

```java
class Solution {
    public int maxProfit(int k, int[] prices) {
        if (prices == null || prices.length == 0 || k <= 0) {
            return 0;
        }
        int maxProfit = 0;
        if (k * 2 >= prices.length) {
            for (int i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    maxProfit += prices[i + 1] - prices[i];
                }
            }
            return maxProfit;
        } else {
            long[][] dp = new long[prices.length][2 * k + 1];
            dp[0][0] = 0;
            dp[0][1] = - prices[0];
            for (int i = 2; i < dp[0].length; i++) {
                dp[0][i] = Integer.MIN_VALUE;
            }
            for (int i = 1; i < dp.length; i++) {
                dp[i][0] = dp[i - 1][0];
                for (int j = 1; j < dp[0].length; j++) {
                    // sell
                    if (j % 2 == 0) {
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1] + prices[i]);
                        maxProfit = Math.max(maxProfit, (int) dp[i][j]);
                    } else {
                    // buy
                       dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1] - prices[i]);
                    }
                }
            }
            return maxProfit;
        }
    }
}
```

## Best Time to Buy and Sell Stock with Cooldown

[Leetcode 309. Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

There is a cooldown after selling. And we need hold the stock then we can sell. So we care about the status such as `hold/unhold`, `sell`. There are some combinations.

1. hold
2. not hold, sell at this time.
3. not hold, not sell at this time.

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) {
            return 0;
        }
        // 0: hold
        // 1: not hold, sell
        // 2: not hold, not sell
        long[][] dp = new long[prices.length][3];
        dp[0][0] = -prices[0];
        dp[0][1] = Integer.MIN_VALUE;
        for (int i = 1; i < prices.length; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i]);
            dp[i][1] = dp[i - 1][0] + prices[i];
            dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1]);
        }
        int ans = 0;
        for (int i = 0; i < dp.length; i++) {
            ans = Math.max(ans, (int) dp[i][1]);
            ans = Math.max(ans, (int) dp[i][2]);
        }
        return ans;
    }
}
```

## Best Time to Buy and Sell Stock with Transaction Fee

[Leetcode 714. Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

Because there is the transaction fee so we can't do like `Best Time to Buy and Sell Stock II`. There are two status:

1. hold
2. unhold

It's easy to solve.

```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        if (prices == null || prices.length == 0) {
            return 0;
        }
        // 0: hold
        // 1: not hold
        int[][] dp = new int[prices.length][2];
        dp[0][0] = -prices[0] - fee;
        int ans = 0;
        for (int i = 1; i < dp.length; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i] - fee);
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
            ans = Math.max(ans, dp[i][1]);
        }
        return ans;
    }
}
```
