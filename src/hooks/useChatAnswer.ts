import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAnswer,
  addMessage,
  updateMessage,
  selectChatThread,
} from "@/store/chatSlice";
import { Chat as ChatType, ChatThread, Message } from "../utils/types";
import { selectUserDetailsState } from "@/store/authSlice";
import { selectAI } from "@/store/aiSlice";

type UseChatAnswerProps = {
  threadId: string;
  chatThread: ChatThread;
  setError: (error: string) => void;
  setErrorFunction: (fn: Function | null) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsCompleted: (isCompleted: boolean) => void;
};

const useChatAnswer = ({
  threadId,
  chatThread,
  setError,
  setErrorFunction,
  setIsStreaming,
  setIsLoading,
  setIsCompleted,
}: UseChatAnswerProps) => {
  const dispatch = useDispatch();
  const [controller, setController] = useState<AbortController | null>(null);

  // Test mode message
  const TEST_MODE_MESSAGE = "This feature is currently disabled in test mode.";

  // Simplified handler that just returns the test message
  const handleAnswer = async (chat: ChatType, data?: string) => {
    setIsLoading(true);

    // Simulate brief loading time
    setTimeout(() => {
      setIsLoading(false);
      setIsStreaming(true);

      // Update the answer with our test message
      dispatch(
        updateAnswer({
          threadId,
          chatIndex: chatThread.chats.length - 1,
          answer: TEST_MODE_MESSAGE,
        })
      );

      // Add the message to the thread
      dispatch(
        addMessage({
          threadId,
          message: { role: "assistant", content: TEST_MODE_MESSAGE },
        })
      );

      setIsStreaming(false);
      setIsCompleted(true);
    }, 500);
  };

  // Similar simplified implementation for rewrite
  const handleRewrite = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsStreaming(true);

      dispatch(
        updateAnswer({
          threadId,
          chatIndex: chatThread.chats.length - 1,
          answer: TEST_MODE_MESSAGE,
        })
      );

      const lastAssistantMessageIndex = chatThread.messages.findLastIndex(
        (message) => message.role === "assistant"
      );

      if (lastAssistantMessageIndex !== -1) {
        dispatch(
          updateMessage({
            threadId,
            messageIndex: lastAssistantMessageIndex,
            message: { role: "assistant", content: TEST_MODE_MESSAGE },
          })
        );
      }

      setIsStreaming(false);
      setIsCompleted(true);
    }, 500);
  };

  // Keep cancel functionality simple
  const handleCancel = () => {
    setIsStreaming(false);
    setIsLoading(false);
  };

  return {
    handleAnswer,
    handleRewrite,
    handleCancel,
  };
};

export default useChatAnswer;
