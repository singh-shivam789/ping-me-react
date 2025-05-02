import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUserStore = create(
    persist((set) => {
        return {
            isLoading: false,
            user: null,
            chats: [],
            lastSearched: null,
            searchHistory: [],
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
            }
        }
    }, {
        name: 'userStore',
        getStorage: () => localStorage
    })
);

