import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  selectChatThread,
  addChatThread,
  updateChatThread,
  removeChatThread,
} from "@/store/chatSlice";
import { RootState } from "@/store/store";

const useChatFetch = (id: string) => {
  const dispatch = useDispatch();
  const chatThread = useSelector((state: RootState) =>
    selectChatThread(state, id)
  );
  const [isFetching, setIsFetching] = useState(true);

  const fetchChatThread = useCallback(async () => {
    setIsFetching(true);
    try {
      // In test mode, just use the local redux state
      if (chatThread) {
        setIsFetching(false);
        return;
      }

      // No data available, end loading state
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching chat thread:", error);
      setIsFetching(false);
    }
  }, [dispatch, id, chatThread]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      if (!chatThread) {
        await fetchChatThread();
      } else if (chatThread.shared) {
        await fetchChatThread();
      } else {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return { chatThread, isFetching };
};

export default useChatFetch;
