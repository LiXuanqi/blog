---
title: Design review website like Yelp
date: 2025-06-19
description: ""
tags: ["System Design"]
visible: true
---

## Requirements

**Functional requirements**

- User can search the business by name, category, location
- User can rate the business with rating (1-5 scores) and optional comments
- User can see average score if the business with up to 60-second data latency.

**Non-functional requirements**

- Availability > Consistency: reading the stale score and comments is fine.
- Low latency ({'<'}500ms>) for business search
- DAU: 1M. Peak DAU: 3M

## Core entities

- User: name, ...
- Business: name, category, location, avgScore
- Rate: score, comment, businessId, userId

## APIs

- GET `/businesses?name={}&category={}&lat={}&lng={}`
- GET `/businesses/:businessId/ratings`
- POST `/businesses/:businessId/ratings` body: `{score, comment}`

## High-level design

<ExcalidrawEmbed height={600} src="/yelp-high-level.excalidraw" />

## Deep dive

### How to handle average score?

- "60-second data latency" is the requirement.
- offline (cron job per minute, Flink) works, but it's overkill.
- If each business has avgScore and totalRateCount, we can do a math per write operation.

`(avgScore * totalRateCount) * newScore / (totalRateCount) + 1`

It requires modifying 2 tables, business, rating, so we need transaction.

```sql
BEGIN TRANSACTION;

INSERT ... INTO RATING;
UPDATE ... IN BUSINESS;

COMMIT;
```

### How to handle concurrent write?

- lock the row
- optimistic transaction
