import { walk } from '@std/fs'
import { join, toFileUrl } from '@std/path'
import { checkConstraints } from './src/checker.ts'
import { Logger } from './src/logger.ts'
import { Command } from '@cliffy/command/mod.ts'
import config from './deno.json' with { type: 'json' }

if (import.meta.main) {
	const cmd = new Command()
		.name(config.name.split('/')[1])
		.version(config.version)
		.option('-v, --verbose', 'Enable verbose output.')
		.option('-vv, --very-verbose', 'Enable very verbose output.')
		.option('-s, --silent', 'Disable any output.')
		.option('-b, --base <path:file>', 'Base path for file:path constraint.', {
			default: Deno.cwd(),
		})
		.arguments('<constraints:file>')
		.action(async ({ verbose, veryVerbose, silent, base }, constraintFile) => {
			const { default: constraints } = await import(
				toFileUrl(join(Deno.cwd(), constraintFile)).href
			)

			let exitCode = 0

			const logger = new Logger(silent ? 0 : veryVerbose ? 3 : verbose ? 2 : 1)

			for await (
				const file of walk(base, {
					match: [/.+\.fcinfo/],
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
				} else {
					logger.info('valid name convention for', {
						value: file.path,
						style: 'path',
					})
				}
			}
			Deno.exit(exitCode)
		})

	if (Deno.args.length) {
		await cmd.parse(Deno.args)
	} else {
		cmd.showHelp()
	}
}
