import symblAIApp from "../../symbl_ai.app.mjs";

export default {
  key: "symbl_ai-get-action-items",
  name: "Get Action Items",
  description: "Get a list of all the action items generated from the conversation. See the doc [here](https://docs.symbl.ai/docs/conversation-api/action-items)",
  version: "0.0.1",
  type: "action",
  props: {
    symblAIApp,
    conversationId: {
      type: "string",
      label: "Conversation Id",
      description: "The Id of the Conversation",
    },
  },
  async run({ $ }) {
    try {
      const response = await this.symblAIApp.getActionItems({
        $,
        conversationId: this.conversationId,
      });
      $.export("$summary", "Action Items successfully retrieved from the conversation");
      return response;
    } catch (error) {
      console.log("Error: ", error);
      $.export("$summary", "Failed to retrieve Action Items from the conversation");
    }
  },
};
