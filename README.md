# `git-diff-glob`
> An easy way to get a diff using a file glob.

# Usage
Require and call the function providing a file "glob", a substring of a file that you want the diff of. `git-diff-glob` will look for all files that include the given substring, and return a string of the diff for all matching files.

By default, matches will be made case-insensitively. This can be overwritten by providing an options argument `{ caseSensitive: true }`

```js
const gitDiffGlob = require('git-diff-glob')

let diff

// provide a string for a diff of all files matching 'READ'
// (e.g. README.md)
diff = gitDiffGlob('READ', { caseSensitive: true })

// or provide a space--deliminated string of multiple substrings
diff = gitDiffGlob('index html')

// or provide an array of substrings
diff = gitDiffGlob(['index', 'html'])

console.log(diff)
```
