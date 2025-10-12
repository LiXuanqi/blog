---
title: Server-send event
date: 2025-08-26
description: ""
tags: ["System design"]
visible: true
---

## What is server-send event?

Server-Sent Events (SSE) is a web standard that enables a server to push data to a web page in real-time over a single HTTP connection

Scenario: one-way communication from server to client

## How it works?

SSE uses a persistent HTTP connection where the server keeps the connection open and sends data whenever it's available

The client subscribes to this stream using JavaScript's EventSource API.

```javascript
const eventSource = new EventSource("/events");

eventSource.onmessage = function (event) {
  console.log("Received:", event.data);
};
```

server-side response header example:

```
Content-Type: text/event-stream

// This tells browsers and intermediate proxies not to cache the response
Cache-Control: no-cache

// This instructs the browser to keep the HTTP connection open rather than closing it after receiving the response
Connection: keep-alive
```

## Pros and Cons

Pros:

- Much simpler than WebSockets
- Automatic retry mechanism
- HTTP-friendly
- Resue the same connection for multiple messages

Limitations:

- one-way only
- Text-based
- Browser limit: Browsers typically limit concurrent SSE connections (usually 6 per domain)
- No binary data. (WebSockets supports)
