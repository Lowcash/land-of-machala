# 🤖 GitHub Copilot Instructions (Meta-Driven Development)

---

## 🎯 Core Requirements

### Complete Response Policy

**CRITICAL:** Address ALL aspects of user queries comprehensively. Never leave questions unanswered or partially addressed.

### 100% Completion Policy

- Deliver production-ready code: tested, functional, documented
- No partial solutions - complete work or clearly state what remains
- Fix errors immediately during completion
- For percentage mentions, add remaining tasks and execute them

### Code Standards (Universal)

- **No magic numbers:** Use named constants for literals >1
- **Self-documenting code:** Meaningful names, explicit types, no unused code
- **Automated linting:** Run linting & formatting after changes
- **SOLID Principles:** Single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
- **No duplication:** Reuse existing solutions, consolidate duplicates immediately
- **Constants vs Config:** Immutable = constants, user-optimizable = config
- **Comments:** Explain WHY and CONTEXT only, avoid obvious comments
- **VERIFY BEFORE CLAIMING SUCCESS:** Always test proposed solutions before claiming they work

### Absolute Prohibitions

- ❌ No "REMOVED", "Phase X", "cleanup" markers in code
- ❌ No historical/TODO comments - document current state only
- ❌ No `any` types or implicit conversions
- ❌ No fallback flags (e.g., `*_AVAILABLE`) - fail fast on missing dependencies
- ❌ No long parameter lists (>4) - use parameter objects
- ❌ Code shows current state only, never past states

---

## 🚀 Session Start Protocol

### Step 1: Load Context (2 minutes)

**Read in this order:**

1. **local/INSIGHTS.md** - Architecture decisions, tech stack, key learnings
2. **local/TODOS.md** - Active tasks, priorities, owners
3. **CHANGELOG.md** (last 5 entries) - Recent changes context

**Then report:**

```
✅ Context loaded (2 min)

Project: [name]
Status: [Development / Production]
Active tasks: [count from TODOS.md]
Recent changes: [what changed last]

What should I do first?

📊 Context: XXk / 200k tokens (XX%)
⏱️ Model: Claude Haiku 4.5
⏱️ ETA: Awaiting instructions
```

### Step 2: Auto-Detect Project Type

**Detect from filesystem:**

- Analyze directory structure and configuration files to identify stack.
- Read `ARCHITECTURE.md` and `DEVELOPMENT.md` (filled from templates).
- Understand project-specific patterns from existing code.

---

## 🤖 Master Agent Delegation Rules

**Why Delegate?**

1. **Context Preservation:** Prevent context window overflow by offloading detailed work.
2. **Parallelization:** Execute independent tasks simultaneously (e.g., Frontend & Backend).
3. **Specialization:** Use agents with specific prompts/tools for distinct domains.

**When to Split Work:**

