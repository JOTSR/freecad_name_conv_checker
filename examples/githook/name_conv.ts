import { Constraint } from '../../types.ts'

const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/

const filePath: Constraint = {
	kind: 'file:path',
	pattern: '$function/$name.$type.fcinfo',
	fields: {
		function: [/structure/, /caterpillar/, /case/, /placeholder/],
		name: [snakeCaseLabel],
		type: [/part/, /assembly/],
	},
}

const fileLabel: Constraint = {
	kind: 'file:label',
	pattern: '$label.$type',
	fields: {
		label: [snakeCaseLabel],
		type: [/part/, /assembly/],
	},
}

const objectLabel: Constraint = {
	kind: 'object:label',
	pattern: '$label',
	fields: {
		label: [snakeCaseLabel],
	},
}

export default [filePath, fileLabel, objectLabel]
