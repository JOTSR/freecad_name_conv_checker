import { Constraint } from '../types.ts'

export function logCheckConstraint(constraint: Constraint, isValid: boolean) {
	if (isValid) {
		console.info(
			`%c[utils:freecad]%c: valid %c${constraint.kind}`,
			'color: green; font-weight: bold',
			'',
			'color: goldenrod',
		)
	} else {
		console.error(
			`%c[utils:freecad]%c: invalid %c${constraint.kind}`,
			'color: red; font-weight: bold',
			'',
			'color: goldenrod',
		)
	}
}
