import { GithubProvider, UpgradeCommand } from '@cliffy/command/mod.ts'
import config from '../deno.json' with { type: 'json' }

export const upgrade = new UpgradeCommand({
	main: 'mod.ts',
	args: [
		'--allow-read',
		'--allow-net=api.github.com',
		`--name=${config.name.split('/')[1]}`,
	],
	provider: new GithubProvider({
		repository: 'JOTSR/freecad_name_conv_checker',
	}),
})
