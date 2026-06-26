#!/bin/bash
# Pre-commit validation hook
# Detects changed services and runs targeted compilation/lint checks

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ERRORS=""

# Get staged files
STAGED_FILES=$(cd "$PROJECT_ROOT" && git diff --cached --name-only 2>/dev/null || echo "")

if [ -z "$STAGED_FILES" ]; then
    echo '{"continue": true}'
    exit 0
fi

# Check if common module changed
COMMON_CHANGED=$(echo "$STAGED_FILES" | grep "^backend/common/" || true)
if [ -n "$COMMON_CHANGED" ]; then
    echo "Common module changed — rebuilding..." >&2
    if ! (cd "$PROJECT_ROOT/backend/common" && mvn clean install -q 2>&1); then
        ERRORS="$ERRORS\nCommon module build failed"
    fi
fi

# Find affected backend services
BACKEND_SERVICES=$(echo "$STAGED_FILES" | grep "^backend/" | grep -v "^backend/common/" | grep -v "^backend/kafka-setup/" | grep -v "^backend/observability-setup/" | sed 's|backend/\([^/]*\)/.*|\1|' | sort -u || true)

for SERVICE in $BACKEND_SERVICES; do
    SERVICE_DIR="$PROJECT_ROOT/backend/$SERVICE"
    if [ -d "$SERVICE_DIR" ] && [ -f "$SERVICE_DIR/pom.xml" ]; then
        echo "Compiling $SERVICE..." >&2
        if ! (cd "$SERVICE_DIR" && mvn compile -q 2>&1); then
            ERRORS="$ERRORS\n$SERVICE compilation failed"
        fi
    fi
done

# Check frontend changes — lint only staged files (not the entire project)
FRONTEND_CHANGED=$(echo "$STAGED_FILES" | grep "^frontend/ecommerce/src/.*\.\(ts\|tsx\)$" || true)
if [ -n "$FRONTEND_CHANGED" ]; then
    echo "Linting staged frontend files..." >&2
    FRONTEND_FILES=$(echo "$FRONTEND_CHANGED" | sed "s|^frontend/ecommerce/||" | tr '\n' ' ')
    if ! (cd "$PROJECT_ROOT/frontend/ecommerce" && npx eslint --fix $FRONTEND_FILES 2>&1); then
        ERRORS="$ERRORS\nFrontend lint failed on staged files"
    fi
fi

# Report results
if [ -n "$ERRORS" ]; then
    echo -e "Pre-commit validation failed:$ERRORS" >&2
    echo '{"continue": false, "systemMessage": "Pre-commit validation failed. Fix compilation/lint errors before committing."}'
    exit 2
fi

echo '{"continue": true}'
exit 0
