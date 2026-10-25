import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { fetchAll } from '@/app/services/clientservices';

interface UserProp {
  userName: string,
  userEmail: string,
  userAvatar: string
}
interface UserState {
  user: UserProp | null;  
  setUser: (user: UserProp) => void;  
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => (
      {
        user: null,
        setUser: (user) => set((state) =>
        ({user: user})        
        ),
        clearUser: () =>
          set({ user:  null}),        
        
      }
    ),
    {
      name: 'elite-user-storage', // Key name in localStorage
    }
  ));
