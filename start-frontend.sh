#!/bin/sh

# User input
#========================================================================
modules=("theme" "authentication") # theme | authentication
router="react-router" # react-router | wouter
destination="./temp"
#========================================================================

# Check router
if [[ " ${modules[*]} " == *"authentication"* ]]; then
  router_file="authenticated-router.tsx"
else
  router_file="router.tsx"
fi

echo "Create React App..."

# Make dest directory
rm -rf ./$destination
mkdir $destination
mkdir $destination/src
mkdir $destination/src/components

# Copy modules
for module in "${modules[@]}"; do
  mkdir $destination/src/components/$module && cp -R ./src/components/$module/* $destination/src/components/$module
done

# Copy base files
cp -R ./.gitignore $destination
cp -R ./index.html $destination
cp -R ./package.json $destination
cp -R ./pnpm-lock.yaml $destination
cp -R ./tsconfig.json $destination
cp -R ./tsconfig.node.json $destination
cp -R ./vite.config.ts $destination
cp -R ./src/app.tsx $destination/src
cp -R ./src/ui/* $destination/src/components

# Copy router
cp -R ./src/components/router-$router/$router_file $destination/src/router.tsx

# Templates
for module in "${modules[@]}"; do
  if [ -n "$module" ]; then
    args+=" --providers $module"
  fi
done

./node_modules/.bin/plop component -- $args
./node_modules/.bin/prettier -w $destination/src/app-providers.tsx

# README
markdown_text="# App name\n\nOpen up your terminal and run\n\n\`\`\`sh\npnpm dev\n\`\`\`\n\nCreated on $(date)"
echo $markdown_text >> $destination/README.md

clear

project_dir=$(echo $destination | sed 's/\.\///')
echo "✨ Start-frontend code generation is complete!\nPlease move to the project folder and execute the following commands:\n\ncd $project_dir && pnpm i\npnpm dev\n\nHappy coding! 🚀\n"
