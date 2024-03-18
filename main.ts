import { walk } from '@std/fs'
import { join, toFileUrl } from '@std/path'
import { checkConstraints } from './src/checker.ts'

if (import.meta.main) {
	const [constraintFile, basePath] = Deno.args
	const { default: constraints } = await import(
		toFileUrl(join(Deno.cwd(), constraintFile)).href
	)
	let exitCode = 0

	for await (
		const file of walk(basePath, {
			match: [/.+\.fcinfo/],
			includeDirs: false,
		})
	) {
		console.log(
			`%c[utils:freecad]%c: checking name convention for %c"${file.path}"`,
			'color: royalblue; font-weight: bold',
			'',
			'text-decoration: underline',
		)
		const fcinfo = await Deno.readTextFile(file.path)
		const isValid = checkConstraints(fcinfo, constraints, {
			basePath,
			filePath: file.path,
		})
		if (!isValid) {
			console.error(
				`%c[utils:freecad]%c: error in name convention for %c"${file.path}"`,
				'color: red; font-weight: bold',
				'',
				'text-decoration: underline',
			)
			exitCode = 1
		} else {
			console.info(
				`%c[utils:freecad]%c: valid name convention for %c"${file.path}"`,
				'color: green; font-weight: bold',
				'',
				'text-decoration: underline',
			)
		}
	}
	Deno.exit(exitCode)
}
