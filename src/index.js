const execSync = require('child_process').execSync
const gitFiles = require('git-files')

function getGlobs(globs = '') {
	if (typeof globs === 'string') {
		return globs.split(' ')
	} else if (Array.isArray(globs)) {
		return globs.length > 0 ? globs : ['']
	} else {
		throw new Error('File globs should be in the form of a space-delimiated string or array of strings.')
	}
}

/**
 * @param {string|array} [globs] - The list of file globs to diff.
 * @param {object} [options] - List of options.
 * @prop {boolean} options.caseSensitive - Whether to match files case-sensitively.
 * @return {string} - The total diff for the given files.
 */
module.exports = (globs, options = {}) => {
	globs = getGlobs(globs)

	let files = gitFiles.all('relative')
	let matchedFiles = {}
	let diffs = []

	// find all files matching glob
	for (let glob of globs) {
		let regex = new RegExp(glob, options.caseSensitive ? '' : 'i')
		let matches = files.filter(file => regex.test(file))
		// no duplicate files
		matches.forEach(file => matchedFiles[file] = true)
	}

	for (let file of Object.keys(matchedFiles)) {
		let fileDiff = execSync(`git -c color.diff=always diff -- *${file}*`).toString('utf8')
		diffs.push(fileDiff)
	}

	return diffs.join('\n')
}
