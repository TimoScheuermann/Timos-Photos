import router from '@/router';
import store from '@/store';
import backend from './backend';
import { convertSize } from './functions';
import { TPEventBus } from './TPEventBus';

export class FileManager {
  private static commit(files: FileType[]) {
    if (files.length === 0) return;
    store.commit(
      'files',
      files.map((x) => new TPFileModel(x))
    );
  }

  public static get files(): TPFileModel[] {
    return store.getters.files;
  }

  public static async loadFiles(): Promise<void> {
    try {
      const { data } = await backend.get('photos/files');
      this.commit(data);
      return;
    } catch (_) {
      TPEventBus.$emit('error', 'Unauthorized to load files.');
    }
  }

  public static getFile(id: string): TPFileModel | null {
    return this.files.filter((x) => x.id === id)[0] || null;
  }

  public static deleteFile(id: string, folderId: string): void {
    if (!id || id.length === 0) return;
    backend
      .delete('photos/file/' + id)
      .then(({ data }) => {
        if (data) {
          const files = this.files.filter((x) => x.id !== id);
          store.commit('files', files);
          if (router.currentRoute.name === 'file')
            router.push({ name: 'folder', params: { id: folderId } });
        }
      })
      .catch((error) => {
        TPEventBus.$emit('error', error.message);
      });
  }

  public static updateFile(file: FileType): void {
    let exists = false;
    const model = new TPFileModel(file);
    const files = this.files.map((x) => {
      if (x.id === file.id) {
        exists = true;
        return model;
      }
      return x;
    });
    if (!exists) {
      files.push(model);
    }
    store.commit('files', files);
  }

  public static pinFile(id: string): void {
    backend.post('photos/pin/file/' + id);
    const files = this.files.map((x) => x.setPinned(id, true));
    this.commit(files);
  }

  public static unpinFile(id: string): void {
    backend.post('photos/unpin/file/' + id);
    const files = this.files.map((x) => x.setPinned(id, false));
    this.commit(files);
  }

  public static get pinnedFiles(): TPFileModel[] {
    return this.files.filter((x) => x.pinned);
  }

  public static changeFolderId(fileId: string, folderId: string): void {
    if (!folderId || !fileId) return;
    console.log('Changeing folder of file ' + folderId + ' to ' + folderId);
  }
}

type FileType = {
  id: string;
  src: string;
  name: string;
  pinned: boolean;
  created: number;
  tags: string[];
  folderId: string;
  size: number;
  width: number;
  height: number;
};

export class TPFileModel {
  id!: string;
  src!: string;
  name!: string;
  pinned!: boolean;
  created!: number;
  tags!: string[];
  folderId!: string;
  size!: number;
  width!: number;
  height!: number;

  constructor(file: FileType) {
    this.id = file.id;
    this.src = file.src;
    this.name = file.name;
    this.pinned = file.pinned;
    this.created = file.created;
    this.tags = file.tags;
    this.folderId = file.folderId;
    this.size = file.size;
    this.width = file.width;
    this.height = file.height;
  }

  public get fsize(): string {
    return convertSize(this.size);
  }

  public get date(): string {
    const d = new Date(this.created);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + d.getMonth()).slice(-2);
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  public setPinned(id: string, pinned: boolean): TPFileModel {
    if (this.id === id) {
      this.pinned = pinned;
    }
    return this;
  }

  public share(): void {
    navigator
      .share({ url: this.src })
      .then(() => {
        /* */
      })
      .catch(() => {
        /* */
      });
  }
}

export interface CreateFileDto {
  folderId?: string;
}
export interface PatchFileDto {
  name?: string;
  pinned?: boolean;
  tags?: string[];
  folderId?: string;
}
