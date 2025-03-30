import sendMessage from "./requests/send";
import getHistory from "./requests/getHistory";
import getConversation from "./requests/getConversation";
import deleteConversation from "./requests/deleteConversation";

// Export types
export * from "./utils/types";

// Export individual endpoints
export {
  sendMessage,
  getHistory,
  getConversation,
  deleteConversation
};

// Chat API object for backward compatibility
export const chatApi = {
  sendMessage,
  getHistory,
  getConversation,
  deleteConversation
};

export default chatApi; 