# Evm Bn [![GitHub Actions][gha-badge]][gha] [![Coverage][codecov-badge]][codecov] [![Styled with Prettier][prettier-badge]][prettier] [![License: MIT][license-badge]][license]

[gha]: https://github.com/PaulRBerg/evm-bn/actions
[gha-badge]: https://github.com/PaulRBerg/evm-bn/actions/workflows/ci.yml/badge.svg
[codecov]: https://codecov.io/gh/PaulRBerg/evm-bn
[codecov-badge]: https://codecov.io/gh/PaulRBerg/evm-bn/branch/main/graph/badge.svg
[prettier]: https://prettier.io
[prettier-badge]: https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg

Evm Bn is a utility for converting between stringified fixed-point numbers and
[Ethers.js](https://github.com/ethers-io/ethers.js) BigNumbers, as well as the reverse process. It is particularly
useful for projects based on the Ethereum Virtual Machine (EVM), given that 1 ETH is equivalent to 1e18 wei.

- Accepts scientific notation.
- Limits the precision to 78 digits.
- Enforces 60 integer digits and 18 fractional digits.
- Designed to be used alongside
  [@ethersproject/bignumber](https://github.com/ethers-io/ethers.js/tree/master/packages/bignumber).
- Slices the fractional digits automatically at position `n + 1` and above, with `n` the number of decimals, rounding
  down in the process.

## Install

```sh
$ pnpm add evm-bn
```

## Usage

### To Bn

```ts
import type { BigNumber } from "@ethersproject/bignumber";
import { toBn } from "evm-bn";

// 3141500000000000000
const foo: BigNumber = toBn("3.1415");

// 115792089237316195423570985008687907853269984665640564039457584007913129639935
const bar: BigNumber = toBn("115792089237316195423570985008687907853269984665640564039457.584007913129639935");

// 100000000000000
const baz: BigNumber = toBn("100e6", 6);
```

### From Bn

```ts
import type { BigNumber } from "@ethersproject/bignumber";
import { fromBn } from "evm-bn";

// 3.1415
const foo: BigNumber = fromBn(BigNumber.from("3141500000000000000"));

// 115792089237316195423570985008687907853269984665640564039457.584007913129639935
const bar: BigNumber = fromBn(
  BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935"),
);

// 100000000
const baz: BigNumber = fromBn(BigNumber.from("100000000000000"), 6);
```

## Contributing

Feel free to dive in! [Open](https://github.com/PaulRBerg/evm-bn/issues/new) an issue,
[start](https://github.com/PaulRBerg/evm-bn/discussions/new) a discussion or submit a PR.

### Set Up

Clone the repositories and install the dependencies:

```sh
$ pnpm install
```

Now you can start making changes.

## License

This project is licensed under MIT.
