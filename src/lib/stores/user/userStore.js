import { persist } from "zustand/middleware";
import { create } from "zustand";

const useUserStore = create(
    persist((set) => {
        return {
            user: null,
            isNewUser: false,
            chats: [],
            lastSearched: null,
            searchHistory: [],
            notificationsVisible: false,
            friendRequestUsers: [],
            notificationBellActive: false,
            userFriends: [],
            setIsNewUser: (flag) => {
                set((state) => ({
                    isNewUser: flag
                }))
            },
            setUserFriends: (friends) => {
                set((state) => ({
                    userFriends: [...friends]
                }))
            },
            addToUserFriends: (friend) => {
                set((state) => {
                    const doesExist = state.userFriends.some((frUser) => frUser.email === friend.email);
                    if (!doesExist) return {
                        userFriends: [...state.userFriends, friend]
                    }
                    else return {}
                })
            },
            setNotificationBellActive: (isActive) => {
                set((state) => ({
                    notificationBellActive: isActive
                }))
            },
            setFriendRequestUsers: (users) => {
                set((state) => ({
                    friendRequestUsers: [...users]
                }))
            },
            addToFriendRequestUsers: (user) => {
                set((state) => {
                    const doesExist = state.friendRequestUsers.some((frUser) => frUser.email === user.email);
                    if (!doesExist) return {
                        friendRequestUsers: [...state.friendRequestUsers, user]
                    }
                    else return {}
                })
            },
            removeFriendRequestUser: (user) => {
                set((state) => ({
                    friendRequestUsers: state.friendRequestUsers.filter((frUser) => frUser.email !== user.email)
                }))
            },
            setNotificationsVisible: () => {
                set((state) => ({
                    notificationsVisible: !state.notificationsVisible
                }))
            },
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