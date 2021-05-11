import store from '@/store';
import { FileManager, TPFileModel } from './FileManager';
import { convertSize } from './functions';

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
    // if (this.folders.length > 0) return;
    // TODO:
    this.commit([
      {
        id: '1',
        color: '#08f',
        children: ['2', '3'],
        name: 'FitnessHub',
        pinned: true,
      },
      {
        id: '2',
        color: 'orange',
        children: [],
        parent: '1',
        name: 'assets',
        pinned: false,
      },
      {
        id: '3',
        color: 'lime',
        children: ['4'],
        name: 'fonts',
        parent: '1',
        pinned: false,
      },
      {
        id: '4',
        color: 'orange',
        children: [],
        parent: '3',
        name: 'assets',
        pinned: false,
      },
    ]);
  }

  public static getFolder(id: string): TPFolderModel | null {
    return this.folders.filter((x) => x.id === id)[0] || null;
  }

  public static async deleteFolder(id: string): Promise<void> {
    // TODO:
    if (id == '') return;
  }

  public static getFiles(folderId: string): TPFileModel[] {
    return FileManager.files.filter((x) => x.folderId === folderId);
  }

  public static pinFolder(id: string): void {
    const folders = this.folders.map((x) => x.setPinned(id, true));
    this.commit(folders);
  }

  public static unpinFolder(id: string): void {
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
    console.log('Changeing parent of folder ' + folderId + ' to ' + parentId);
  }
}

type FolderType = {
  id: string;
  parent?: string;
  name: string;
  color: string;
  children: string[];
  pinned: boolean;
  icon?: string;
};

export class TPFolderModel {
  id!: string;
  parent?: string;
  name!: string;
  color!: string;
  children!: string[];
  pinned!: boolean;
  icon?: string;

  constructor(folder: FolderType) {
    this.id = folder.id;
    this.parent = folder.parent;
    this.name = folder.name;
    this.color = folder.color;
    this.children = folder.children;
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
