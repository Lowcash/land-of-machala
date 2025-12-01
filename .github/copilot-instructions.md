````instructions
# GitHub Copilot Instructions

## 🎯 Core Requirements

### Complete Response Policy
**CRITICAL:** Address ALL aspects of user queries comprehensively. Never leave questions unanswered or partially addressed. If a question has multiple components, explicitly address each one.

### 100% Completion Policy
- Deliver production-ready code: tested, functional, documented
- No partial solutions - complete work or clearly state what remains
- Fix errors immediately during completion
- For percentage mentions, add remaining tasks and execute them

### Automation-First Policy (NEW)
**CRITICAL:** Maximize autonomy. Execute automatically WITHOUT waiting for user approval:
- ✅ Do: Create/update files, run linters, commit-ready code, push branches
- ✅ Do: Make architecture decisions within guidelines (follow DEVELOPMENT.md, INSIGHTS.md)
- ✅ Do: Auto-create PR drafts with detailed descriptions (user reviews before merge)
- ❌ Don't: Ask user for approval on each small change
- ❌ Don't: Wait for confirmation before implementing obvious fixes
- ❌ Don't: Stop at "Here's what I would do..." — actually do it
- ⏸️ Only pause for: Major breaking changes, architecture overhauls, user-facing behavior changes

**User involvement:** User reviews final PR, merges when ready. No micro-management.

## 🔧 Code Standards
- **No magic numbers:** Use named constants for literals >1
- **Self-documenting code:** Meaningful names, enums over strings, no unused code
- **Automated linting:** Run `npm run lint`, `npx prettier --write .` after changes
- **Type safety:** TypeScript strict mode, no `any` types, use type guards
- **SOLID Principles:** Single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
- **No duplication:** Reuse existing solutions, consolidate duplicates immediately
- **Constants vs Config:** Immutable = constants, user-optimizable = config
- **Comments:** Explain WHY and CONTEXT only, avoid obvious comments
- **No historical comments:** NEVER include "REMOVED", "Phase X", "cleanup" markers - code shows current state only
- **Server-first:** Use Server Components and Server Actions by default
- **VERIFY BEFORE CLAIMING SUCCESS:** Always test proposed solutions before saying they work (common pattern: propose → implement → claim works → actually fails)

## 🚫 Absolute Prohibitions
- **No long terminal code execution:** Never run complex code blocks in terminal - create script files instead
- **No long terminal output:** Terminal commands MUST NOT produce excessive output (>500 lines). Use head/tail/grep to limit output. For progress tracking, use progress bars or summary counts, not line-by-line logs
- **No auto-commit/push:** NEVER commit or push changes automatically - always let user review and commit manually
- No fallback constants (*_AVAILABLE flags) - fail fast on missing dependencies
- No deprecated code markers - remove immediately
- No long parameter lists (>4) - use parameter objects
- No large classes/components (>200 lines) - split responsibilities
- No redundant comments or reinventing wheels
- **No new constants for existing values** - always reuse existing enums/constants
- No fragile utility functions - handle validation/normalization internally
- **No wildcard imports** - Use named imports (`import { X } from 'Y'` not `import * as Y`)
- **No 'any' types** - Use proper TypeScript types or `unknown` with type guards
- **ABSOLUTE PROHIBITION: Never include historical comments** - No "REMOVED", "Phase X", "cleanup" notes - document current code only
- **ABSOLUTE PROHIBITION: Never add completed tasks to TODO.md** - Completed tasks belong in CHANGELOG.md, not TODO.md
- **ABSOLUTE PROHIBITION: Never create "COMPLETED TASKS" sections in TODO.md** - TODO.md contains ONLY active tasks

## 📚 Documentation Rules

### Key Files (Priority Order)
- **CHANGELOG.md:** Timestamp (YYYY-MM-DD HH:MM) + what changed + why + impact. **Update after EVERY change.**
- **TODOS.md:** Active tasks only (HIGH/MEDIUM/LOW priority). **Update after EVERY task start/completion.**
- **INSIGHTS.md:** High-level project overview, architecture, design decisions. **Update ONLY for major architectural changes.**
- **README.md:** User-facing documentation, setup instructions. **Update ONLY when user-facing behavior changes.**
- **AI_CONTEXT.md:** Meta-guide for AI assistants. **Update when discovering better workflows.**
- **DEVELOPMENT.md:** Development workflow, code standards (internal use). **Rarely updated.**

