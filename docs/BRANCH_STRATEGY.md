# Branch Strategy Recommendation

## Current Situation

The repository currently has branches: `dev`, `beta`, `main`

## Recommended Strategy

### Option 1: GitFlow-inspired (Recommended)

```
main (production)
  └── staging (pre-production testing)
       └── dev (integration branch)
            └── feature/* (feature branches)
```

**Benefits:**

- Clear separation of environments
- `main` always represents production-ready code
- `staging` allows final testing before production
- `dev` is the integration point for all features
- Feature branches keep work isolated

**Workflow:**

1. Create feature branch from `dev`: `git checkout -b feature/my-feature dev`
2. Work on feature, commit changes
3. Create PR to merge `feature/my-feature` → `dev`
4. After testing in dev, PR `dev` → `staging`
5. After staging validation, PR `staging` → `main`
6. Deploy `main` to production

**Branch Protection Rules:**

- `main`: Require PR reviews, require status checks, no direct pushes
- `staging`: Require PR review, require passing tests
- `dev`: Require PR review

### Option 2: Simplified (If team is small)

```
main (production)
  └── dev (integration + staging)
       └── feature/* (feature branches)
```

**Benefits:**

- Simpler workflow
- Fewer branches to manage
- Good for small teams (1-3 developers)

**Workflow:**

1. Create feature branch from `dev`
2. PR to `dev`
3. Test in `dev`
4. PR to `main` when ready for production

### Naming Convention

**Current branches:**

- Rename `beta` → `staging` (more industry-standard)
- Keep `main` as production
- Keep `dev` as development/integration

**Feature branches:**

- Format: `feature/descriptive-name` or `copilot/descriptive-name`
- Examples:
  - `feature/user-authentication`
  - `feature/quest-system`
  - `copilot/update-login-ux`

**Bug fix branches:**

- Format: `fix/descriptive-name`
- Example: `fix/prisma-connection-error`

**Hotfix branches** (urgent production fixes):

- Format: `hotfix/descriptive-name`
- Branch from `main`, merge back to both `main` and `dev`

## Migration Steps

1. **Rename beta to staging:**

   ```bash
   git branch -m beta staging
   git push origin :beta  # Delete old branch
   git push origin staging
   ```

2. **Set up branch protection rules** in GitHub repo settings

3. **Document the workflow** for all contributors

## Recommendation

For this project, **Option 1 (GitFlow-inspired)** is recommended because:

- Clear environment separation (dev → staging → production)
- Reduces risk of broken production deployments
- Industry-standard approach
- Scales well as team grows

## Additional Considerations

- Use semantic versioning for production releases
- Tag production releases: `git tag -a v2.0.1 -m "Release 2.0.1"`
- Keep CHANGELOG.md updated with each production release
- Consider automated CI/CD pipelines:
  - `dev` → Auto-deploy to dev environment
  - `staging` → Auto-deploy to staging environment
  - `main` → Manual approval + auto-deploy to production

---

**Status:** Recommendation  
**Last Updated:** 2026-01-10  
**Maintainer:** Land of Machala Team
