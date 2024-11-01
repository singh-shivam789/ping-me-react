import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase";
import { useUserStore } from "./userStore";
export const useChatStore = create((set) => {
    return { 
        chatId: null,
        user: null,
        isCurrentUserBlocker: false,
        isReceiverBlocked: false,
        modifyChat: (chatId, user) => {
            const currentUser = useUserStore.getState().currentUser;
            if (user.blocked.includes(currentUser.id)) {
                return set({
                    chatId: chatId,
                    user: null,
                    isCurrentUserBlocker: true,
                    isReceiverBlocked: false,
                })
            }

            if (currentUser.blocked.includes(user.id)) {
                return set({
                    chatId: chatId,
                    user: user,
                    isCurrentUserBlocker: false,
                    isReceiverBlocked: true,
                })
            }

        },
        updateBlock: () => {
            set(state => ({ ...state, isReceiverBlocked: !isReceiverBlocked }))
        }
    }
})