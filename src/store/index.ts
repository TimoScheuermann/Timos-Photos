/* eslint-disable */
import { TPFileModel } from '@/utils/FileManager';
import { TPFolderModel } from '@/utils/FolderManager';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: true,
    folders: [] as TPFolderModel[],
    files: [] as TPFileModel[],
  },
  getters: {
    dark: (state: any): boolean => {
      return state.dark;
    },
    files: (state: any): TPFileModel[] => {
      return state.files || [];
    },
    folders: (state: any): TPFolderModel[] => {
      return state.folders || [];
    },
  },
  mutations: {
    dark(state: any, dark: boolean) {
      state.dark = dark;
    },
    files(state: any, files: TPFileModel[]) {
      state.files = files;
    },
    folders(state: any, folders: TPFolderModel[]) {
      state.folders = folders;
    },
  },
});
