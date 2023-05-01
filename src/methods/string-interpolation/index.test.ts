import { expect } from "chai";
import { replacePlaceholderWithPhrasingContent } from ".";

const mockPhrasingContent =
  '<div data-testid="phrasing-content" key="phrasing-content" />';
describe("replacePlaceholderWithPhrasingContent", () => {
  describe("should replace %PLACEHOLDER% with phrasing content, preserving the whitespacing of the original texts", () => {
    (
      [
        [
          "should replace placeholder with phrasing content at the back of texts", // description
          "Have you seen this phrasing content here -> %PLACEHOLDER%", // text
          "pandapay", // fallback
          true, // hasPhrasingContent
          ["Have you seen this phrasing content here -> ", mockPhrasingContent],
        ],
        [
          "should replace placeholder with fallback text if no phrasing content", // description
          "Have you seen this phrasing content here -> %PLACEHOLDER%", // text
          "pandapay", // fallback
          false, // hasPhrasingContent
          ["Have you seen this phrasing content here -> ", "pandapay"],
        ],
        [
          "should replace placeholder with phrasing content for phrasing contents in front of texts", // description
          "%PLACEHOLDER% gerçekten taze", // text
          "muz ekmeği", // fallback
          true, // hasPhrasingContent
          [mockPhrasingContent, " gerçekten taze"],
        ],
        [
          "should replace placeholder with fallback text if no phrasing content in between texts", // description
          "今天的%PLACEHOLDER%真新鮮", // text
          "香蕉麵", // fallback
          false, // hasPhrasingContent
          ["今天的", "香蕉麵", "真新鮮"],
        ],
      ] as [string, string, string, boolean, string[]][]
    ).forEach(([description, text, fallback, hasPhrasingContent, expected]) => {
      it(`${description} -> "${text}"`, () => {
        const actual = replacePlaceholderWithPhrasingContent({
          placeholder: "PLACEHOLDER",
          replacePlaceholder: () => {
            if (hasPhrasingContent) {
              return mockPhrasingContent;
            }
            return fallback;
          },
          text,
        });
        expect(actual.join(",")).to.equals(expected.join(","));
      });
    });
  });
});
