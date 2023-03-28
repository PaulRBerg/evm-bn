import { expect } from "earljs";
import forEach from "mocha-each";

import { toBn } from "../src";

describe("toBn", function () {
  describe("when x is not a string", function () {
    const testSets = [undefined, null, true, 2.71, Math.PI, { x: 100 }, function () {}];

    forEach(testSets).it("throws an error", function (x: any) {
      expect(() => toBn(x)).toThrow("Input must be a string");
    });
  });

  describe("when x is a string", function () {
    describe("when x is not a base 10 number", function () {
      const testSets = ["qwerty", "Bonjour le Monde", "a0b0z0d0", "0xcafe", "áèâéèê"];

      forEach(testSets).it("throws an error", function (x: string) {
        expect(() => toBn(x)).toThrow("Unknown format for fixed-point number: " + x);
      });
    });

    describe("when x is a base 10 number", function () {
      describe("when the number of decimals is out of bounds", function () {
        const testSets = [-1729, 0, 78, 1729];

        forEach(testSets).it("throws an error", function (decimals: number) {
          const x: string = "3.141592653589793238";
          expect(() => toBn(x, decimals)).toThrow("Decimals must be between 1 and 77");
        });
      });

      describe("when the number of decimals is within the bounds", function () {
        describe("when the number of decimals is 1", function () {
          const decimals: number = 1;
          const testSets = [
            ["1", "10"],
            ["2.8", "28"],
            ["3.1", "31"],
            [
              "11579208923731619542357098500868790785326998466564056403945758400791312963993.5",
              "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            ],
          ];

          forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
            expect(expected).toEqual(String(toBn(x, decimals)));
          });
        });

        describe("when the number of decimals is 77", function () {
          const decimals: number = 77;
          const testSets = [
            ["1", "100000000000000000000000000000000000000000000000000000000000000000000000000000"],
            ["2.8", "280000000000000000000000000000000000000000000000000000000000000000000000000000"],
            ["3.1", "310000000000000000000000000000000000000000000000000000000000000000000000000000"],
            [
              "1.15792089237316195423570985008687907853269984665640564039457584007913129639935",
              "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            ],
          ];

          forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
            expect(expected).toEqual(String(toBn(x, decimals)));
          });
        });

        describe("when the number of decimals is the default, which is 18", function () {
          describe("when x has more than 60 integer digits", function () {
            const testSets: string[] = [
              "1e60",
              "3.14e78",
              "3860393555824785230250785487392862718135031063639377380058239.75498055625639",
              "1641859000171773711896013123523298990385936318426437089678010964091794.294085164534340909",
              "6579166703548843398264284621832829277269325500191914304280053707339887173863112402178486913.1782903",
            ];

            forEach(testSets).it("takes %f and throws an error", function (x: string) {
              expect(() => toBn(x)).toThrow("Unknown format for fixed-point number: " + x);
            });
          });

          describe("when x does not have more than 60 integer digits", function () {
            describe("when x has more than 18 fractional digits", function () {
              describe("when x is an exponential", function () {
                const testSets = [
                  ["1e-19", "0"],
                  ["3.14e-78", "0"],
                  ["412.1239812412889000291381209e6", "412123981241288900029138120"],
                ];

                forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
                  expect(expected).toEqual(String(toBn(x)));
                });
              });

              describe("when x is a real number", function () {
                const testSets = [
                  ["0.4902990866551706545", "490299086655170654"],
                  ["8.00019706910353772932315427126187897", "8000197069103537729"],
                  [
                    "91.7496885414232378075050290903596022687487995387586369206142513715480845755362175",
                    "91749688541423237807",
                  ],
                ];

                forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
                  expect(expected).toEqual(String(toBn(x)));
                });
              });
            });

            describe("when x does not have more than 18 fractional digits", function () {
              describe("when x is an exponential", function () {
                const testSets = [
                  ["8.92e-5", "89200000000000"],
                  ["8.92E-5", "89200000000000"],
                  ["1e2", "100000000000000000000"],
                  ["1E2", "100000000000000000000"],
                  ["3.14e5", "314000000000000000000000"],
                  ["3.14E5", "314000000000000000000000"],
                  ["89.12e12", "89120000000000000000000000000000"],
                  ["89.12E12", "89120000000000000000000000000000"],
                  ["100.05e18", "100050000000000000000000000000000000000"],
                  ["100.05E18", "100050000000000000000000000000000000000"],
                  ["2e3", "2000000000000000000000"],
                  ["2E3", "2000000000000000000000"],
                  ["42733.02954e45", "42733029540000000000000000000000000000000000000000000000000000000000"],
                  ["42733.02954E45", "42733029540000000000000000000000000000000000000000000000000000000000"],
                  [
                    "1.15792089237316195423570985008687907853269984665640564039457584007913129639935e59",
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                  ],
                  [
                    "1.15792089237316195423570985008687907853269984665640564039457584007913129639935E59",
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                  ],
                ];

                forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
                  expect(expected).toEqual(String(toBn(x)));
                });
              });

              describe("when x is a real number", function () {
                const testSets = [
                  ["0.0000892", "89200000000000"],
                  ["1", "1000000000000000000"],
                  ["2.8931", "2893100000000000000"],
                  ["3.141592653589793238", "3141592653589793238"],
                  ["781.0042190122", "781004219012200000000"],
                  ["2000", "2000000000000000000000"],
                  ["26241.06698", "26241066980000000000000"],
                  [
                    "115792089237316195423570985008687907853269984665640564039457.584007913129639935",
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                  ],
                ];

                forEach(testSets).it("takes %f and returns %f", function (x: string, expected: string) {
                  expect(expected).toEqual(String(toBn(x)));
                });
              });
            });
          });
        });
      });
    });
  });
});
