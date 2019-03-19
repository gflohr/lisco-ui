import electron from 'electron';
import path from 'path';
import fs from 'fs';
import Debug from 'debug';
const debug = Debug('lisco:config');

import ConfigValidator from './validator.js';

export default class ConfigStore {
	constructor(opts) {
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(userDataPath, opts.configName + '.json');
		debug("config path: %s", this.path);

		this.data = parseDataFile(this.path);
	}

	get(key) {
		return this.data[key];
	}

	set(key, val) {
		this.data[key] = val;
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}
}

function parseDataFile(filePath) {
	let data;

	try {
		data = JSON.parse(fs.readFileSync(filePath));
	} catch (e) {
		debug("parsing config file '%s' failed: %O", filePath, e);
	};

	const validator = new ConfigValidator(data);

	return validator.validate();
}
