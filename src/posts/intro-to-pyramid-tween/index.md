---
title: Intro to Pyramid Tween 
date: "2020-11-12T21:40:03.284Z"
description: ""
tags: ['Python']
visible: true 
---


## What is Tween?

Tween is a contraction of the word "between" that sits between Pyramid router component and upstream WSGI component. 

It behaves a bit like WSGI Middleware, but have the ability to access the Pyramid application. (e.g. registry, template)

> application registry: 
> 
> A registry of configuration information consulted by Pyramid while servicing an application. An application registry maps resource types to views, as well as housing other application-specific component registrations. Every Pyramid application has one (and only one) application registry.

## Why use Tween?

Tween is similar to python decorators. It's used to  <Box>**apply a common behavior for all requests**</Box>.

There are some examples:
- validation (request parameters' type)
- monitoring (add zipkin header, timer)
- add special headers (add `Access-Control-Allow-Origin` to allow CORS)

## The lifecycle of request
add picture here.

## How to write the tween?
Create the tween factory.

```python
def tween_factory(handler, registry):
    if registry.settings['is_enable']:
        def tween_func(request):
            response = handler(request)
            return responnse
        return tween_func
    return handler
```

`handler`: The next tween in the stack.

`registry`: the pyramid registry

## Control the order of tweens