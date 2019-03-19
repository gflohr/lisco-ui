const schema = {
	'$schema': 'http://json-schema.org/draft-07/schema#',
	'$id': 'http://www.cantanea.com/schema/lisco/v0.1.0/config.schema.json',
	title: 'Configuration',
	description: 'Lisco configuration',
	type: 'object',
	required: ['version', 'windowBounds'],
	properties: {
		version: {
			description: 'Version of the configuration schema',
			type: 'string',
			pattern: '(?:(?:0|[1-9][0-9]*)\.){2}(?:0|[1-9][0-9]*)',
		},
		windowBounds: {
			description: 'Game window dimensions',
			type: 'object',
			required: ['width', 'height'],
			default: { width: 800, height: 600 },
			additionalProperties: false,
			properties: {
				width: {
					type: 'number',
					minimum: 1,
					default: 800,
				},
				height: {
					type: 'number',
					minimum: 1,
					default: 600,
				}
			}
		}
	}
};

function migrate (data) {
	data.version = '0.1.0';

	return data;
}

module.exports = {
	schema,
	migrate
};