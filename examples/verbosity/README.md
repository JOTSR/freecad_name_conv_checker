# Verbosity level

Download [verbosity.fcinfo](./verbosity.fcinfo) and try the different commands.

## Standard (only report errors)

```sh
deno run --allow-read --allow-net=jsr.io \
jsr:@jotsr/fcnc check jsr:@jotsr/fcnc/examples/verbosity/name_conv.ts verbosity.fcinfo
```

## Verbose (progress informations)

```sh
deno run --allow-read --allow-net=jsr.io \
jsr:@jotsr/fcnc check -v=1 jsr:@jotsr/fcnc/examples/verbosity/name_conv.ts verbosity.fcinfo
```

## Very verbose (success checking logging)

```sh
deno run --allow-read --allow-net=jsr.io \
jsr:@jotsr/fcnc check -v=2 jsr:@jotsr/fcnc/examples/verbosity/name_conv.ts verbosity.fcinfo
```

## Silent (no output even if error)

```sh
deno run --allow-read --allow-net=jsr.io \
jsr:@jotsr/fcnc check -s jsr:@jotsr/fcnc/examples/verbosity/name_conv.ts verbosity.fcinfo
```
