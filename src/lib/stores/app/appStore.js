import { persist } from "zustand/middleware";
import { create } from "zustand";

const useAppStore = create(
    persist((set) => {
        return {
            isAddFriendSearchVisible: false,
            showEmojiPicker: false,
            isDetailViewVisible: false,
            setIsDetailViewVisible: () => {
                set((state) => ({
                    isDetailViewVisible: !state.isDetailViewVisible
                }))
            },
            setShowEmojiPicker: () => {
                set((state) => ({
                    showEmojiPicker: !state.showEmojiPicker
                }))
            },
            setIsAddFriendSearchVisible: () => {
                set((state) => ({
                    isAddFriendSearchVisible: !state.isAddFriendSearchVisible
                }))
            }
        }
    }, {
        name: 'appStore',
        getStorage: () => localStorage
    })
);

export default useAppStore;