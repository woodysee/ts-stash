const numberOfSquares = 6;
const heights = Array.from({ length: numberOfSquares }).map((_, i) => i + 1);

const coordinateIndexedClueIndices = Array.from({
  length: numberOfSquares,
}).reduce<Record<string, { n: number; s: number; e: number; w: number }>>(
  (acc, _, row) => {
    return {
      ...acc,
      ...Array.from({ length: numberOfSquares }).reduce<
        Record<string, { n: number; s: number; e: number; w: number }>
      >((acc, _, col) => {
        acc[`${row},${col}`] = {
          n: 0 + col,
          s: numberOfSquares * 3 - 1 - col,
          e: numberOfSquares + row,
          w: numberOfSquares * 4 - 1 - col,
        };
        return acc;
      }, {}),
    };
  },
  {},
);

type Options = {
  clues: number[];
  // As we visit each cell, and try each height option
  // we remove it from the cell options
  unexploredNodes: number[][][];
  current: [number, number];
  solution: number[][];
};

export const getCluesFromRow = (options: {
  row: number[];
}): { head: number; tail: number } => {
  let head = 0;
  let tail = 0;
  let biggestHeightFromHead = 0;
  let biggestHeightFromTail = 0;
  let t = options.row.length - 1;
  for (let h = 0; h < options.row.length; h++) {
    const heightFromHead = Number.isNaN(options.row[h]) ? 0 : options.row[h];

    if (
      (heightFromHead !== 0 && h === 0) ||
      heightFromHead > biggestHeightFromHead
    ) {
      biggestHeightFromHead = heightFromHead;
      head += 1;
    }

    const heightFromTail = Number.isNaN(options.row[t]) ? 0 : options.row[t];
    if (
      (heightFromTail !== 0 && t === options.row.length - 1) ||
      heightFromTail > biggestHeightFromTail
    ) {
      biggestHeightFromTail = heightFromTail;
      tail += 1;
    }
    t--;
  }
  return { head, tail };
};

const rowSatisfyClues = (options: {
  row: number[];
  head: number;
  tail: number;
}) => {
  if (options.row.length < 6) {
    return true;
  }
  const { head, tail } = getCluesFromRow({ row: options.row });
  console.log("head", head, options.row, tail, "tail");
  console.log("head", options.head, "|", options.tail, "tail");

  if (options.head === 0 && options.tail === 0) {
    return true;
  }
  if (options.head === 0) {
    return tail === options.tail;
  }
  if (options.tail === 0) {
    return head === options.head;
  }

  return head === options.head && tail === options.tail;
};

const generateEmptySolution = () =>
  Array.from({ length: numberOfSquares }).map(() => {
    return Array.from({ length: numberOfSquares }).map(() => {
      return NaN;
    });
  });

const backtrack = (options: Options) => {
  const [prevRowIndex, prevColIndex] = options.current;

  if (prevColIndex === 0 && prevRowIndex === 0) {
    return;
  }

  const nextColIndex = prevColIndex - 1;
  const nextRowIndex = prevRowIndex - 1;

  options.current =
    nextColIndex >= 0
      ? [prevRowIndex, nextColIndex]
      : [nextRowIndex, numberOfSquares - 1];
  const [rowIndex, colIndex] = options.current;
  // If there is more than 1 possible solution, stop backtracking
  // and re-descend only on unexplored height options
  // Probably no need to check for [0,0]
  const unexploredNodes = options.unexploredNodes[rowIndex][colIndex];

  if (unexploredNodes.length > 1) {
    // Mark option previously set as "used"
    options.unexploredNodes[rowIndex][colIndex] = unexploredNodes.filter(
      (v) => v !== options.solution[rowIndex][colIndex],
    );
    // Reset last row and col index as we are about to re-descend into
    // the children nodes
    options.unexploredNodes[prevRowIndex][prevColIndex] = [...heights];
    // Unset selected option
    options.solution[rowIndex][colIndex] = NaN;

    return;
  }

  // If only 1 solution, continue backtracking

  // Unset cell option
  options.solution[rowIndex][colIndex] = NaN;
  options.unexploredNodes[rowIndex][colIndex] = [...heights];

  backtrack(options);
};

const findSolution = (options: Options) => {
  const [rowIndex, colIndex] = options.current;
  if (rowIndex === numberOfSquares) {
    return;
  }

  const heightsUsed: number[] = [];

  // Seach all left side cells for repeated
  let heightsUsedInRow: number[] = [];
  if (colIndex > 0) {
    heightsUsedInRow = options.solution[rowIndex].filter(
      (v) => typeof v !== "undefined" && !Number.isNaN(v),
    );

    heightsUsed.push(...heightsUsedInRow);
  }

  // Search top cell
  let heightsUsedAbove: number[] = [];
  if (rowIndex > 0) {
    heightsUsedAbove = options.solution
      .map((row) => row[colIndex])
      .filter((v) => !Number.isNaN(v));

    heightsUsed.push(...heightsUsedAbove);
  }

  // Iterate through all unexploredNodes
  // Does it satisfy all 4 clues provided?
  const cluesIndices = coordinateIndexedClueIndices[`${rowIndex},${colIndex}`];
  const currentClues = {
    n: options.clues[cluesIndices.n],
    s: options.clues[cluesIndices.s],
    e: options.clues[cluesIndices.e],
    w: options.clues[cluesIndices.w],
  };

  const unexploredNodes = options.unexploredNodes[rowIndex][colIndex].filter(
    (v) => {
      const columnSatisfied = rowSatisfyClues({
        row: [...heightsUsedAbove, v],
        head: currentClues.n,
        tail: currentClues.s,
      });
      const rowSatisfied = rowSatisfyClues({
        row: [...heightsUsedInRow, v],
        head: currentClues.w,
        tail: currentClues.e,
      });
      console.log(
        "rowSatisfied",
        rowSatisfied,
        "columnSatisfied",
        columnSatisfied,
      );

      return !heightsUsed.includes(v) && columnSatisfied && rowSatisfied;
    },
  );

  console.log("unexploredNodes", unexploredNodes);

  options.unexploredNodes[rowIndex][colIndex] = unexploredNodes;

  if (unexploredNodes.length === 0) {
    // Needed to break the chain
    if (rowIndex === 0 && colIndex === 1) {
      return;
    }
    // Go back if there are no more options
    backtrack(options);
  }
  // Just use the first option

  const firstOption =
    options.unexploredNodes[options.current[0]][options.current[1]][0];

  if (!firstOption) {
    return;
  }

  console.log(
    "options.solution for",
    `${options.current} ->`,
    options.solution,
  );

  options.solution[options.current[0]][options.current[1]] = firstOption;

  // Move to next cell
  const nextColIndex = options.current[1] + 1;
  options.current =
    nextColIndex < numberOfSquares
      ? [options.current[0], nextColIndex]
      : [options.current[0] + 1, 0];
  findSolution(options);
};

const solveSixBySixSkyscrapersPuzzle = (clues: number[]): number[][] => {
  const options: Options = {
    unexploredNodes: heights.map(() => {
      return heights.map(() => [...heights]);
    }),
    current: [0, 0],
    clues,
    solution: generateEmptySolution(),
  };

  findSolution(options);

  console.log("solution", options.solution);

  return options.solution;
};

export default solveSixBySixSkyscrapersPuzzle;
