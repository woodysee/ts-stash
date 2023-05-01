# 6 by 6 Skyscrapers

## Problem

In a grid of 6 by 6 squares you want to place a skyscraper in each square with only some clues:

- The height of the skyscrapers is between 1 and 6
- No two skyscrapers in a row or column may have the same number of floors
- A clue is the number of skyscrapers that you can see in a row or column from the outside
- Higher skyscrapers block the view of lower skyscrapers located behind them

Can you write a program that can solve each 6 by 6 puzzle?

Example:

To understand how the puzzle works, this is an example of a row with 2 clues. Seen from the left there are 6 buildings visible while seen from the right side only 1:

| Buildings visible from left |     |     |     |     |     |     | Buildings visible from right |
| :-------------------------: | :-: | :-: | :-: | :-: | :-: | :-: | :--------------------------: |
|            **6**            |     |     |     |     |     |     |            **1**             |

There is only one way in which the skyscrapers can be placed. From left-to-right all six buildings must be visible and no building may hide behind another building:

| Buildings visible from left |     |     |     |     |     |     | Buildings visible from right |
| :-------------------------: | :-: | :-: | :-: | :-: | :-: | :-: | :--------------------------: |
|            **6**            |  1  |  2  |  3  |  4  |  5  |  6  |            **1**             |

Example of a 6 by 6 puzzle with the solution:

|       |     |     |     |  2  |   2   |     |       |
| :---: | :-: | :-: | :-: | :-: | :---: | :-: | :---: |
|       |  5  |  6  |  1  |  4  |   3   |  2  |       |
|       |  4  |  1  |  3  |  2  |   6   |  5  |       |
| **3** |  2  |  3  |  6  |  1  |   5   |  4  |       |
|       |  6  |  5  |  4  |  3  |   2   |  1  | **6** |
| **4** |  1  |  2  |  5  |  6  |   4   |  3  | **3** |
| **4** |  3  |  4  |  2  |  5  |   1   |  6  |       |
|       |     |     |     |     | **4** |     |       |

Requirements:

- Finish:

```ts
function solveSixBySixSkyscrapersPuzzle(clues: number[]): number[][];
```

- Pass the clues in an array of 24 items. The clues are in the array around the clock. Index:

|        |   0    |   1    |   2    |   3    |   4    |   5    |        |
| :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| **23** |        |        |        |        |        |        | **6**  |
| **22** |        |        |        |        |        |        | **7**  |
| **21** |        |        |        |        |        |        | **8**  |
| **20** |        |        |        |        |        |        | **9**  |
| **19** |        |        |        |        |        |        | **10** |
| **18** |        |        |        |        |        |        | **11** |
|        | **17** | **16** | **15** | **14** | **13** | **12** |        |

- If no clue is available, use the value `0` instead
- Each puzzle has only one possible solution `solveSixBySixSkyscrapersPuzzle()` returns a two dimensional matrix of positive integers, where the first indexer is for the row and second indexer for the column.

# Thought process to solution

If I were to solve this manually, I decided to first simplify the problem to 3x3 so a solution can be worked out manually first. Remove the only variable in this puzzle (the clues), or rather set all clues as 0, so we can focus on the constants, and determine the total number of possible solutions if there are no clues provided using a decision tree.
So as we descend the decision tree, if there is no possible solution, we need a mechanism to backtrack the previous decision. If there are other options, we re-descend the next possible option. If not, we ascend the decision tree again. And so on.

