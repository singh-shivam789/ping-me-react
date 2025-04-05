import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUserStore = create(
    persist((set) => {
        return {
            isLoading: false,
            user: null
        }
    }, {
        name: 'userStore',
        getStorage: () => localStorage
    })
);

