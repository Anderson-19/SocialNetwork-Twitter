import { create } from 'zustand';

interface State {
  isSideModalPost: boolean;

  openModalPost: () => void;
  closeModalPost: () => void;

  isSideModalEditUser: boolean;

  openModalEditUser: () => void;
  closeModalEditUser: () => void;

  typePost: string;
  setTypePost: (typePost: string) => void;
}

export const useUIStore = create<State>()((set) => ({

  isSideModalPost: false,
  openModalPost: () => set({ isSideModalPost: true }),
  closeModalPost: () => set({ isSideModalPost: false }),

  isSideModalEditUser: false,
  openModalEditUser: () => set({ isSideModalEditUser: true }),
  closeModalEditUser: () => set({ isSideModalEditUser: false }),

  typePost: "",
  setTypePost: ( type: string ) => set({typePost: type })

}));