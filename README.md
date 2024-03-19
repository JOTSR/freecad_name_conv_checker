<div align="center">
		<img src="./assets/logo.png" alt="logo" width="150px" height="150px"/>
		<h1>📋FCNC✔️</h1>
		<p>The simple and flexible FreeCAD name convention checker</p>
</div>

[![JSR](https://jsr.io/badges/@jotsr/fcnc?style=flat-square)](https://jsr.io/@jotsr/fcnc)
[![JSR](https://jsr.io/badges/@jotsr/fcnc/score?style=flat-square)](https://jsr.io/@jotsr/fcnc)
![GitHub License](https://img.shields.io/github/license/JOTSR/freecad_name_conv_checker?style=flat-square)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/JOTSR/freecad_name_conv_checker/total?style=flat-square)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/JOTSR/freecad_name_conv_checker/publish.yml?style=flat-square)

`fcnc` tool allows you to check your custom name convention of your
[FreeCAD](https://www.freecad.org/) models (based on
[fcinfo](https://github.com/FreeCAD/FreeCAD/blob/main/src/Tools/fcinfo) output).

## Basic usage

### Requirements

- [fcinfo](https://github.com/FreeCAD/FreeCAD/blob/main/src/Tools/fcinfo) for
  extracting informations from `FreeCAD` files.
- [python3](https://www.python.org/downloads/) for running `fcinfo`.
- [deno](https://deno.land) only for contributing or for installation-less use.

### CLI

- Get help:
  ```sh
  fcnc --help
  ```

- Check constraints:
  ```sh
  # Run fcinfo
  ./fcinfo my_freecad_model.FCStd > any_file.fcinfo

  # Check name convention
  fcnc my_constraints.ts any_file.fcinfo or*globs?.fcinfo
  ```

### API

Available on [jsr:@jotsr/fcnc](https://jsr.io/@jotsr/fcnc).

```ts
import { type Constraint } from 'jsr:@jotsr/fcnc'

const snakeCaseLabel = /[a-z][a-z0-9_]*[a-z0-9]/

const fileLabel: Constraint = {
	//Type of constraint
	kind: 'file:label',
	//Pattern to match ($fields refers to custom regexp)
	pattern: '$label.$type',
	//All "$" fields need to be defined
	fields: {
		//Array of regexp to match against (order matter)
		label: [snakeCaseLabel],
		type: [/part/, /assembly/],
	},
}

//name convention file should export array of constraints as default export
export default [fileLabel]
```

### [Documentation](#doc)

## Installation

### From [deno](https://deno.land)

Without install

```sh
deno run --allow-read jsr:@jotsr/fcnc
```

With install

```sh
deno install --allow-read -rf jsr:@jotsr/fcnc
```

### From binaries

```sh
# Linux
curl -fsSLo fcnc https://raw.githubusercontent.com/JOTSR/freecad_name_conv_checker/main/dist/fcnc-x86_64-unknown-linux-gnu
curl -fsSLo fcnc https://raw.githubusercontent.com/JOTSR/freecad_name_conv_checker/main/dist/fcnc-aarch64-unknown-linux-gnu

# macOS
curl -fsSLo fcnc https://raw.githubusercontent.com/JOTSR/freecad_name_conv_checker/main/dist/fcnc-x86_64-apple-darwin
curl -fsSLo fcnc https://raw.githubusercontent.com/JOTSR/freecad_name_conv_checker/main/dist/fcnc-aarch64-apple-darwin

# Windows
curl -fsSLo fcnc.exe https://raw.githubusercontent.com/JOTSR/freecad_name_conv_checker/main/dist/fcnc-x86_64-pc-windows-msvc.exe
```

## Doc

### CLI

- `fcnc --help`.
- Some [examples](./examples).

### API

Available on [jsr:@jotsr/fcnc](https://jsr.io/@jotsr/fcnc/doc).

## Contributing

Any kind of contribution is welcomed. Please read
[contributing guidelines](./CONTRIBUTING.md) before and respect
[contributor covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

### For local development:

**Required dependencies**:

- [`deno`](https://deno.land) To run project (code, ci, ...).

**Before first commit or after editing [`./deno.json`](./deno.json)**:

- Run `deno task hooks:install`.

**Using VSCode**:

- Pre-configured workspace available in
  [`fcnc.code-workspace`](./fcnc.code-workspace).
- Or without local tooling install use [`.devcontainer`](./.devcontainer).
