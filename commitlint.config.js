module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Formatting, missing semicolons, etc
        'refactor', // Code change that neither fixes bug nor adds feature
        'perf', // Performance improvement
        'test', // Adding tests
        'chore', // Updating build tasks, package manager configs, etc
        'revert', // Revert previous commit
        'ci', // CI/CD changes
      ],
    ],
    'subject-case': [0], // Allow any case for subject
  },
}
