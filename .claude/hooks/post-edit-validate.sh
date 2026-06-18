#!/bin/bash
# Post-edit validation hook
# Runs targeted compilation/lint after file modifications
# Receives JSON on stdin: { "tool_name": "Edit", "tool_input": { "file_path": "..." }, "tool_response": {...} }

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

# Parse file path from stdin JSON using jq
FILE_PATH=$(jq -r '.tool_response.filePath // .tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    echo '{"continue": true}'
    exit 0
fi

# Make path relative to project root
FILE_PATH="${FILE_PATH#$PROJECT_ROOT/}"

# Check if it's a Java file in backend
if echo "$FILE_PATH" | grep -q "^backend/.*\.java$"; then
    SERVICE=$(echo "$FILE_PATH" | sed 's|backend/\([^/]*\)/.*|\1|')
    SERVICE_DIR="$PROJECT_ROOT/backend/$SERVICE"

    if [ "$SERVICE" = "common" ]; then
        if ! (cd "$SERVICE_DIR" && mvn compile -q 2>&1); then
            echo '{"continue": true, "systemMessage": "Warning: Common module compilation failed. Run: cd backend/common && mvn clean install"}'
            exit 0
        fi
    elif [ -d "$SERVICE_DIR" ] && [ -f "$SERVICE_DIR/pom.xml" ]; then
        if ! (cd "$SERVICE_DIR" && mvn compile -q 2>&1); then
            echo '{"continue": true, "systemMessage": "Warning: '"$SERVICE"' compilation failed. Check for errors."}'
            exit 0
        fi
    fi
fi

# Check if it's a frontend TypeScript/JavaScript file
if echo "$FILE_PATH" | grep -q "^frontend/ecommerce/.*\.\(tsx\|ts\|jsx\|js\)$"; then
    FRONTEND_DIR="$PROJECT_ROOT/frontend/ecommerce"
    if [ -d "$FRONTEND_DIR" ]; then
        if ! (cd "$FRONTEND_DIR" && npm run lint -- --quiet 2>&1); then
            echo '{"continue": true, "systemMessage": "Warning: Frontend lint issues detected. Run: cd frontend/ecommerce && npm run lint"}'
            exit 0
        fi
    fi
fi

echo '{"continue": true}'
exit 0
