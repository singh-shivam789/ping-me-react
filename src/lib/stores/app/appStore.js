import { persist } from "zustand/middleware";
import { create } from "zustand";

const useAppStore = create(
    persist((set) => {
        return {
            allUsers:[],
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