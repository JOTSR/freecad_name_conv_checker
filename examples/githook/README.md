# Git hook example

Clone this repository and try the different commands.

## Add FreeCAD models

Add FreeCad files to this directory.

## Pre-commit hook

Add followings lines to your pre-commit hook.

```sh
# Get all FreeCAD files and run fcinfo on them
git diff --name-only --staged | grep .FCStd | xargs -L 1 -i $SHELL -c 'fcinfo {} > {}.fcinfo && git add {}.fcinfo'
# Check name convention for all staged FreeCAD files
git diff --name-only --staged | grep .FCStd | xargs -L 1 -i fcnc check name_conv.ts '{}.fcinfo'
```

You can replace `git diff` by `ls` to avoid setting up a git repository for the
examples.

And then `touch *.FCStd && git commit -am "test fcnc"`.
