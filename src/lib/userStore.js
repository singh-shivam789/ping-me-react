import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase";
export const useUserStore = create((set) => {
    return {
        currentUser: null,
        isLoading: true,
        fetchCurrentUserInfo: async (uid) => {
            if (!uid) return set({ currentUser: null, isLoading: false });
            try {
                const userDocRef = doc(db, "users", uid);
                const userDocSnap = await getDoc(userDocRef)
                if (userDocSnap.exists()) {
                    return set({ currentUser: userDocSnap.data(), isLoading: false });
                }
                else return set({ currentUser: null, isLoading: false });
            }
            catch (err) {
                console.log("Can't fetch user info!")
                return set({ currentUser: null, isLoading: false });
            }
        }
    }
})