### Documentation Workflow
1. **Session Start (MANDATORY):**
   - Read INSIGHTS.md (5 min) - Understand WHY things are designed this way
   - Read TODOS.md (2 min) - Know WHAT to work on
   - Read CHANGELOG.md (last 5 entries, 2 min) - Recent changes context
2. **During Work:** Reference documentation for architecture decisions
3. **After EVERY Task Completion (STRICT ROUTINE):**
   ```
   Step 1: Get timestamp (python3 -c "from datetime import datetime; print(datetime.now().strftime('%Y-%m-%d %H:%M'))")
   Step 2: Update CHANGELOG.md (WHAT changed + WHY + IMPACT)
   Step 3: Update TODOS.md (mark completed, add new)
   Step 4: Update INSIGHTS.md (ONLY if architectural decision changed)
   Step 5: Update README.md (ONLY if user-facing behavior changed)
   ```
4. **INSIGHTS.md:** Keep concise (<500 lines), AI-readable, focused on essential context
5. **COMPLETED TASKS WORKFLOW:**
   - When a task is completed, REMOVE it from TODO.md immediately
   - Add completion details to CHANGELOG.md with timestamp
   - NEVER create "COMPLETED TASKS" sections in TODO.md
   - TODO.md contains ONLY active, actionable tasks
6. **README.md Maintenance:**
   - Update when user-facing features change
   - Remove outdated information immediately
   - Keep aligned with actual project state

### Timestamp Generation
Use: `python3 -c "from datetime import datetime; print(datetime.now().strftime('%Y-%m-%d %H:%M'))"`
(Keep Python for timestamp - works on all platforms)

## ⚡ Quality Assurance
- **Every change:** Document state, batch related changes (≤5 files), validate after each group
- **Never:** Change unrelated files without validation, start new features while existing code is broken
- **Always:** Preserve working interfaces, test before/after changes
- **Quick mode:** For small tasks (<3 files), skip full validation, just syntax check and basic tests

## 🧪 Testing Standards
- **Test-first for bug fixes:** Write failing test before fixing bug
- **Coverage target:** 80% for core modules (entity/, lib/, app/actions/)
- **No skipped tests in production:** Skip only in dev with TODO comment
- **Mock external dependencies:** Database (Prisma), Server Actions, external APIs
- **Integration tests for critical paths:** Authentication, character creation, combat, quests
- **Regression tests required:** All production bugs must have test preventing recurrence
- **Use Vitest:** Unit tests with `vitest`
- **Use Testing Library:** Component tests with `@testing-library/react`
- **Use Playwright:** E2E tests for critical user journeys

## 🔍 Code Review Standards
- **Self-review first:** Run full checklist before creating PR
- **Small PRs preferred:** Max 400 lines changed for easier review
- **Single responsibility:** One feature/fix per PR, no mixing concerns
- **Test evidence required:** Show test results in PR description
- **Breaking changes:** Document migration path in CHANGELOG with examples
- **Mandatory checks:** Linters passed, tests passed, CHANGELOG updated, TODOS.md cleaned

## 📊 Logging Standards
- **Log levels:**
  - DEBUG: Verbose internal state (enable via --verbose flag)
  - INFO: State changes, signals, important milestones only
  - WARNING: Recoverable errors, deprecated features
  - ERROR: Failures requiring immediate intervention
- **Throttle repetitive logs:** Session-based deduplication for warnings
- **No noise in production:** Default INFO level, <10 lines per minute in normal operation
- **Structured context:** Always include timestamp, component name, relevant IDs
## 💰 Token Usage & Efficiency Standards

### Unified Context Tracking Format
All AI agents MUST report token usage in this format:

**Session Report Template:**
```
📊 Context: <used>k / <budget>k tokens (<percent>%)
⏱️ Model: [Claude Haiku 4.5 | Claude Sonnet 4.5 | Other]
⏱️ ETA: <specific activity description>
```

**Example:**
```
📊 Context: 51k / 200k tokens (25.5%)
⏱️ Model: Claude Haiku 4.5
⏱️ ETA: ~20 min (test coverage phase + updating Server Actions)
```

**Guidelines:**
- **Used tokens:** Actual value from context window
- **Budget:** 200k per default agent session (escalate to Sonnet if approaching 80%)
- **Percent:** (used ÷ budget) × 100, round to nearest 1%
- **Model:** Explicit model name (enables future multi-model routing)
- **ETA:** Specific, actionable (NOT "implementation" but "adding 15 Server Action tests + manager tests")

