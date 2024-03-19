import { relative } from '@std/path'
import { Constraint } from '../types.ts'
import { logCheckConstraint, Logger } from './logger.ts'

/**
 * Check a fcinfo file value against a constraint model.
 *
 * @param {string} value Token to check against name convention.
 * @param {Constraint} constraint Constraint model to use for checking.
 * @returns {boolean} Validity of value for given name convention constraint.
 *
 * @example
 * ```ts
 * const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/
 *
 * const filePathConstraint: Constraint = {
 * 	kind: 'file:path',
 * 	pattern: '$dir.$name.fcinfo',
 * 	fields: {
 * 		dir: [/.+/],
 * 		name: [snakeCaseLabel],
 * 	},
 * }
 *
 * const filePath = 'sketch/box.fcinfo'
 *
 * console.assert(checkConstraint(filePath, filePathConstraint))
 * ```
 */
export function checkConstraint(
	value: string,
	constraint: Constraint,
): boolean {
	const fields = constraint.pattern.match(/\$\w+/g) ?? []
	const regexp = constraint.fields !== undefined
		? fields.map((format) => constraint.fields![format.slice(1)])
		: []
	const matcher = constraint.pattern.split(
		new RegExp(fields.join('|').replaceAll('$', '\\$')),
	)

	for (const _index in matcher) {
		const index = Number(_index)

		//check pattern
		if (!value.startsWith(matcher[index])) {
			return false
		}

		//consume pattern
		value = value.slice(matcher[index].length)

		//check regexp
		if (regexp.at(index)?.every((reg) => value.match(reg)?.index !== 0)) {
			return false
		}

		//consume regexp
		value = value.slice(
			Math.max(
				...regexp.at(index)?.map((reg) => value.match(reg)?.[0]?.length ?? 0) ??
					[0],
			),
		)
	}

	//verified if all string is consumed
	return value.length === 0
}

/**
 * Check a fcinfo file against a list of constraints.
 *
 * @param {string} fcinfo FreeCAD model info to check.
 * @param {Constraint[]} constraints List of constraints to apply on naming.
 * @param {object} options Base path for checking "file:path". `fcinfo` file path for checking "file:path". Logger to use.
 * @returns {boolean} Validity of the fcinfo file against constraints list.
 *
 * @example
 * ```ts
 * //name_conv.ts
 * const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/
 * const filePath: Constraint = {
 * 	kind: 'file:path',
 * 	pattern: '$function/$name.$type.fcinfo',
 * 	fields: {
 * 		function: [/structure/, /caterpillar/, /case/, /placeholder/],
 * 		name: [snakeCaseLabel],
 * 		type: [/part/, /assembly/],
 * 	},
 * }
 *
 * const fileLabel: Constraint = {
 * 	kind: 'file:label',
 * 	pattern: '$label.$type',
 * 	fields: {
 * 		label: [snakeCaseLabel],
 * 		type: [/part/, /assembly/],
 * 	},
 * }
 *
 * const objectLabel: Constraint = {
 * 	kind: 'object:label',
 * 	pattern: '$label',
 * 	fields: {
 * 		label: [snakeCaseLabel],
 * 	},
 * }
 *
 * export default [filePath, fileLabel, objectLabel]
 *
 * //checker.ts
 * const fcinfo = await Deno.readTextFile('./file.fcinfo')
 * const { default: constraints } = await import('./name_conv.ts')
 *
 * checkConstraints(fcinfo, constraints, {
 * 	basePath: './sketchs/',
 * 	filePath: './file.fcinfo',
 * 	logger: new Logger(1),
 * })
 * ```
 */
export function checkConstraints(
	fcinfo: string,
	constraints: Constraint[],
	{ basePath = Deno.cwd(), filePath, logger }: {
		basePath?: string
		filePath: string
		logger: Logger
	},
): boolean {
	for (const constraint of constraints) {
		if (constraint.kind === 'file:path') {
			const isValid = checkConstraint(
				relative(basePath, filePath).replaceAll('\\', '/'),
				constraint,
			)
			logCheckConstraint(constraint, isValid, { logger })
			if (!isValid) return false
			continue
		}

		if (constraint.kind === 'file:label') {
			const match = fcinfo.match(/\s*Label : (.*)/)
			const isValid = checkConstraint(match?.at(1) ?? '', constraint)
			logCheckConstraint(constraint, isValid, { logger })
			if (!isValid) return false
			continue
		}

		if (constraint.kind === 'object:label') {
			const matches = [...fcinfo.matchAll(/\s*Label : (.*)/g)]
			const isValid = matches.slice(1).every((match) =>
				checkConstraint(match[1], constraint)
			)
			logCheckConstraint(constraint, isValid, { logger })
			if (!isValid) return false
		}
	}

	return true
}
