import type {
  Conversations,
  ConversationNode,
  ConversationMapping,
  KebabCasedUUID,
} from "./types";

const checkIfHaveMessageContent = (
  node: ConversationMapping[keyof ConversationMapping],
): boolean => {
  const { message } = node;
  if (message === null) {
    return true;
  }
  const messageContent = message.content;
  if (messageContent.content_type === "text") {
    // Hide message if `parts: [""]`
    return messageContent.parts.length > 0 && messageContent.parts[0] !== "";
  }
  return false;
};

/**
 * Cleans an array of `ConversationNode` by:
 *  - Keeping only mapping nodes with no message (root)
 *  - Keeping only nodes where message.content.content_type === "text"
 *  - Pruning children arrays to only reference retained nodes
 */
export const fixConversations = ({
  conversations,
  folderIndex,
}: {
  conversations: Conversations;
  folderIndex: Record<string, KebabCasedUUID[]>;
}): {
  allConversations: Conversations;
  byFolder: Record<string, Conversations>;
} => {
  const allConversations: Conversations = [];
  const byFolder: Record<string, Conversations> = {};
  conversations.forEach((conv: ConversationNode) => {
    const oldMap = conv.mapping;
    type KeyofOldMap = keyof typeof oldMap;
    const oldMapEntries = Object.entries(oldMap) as [
      KeyofOldMap,
      ConversationMapping[keyof ConversationMapping],
    ][];
    // Determine which nodes to keep
    const keepIds = new Set<KeyofOldMap>();
    oldMapEntries.forEach(([id, node]) => {
      if (checkIfHaveMessageContent(node)) {
        keepIds.add(id);
      }
    });

    // Create shallow copies of kept nodes with placeholders for parent/children
    const newMap: Partial<ConversationMapping> = {};
    keepIds.forEach((id) => {
      const orig = oldMap[id];
      newMap[id] = {
        ...orig,
        children: [] as unknown as never[],
        parent: null as unknown as never,
      };
    });

    // Helper to gather next-kept descendants by skipping filtered nodes
    const gatherDescendants = (id: KeyofOldMap): KeyofOldMap[] => {
      const node = oldMap[id];
      if (!node) return [];
      const result: KeyofOldMap[] = [];
      node.children.forEach((childId) => {
        if (keepIds.has(childId)) {
          result.push(childId);
        } else {
          result.push(...gatherDescendants(childId));
        }
      });
      return result;
    };

    // Link children and parent pointers in newMap
    const mapping = newMap as ConversationMapping;
    keepIds.forEach((id) => {
      const nextChildren = gatherDescendants(id);
      mapping[id].children = nextChildren;
      nextChildren.forEach((childId) => {
        mapping[childId].parent = id;
      });
    });

    Object.entries(folderIndex).forEach(([folderName, conversationIds]) => {
      if (conversationIds.includes(conv.id)) {
        if (Array.isArray(byFolder[folderName])) {
          byFolder[folderName].push(conv);
        } else {
          byFolder[folderName] = [conv];
        }
      }
    });

    allConversations.push({
      ...conv,
      mapping,
    });
  });
  return { allConversations, byFolder };
};