```bash
# 3 x 3 grid given all clues are 0

# no prev col
# no prev row
A1 := 1
# cant be prev col value (i.e. B1 != A1 ==> B1 != 1)
# no prev row
    B1 := 2
    # cant be prev col values (i.e. C1 != A1 && C1 != B1  ==> C1 != 1 && C1 != 2)
    # no prev row
        C1 := 3
        # no prev col
        # cant be prev row values (i.e. A2 != A1 ==> A2 != 1)
            A2 := 2
            # cant be prev col values (i.e. B2 != A2 ==> B2 != 2)
            # cant be prev row values (i.e. B2 != B1 ==> B2 != 2)
                B2 := 1
                # cant be prev col value (i.e. C2 != A2 && C2 != B2 ==> C2 != 2 && C2 != 1)
                # cant be prev row value (i.e. C2 != C1 ==> C2 != 3)
                    C2 cant be 3, so no solution
                    # Since no solution, take a step back.
                # Check if B2 has other options. Since yes, start moving down again.
                B2 := 3
                # cant be prev col value (i.e. C2 != A2 && C2 != B2 ==> C2 != 2 && C2 != 3)
                # cant be prev row value (i.e. C2 != C1 ==> C2 != 3)
                    C2 := 1
                    # no prev col
                    # cant be prev row value (i.e. A3 != A1 && A3 != A2 ==> A3 != 1 && A3 != 2)
                        A3 := 3
                        # cant be prev col value (i.e. B3 != A3 ==> B3 != 3)
                        # cant be prev row value (i.e. B3 != B1 && B3 != B2 ==> B3 != 2 && B3 != 1)
                            B3 (No solution)
                        # Since no solution, take a step back.
                    # Check if A3 has other options. Since no, we take another step back.
                # Check if C2 has other options. Since no, we take another step back.
            # Check if B2 has other options. Since no, we take another step back.
        # Check if A2 has other options. Since yes, start moving down again.
            A2 := 3
            # cant be prev col value (i.e. B2 != A2 ==> B2 != 3)
            # cant be prev row value (i.e. B2 != B1 ==> B2 != 2)
                B2 := 1
                # cant be prev col value (i.e. C2 != A2 && C2 != B2 ==> C2 != 3 && C2 != 1)
                # cant be prev row value (i.e. C2 != C1 ==> C2 != 3)
                    C2 := 2
                    # no prev col
                    # cant be prev row value (i.e. A3 != A1 && A3 != A2 ==> A3 != 1 && A3 != 3)
                        A3 := 2
                        # cant be prev col value (i.e. B3 != A3 ==> B3 != 2)
                        # cant be prev row value (i.e. B3 != B1 && B3 != B2 ==> B3 != 2 && B3 != 1)
                            B3 := 3
                            # cant be prev col value (i.e. C3 != A3 && C3 != B3 ==> C3 != 2 && C3 != 3)
                            # cant be prev row value (i.e. C3 != C1 && C3 != C2 ==> C3 != 3 && C3 != 2)
                                C3 := 1
                                # First solution found:
                                [1, 2, 3]
                                [3, 1, 2]
                                [2, 3, 1]
                                # There might be other solutions if we solve the other branches, but since there
                                # are no clues (or all clues are 0), we take this first solution as the answer

    B1 := 3
        C1 := 2
            A2 := 2
            # ...
            A2 := 3
            # ...
A1 := 2
    B1 := 1
        C1 := 3
            A2 := 1
            # ...
            A2 := 3
            # ...
    B1 := 3
        C1 := 2
            A2 := 1
            # ...
            A2 := 3
            # ...
A1 := 3
    B1 := 1
        C1 := 2
            A2 := 1
            # ...
            A2 := 2
            # ...
    B1 := 2
        C1 := 3
            A2 := 1
            # ...
            A2 := 2
            # ...

```

Right now, I am able to implement the logic that tracks down each cell exploring each option. If there is a dead end, it will backtrack until the last possible cell with multiple options, cross out the option that was explored, then continue. However, the solutions produced is weird, just a "6" for the first cell and subsequent cells have no solution.

I ran and printed the output in a way that reflected how it will look if I worked out the solution manually and immediately I saw what the issue was. It was due to the candidates for the cells not being reset every time it was backtracked. So when it redescends to those un-resetted cells, it always have no candidates, forcing the function to always end up with no solution, e.g. "6" for the first cell.

Every time we backtrack to the parent node with more than 1 sibling node, we have to also reset the height options of all subsequent children nodes before re-descending.

Now we should be able to generate a solution if there are no clues provided. The next step is to modify the current function so that we also factor in the clues from all 4 sides for each cell.

However, as attempted, the method can't even get a single row with both clues right. There must be a way to speed up the clue satisfaction process. I need to find a way to narrow down the possible selections for each row based on the clues on both ends.
