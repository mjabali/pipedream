import symblAIApp from "../../symbl_ai.app.mjs";

export default {
  key: "symbl_ai-post-video-url",
  name: "Submit Video URL",
  description: "Submit a Video by providing the URL for processing. See the doc [here](https://docs.symbl.ai/docs/async-api/overview/video/post-video-url)",
  version: "0.0.3",
  type: "action",
  props: {
    symblAIApp,
    videoUrl: {
      type: "string",
      label: "Video URL",
      description: "The URL of the video to be processed.",
      optional: false,
    },
    meetingName: {
      type: "string",
      label: "Meeting Name",
      description: "The meeting name. The default name is set to the conversationId.",
      optional: true,
    },
    customVocabulary: {
      type: "string[]",
      label: "Custom Vocabulary",
      description: "List of words and phrases that provide hints to the speech recognition task.",
      optional: true,
    },
    confidenceThreshold: {
      type: "string",
      label: "Confidence Threshold",
      description: "Minimum confidence score that you can set for an API to consider it as a valid insight (action items, follow-ups, topics, and questions). It should be in the range <=0.5 to <=1.0 (i.e., greater than or equal to 0.5 and less than or equal to 1.0.). The default value is 0.5.",
      optional: true,
    },
    detectPhrases: {
      type: "string",
      label: "Detect Phrases",
      description: "It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's Messages API. Accepts `true` or `false` values.",
      optional: true,
    },
    webhookUrl: {
      type: "string",
      label: "Webhook URL",
      description: "Webhook URL on which job updates to be sent.",
      optional: true,
    },
    detectEntities: {
      type: "string",
      label: "Detect Entities",
      description: "It returns any entities detected in the conversation. See [Entities API](https://docs.symbl.ai/docs/conversation-api/entities) for reference. Default value is false.",
      optional: true,
    },
    languageCode: {
      type: "string",
      label: "Language Code",
      description: "Language used in the conversation. See [supported languages](https://docs.symbl.ai/docs/async-api/overview/async-api-supported-languages) for reference. Default language is English (en-US).",
      optional: true,
    },
    mode: {
      type: "string",
      label: "Mode",
      description: "Set this parameter to `phone` when the audio is generated from a phone call (8khz sampling rate). The `default` mode works for audio generated from a video or audio meeting (16khz or higher sampling rate).",
      optional: true,
    },
    enableSeparateRecognitionPerChannel: {
      type: "string",
      label: "Enable Separate Recognition per Channel",
      description: "Enables Speaker Separated Channel video processing. Accepts `true` or `false` values.",
      optional: true,
    },
    enableAllTrackers: {
      type: "string",
      label: "Enable All Trackers",
      description: "Set this parameter to `true` to enable detection of all the Trackers configured for your account. Default value is `false`.",
      optional: true,
    },
    enableSpeakerDiarization: {
      type: "string",
      label: "Enable Speaker Diarization",
      description: "Set this parameter to `true` to enable Speaker Separation. Default value is `false`.  See [Speaker Separation](https://docs.symbl.ai/docs/async-api/overview/video/post-video-url/#speaker-separation) for reference.",
      optional: true,
    },
    diarizationSpeakerCount: {
      type: "string",
      label: "Number of Speakers",
      description: "The number of unique speakers in this conversation. See [Speaker Separation](https://docs.symbl.ai/docs/async-api/overview/video/post-video-url/#speaker-separation) for reference.",
      optional: true,
    },
  },
  async run({ $ }) {
    try {
      const response =
        await this.symblAIApp.postVideoUrl({
          $,
          data: {
            url: this.videoUrl,
            name: this.meetingName,
            customVocabulary: this.customVocabulary,
            confidenceThreshold: this.confidenceThreshold,
            detectPhrases: this.detectPhrases,
            webhookUrl: this.webhookUrl,
            detectEntities: this.detectEntities,
            languageCode: this.languageCode,
            mode: this.mode,
            enableSeparateRecognitionPerChannel: this.enableSeparateRecognitionPerChannel,
            enableAllTrackers: this.enableAllTrackers,
            enableSpeakerDiarization: this.enableSpeakerDiarization,
            diarizationSpeakerCount: this.diarizationSpeakerCount,
          },
        });
      $.export("$summary", `Successfully posted video URL for processing with Conversation Id: ${response.conversationId} and Job Id: ${response.jobId}`);
      return response;
    } catch (error) {
      console.log("Error: ", error);
      $.export("summary", "Failed to post video URL");
    }
  },
};
