import { Command } from '@cliffy/command/mod.ts'
import config from './deno.json' with { type: 'json' }
import { check } from './cli/check.ts'
import { upgrade } from './cli/upgrade.ts'

export { checkConstraint, checkConstraints } from './src/checker.ts'
export type { Constraint } from './types.ts'

if (import.meta.main) {
	const cmd = new Command()
		.name(config.name.split('/')[1])
		.version(config.version)
		.command('check', check)
		.command('upgrade', upgrade)

	if (Deno.args.length) {
		await cmd.parse(Deno.args)
	} else {
		cmd.showHelp()
	}
}
