import symblAIApp from "../../symbl_ai.app.mjs";

export default {
  key: "symbl_ai-get-questions",
  name: "Get Questions",
  description: "Get a list of requests for information or explicit questions recognized during the conversation. See the doc [here](https://docs.symbl.ai/docs/conversation-api/questions)",
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
      const response = await this.symblAIApp.getQuestions({
        $,
        conversationId: this.conversationId,
      });
      $.export("$summary", "Questions successfully retrieved from the conversation");
      return response;
    } catch (error) {
      console.log("Error: ", error);
      $.export("$summary", "Failed to retrieve Questions from the conversation");
    }
  },
};
