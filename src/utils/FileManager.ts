import store from '@/store';
import { convertSize } from './functions';

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
    // if (this.files.length > 0) return;
    // TODO:
    this.commit([
      {
        id: '1',
        folderId: '1',
        created: Date.now(),
        name: 'FitnessHub - Home',
        size: Date.now(),
        pinned: false,
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
      {
        id: '2',
        folderId: '2',
        created: Date.now(),
        name: '2 mit einem sehr sehr sehr sher langen namen, lol was geht ab',
        size: Date.now(),
        pinned: false,
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
      {
        id: '3',
        folderId: '3',
        created: Date.now(),
        name: '3.jpg',
        size: Date.now(),
        pinned: true,
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
      {
        id: '4',
        folderId: '4',
        created: Date.now(),
        name: '4',
        size: Date.now(),
        pinned: false,
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
      {
        id: '5',
        folderId: '1',
        pinned: true,
        created: Date.now(),
        name: '5',
        size: Date.now(),
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
      {
        id: '6',
        folderId: '2',
        created: Date.now(),
        name: '6',
        size: Date.now(),
        pinned: false,
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
      {
        id: '7',
        folderId: '2',
        created: Date.now(),
        name: '7',
        pinned: true,
        size: Date.now(),
        tags: ['fitnesshub', 'screenshot', 'home'],
        src:
          'https://timos.s3.eu-central-1.amazonaws.com/drive/fitnesshub/18bb2653-50ac-435f-903f-67b367c4f032.jpeg',
      },
    ]);
  }

  public static getFile(id: string): TPFileModel | null {
    return this.files.filter((x) => x.id === id)[0] || null;
  }

  public static deleteFile(id: string): void {
    // TODO:
    if (id === '') return;
  }

  public static pinFile(id: string): void {
    const files = this.files.map((x) => x.setPinned(id, true));
    this.commit(files);
  }

  public static unpinFile(id: string): void {
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

  constructor(file: FileType) {
    this.id = file.id;
    this.src = file.src;
    this.name = file.name;
    this.pinned = file.pinned;
    this.created = file.created;
    this.tags = file.tags;
    this.folderId = file.folderId;
    this.size = file.size;
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
