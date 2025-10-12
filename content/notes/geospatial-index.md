---
title: Geospatial index
date: 2025-08-24
description: ""
tags: ["System design"]
visible: true
---

## What is Geospatial index?

Geospatial indexes are specialized data structures that organize geographic data to enable fast spatial queries like "find all restaurants within 2 miles" or "get the nearest gas station.

## Common geospatial index types

### R-tree

### Quadtrees

Basic principle:

- Start with a bounding square that encompasses all your data
- If a region contains more data than a threshold, split it into 4 equal quadrants
- Continue recursively until each region has few enough points or reaches maximum depth

Pros:

- Efficient for range queries and nearest neighbor searches
- Easy to parallelize operations

Cons:

- If all points cluster in one quadrant, tree becomes unbalanced
- Can degrade to linear search in worst case
- Boundary issues: Objects near quadrant boundaries may require checking multiple quadrants

In general, quadtrees is good for:

1. uneven distributed
2. updates is less frequent. cost of reindex.

#### Examples

### Geohashing

Geohashing is a geocoding technique that converts 2D geographic coordinates (latitude, longitude) into a single short alphanumeric string

nearby locations have similar geohashes, making it perfect for proximity searches

### Grid-based indexes

Algorithm:

- Start with latitude and longitude ranges (-90 to 90, -180 to 180)
- Use binary search to narrow down the location
- Alternate between longitude and latitude bits
- Encode the binary result using Base32

e.g. (40.6892, -74.0445)

```
Initial ranges:
Latitude: [-90.0, 90.0]
Longitude: [-180.0, 180.0]

Bit 0 (longitude): -74.0445 vs 0.0
-74.0445 < 0, so bit = 0, new range: [-180.0, 0.0]

Bit 1 (latitude): 40.6892 vs 0.0
40.6892 > 0, so bit = 1, new range: [0.0, 90.0]

Bit 2 (longitude): -74.0445 vs -90.0
-74.0445 > -90.0, so bit = 1, new range: [-90.0, 0.0]

Bit 3 (latitude): 40.6892 vs 45.0
40.6892 < 45.0, so bit = 0, new range: [0.0, 45.0]
```

Properties:

- longer = more precision
- longer common prefixes = closer locations

Pros:

1. just a string - database/url friendly

Cons:

- Points very close geographically might have different prefixes
- Especially problematic at boundaries (equator, prime meridian)
- Non-uniform areas

#### Examples

Redis geospatial commands

```
# Store locations with geohash
GEOADD cities -74.0445 40.6892 "New York"

# Find nearby cities (uses geohash internally)
GEORADIUS cities -74.0445 40.6892 100 mi

# Get geohash of a location
GEOHASH cities "New York"  # Returns: dr5regw3p
```

DynamoDB
