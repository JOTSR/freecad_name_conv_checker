/**
 * Name convention constraints.
 *
 * @field {string} kind is used to specify against what the constraint is made.
 * @field {string} pattern correspond to the targeted token format. Use `$field` to define a custom field to check against a regexp.
 * @field {object|undefined} fields define list of regexp to test against pattern fields. Order of the regexp matters.
 *
 * @example
 * ```ts
 * const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/
 *
 * const fileLabel: Constraint = {
 * 	kind: 'file:label',
 * 	pattern: '$label.$type',
 * 	fields: {
 * 		label: [snakeCaseLabel],
 * 		type: [/valid/, /invalid/],
 * 	},
 * }
 * ```
 */
export type Constraint = {
	kind: 'file:path' | 'file:label' | 'object:label'
	pattern: string
	fields?: {
		[name: string]: RegExp[]
	}
}
