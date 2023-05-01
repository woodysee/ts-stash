import { expect } from "chai";
import solveSixBySixSkyscrappersPuzzle, { getCluesFromRow } from ".";

describe("6 by 6 Skyscrapers Puzzle", () => {
  describe("should deduce number of buildings from each side of the row", () => {
    [
      { clues: [3, 3], row: [2, 1, 4, 6, 5, 3] },
      { clues: [2, 4], row: [1, 6, 3, 5, 4, 2] },
      { clues: [2, 2], row: [1, 6, 3, NaN, NaN, NaN] },
      { clues: [2, 2], row: [1, 6, 3] },
      { clues: [0, 0], row: [NaN, NaN, NaN, NaN, NaN, NaN] },
      { clues: [0, 0], row: [] },
    ].forEach(({ clues, row }) => {
      const actual = getCluesFromRow({
        row,
      });
      describe(`For each row of buildings: [${row.join(", ")}]`, () => {
        it(`should be able to see ${clues[0]} buildings standing in the west and looking east`, () => {
          expect(actual.head).to.equal(clues[0]);
        });
        it(`should be able to see ${clues[1]} buildings standing in the east and looking west`, () => {
          expect(actual.tail).to.equal(clues[1]);
        });
      });
    });
    describe.skip("Using clues that encompass the 6 by 6 skyscrapers grid", () => {
      [
        {
          clues: [
            3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2,
            4,
          ],
          expected: [
            [2, 1, 4, 3, 5, 6],
            [1, 6, 3, 2, 4, 5],
            [4, 3, 6, 5, 1, 2],
            [6, 5, 2, 1, 3, 4],
            [5, 4, 1, 6, 2, 3],
            [3, 2, 5, 4, 6, 1],
          ],
        },
        {
          clues: [
            0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0,
            0,
          ],

          expected: [
            [5, 6, 1, 4, 3, 2],
            [4, 1, 3, 2, 6, 5],
            [2, 3, 6, 1, 5, 4],
            [6, 5, 4, 3, 2, 1],
            [1, 2, 5, 6, 4, 3],
            [3, 4, 2, 5, 1, 6],
          ],
        },
        {
          clues: [
            0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1,
            0,
          ],
          expected: [
            [5, 2, 6, 1, 4, 3],
            [6, 4, 3, 2, 5, 1],
            [3, 1, 5, 4, 6, 2],
            [2, 6, 1, 5, 3, 4],
            [4, 3, 2, 6, 1, 5],
            [1, 5, 4, 3, 2, 6],
          ],
        },
      ].forEach(({ clues, expected }) => {
        it(`should be able to solve the puzzle`, () => {
          const actual = solveSixBySixSkyscrappersPuzzle(clues);
          expect(actual).to.equal(expected);
        });
      });
    });
  });
});
