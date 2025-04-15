/*
What is a .gitignore file?
- A .gitignore file tells Git which files or directories to ignore in a project
- It prevents specified files from being tracked by Git and uploaded to your repository

Why is .gitignore essential for security and project management?

1. Security Protection
   - Prevents sensitive data like .env files, API keys, and credentials from being exposed publicly
   - Protects private configuration that shouldn't be shared between different environments

2. Repository Optimization
   - Excludes large files that don't need version control (build artifacts, dependencies)
   - Keeps your repository clean and focused on source code
   - Prevents node_modules and other large directories from being committed

3. System-Specific Files
   - Excludes operating system files (.DS_Store on Mac, Thumbs.db on Windows)
   - Removes IDE and editor-specific files (.vscode, .idea directories)

Common patterns in .gitignore files:
.env                  # Ignore all .env files
node_modules/        # Ignore the node_modules directory
*.log                # Ignore all log files
dist/                # Ignore build output directories
.DS_Store            # Ignore macOS specific files

When working with sensitive information:
1. ALWAYS add .env to your .gitignore file BEFORE creating your .env file
2. NEVER remove .env from .gitignore to commit "just this once"
3. Consider using .env.example files to document required variables without values

Remember: Once a file has been committed to a repository, simply adding it
to .gitignore won't remove it from the repository's history!
*/