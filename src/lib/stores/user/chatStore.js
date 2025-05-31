import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useChatStore = create(
    persist((set) => {
        return {
            user: null,
            lastSearched: null,
            searchHistory: [],
            addToSearchHistory: (search) => {
                set((state) => ({
                    searchHistory: [...state.searchHistory, search]
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

