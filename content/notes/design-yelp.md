---
title: Design Review Website Like Yelp
date: 2025-06-19
description: ""
tags: ["System Design"]
visible: true
---

## Requirements

**Functional Requirements**

- Users can search for businesses by name, category, and location
- Users can rate businesses with a rating (1-5 stars) and optional comments
- Users can see the average score of businesses with up to 60-second data latency

**Non-functional Requirements**

- Availability > Consistency: reading stale scores and comments is acceptable
- Low latency ({'<'}500ms) for business search
- DAU: 1M, Peak DAU: 3M

## Core Entities

- User: name, ...
- Business: name, category, location, avgScore
- Rating: score, comment, businessId, userId

## APIs

- GET `/businesses?name={}&category={}&lat={}&lng={}`
- GET `/businesses/:businessId/ratings`
- POST `/businesses/:businessId/ratings` body: `{score, comment}`

## High-level Design

<ExcalidrawEmbed height={600} src="/yelp-high-level.excalidraw" />

## Deep Dive

### How to Handle Average Score?

The requirement allows for 60-second data latency. An offline approach (cron job per minute, Flink) would work, but it's overkill for this scale.

If each business stores `avgScore` and `totalRatingCount`, we can calculate the new average on each write operation:

```
newAvgScore = (avgScore × totalRatingCount + newScore) / (totalRatingCount + 1)
```

This requires modifying two tables (business and rating), so we need a transaction:

```sql
BEGIN TRANSACTION;

INSERT ... INTO rating;
UPDATE ... SET avg_score = ..., total_rating_count = ... WHERE business_id = ...;

COMMIT;
```

### How to Handle Concurrent Writes?

Two main approaches:

- **Row locking**: Lock the business row during updates
- **Optimistic concurrency control**: Use version numbers and retry on conflicts
