@echo off
echo 🛡️ Running pre-push validation...

:: Get current branch name
for /f "tokens=*" %%a in ('git symbolic-ref --short HEAD') do set branch=%%a

if "%branch%"=="main" (
  echo 🔍 Checking for sensitive files in main branch...
  
  :: Check for development files that shouldn't be in main
  git diff --cached --name-only | findstr /R "node_modules \.env \.log \.DS_Store" >nul
  if not errorlevel 1 (
    echo 🚫 Prevented push to main with development files.
    echo ❌ Please remove the files listed above from your commit.
    exit /b 1
  )
  
  :: Check for unfinished work markers
  git diff --cached -U0 | findstr /R "TODO FIXME console\.log debugger" >nul
  if not errorlevel 1 (
    echo 🚫 Prevented push to main with unfinished work.
    echo ❌ Please remove TODOs, FIXMEs, console.logs, or debugger statements.
    exit /b 1
  )
  
  echo ✅ Main branch validation passed.
)

echo ✅ Pre-push hook completed successfully.
exit /b 0 