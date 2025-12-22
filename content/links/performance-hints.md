---
title: "Performance Hints"
image: "https://code.visualstudio.com/assets/images/code-stable.png"
url: "https://abseil.io/fast/hints.html"
category: "Development"
date: "2024-01-13"
description: "Performance tuning suggestions from Jeff Dean and Sanjay."
---

## Overview

“let’s write down the code in as simple a way as possible and deal with performance later when we can profile” is wrong.

- no obvious hotspots because performance is lost all over the place.
- hard to re-architecture if it's heavy use
- mask the root cause
  choose the faster alternative if it does not impact readability/complexity of the code significantly.

## Estimation

```
L1 cache reference                             0.5 ns
L2 cache reference                             3 ns
Branch mispredict                              5 ns
Mutex lock/unlock (uncontended)               15 ns
Main memory reference                         50 ns
Compress 1K bytes with Snappy              1,000 ns
Read 4KB from SSD                         20,000 ns
Round trip within same datacenter         50,000 ns
Read 1MB sequentially from memory         64,000 ns
Read 1MB over 100 Gbps network           100,000 ns
Read 1MB from SSD                      1,000,000 ns
Disk seek                              5,000,000 ns
Read 1MB sequentially from disk       10,000,000 ns
Send packet CA->Netherlands->CA      150,000,000 ns
```

back of the envelope calculations can be used to discard some of the alternatives without having to implement them.

"Being able to measure things effectively is the number one tool you’ll want to have in your arsenal when doing performance-related work."

## Takeaways
