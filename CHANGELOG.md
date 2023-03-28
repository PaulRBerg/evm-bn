# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.2.0]: https://github.com/PaulRBerg/evm-bn/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/PaulRBerg/evm-bn/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/PaulRBerg/evm-bn/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/PaulRBerg/evm-bn/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/PaulRBerg/evm-bn/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/PaulRBerg/evm-bn/releases/tag/v1.0.0

## [1.2.0] - 2023-03-28

### Changed

- Bump dependencies (@PaulRBerg)
- Improve documentation and formatting (@PaulRBerg)
- Switch from Yarn to Pnpm for dependency management (@PaulRBerg)

### Added

- Support uppercase `E` in exponential notation ([#16](https://github.com/PaulRBerg/evm-bn/pull/16)) (@tiagox)

## [1.1.2] - 2022-07-26

### Changed

- Adhere to Common Changelog in `CHANGELOG.md` (@PaulRBerg)
- Change the license from "Unlicense" to "MIT" (@PaulRBerg)
- Fix number of decimals in error message in `fromBn` function (@PaulRBerg)
- Polish the README (@PaulRBerg)

## [1.1.1] - 2021-10-27

### Changed

- Semver from "^5.5.0" to "5.x" for `@ethersproject/bignumber` peer dependency (@PaulRBerg)

## [1.1.0] - 2021-10-26

### Added

- TypeScript declaration maps and source maps (@PaulRBerg)

### Changed

- Upgrade to `@ethersproject/bignumber` v5.5.0 (@PaulRBerg)

## [1.0.1] - 2021-09-29

### Fixed

- Relax type checking in `fromBn` function (@PaulRBerg)

## [1.0.0] - 2021-09-27

### Added

- First release of the package (@PaulRBerg)
