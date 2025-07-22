import { expect } from "chai";
import { fixConversations } from "./fix-conversations";
import { defaultClientCreatedRootConversationNode } from "./mocks/client-created-root-conversation-node";
import {
  conversationId01,
  conversationId01A,
  conversationId01A01,
  conversationId01A01_01,
  conversationId01A01_02,
  conversationId01A01_03,
  conversationId01A02,
  conversationId01B,
  conversationId02,
  conversationId03,
  conversationId04,
  conversationId05,
  conversationId06,
  conversationId07,
  conversationId08,
  conversationId09,
  conversationId10,
  conversationId11,
  conversationId12,
  conversationId13,
  conversationId14,
  conversationId15,
  conversationId16,
  conversationIdWithNoTextNode,
} from "./mocks/constants";
import { defaultUUIDIndexedRootConversationNode } from "./mocks/uuid-indexed-root-conversation-node";
import type {
  ConversationMappingWithClientCreatedRoot,
  ConversationNode,
} from "./types";

describe("fixConversations", () => {
  it("removes non-text nodes and prunes children references", () => {
    const input: ConversationNode[] = [
      { ...defaultClientCreatedRootConversationNode },
    ];

    const result = fixConversations(input);

    expect(Object.keys(result.allConversations[0].mapping)).to.have.members([
      "client-created-root",
      conversationId02,
      conversationId04,
      conversationId05,
      conversationId06,
      conversationId07,
      conversationId08,
      conversationId09,
      conversationId10,
      conversationId11,
      conversationId12,
      conversationId13,
      conversationId14,
      conversationId15,
      conversationId16,
    ]);
    expect(Object.keys(result.allConversations[0].mapping)).not.to.have.members(
      [conversationIdWithNoTextNode, conversationId01, conversationId03],
    );

    const resultRootNode = result.allConversations[0]
      .mapping as ConversationMappingWithClientCreatedRoot;

    // should remap children and skip over no text nodes
    expect(resultRootNode["client-created-root"].children[0]).to.equal(
      conversationId02,
    );
    expect(
      result.allConversations[0].mapping[conversationId02].children[0],
    ).to.equal(conversationId04);
    expect(
      result.allConversations[0].mapping[conversationId04].parent,
    ).to.equal(conversationId02);
    expect(
      result.allConversations[0].mapping[conversationId04].children[0],
    ).to.equal(conversationId05);
    expect(
      result.allConversations[0].mapping[conversationId05].parent,
    ).to.equal(conversationId04);
    expect(
      result.allConversations[0].mapping[conversationId05].children[0],
    ).to.equal(conversationId06);

    expect(resultRootNode["client-created-root"]).to.deep.equal({
      id: "client-created-root",
      message: null,
      parent: null,
      children: [conversationId02],
    });
  });

  it('ensures that the conversation is normalised to start with "client-created-root" indexed conversation', () => {
    const input: ConversationNode[] = [
      { ...defaultUUIDIndexedRootConversationNode },
    ];

    const result = fixConversations(input);

    expect(Object.keys(result.allConversations[0].mapping)).to.have.members([
      conversationId01,
      conversationId04,
      conversationId06,
      conversationId07,
      conversationId01A,
      conversationId01B,
      conversationId01A01_01,
      conversationId01A01_03,
      conversationId08,
      conversationId10,
      conversationId11,
      conversationId12,
    ]);

    // should prune messages with no text content (to prevent loading
    // bar from showing which may be confusing)
    expect(Object.keys(result.allConversations[0].mapping)).not.to.have.members(
      [
        conversationId02,
        conversationId03,
        conversationId05,
        conversationId01A01,
        conversationId01A02,
        conversationId01A01_02,
        conversationId09,
      ],
    );
  });
});
