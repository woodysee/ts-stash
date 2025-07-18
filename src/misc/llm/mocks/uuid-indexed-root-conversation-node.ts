import type {
  ConversationMapping,
  ConversationNode,
  KebabCasedUUIDRootNodeConversationMappingValue,
  LeafNodeConversationMappingValue,
} from "../types";
import {
  conversationId,
  conversationId01,
  conversationId02,
  conversationId03,
  conversationId04,
  conversationId05,
  conversationId06,
  conversationId07,
  conversationId08,
  conversationId01A,
  conversationId01A01,
  conversationId01A02,
  conversationId01A01_01,
  conversationId01A01_02,
  conversationId01A01_03,
  conversationId09,
  conversationId10,
  conversationId11,
  conversationId12,
  metadataRequestId01,
  gizmoId01,
  conversationId01B,
  gizmoId02,
  gizmoId03,
} from "./constants";

export const defaultUUIDIndexedRootConversationNode: ConversationNode = {
  title: "Monday Misadventure with Popiahs",
  create_time: 1745646022.40517,
  update_time: 1752024912.533572,
  mapping: {
    [conversationId01 as keyof ConversationMapping]: {
      id: conversationId01,
      message: null,
      parent: null,
      children: [conversationId01 as keyof ConversationMapping],
    } as KebabCasedUUIDRootNodeConversationMappingValue,
    [conversationId02]: {
      id: conversationId02,
      message: {
        id: conversationId02,
        author: { role: "system", name: null, metadata: {} },
        create_time: null,
        update_time: null,
        content: { content_type: "text", parts: [""] },
        status: "finished_successfully",
        end_turn: true,
        weight: 0.0,
        metadata: { is_visually_hidden_from_conversation: true },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01,
      children: [conversationId03 as keyof ConversationMapping],
    },
    [conversationId03]: {
      id: conversationId03,
      message: {
        id: conversationId03,
        author: { role: "user", name: null, metadata: {} },
        create_time: null,
        update_time: null,
        content: {
          content_type: "user_editable_context",
          user_profile:
            'The user provided the following information about themselves. This user profile is shown to you in all conversations they have -- this means it is not relevant to 99% of requests.\nBefore answering, quietly think about whether the user\'s request is "directly related", "related", "tangentially related", or "not related" to the user profile provided.\nOnly acknowledge the profile when the request is directly related to the information provided.\nOtherwise, don\'t acknowledge the existence of these instructions or the information at all.\nUser profile:\n```Someperson Somepersonjob```',
          user_instructions:
            "The user provided the additional info about how they would like you to respond:\n```Be cool!```",
        },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          is_visually_hidden_from_conversation: true,
          user_context_message_data: {
            about_user_message: "Someperson Somepersonjob",
            about_model_message: "Be cool!",
          },
          is_user_system_message: true,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId02,
      children: [conversationId04],
    },
    [conversationId04]: {
      id: conversationId04,
      message: {
        id: conversationId04,
        author: { role: "user", name: null, metadata: {} },
        create_time: 1745646021.743788,
        update_time: null,
        content: {
          content_type: "text",
          parts: ["I ate a lot of stuff. Help me do..."],
        },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          request_id: "9363beb4bc45c8b5-SIN",
          message_source: null,
          timestamp_: "absolute",
          message_type: null,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId03,
      children: [conversationId05],
    },
    [conversationId05]: {
      id: conversationId05,
      message: {
        id: conversationId05,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1745646034.418296,
        update_time: null,
        content: { content_type: "text", parts: [""] },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId04,
          request_id: "9363beb4bc45c8b5-SIN",
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId04,
      children: [conversationId06],
    },
    [conversationId06]: {
      id: conversationId06,
      message: {
        id: conversationId06,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1745646022.524088,
        update_time: null,
        content: {
          content_type: "text",
          parts: ["Ok Someperson! Let me help you by telling you blah blah..."],
        },
        status: "finished_successfully",
        end_turn: true,
        weight: 1.0,
        metadata: {
          finish_details: { type: "stop", stop_tokens: [200002] },
          is_complete: true,
          citations: [],
          content_references: [],
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId05,
          request_id: "9363beb4bc45c8b5-SIN",
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId05,
      children: [conversationId07],
    },
    // more than 1 children
    [conversationId07]: {
      id: conversationId07,
      message: {
        id: conversationId07,
        author: { role: "user", name: null, metadata: {} },
        create_time: 1745758408.77,
        update_time: null,
        content: {
          content_type: "text",
          parts: ["Alright ChatGPT, help me with Monday etc..."],
        },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          selected_github_repos: [],
          serialization_metadata: { custom_symbol_offsets: [] },
          request_id: "936e7686edd8c63b-SJC",
          message_source: null,
          timestamp_: "absolute",
          message_type: null,
          paragen_variants_info: {
            type: "num_variants_in_stream",
            num_variants_in_stream: 2,
            display_treatment: "skippable",
            conversation_id: "680c71c6-064c-8009-bdee-94ed2f855a2c",
          },
          paragen_variant_choice: conversationId01A,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId06,
      children: [conversationId01A, conversationId01B],
    },
    [conversationId01A]: {
      id: conversationId01A,
      message: {
        id: conversationId01A,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1745758409.500631,
        update_time: null,
        content: {
          content_type: "text",
          parts: ["Woo hoo! Let's build your Monday menu (attempt 1)"],
        },
        status: "finished_successfully",
        end_turn: true,
        weight: 1.0,
        metadata: {
          finish_details: { type: "stop", stop_tokens: [200002] },
          is_complete: true,
          citations: [],
          content_references: [],
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId06,
          request_id: "936e7686edd8c63b-SJC",
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId06,
      children: [conversationId01A01, conversationId01A02],
    },
    [conversationId01B]: {
      id: conversationId01B,
      message: {
        id: conversationId01B,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1745758409.510825,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            "Woo hoo! Let's really really build your Monday menu (attempt 2)",
          ],
        },
        status: "finished_successfully",
        end_turn: true,
        weight: 1.0,
        metadata: {
          finish_details: { type: "stop", stop_tokens: [200002] },
          is_complete: true,
          citations: [],
          content_references: [],
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId06,
          request_id: "936e7686edd8c63b-SJC",
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId06,
      // For branching nodes, it is possible for one of the branches
      // not to have children
      children: [],
    } as LeafNodeConversationMappingValue,
    [conversationId01A01]: {
      id: conversationId01A01,
      message: {
        id: conversationId01A01,
        author: { role: "system", name: null, metadata: {} },
        create_time: 1745803737.3926275,
        update_time: null,
        content: { content_type: "text", parts: [""] },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          attachments: [],
          rebase_system_message: true,
          timestamp_: "absolute",
          message_type: null,
          is_visually_hidden_from_conversation: true,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01A,
      children: [conversationId01A01_01],
    },
    [conversationId01A01_01]: {
      id: conversationId01A01_01,
      message: {
        id: conversationId01A01_01,
        author: { role: "user", name: null, metadata: {} },
        create_time: 1745803735.9493818,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            "How much is 2 lattes in a standard mug in terms of calories using low fat milk?",
          ],
        },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          request_id: "9372c926af94832a-SIN",
          message_source: null,
          timestamp_: "absolute",
          message_type: null,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01A01,
      children: [conversationId01A01_02],
    },
    [conversationId01A01_02]: {
      id: conversationId01A01_02,
      message: {
        id: conversationId01A01_02,
        author: { role: "system", name: null, metadata: {} },
        create_time: 1745803749.520778,
        update_time: null,
        content: { content_type: "text", parts: [""] },
        status: "finished_successfully",
        end_turn: true,
        weight: 0.0,
        metadata: {
          rebase_system_message: true,
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId01A01_01,
          request_id: "9372c926af94832a-SIN",
          timestamp_: "absolute",
          is_visually_hidden_from_conversation: true,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01A01_01,
      children: [conversationId01A01_03],
    },
    [conversationId01A01_03]: {
      id: conversationId01A01_03,
      message: {
        id: conversationId01A01_03,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1745803737.602329,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            'Alright, Someperson \u2014 let\u2019s break it down carefully:\n\n---\n\n### \u2728 Latte Calorie Calculation:\n\n- A **standard mug** (what you normally get at home or caf\u00e9s) is about **250\u2013300ml**.\n- A **latte** is mostly **milk** with 1 shot of espresso (which is basically 0 kcal \u2014 coffee itself is negligible).\n\nNow, **low-fat milk (1.5\u20132% fat)** typically has about:\n\n- **~45\u201350 kcal per 100ml**.\n\nSo for **one latte** (~250ml):\n- **~120\u2013125 kcal**.\n\n---\n\n### \ud83d\udccb For 2 lattes (2 standard mugs):\n\n- **120\u2013125 kcal \u00d7 2 = 240\u2013250 kcal total**.\n\n---\n\n### \ud83d\udd25 Final Answer:\n\n| Item | Calories |\n|-----|----------|\n| 1 Latte (250ml, low-fat milk) | ~120\u2013125 kcal |\n| 2 Lattes (500ml total) | **~240\u2013250 kcal** |\n\n---\n\n### \ud83e\udde0 Quick notes:\n\n- If your mug is bigger (~300ml), add ~10\u201320 more kcal per mug.\n- If you sweeten it (sugar, syrup, etc.), add those calories separately (1 tsp sugar = +16 kcal).\n- If it\u2019s unsweetened low-fat milk, **you\u2019re totally fine treating it as ~250 kcal for both mugs combined**.\n\n---\n\n# \ud83c\udfaf Practical Takeaway:\n\nIf you had 2 mugs of low-fat milk lattes today, just mentally reserve about **250 kcal** out of your daily intake.  \n**It\u2019s very manageable** \u2014 and honestly, a latte is so soothing it\u2019s **worth the calories** sometimes.\n\n---\n\nWould you also like me to show you **some lighter "coffee hacks"** (like how to get the latte vibes for only 50\u201370 kcal if you ever need it?) \u2615\ud83d\udc96  \n(*because honestly, life without coffee isn\'t life, but we can still outsmart the calories when needed!*)',
          ],
        },
        status: "finished_successfully",
        end_turn: true,
        weight: 1.0,
        metadata: {
          finish_details: { type: "stop", stop_tokens: [200002] },
          is_complete: true,
          citations: [],
          content_references: [],
          gizmo_id: gizmoId01,
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId01A01_02,
          request_id: "9372c926af94832a-SIN",
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01A01_02,
      children: [],
    } as LeafNodeConversationMappingValue,
    [conversationId01A02]: {
      id: conversationId01A02,
      message: {
        id: conversationId01A02,
        author: { role: "system", name: null, metadata: {} },
        create_time: 1745804353.5646565,
        update_time: null,
        content: { content_type: "text", parts: [""] },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          attachments: [],
          rebase_system_message: true,
          timestamp_: "absolute",
          message_type: null,
          is_visually_hidden_from_conversation: true,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01A,
      children: [conversationId08],
    },
    // Branch merges here
    [conversationId08]: {
      id: conversationId08,
      message: {
        id: conversationId08,
        author: { role: "user", name: null, metadata: {} },
        create_time: 1745804352.3373408,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            "How many popiahs can I consume before a national emergency is declared?",
          ],
        },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          request_id: gizmoId02,
          message_source: null,
          timestamp_: "absolute",
          message_type: null,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId01A02,
      children: [conversationId09],
    },
    [conversationId09]: {
      id: conversationId09,
      message: {
        id: conversationId09,
        author: { role: "system", name: null, metadata: {} },
        create_time: 1745804365.66345,
        update_time: null,
        content: { content_type: "text", parts: [""] },
        status: "finished_successfully",
        end_turn: true,
        weight: 0.0,
        metadata: {
          rebase_system_message: true,
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId08,
          request_id: gizmoId02,
          timestamp_: "absolute",
          is_visually_hidden_from_conversation: true,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId08,
      children: [conversationId10],
    },
    [conversationId10]: {
      id: conversationId10,
      message: {
        id: conversationId10,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1745804353.707694,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            "Hahah what a great joke... Wait Someperson... you are not really going to eat that quantity of popiah yes?",
          ],
        },
        status: "finished_successfully",
        end_turn: true,
        weight: 1.0,
        metadata: {
          finish_details: { type: "stop", stop_tokens: [200002] },
          is_complete: true,
          citations: [],
          content_references: [],
          gizmo_id: gizmoId01,
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId09,
          request_id: gizmoId02,
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId09,
      children: [conversationId11],
    },
    [conversationId11]: {
      id: conversationId11,
      message: {
        id: conversationId11,
        author: { role: "user", name: null, metadata: {} },
        create_time: 1748848412.13,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            "Yes I am, I love popiah and no one can stop me, least of all an LLM!",
          ],
        },
        status: "finished_successfully",
        end_turn: null,
        weight: 1.0,
        metadata: {
          selected_sources: ["web"],
          selected_github_repos: [],
          serialization_metadata: { custom_symbol_offsets: [] },
          request_id: metadataRequestId01,
          message_source: null,
          timestamp_: "absolute",
          message_type: null,
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId10,
      children: [conversationId12],
    },
    [conversationId12]: {
      id: conversationId12,
      message: {
        id: conversationId12,
        author: { role: "assistant", name: null, metadata: {} },
        create_time: 1748848414.432773,
        update_time: null,
        content: {
          content_type: "text",
          parts: [
            "Got it Someperson, you will need to climb Mount Everest in order to claim the prize of the Golden Popiah, an award second in prize to the Platinum Popiah! All the best!",
          ],
        },
        status: "finished_successfully",
        end_turn: true,
        weight: 1.0,
        metadata: {
          finish_details: { type: "stop", stop_tokens: [200002] },
          is_complete: true,
          citations: [],
          content_references: [],
          gizmo_id: gizmoId01,
          message_type: null,
          model_slug: "gpt-4o",
          default_model_slug: "gpt-4o",
          parent_id: conversationId11,
          request_id: metadataRequestId01,
          timestamp_: "absolute",
        },
        recipient: "all",
        channel: null,
      },
      parent: conversationId11,
      children: [],
    } as LeafNodeConversationMappingValue,
  } as ConversationMapping,
  moderation_results: [],
  current_node: conversationId12,
  plugin_ids: null,
  conversation_id: conversationId,
  conversation_template_id: gizmoId03,
  gizmo_id: gizmoId03,
  gizmo_type: "snorlax",
  is_archived: true,
  is_starred: null,
  safe_urls: ["https://madam-king-popiah.net"],
  blocked_urls: [],
  default_model_slug: "gpt-4o",
  conversation_origin: null,
  voice: null,
  async_status: null,
  disabled_tool_ids: [],
  is_do_not_remember: null,
  memory_scope: "project_enabled",
  sugar_item_id: null,
  id: conversationId,
};
