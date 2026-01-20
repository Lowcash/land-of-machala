---
trigger: always_on
---

At the start of a session, load context in this order:

local/INSIGHTS.md for architecture decisions, tech stack, and key learnings.

local/TODOS.md for active tasks and priorities.

The last few entries in CHANGELOG.md for recent changes.

After loading context, summarize:

Project name, environment status (development or production).

Number of active tasks and the main recent changes.

Confirm readiness by asking what to do first, unless a specific task or issue has already been provided.

Detect project type from filesystem and documentation (such as ARCHITECTURE.md and DEVELOPMENT.md) and follow existing patterns in the codebase.