# 🧠 Husky Pre-Commit Hook Rules (v2.0)

## Primary Purpose:
Prevent accidental commits of node_modules/ files into the Git repository.

## ✅ Behavior

| Situation | Result |
|-----------|--------|
| node_modules/ exists on disk | 🆗 Allowed (normal for npm projects) |
| node_modules/ files are staged for commit | 🛑 Blocked (commit aborted) |
| Other files staged | ✅ Allowed |
| ESLint / Prettier | 🔕 No longer run automatically (manual later) |

## 🔒 Hook Code

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🛡️ Running pre-commit validation..."

# Block if any node_modules/ files are staged
if git diff --cached --name-only | grep -q "^node_modules/"; then
  echo "❌ ERROR: node_modules/ files are staged for commit!"
  exit 1
fi

echo "✅ Pre-commit passed."
```

## 📝 Notes

This hook only validates the Git staging area.

Local node_modules/ folders are not a problem and are ignored.

This keeps commits safe and repositories clean without false alarms.

Future linting/formatting tasks will be handled separately.

## Installed Hooks

### pre-commit

The pre-commit hook prevents committing:

- `node_modules/` directory
- Large binary files (.exe, .jar, etc.)
- IDE configuration files (.idea/, .vscode/)
- Environment files that might contain secrets (.env, .env.local, etc.)

It also runs:

- ESLint on staged JavaScript/JSX files
- Prettier on all staged files

## Manual Testing

You can manually test the pre-commit hook by trying to commit one of the forbidden file types:

```bash
# Try to commit a file in node_modules (should fail)
git add node_modules/some-file
git commit -m "test commit"
```

## Troubleshooting

If the hooks are not running:

1. Make sure Husky is installed correctly (`npm run prepare`)
2. Check if the pre-commit file exists in the .husky directory
3. Ensure Git is using the hooks from the .husky directory

For Windows users, ensure Git Bash is installed and configured properly. 