1. **Total scope >50 lines of code** OR **>3 files changed**
2. **Context usage >70%** (Proactive offloading)
3. **Multiple independent tasks** (Phase 1 doesn't block Phase 2)
4. **Different skill domains** (ML training vs. Frontend UI)

**Workflow (Manager/Worker Pattern):**

- **Master Agent (Manager):**
  - Defines the **"What"** and **"Why"** (Goals, Constraints, Questions to answer).
  - Creates Task Context Files.
  - Reviews and integrates results.
- **Slave Agent (Worker):**
  - Determines the **"How"** (Implementation details).
  - Executes the task autonomously.
  - Reports back via the Task Context File.

**Delegation Protocol:**

1. Create a task file in `copilot-solutions/.orchestration/sessions/task-[ID]-[NAME].md`.
2. Define **Context**, **Goal**, and **Definition of Done**.
3. **Crucial:** Frame requirements as _questions/goals_ to solve, not just code to copy.
4. Instruct Slave Agent to read this file and execute.
5. Slave Agent updates the task file with progress.

---

## 🔄 Commit Standards (Conventional Commits)

**Format:** `<type>(<scope>): <subject>` (max 50 chars)

**Types:** `feat|fix|refactor|docs|test|chore|perf|style`

**Rules:**

- Imperative mood ("add", not "added")
- No period at end
- ~50 characters max
- Scope optional
- **Keep it short.** Body only if WHY is non-obvious.

**Examples (GOOD):**

```
feat(ml): add ensemble voting weights optimization
fix(data): handle utf-16 encoding in mt5 exports
refactor: consolidate duplicate validation logic
```

---

## 🧪 Testing Standards

### Coverage Targets

- **Core modules:** >80% coverage
- **Feature/Entity layer:** >80% coverage
- **Utils:** >70% coverage
- **UI/Components:** >70% coverage

### Test Structure

- **Unit tests:** Individual functions/components in isolation
- **Integration tests:** Component interactions, data flow
- **E2E tests:** Critical user journeys (web projects only)
- **Fixtures/Mocks:** External dependencies (files, APIs, databases)

### Test-First for Bugs

1. Write failing test (reproduces bug)
2. Implement fix to make test pass
3. Verify test passes + no regression

### Mock External Dependencies

- File I/O → use temp directories or mocks
- APIs → mock responses
- Databases → test fixtures or in-memory DBs
- ML models → synthetic test data

---

## 📚 Documentation Workflow (STRICT)

### After EVERY task completion (Non-negotiable):

**Step 1: Get timestamp**

```bash
python3 -c "from datetime import datetime; print(datetime.now().strftime('%Y-%m-%d %H:%M'))"
```

**Step 2: Update CHANGELOG.md**

```markdown
## 2025-MM-DD HH:MM - [Task Name]

**Type:** [Added | Fixed | Changed]
**Scope:** [Module/Component]
**Impact:** [What improved, metrics if applicable]

### [Type]

- **[Component]:** What changed + why
- **[Tests]:** What was tested
```

**Step 3: Update TODOS.md**

- Remove completed task
- Add any new tasks discovered during work
- Keep ONLY active, actionable tasks (no "COMPLETED TASKS" sections)

**Step 4: Update INSIGHTS.md** (ONLY if architecture changed)

- Add learned patterns
- Update tech stack notes if new tools added
- Keep <200 lines total

**Step 5: Update README.md** (ONLY if user-facing behavior changed)

### Key Files Priority

1. **CHANGELOG.md** - ALWAYS update (strict, non-negotiable)
2. **TODOS.md** - ALWAYS update (mark completed)
3. **INSIGHTS.md** - Update ONLY for architectural changes
4. **README.md** - Update ONLY for user-facing behavior changes

### TODOS.md Rule (Absolute)

- ✅ Contains ONLY active, actionable tasks
- ❌ NEVER create "COMPLETED TASKS" sections
- ✅ Completed tasks → CHANGELOG.md with timestamp + details

---

## 🚫 Anti-Patterns (Universal)

### Forbidden Patterns:

```
❌ Magic numbers               → ✅ Named constants
❌ Fallback flags              → ✅ Fail fast on missing deps
❌ God classes (>200 lines)    → ✅ Single responsibility
❌ Props drilling (>2 levels)  → ✅ Context/composition
❌ Deprecated code markers     → ✅ Remove immediately
❌ Long parameter lists (>4)   → ✅ Parameter objects
❌ `any` type in TS            → ✅ Explicit types
❌ Implicit conversions        → ✅ Explicit casting
❌ Historical comments         → ✅ Current state only
❌ Unused code                 → ✅ Remove before commit
```

---

## 🔍 Validation Checklist (Before Commit)

Before every commit:

- ✅ Linting passes (project-specific rules)
- ✅ All tests pass
- ✅ Type check passes (if applicable)
- ✅ Build/compile check passes
- ✅ CHANGELOG.md updated (ALWAYS)
- ✅ TODOS.md cleaned (ALWAYS)
- ✅ No console.log/print debugging left
- ✅ No commented code left

---

## 🔄 Best Practices Research (When Uncertain)

**When to research online:**

- ✅ Framework updated recently (React 19, Next.js 15, scikit-learn changes)
- ✅ New patterns mentioned (Server Components, Async Actions)
- ✅ Performance optimization needed
- ✅ Security concerns (auth, encryption)
- ✅ Library deprecation suspected

**How to research:**

1. Check official documentation FIRST
2. Search GitHub trending projects in category
3. Cross-reference multiple sources (not just first Google result)
4. Benchmark if performance critical
5. Propose: "Found X pattern, should we use it? (yes/no)"

**Report findings:**

- What you found
- Why it's relevant
- Alternatives considered
- Recommendation with reasoning

---

## 💰 Token Tracking (Every Response)

**Include in every response:**

```
📊 Context: XXk / 200k tokens (XX%)
⏱️ Model: Claude Haiku 4.5
⏱️ ETA: [specific activity being done]
```

**Example:**

```
📊 Context: 67k / 200k tokens (33.5%)
⏱️ Model: Claude Haiku 4.5
⏱️ ETA: ~15 min (refactoring FeatureEngineer + tests)
```

---

## 💬 Communication & English Feedback

**Primary Language:** English 🇬🇧 (with learning support)

**When to provide feedback:**

- After code work completion
- 1-3 language items max (focused, not overwhelming)
- Focus on: Natural phrasing, business English, common patterns
- Tone: Encouraging, constructive, educational

**Format:**

```
📝 English Notes:
- "I will help you" → More natural: "I'll help you" (contractions common in tech)
- "Maybe let's try to switch" → More direct: "Let's switch"
- Good use of: "don't repeat yourself" (idiomatic!)
```

**Never:**

- Correct grammar in code comments (focus on communication)
- Over-explain simple rules
- Use pedantic tone

---

## 📁 File Structure (Standard for All Projects)

```
project/
├── docs/
│   ├── ARCHITECTURE.md         # Project architecture decisions (filled)
│   └── README.md               # Project overview & setup
├── local/                       # Local state (not committed)
│   ├── INSIGHTS.md            # Key learnings, tech decisions
│   └── TODOS.md               # Active tasks only
├── CHANGELOG.md               # Change history with timestamps
├── .github/
│   └── copilot-instructions.md # AI guidance (if project-specific)
├── CONFIG_GUIDE.md            # Setup & environment (delete after setup)
├── DEVELOPMENT.md             # Development methodology
└── [project-specific folders]
```

---

## 🎯 TL;DR - Core Workflow

**Session start:**

1. Load INSIGHTS → TODOS → CHANGELOG (2 min)
2. Auto-detect project type
3. Report status and ask what to do first

**During work:**

- Follow code standards (no magic numbers, self-documenting)
- Test-first for bugs
- Linting after changes

**After EVERY task (STRICT):**

- Update CHANGELOG.md (timestamp + what + why + impact)
- Update TODOS.md (remove completed, add new)
- Update INSIGHTS.md (ONLY if architecture changed)
- Validate all checks pass before commit

**Key mindset:**

- Research modern practices (not prescriptive templates)
- Fail fast on missing dependencies
- Production-ready code always
- Document decisions, not processes

---

## 📖 Where to Find Project-Specific Info

- **ARCHITECTURE.md** → How this project is structured
- **DEVELOPMENT.md** → How to work on this project
- **CONFIG_GUIDE.md** → How to set up tools & environment
- **local/INSIGHTS.md** → What you've learned in this project
- **CHANGELOG.md** → What's changed and why
- **Existing code** → Best reference for "how we do things here"

---

**Status:** Production-ready ✅  
**Version:** 2.0 (Consolidated, meta-driven)  
**Last Updated:** 2025-12-12
