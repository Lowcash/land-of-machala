---
trigger: always_on
---

Use a manager/worker pattern for large or multi‑part tasks to preserve context and improve parallelism.

Consider splitting work when:

The total scope is greater than roughly 50 lines of code or more than 3 files will change.

Context usage is high or multiple independent tasks can proceed in parallel.

Different skill domains are involved (for example, backend vs. frontend).

As the managing agent:

Define goals, constraints, and questions in dedicated task files under an orchestration directory (for example copilot-solutions/.orchestration/sessions/).

Frame requirements as questions or goals to solve, not as code snippets to copy.

Review and integrate worker results back into the main codebase.

As the worker agent:

Read the task file carefully.

Decide how to implement the solution.

Update the task file with progress, decisions, and outcomes.