### Token Economy Rules
- ✅ **Maximize per-session work:** Ask agents to batch 3–5 related tasks (not atomic 30-min tasks)
- ✅ **Minimize searches:** Each grep_search counts ~500 tokens; batch searches in one call
- ✅ **GitHub storage:** Artifacts clean-up handled via GitHub settings (7-day retention), not scripts
- ✅ **Coverage reports:** Generate only on current branch/dev branches (not main/beta until release)
- ⚠️ **Context escalation:** If usage >85%, switch to Sonnet 4.5 or summarize + restart with new agent

### Session Handoff Protocol
**If approaching token limit (>85% used):**
1. Create summary of completed work + remaining tasks
2. Add summary to CHANGELOG.md as "Session checkpoint"
3. Provide new agent: INSIGHTS.md + latest CHANGELOG entry + specific remaining task
4. New agent reads checkpoint first, resumes from there (no re-context needed)
## �🤖 AI Agent Rules

### Collaboration Model (Established 2025-10-20)
**User's Role:** Architecture, strategy, business logic decisions, final approval, project leadership
**AI's Role:** Implementation, technical analysis, code quality, testing, documentation, execution

**Default Workflow:**
1. **User provides direction** - "what" and "why" (architectural decisions, priorities)
2. **AI implements solution** - "how" (code, tests, refactoring, optimization)
3. **AI explains options** - when multiple approaches exist, present trade-offs
4. **User decides on trade-offs** - strategic choices (performance vs simplicity, time investment)
5. **AI provides realistic estimates** - AI execution time, not human time (minutes/hours for AI vs hours/days for human)

**AI Autonomy:**
- Full autonomy on: Code style, variable names, file organization, test structure, implementation details
- Consultation required: Architecture changes, breaking changes, major refactoring scope
- Always explain: Why specific approach chosen, trade-offs, alternatives considered

**Quality Standards:**
- Production-ready code by default (tested, linted, documented)
- Realistic time estimates: AI can refactor 1000+ lines in ~10-30 minutes (vs hours/days for human)
- Progress updates: After each major milestone (e.g., "Task 1/3 complete")
- Continuous execution: Don't stop for approval unless architecture decision required

**Effort Estimation Guidelines (AI Execution):**
- Quick fix: <5 minutes (single file, simple change)
- Medium task: 10-20 minutes (multiple files, refactoring, tests)
- Major refactoring: 20-30 minutes (1000+ line class split, full test validation)
- Complex feature: 30-60 minutes (new subsystem, integration tests, documentation)

### Session Management
- **Session Start:** ALWAYS read INSIGHTS.md and TODO.md to understand current state and architecture
- **Before Changes:** Verify assumptions by reading relevant files - never rely on memory alone
- **Context Validation:** When unsure, use grep_search or semantic_search to verify facts
- Critical failures trigger immediate correction or session restart
- At session end: Update documentation with current state, known issues, next priorities

### Anti-Hallucination Protocols
1. **Verify Before Acting:** Read files before editing, search codebase before assuming patterns
2. **Small Batch Changes:** Max 5 files per batch, validate each batch before proceeding
3. **Test After Changes:** Run linters, syntax checks, or tests after each modification group
4. **Cross-Reference:** When modifying constants/enums, search for all usages first
5. **Document Uncertainty:** If unsure about something, search/read rather than guess

### State Preservation
- **INSIGHTS.md is Source of Truth:** When in doubt about architecture/patterns, consult INSIGHTS.md
- **After code changes affecting constants/config:** Add "Review [constants_module] for patterns" to TODO tracking
- **Breaking Interface Changes:** Document in CHANGELOG with migration guide
- **Never modify working code** without explicit reason and validation plan

## 🌐 Language & Communication
- **Chat Language:** Adapt to the user's language (Czech). If the user speaks Czech, reply in Czech.
- **Code Language:** ALWAYS use English for code, comments, commit messages, and documentation.
- **Technical Terms:** Keep standard technical terms in English (e.g., "Server Actions", "Props", "Hook") even when speaking Czech.

## 🏗️ Project Architecture
- **Entity Pattern:** Always use `entity/*` modules for data fetching and domain logic. Do not call `db.*` directly in UI components.
- **Server Actions:** Use `actionClient` or `playerActionClient` from `@/lib/safe-action` for mutations.
- **Prisma:** Schema is split in `prisma/schema/*.prisma`. Use `prisma/seed.ts` for initial data.
```
````
