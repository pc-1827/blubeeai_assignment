import React, { useEffect, useState } from "react";
import styles from "./History.module.css";
import Image from "next/image";
import Auth from "../Auth/Auth";
import SpinnerWhite from "../SpinnerWhite/SpinnerWhite";
import { useRouter } from "next/navigation";
import { Skeleton } from "@nextui-org/skeleton";
import { useDisclosure } from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import {
  formatTimestamp,
  getRelativeDateLabel,
  cutString,
} from "@/utils/utils";
import { ChatThread } from "@/utils/types";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState, selectUserDetailsState } from "../../store/authSlice";
import { removeChatThread } from "@/store/chatSlice";
import { RootState } from "@/store/store";

import Pen from "../../../public/svgs/Pen.svg";
import Bin from "../../../public/svgs/Bin.svg";
import ChatInactive from "../../../public/svgs/sidebar/Chat_Inactive.svg";

interface ChatThreadWithTimestamp extends ChatThread {
  createdAt: Date;
}

const History = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useSelector(selectAuthState);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatThreadWithTimestamp[]>([]);

  // Get all threads from Redux store
  const allThreads = useSelector((state: RootState) => state.chat.threads);

  useEffect(() => {
    fetchChatHistory();
  }, [isAuthenticated, allThreads]);

  const fetchChatHistory = async () => {
    setLoading(true);

    // Create history array from Redux store
    const history = Object.keys(allThreads).map(id => {
      // Convert to the expected format with timestamp
      return {
        ...allThreads[id],
        createdAt: allThreads[id].createdAt || new Date() // Add timestamp if missing
      };
    });

    // Sort by most recent first
    history.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setChatHistory(history);
    setLoading(false);
  };

  const handleDelete = async (threadId: string) => {
    setDeleting(true);

    // Remove from Redux store instead of Firebase
    dispatch(removeChatThread(threadId));

    setDeleting(false);
  };

  const handleAuth = () => {
    onOpen();
  };

  return (
    <div className={styles.list}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Chats</div>
        <div className={styles.titleButton} onClick={() => router.push("/")}>
          <Image
            width={20}
            height={20}
            src={Pen}
            alt={"Pen"}
            className={styles.titleButtonIcon}
          />
          <p className={styles.titleButtonText}>New Chat</p>
        </div>
      </div>
      <ScrollShadow hideScrollBar className="h-[calc(100vh_-_50px)] w-full">
        <div className={styles.listContainer}>
          {loading ? (
            <React.Fragment>
              <Skeleton className={styles.skeletonListHeader} />
              <Skeleton className={styles.skeletonListItem} />
              <Skeleton className={styles.skeletonListItem} />
              <Skeleton className={styles.skeletonListItem} />
            </React.Fragment>
          ) : chatHistory.length === 0 ? (
            <div className={styles.emptyState}>
              <Image
                src={ChatInactive}
                alt="Chat Empty"
                className={styles.emptyStateIcon}
              />
              <p className={styles.emptyStateText}>No Chat History</p>
            </div>
          ) : (
            chatHistory.map((item, index, array) => {
              const formattedDate = formatTimestamp(item.createdAt);
              const header =
                index === 0 ||
                  formattedDate !==
                  formatTimestamp(array[index - 1].createdAt) ? (
                  <div key={`header-${index}`} className={styles.listHeader}>
                    {getRelativeDateLabel(formattedDate)}
                  </div>
                ) : null;
              return (
                <React.Fragment key={item.id}>
                  {header}
                  <div
                    className={styles.listItem}
                    onClick={() => router.push(`/chat/${item.id}`)}
                  >
                    {cutString(item.chats[0].question, 24)}
                    {deleting ? (
                      <div className={styles.spinner}>
                        <SpinnerWhite />
                      </div>
                    ) : (
                      <Image
                        src={Bin}
                        alt="Bin"
                        className={styles.bin}
                        onClick={(event: React.MouseEvent) => {
                          event.stopPropagation();
                          handleDelete(item.id);
                        }}
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>
      </ScrollShadow>
      {!isAuthenticated && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <p className={styles.modalTitle}>Sign in to see your chat history</p>
            <div className={styles.modalButton} onClick={handleAuth}>
              Sign in
            </div>
          </div>
        </div>
      )}
      <Auth isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default History;
