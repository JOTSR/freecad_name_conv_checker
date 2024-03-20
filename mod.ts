import { Command } from '@cliffy/command/mod.ts'
import { check } from './cli/check.ts'
import { upgrade } from './cli/upgrade.ts'
import config from './deno.json' with { type: 'json' }

export { checkConstraint, checkConstraints } from './src/check.ts'
export type { Constraint } from './types.ts'

if (import.meta.main) {
	const cliName = config.name.split('/')[1]

	const cmd = new Command()
		.name(cliName)
		.description(
			`The simple and flexible FreeCAD name convention checker.\nUse "${cliName} <command> --help" for specific command help.`,
		)
		.version(config.version)
		.command('check', check)
		.command('upgrade', upgrade)

	if (Deno.args.length) {
		await cmd.parse(Deno.args)
	} else {
		cmd.showHelp()
	}
}
