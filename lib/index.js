'use strict';

var execSync = require('child_process').execSync;

function getGlobs() {
	var globs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	if (typeof globs === 'string') {
		return globs.split(' ');
	} else if (Array.isArray(globs)) {
		return globs;
	} else {
		throw new Error('File globs should be in the form of a space-delimiated string or array of strings.');
	}
}

/**
 * @param {string|array} globs - The list of file globs to diff
 * @return {string} - The total diff for the given files
 */
module.exports = function (globs) {
	globs = getGlobs(globs);
	var diffs = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = globs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var glob = _step.value;

			var fileDiff = execSync('git -c color.diff=always diff -- *' + glob + '*').toString('utf8');
			diffs.push(fileDiff);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return diffs.join('\n');
};