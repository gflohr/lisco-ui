import * as compareVersions from 'compare-versions';
import Ajv from 'ajv';

import Debug from 'debug';
const debug = Debug('lisco:config');

const versions = [
	['0.1.0', require('./schema-0.1.0')],
];

export default class ConfigValidator {
	constructor() {
		this.ajv = new Ajv({useDefaults: true, coerceTypes: 'array'});
	}

	validate(data, depth) {
		debugger;
		debug('validating configuration data: %O', data);
		depth = depth || 0;
		if (depth > 1) {
			throw new Error("internal error: cannot parse configuration");
		}

		const type = typeof data;
		if (type !== 'object') {
			debug("config data has wrong type '%s' instead of 'object'", type);
			data = {
				version: '0',
			};
		}

		// Where are we in the version tree.
		let comparisons = [];
		for (let i = 0; i < versions.length; ++i) {
			try {
				comparisons[i] = compareVersions(data.version, versions[i][0]);
			} catch (e) {
				debug("config data has invalid version '%s'", data.version);
				comparisons = versions.map(() => -1);
				break;
			}
		}
console.log(comparisons);
console.log(versions);
		// Now run all migrators and validators.
		try {
			for (let i = 0; i < versions.length; ++i) {
				if (comparisons[i] > 0) continue;
				const spec = versions[i][1];
				if (comparisons[i] < 0) {
					debug('migrating config data to version %s', versions[i][0]);
					spec.migrate(data);
					debug('migrated configuration: %O', data);
				}

				// And run the validator.
				debug('validating config data against schema version %s',
				      versions[i][0]);
				const validate = this.ajv.compile(spec.schema);
				if (!validate(data)) {
					throw validate.errors;
				}
				debug('configuration with defaults: %O', data);
			}
		} catch (e) {
			debug('migrating/validating configuration failed: %O', e);
			data = {};
			return this.validate(data, depth + 1);
		}

		return data;
	}
}