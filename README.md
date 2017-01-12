# `git-diff-glob`
> An easy way to get a diff using a file glob.

# Usage
Require and call the function providing a file "glob", a substring of a file that you want the diff of. `git-diff-glob` will look for all files that include the given substring, and return a string of the diff for all matching files.

```js
const gitDiffGlob = require('git-diff-glob')

let diff

// provide a file "glob" as a string for a diff of a single file
diff = gitDiffGlob('index')

// or for a diff of multiple files, provide a space-deliminated string of file "globs"...
diff = gitDiffGlob('index html')

// ...or an array of file "globs"
diff = gitDiffGlob(['index', 'html'])

console.log(diff)
```
