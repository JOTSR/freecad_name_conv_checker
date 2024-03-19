/**
 * Name convention constraints.
 *
 * @example
 * ```ts
 * const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/
 *
 * const fileLabel: Constraint = {
 * 	//Specify against what the constraint is made.ddd
 * 	kind: 'file:label',
 * 	//Targeted token format. Use `$field` to define a custom field to check against a regexp.
 * 	pattern: '$label.$type',
 * 	//Define list of regexp to test against pattern fields. Order of the regexp matters.
 * 	fields: {
 * 		label: [snakeCaseLabel],
 * 		type: [/valid/, /invalid/],
 * 	},
 * }
 * ```
 */
export type Constraint = {
	/**
	 * Specify against what the constraint is made.
	 */
	kind: 'file:path' | 'file:label' | 'object:label'
	/**
	 * Targeted token format. Use `$field` to define a custom field to check against a regexp.
	 */
	pattern: string
	/**
	 * Define list of regexp to test against pattern fields. Order of the regexp matters.
	 */
	fields?: {
		[name: string]: RegExp[]
	}
}
