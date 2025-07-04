import { persist } from "zustand/middleware";
import { create } from "zustand";

const useAppStore = create(
    persist((set) => {
        return {
            allUsers:[],
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
            },
            setUsers: (users) => {
                set((state) => ({
                    allUsers: [...users]
                }));    
            },
            addNewUser: (newUser) => {
                set((state) => {
                    if(!state.allUsers.some((user) => user._id === newUser._id)){
                        return {
                            allUsers: [...state.allUsers, newUser]
                        }
                    }
                    else return {}
                });
            }
        }
    }, {
        name: 'appStore',
        getStorage: () => localStorage
    })
);

export default useAppStore;