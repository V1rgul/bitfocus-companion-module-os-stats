# Building OS Stats

Instructions for installing dependencies, compiling the module, and packaging it for Companion.

## Prerequisites

- [Node.js](https://nodejs.org/) 22 (see `engines` in `package.json`)
- [Yarn](https://yarnpkg.com/) via Corepack (`corepack enable`)

## Install dependencies

```sh
corepack yarn
```

## Build

Compile TypeScript to `dist/main.js` (what Companion loads at runtime):

```sh
corepack yarn build
```

## Development

Run the TypeScript compiler in watch mode while you edit source files:

```sh
corepack yarn dev
```

## Package for distribution

Produce a distributable module package under `pkg/`:

```sh
corepack yarn dist
```

## Lint

```sh
corepack yarn lint
```
