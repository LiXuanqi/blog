---
title: Design distributed job scheduler
date: 2025-08-17
description: ""
tags: ["System design"]
visible: true
---

## Requirement

### Functional requirement

- User can submit the job
- User can run/schedule the job one-time/recurring
- User can view job execution status
- User can define job dependencies. Finished jobs will trigger downstream jobs

### Non-functional requirement

- Scale
- Fault tolerance
- Exactly once vs at least once
- Latency?
- Consistency vs availability?

Depends on systems. e.g. Financial systems: favor consistency. Analytics/ML: favor availability.

- In this design, we prefer the availability, it means we might schedule same job more than once.

- Safa pattern?

### Out of scope

- User can view job execution logs

## Entities

Job:

- name
- cmd
- schedule
- type
- state: ENABLED/DISABLED/RUNNING
- run state:
- triggered_by

Job Execution:

- job_id
- state
- start_at
- retry_count

## API

POST/UPDATE/DELETE /jobs soft-delete

GET /jobs/:jobId
GET /jobs/:jobId/executions/:jobExecutionId
