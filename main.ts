import { walk } from '@std/fs'
import { join, toFileUrl } from '@std/path'
import { checkConstraints } from './src/checker.ts'
import { Logger } from './src/logger.ts'

if (import.meta.main) {
	const [constraintFile, basePath] = Deno.args
	const { default: constraints } = await import(
		toFileUrl(join(Deno.cwd(), constraintFile)).href
	)
	let exitCode = 0

	const logger = new Logger(1)

	for await (
		const file of walk(basePath, {
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
			basePath,
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
}
