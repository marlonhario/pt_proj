import create from "zustand";

export const [useIndicatorFormStore] = create((set) => ({
  isIndicatorOpen: false,
  openIndicatorForm: () => set({ isIndicatorOpen: true }),
  closeIndicatorForm: () => set({ isIndicatorOpen: false }),
}));

export const [useLongEntryListStore] = create((set) => ({
  longEntryList: [],
  addLongEntry: (longEntry) =>
    set((state) => ({ longEntryList: [...state.longEntryList, longEntry] })),
  removeLongEntry: (longEntry) =>
    set((state) => ({
      longEntry: state.longEntryList.filter((item) => item.id != longEntry.id),
    })),
  updateLongEntry: (longEntry) =>
    set((state) => ({
      longEntryList: state.longEntryList.map((item) => {
        if (item.id == longEntry.id) {
          return Object.assign({}, item, { ...longEntry });
        }
        return item;
      }),
    })),
}));
