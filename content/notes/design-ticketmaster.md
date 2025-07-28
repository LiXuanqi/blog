---
title: Design Ticketmaster
date: 2025-06-22
description: ""
tags: ["System Design"]
visible: true
---

## Functional requirements

- User should be able to view events
- User should be able to search events
- User should be able to book the ticket

## Non-functional requirements

- booking system should prioritize consistency.
- prioritize availability for view and search events
- Hot events
- low latency when view/search events
- read heavy

## Core entities

Event:

- id
- name
- stadium

Stadium:

- id
- seats
- location

Seat:

- id
- status

Ticket:

- id
- seat_id

User:

- ...

## APIs

- `GET /events/:eventId`
- `GET /events?keyword={}`
- `POST /events?action=reserve` body: `{ticketIds: []}`
- `POST /payment` body: `{reservation_id: []}`

## High-level design

<ExcalidrawEmbed height={600} src="/ticketmaster-high-level.excalidraw" />

## Deep dives

- reserve tickets
- popular events
- search experience
- frequently repeated search queries
