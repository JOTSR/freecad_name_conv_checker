import { Command, EnumType } from '@cliffy/command/mod.ts'
import { walk } from '@std/fs'
import { globToRegExp, join, toFileUrl } from '@std/path'
import config from './deno.json' with { type: 'json' }
import { checkConstraints } from './src/checker.ts'
import { Logger } from './src/logger.ts'

export { checkConstraint } from './src/checker.ts'
export type { Constraint } from './types.ts'
export { checkConstraints }

if (import.meta.main) {
	const verbosity = new EnumType([1, 2])

	const cmd = new Command()
		.name(config.name.split('/')[1])
		.version(config.version)
		.type('level', verbosity)
		.option('-v, --verbose=[value:level]', 'Enable verbose output.', {
			conflicts: ['silent'],
		})
		.option('-s, --silent', 'Disable any output.', { conflicts: ['verbose'] })
		.option('-b, --base <path:file>', 'Base path for "file:path" constraint.', {
			default: Deno.cwd(),
		})
		.option('-p, --bypass', 'Disable non 0 exit code on check failure.')
		.option('-f, --fail-fast', 'Stop checking on first error.')
		.arguments('<constraints:file> <...files:file>')
		.action(
			async (
				{ verbose, silent, base, bypass, failFast },
				constraintFile,
				...files
			) => {
				const { default: constraints } = await import(
					toFileUrl(join(Deno.cwd(), constraintFile)).href
				)

				let exitCode = 0

				const logger = new Logger(
					(silent ? 0 : verbose === true ? 1 : verbose) ?? 1,
				)

				for await (
					const file of walk(base, {
						match: files.map((file) => globToRegExp(file)),
						includeDirs: false,
					})
				) {
					logger.log('checking name convention for', {
						value: file.path,
						style: 'path',
					})
					const fcinfo = await Deno.readTextFile(file.path)
					const isValid = checkConstraints(fcinfo, constraints, {
						basePath: base,
						filePath: file.path,
						logger,
					})
					if (!isValid) {
						logger.error('error in name convention for', {
							value: file.path,
							style: 'path',
						})
						exitCode = 1
						if (failFast) break
					} else {
						logger.info('valid name convention for', {
							value: file.path,
							style: 'path',
						})
					}
				}
				Deno.exit(bypass ? 0 : exitCode)
			},
		)

	if (Deno.args.length) {
		await cmd.parse(Deno.args)
	} else {
		cmd.showHelp()
	}
}
