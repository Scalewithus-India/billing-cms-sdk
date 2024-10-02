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

git add . && git commit -m "updated" && git push