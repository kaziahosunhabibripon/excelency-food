"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalProps {
  id?: string | number;
  title?: string;
  isOpen?: boolean;
}

interface TaskProps {
  id?: string;
  name?: string;
  description?: string;
}

interface TabsProps {
  [key: string]: string | number | boolean;
}

interface SearchDataItem {
  id: string;
  name: string;
  [key: string]: string | number | boolean;
}

interface AppState {
  modalProps: ModalProps;
  globalPropsForSingleTask: TaskProps;
  tabs: TabsProps;
  searchData: SearchDataItem[];
  selectedSearchData: SearchDataItem;
}

const initialState: AppState = {
  modalProps: {},
  globalPropsForSingleTask: {},
  tabs: {},
  searchData: [],
  selectedSearchData: {} as SearchDataItem, // Type assertion to avoid error
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addModalProps: (state, action: PayloadAction<ModalProps>) => {
      state.modalProps = action.payload;
    },
    addSearchData: (state, action: PayloadAction<SearchDataItem[]>) => {
      state.searchData = action.payload;
    },
    addSelectedSearchData: (state, action: PayloadAction<SearchDataItem>) => {
      state.selectedSearchData = action.payload;
    },
    addGlobalPropsForSingleTask: (state, action: PayloadAction<TaskProps>) => {
      state.globalPropsForSingleTask = action.payload;
    },
    addTabs: (state, action: PayloadAction<TabsProps>) => {
      state.tabs = action.payload;
    },
  },
});

export const {
  addModalProps,
  addGlobalPropsForSingleTask,
  addTabs,
  addSearchData,
  addSelectedSearchData,
} = appSlice.actions;
export default appSlice.reducer;
