# Scripts

This directory contains utility scripts for testing, maintenance, and automation.

## Available Scripts

### `test-full-flow.ts`

Tests the complete user journey including:

1. User registration (creation)
2. Character creation
3. Data verification
4. Cleanup

**Usage:**

```bash
npx ts-node scripts/test-full-flow.ts
```

### `create-test-user.ts`

Creates a standalone test user for manual testing.

### `reset-dev-data.ts`

Resets development data to a clean state. Use with caution.

### `unlock-skills.ts`

Utility to unlock skills for testing purposes.

## Shell Scripts

- `test-auth.sh`: Bash script to test authentication endpoints.
- `test-routes.sh`: Bash script to verify API routes.
- `test-character-creation.sh`: Bash script to batch test character creation.
