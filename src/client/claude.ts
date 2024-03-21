import axios from "axios";

export interface CreateMessageResponse {
  content: Content[];
  id: string;
  model: string;
  role: string;
  stop_reason: string;
  stop_sequence: any;
  type: string;
  usage: Usage;
}

export interface Content {
  text: string;
  type: string;
}

export interface Usage {
  input_tokens: number;
  output_tokens: number;
}

export interface CreateMessageRequest {
  model: string;
  max_tokens: number;
  messages: Message[];
}

export interface Message {
  role: string;
  content: string;
}

class ClaudeApi {
  private baseUrl = "https://api.anthropic.com/v1/messages";

  public createMessage = async (
    message: CreateMessageRequest,
  ): Promise<CreateMessageResponse> => {
    try {
      const response = await axios.post<CreateMessageResponse>(
        this.baseUrl,
        message,
        {
          headers: {
            "x-api-key": import.meta.env.ANTROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };
}

export const claudeApi = new ClaudeApi();
