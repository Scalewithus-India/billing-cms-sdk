#!/bin/bash

# Read the current version from package.json
current_version=$(grep -Po '"version":.*?[^\\]",' package.json | grep -Po '\d+\.\d+\.\d+')

# Increment the patch version (third number)
IFS='.' read -r major minor patch <<< "$current_version"
new_patch=$((patch + 1))
new_version="$major.$minor.$new_patch"

# Replace the version in package.json
sed -i "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

echo "Version updated to $new_version"

# Stage all changes
git add .

# Check if a commit message is provided
if [ $# -eq 0 ]; then
    # No commit message provided, generate one with updated files
    commit_message=$(cat << EOF
Update version to $new_version

Updated files:
$(git diff --staged --name-only | sed 's/^/- /')
EOF
)
else
    # Use the provided commit message
    commit_message="$1"
fi

# Commit and push changes
git commit -m "$commit_message"
git push

echo "Changes committed and pushed successfully."