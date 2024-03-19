import { Constraint } from '../../types.ts'

const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/

const fileLabel: Constraint = {
	kind: 'file:label',
	pattern: '$label.$type',
	fields: {
		label: [snakeCaseLabel],
		type: [/valid/, /invalid/],
	},
}

const objectLabel: Constraint = {
	kind: 'object:label',
	pattern: '$label',
	fields: {
		label: [snakeCaseLabel],
	},
}

export default [fileLabel, objectLabel]
