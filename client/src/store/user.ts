import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user: {
    uid?: string;
    name?: string;
    email?: string;
    lastname?: string;
    username?: string;
    avatar?: string;
    banner?: string;
    password?: string;
    token?: string;
    created_at?: string;
    isLogged?: boolean;
  }

  // Methods
  setUser: (user: State["user"]) => void;
}

export const useUserStore = create<State>()(
  persist(
    (set, get) => ({
      user: {
        uid: "",
        name: "",
        email: "",
        lastname: "",
        username: "",
        avatar: "",
        banner: "",
        password: "",
        token: "",
        created_at: "",
        isLogged: false
    },

      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "user-storage",
    }
  )
);