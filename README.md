<h1 align="center">debug-for-file</h1>

<p align="center">
	debug() wrapper that creates a string based on your file's path within the package.
	🧶
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/debug-for-file/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/debug-for-file" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/debug-for-file?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/debug-for-file/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/debug-for-file" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/debug-for-file?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npm i debug-for-file
```

```ts
import { debugForFile } from "debug-for-file";

const log = debugForFile(import.meta.url);

log("booting $o", "My App");
```

`debugForFile` takes in the current path to your file, creates a namespace string based off your package name and the file's path, and passes that namespace to `debug`.
Some examples:

| Package Name   | File Path        | `debug` Namespace       |
| -------------- | ---------------- | ----------------------- |
| `example`      | `lib/index.js`   | `'example:index'`       |
| `example`      | `lib/abc/def.js` | `'example:abc:def'`     |
| `@org/example` | `lib/abc/def.js` | `'org:example:abc:def'` |

In other words, if your package name is `example` and your file name is `lib/index.js`, the following two code blocks are equivalent:

```ts
import debug from "debug";

const log = debug("example:lib:index");

log("Hello, world!");
```

```ts
import { debugForFile } from "debug";

const log = debugForFile(import.meta.url);

log("Hello, world!");
```

## Why?

Hand-writing `debug` namespaces is a pain.
They tend to become very long in large projects.
It's easy to forget to change those long strings when you move around or rename files.

This helper manages all that for you.
Plus, it establishes a predictable format for the namespaces.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 🧶

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/debug-for-file/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/debug-for-file/commits?author=JoshuaKGoldberg" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo engine](https://create.bingo).
