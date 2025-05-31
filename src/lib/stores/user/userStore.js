import { persist } from "zustand/middleware";
import { create } from "zustand";

const useUserStore = create(
    persist((set) => {
        return {
            isLoading: false,
            user: null,
            chats: [],
            lastSearched: null,
            searchHistory: [],
            setUser: (signedInUser) => {
                set((state) => ({
                    user: signedInUser
                }))
            },
            addToSearchHistory: (search) => {
                set((state) => ({
                    searchHistory: [...state.searchHistory, search]
                }))
            },
            removeFromSearchHistory: (email) => {
                set((state) => ({
                    searchHistory: state.searchHistory.filter((users) => (users.email !== email))
                }))
            }, 
            setLastSearched: (search) => {
                set((state) => ({
                    lastSearched: search
                }))
            },
            addFriendRequest: (email) => {
                set((state) => ({
                    user: {
                        ...state.user,
                        friendRequests: {
                            ...state.user.friendRequests,
                            sent: [...state.user.friendRequests.sent, email]
                        }
                    }
                }))
            }
        }
    }, {
        name: 'userStore',
        getStorage: () => localStorage
    })
);

export default useUserStore;