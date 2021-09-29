import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "earljs";
import forEach from "mocha-each";

import { fromBn } from "../src";

describe("fromBn", function () {
  describe("when x is undefined", function () {
    it("throws an error", function () {
      const x: any = undefined;
      expect(() => fromBn(x)).toThrow("Input must not be undefined");
    });
  });

  describe("when x is not undefined", function () {
    describe("when the number of decimals is out of bounds", function () {
      const testSets = [-1729, 0, 78, 1729];

      forEach(testSets).it("throws an error", function (decimals: number) {
        const x = BigNumber.from("3141592653589793238");
        expect(() => fromBn(x, decimals)).toThrow("Decimals must be between 1 and 18");
      });
    });

    describe("when the number of decimals is within the bounds", function () {
      describe("when the number of decimals is 1", function () {
        const decimals: number = 1;
        const testSets = [
          ["10", "1"],
          ["28", "2.8"],
          ["31", "3.1"],
          [
            "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            "11579208923731619542357098500868790785326998466564056403945758400791312963993.5",
          ],
        ];

        forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
          expect(expected).toEqual(fromBn(BigNumber.from(x), decimals));
        });
      });

      describe("when the number of decimals is 77", function () {
        const decimals: number = 77;
        const testSets = [
          ["100000000000000000000000000000000000000000000000000000000000000000000000000000", "1"],
          ["280000000000000000000000000000000000000000000000000000000000000000000000000000", "2.8"],
          ["310000000000000000000000000000000000000000000000000000000000000000000000000000", "3.1"],
          [
            "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            "1.15792089237316195423570985008687907853269984665640564039457584007913129639935",
          ],
        ];

        forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
          expect(expected).toEqual(fromBn(BigNumber.from(x), decimals));
        });
      });
    });
  });
});
