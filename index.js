const execSync = require('child_process').execSync

function getGlobs(globs) {
	if (typeof globs === 'string') {
		return globs.split(' ')
	} else if (Array.isArray(globs)) {
		return globs
	} else {
		throw new Error('File globs should be in the form of a space-delimiated string or array of strings.')
	}
}

/**
 * @param {string|array} globs - The list of file globs to diff
 * @return {string} - The total diff for the given files
 */
module.exports = (globs) => {
	globs = getGlobs(globs)
	let diffs = []

	for (let glob of globs) {
		let fileDiff = execSync(`git -c color.diff=always diff -- *${glob}*`).toString('utf8')
		diffs.push(fileDiff)
	}

	return diffs.join('\n')
}
