import router from '@/router';
import store from '@/store';
import backend from './backend';
import { FileManager, TPFileModel } from './FileManager';
import { convertSize } from './functions';
import { TPEventBus } from './TPEventBus';

export class FolderManager {
  private static commit(folders: FolderType[]) {
    if (folders.length === 0) return;
    store.commit(
      'folders',
      folders.map((x) => new TPFolderModel(x))
    );
  }

  public static get folders(): TPFolderModel[] {
    return store.getters.folders;
  }

  public static async loadFolders(): Promise<void> {
    try {
      const { data } = await backend.get('photos/folders');
      this.commit(data);
      return;
    } catch (_) {
      TPEventBus.$emit('error', 'Unauthorized to load folders.');
    }
  }

  public static getFolder(id: string): TPFolderModel | null {
    return this.folders.filter((x) => x.id === id)[0] || null;
  }

  public static deleteFolder(id: string, parent?: string): void {
    if (!id || id.length === 0) return;
    backend
      .delete('photos/folder/' + id)
      .then(({ data }) => {
        if (data) {
          const folders = this.folders.filter((x) => x.id !== id);
          store.commit('folders', folders);
          if (parent) {
            router.push({ name: 'folder', params: { id: parent } });
          } else {
            router.push({ name: 'home' });
          }
        }
      })
      .catch((error) => {
        TPEventBus.$emit('error', error.message);
      });
  }

  public static updateFolder(folder: FolderType): void {
    let exists = false;
    const model = new TPFolderModel(folder);
    const folders = this.folders.map((x) => {
      if (x.id === folder.id) {
        exists = true;
        return model;
      }
      return x;
    });
    if (!exists) {
      folders.push(model);
    }
    store.commit('folders', folders);
  }

  public static getFiles(folderId: string): TPFileModel[] {
    return FileManager.files.filter((x) => x.folderId === folderId);
  }

  public static pinFolder(id: string): void {
    backend.post('photos/pin/folder/' + id);
    const folders = this.folders.map((x) => x.setPinned(id, true));
    this.commit(folders);
  }

  public static unpinFolder(id: string): void {
    backend.post('photos/unpin/folder/' + id);
    const folders = this.folders.map((x) => x.setPinned(id, false));
    this.commit(folders);
  }

  public static get pinnedFolders(): TPFolderModel[] {
    return this.folders.filter((x) => x.pinned);
  }

  public static get homeFolders(): TPFolderModel[] {
    return this.folders.filter((x) => !x.parent);
  }

  public static changeParent(folderId: string, parentId: string | null): void {
    if (!folderId || folderId === parentId) return;
    const folder = this.getFolder(folderId);
    if (!folder) return;
    backend
      .patch('photos/folder/' + folderId, {
        ...folder,
        parent: parentId || null,
      })
      .then(({ data }) => {
        this.updateFolder(data);
      })
      .catch((error) => {
        TPEventBus.$emit('error', error.message);
      });
  }
}

interface FolderType {
  id: string;
  parent?: string;
  name: string;
  color: string;
  pinned: boolean;
  icon?: string;
}

export class TPFolderModel {
  id!: string;
  parent?: string;
  name!: string;
  color!: string;
  pinned!: boolean;
  icon?: string;

  constructor(folder: FolderType) {
    this.id = folder.id;
    this.parent = folder.parent;
    this.name = folder.name;
    this.color = folder.color;
    this.pinned = folder.pinned;
    this.icon = folder.icon;
  }

  public get files(): TPFileModel[] {
    return FolderManager.getFiles(this.id);
  }

  public get fsize(): string {
    const total = this.files.map((x) => x.size).reduce((a, b) => a + b, 0);
    return convertSize(total);
  }

  public get children(): string[] {
    return FolderManager.folders
      .filter((x) => x.parent && x.parent === this.id)
      .map((x) => x.id);
  }

  public setPinned(id: string, pinned: boolean): TPFolderModel {
    if (this.id === id) {
      this.pinned = pinned;
    }
    return this;
  }

  public get folders(): TPFolderModel[] {
    return (this.children
      .map((x) => FolderManager.getFolder(x))
      .filter((x) => !!x) as TPFolderModel[]).sort((a, b) =>
      a?.name.localeCompare(b?.name)
    );
  }
}

export interface CreateFolderDto {
  name: string;
  color: string;
  parent?: string;
  icon?: string;
}

export interface PatchFolderDto {
  name: string;
  color: string;
  parent?: string;
  icon?: string;
  pinned: boolean;
}
