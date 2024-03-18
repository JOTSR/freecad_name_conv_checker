import config from '../deno.json' with { type: 'json' }
import { Constraint } from '../types.ts'

export function logCheckConstraint(
	constraint: Constraint,
	isValid: boolean,
	{ logger }: { logger: Logger },
) {
	if (isValid) {
		logger.info('valid', { value: constraint.kind, style: 'label' })
	} else {
		logger.info('invalid', { value: constraint.kind, style: 'label' })
	}
}

export class Logger {
	#logLevel = 1
	#logName = config.name.split('/')[1]

	constructor(logLevel: number) {
		this.#logLevel = logLevel
	}

	log(msg: string, options: { value: string; style: 'path' | 'label' }) {
		if (this.#logLevel < 2) return

		console.log(
			`%c[${this.#logName}]%c: ${msg} %c${options.value}`,
			'color: royalblue; font-weight: bold',
			'',
			options.style === 'path'
				? 'text-decoration: underline'
				: 'color: goldenrod',
		)
	}

	info(msg: string, options: { value: string; style: 'path' | 'label' }) {
		if (this.#logLevel < 3) return

		console.info(
			`%c[${this.#logName}]%c: ${msg} %c${options.value}`,
			'color: green; font-weight: bold',
			'',
			options.style === 'path'
				? 'text-decoration: underline'
				: 'color: goldenrod',
		)
	}

	error(msg: string, options: { value: string; style: 'path' | 'label' }) {
		if (this.#logLevel < 1) return

		console.error(
			`%c[${this.#logName}]%c: ${msg} %c${options.value}`,
			'color: red; font-weight: bold',
			'',
			options.style === 'path'
				? 'text-decoration: underline'
				: 'color: goldenrod',
		)
	}
}
