import { relative } from '@std/path'
import { Constraint } from '../types.ts'
import { logCheckConstraint, Logger } from './logger.ts'

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
