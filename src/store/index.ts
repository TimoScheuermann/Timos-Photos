/* eslint-disable */
import { FileManager, TPFileModel } from '@/utils/FileManager';
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    userValidated: false,
    dark: true,
    folders: [] as TPFolderModel[],
    files: [] as TPFileModel[],
  },
  getters: {
    valid: (state: any): boolean => {
      return state.userValidated;
    },
    user: (state: any): Object => {
      return state.user;
    },
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
    signOut(state: any) {
      state.userValidated = false;
      state.user = undefined;
    },
    signIn(state: any, user: { group: string }) {
      if (user && user.group === 'Admin') {
        state.user = user;
        state.userValidated = true;

        FolderManager.loadFolders();
        FileManager.loadFiles();
      }
    },
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
