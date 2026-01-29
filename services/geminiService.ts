import { AIAnalysisResult } from "../types";

export const analyzeEmote = async (base64Image: string): Promise<AIAnalysisResult> => {
  return {
      name: "Emote",
      description: "Local emote",
      tags: []
  };
};