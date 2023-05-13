import { create } from "zustand";

interface WithdrawModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  address: string;
  token: string;
}

const useWithdrawModal = create<WithdrawModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  address: "",
  token: "",
}));

export default useWithdrawModal;
