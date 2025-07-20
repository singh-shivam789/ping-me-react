import { persist } from "zustand/middleware";
import { create } from "zustand";

const useChatStore = create(
    persist((set) => {
        return {
            chatUser: null,
            chats: [],
            currentChat: null,
            setSelfChatUser: (updatedUser) => {
                set((state) => ({
                    chats: state.chats.map((chat) => {
                        if (chat.isSelfChat) {
                            return {
                                ...chat,
                                user: updatedUser
                            }
                        }
                        else return chat;
                    })
                }))
            },
            addMessageToCurrentChat: (chatId, message) => {
                set((state) => {
                    return {
                        chats: state.chats.map((chat) => {
                            if(chat._id === chatId){
                                return {
                                    ...chat,
                                    messages: [...chat.messages, message]     
                                }
                            }
                            else return chat;
                        })
                    }
                })
            },
            setChatLastMessage: (chatId, message) => {
                set((state) => {
                    return {
                        chats: state.chats.map((chat) => {
                            if(chat._id === chatId){
                                return {
                                    ...chat,
                                    lastMessage: message   
                                }
                            }
                            else return chat;
                        })
                    }
                })
            },
            setCurrentChat: (chatId) => {
                set((state) => ({
                    currentChat: chatId
                }))
            },
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