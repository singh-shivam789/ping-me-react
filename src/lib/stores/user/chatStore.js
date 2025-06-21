import { persist } from "zustand/middleware";
import { create } from "zustand";

const useChatStore = create(
    persist((set) => {
        return {
            chatUser: null,
            chats: [],
            setChats: (chats) => {
                set((state) => ({
                    chats: chats
                }))
            },
            setChatUser: (user) => {
                set((state) => ({
                    chatUser: user
                }))
            },
            removeFromChats: (chatToRemove) => {
                set((state) => ({
                    chats: state.chats.filter((chat) => chat._id !== chatToRemove._id)
                }));
            },
            addToChats: (newChat) => {
                set((state) => {
                    const isChatAlreadyPresent = state.chats.some((chat) => chat._id === newChat._id);
                    if (isChatAlreadyPresent) return {};
                    else return {
                        chats: [...state.chats, newChat]
                    }
                })
            }
        }
    }, {
        name: 'chatStore',
        getStorage: () => localStorage
    })
);

export default useChatStore;