---
trigger: always_on
---

After completing each task, update documentation in this priority:

CHANGELOG.md with timestamp, type, scope, and impact of the change.

local/TODOS.md to remove completed tasks and add any new tasks discovered.

local/INSIGHTS.md only when there are meaningful architecture or design learnings.

README.md only when user‑facing behavior or setup steps change.

Keep local/TODOS.md focused on active, actionable tasks only; do not maintain “completed tasks” sections.

Document decisions and their rationale, not step‑by‑step processes that can be inferred from the code or commit history.