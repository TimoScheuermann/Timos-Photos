<template>
  <div class="view-folder">
    <tl-flow flow="column" mtop v-if="!folder">
      <br />
      <tc-spinner :dark="$store.getters.dark" size="20" />
      <p>Loading data</p>
    </tl-flow>
    <div content v-else>
      <TPPathBar />
      <br />

      <tl-flow nowrap horizontal="space-between">
        <TPTitle :title="folder.name" subtitle="Folder" />
        <tc-action :dark="$store.getters.dark">
          <tc-action-item icon="share" title="Copy Url" @click="copyUrl" />
          <tc-action-item
            v-if="!folder.pinned"
            icon="map-pin"
            title="Pin Folder"
            @click="pinFolder"
          />
          <tc-action-item
            v-else
            icon="map-pin"
            title="Unpin Folder"
            @click="unpinFolder"
          />
          <tc-action-item
            icon="pencil"
            title="Edit Folder"
            @click="editFolder"
          />
          <tc-action-item
            icon="trashcan-alt"
            title="Delete Folder"
            error
            @click="deleteFolder"
          />
        </tc-action>
      </tl-flow>

      <br />
      <TPCarousel>
        <TPFolder />
        <TPFolder v-for="f in folders" :key="f.id" :folder="f" />
      </TPCarousel>

      <br />
      <tl-flow horizontal="space-between">
        <TPTitle
          :title="'Photo' + (files.length !== 1 ? 's' : '')"
          :subtitle="'showing ' + files.length"
        />
        <div class="layouts">
          <div class="box" :active="layout" />
          <div class="layout" @click="setLayout(0)" :active="layout === 0">
            <i class="ti-tiles-four-filled" />
          </div>
          <div class="layout" @click="setLayout(1)" :active="layout === 1">
            <i class="ti-tiles-nine-filled" />
          </div>
          <div class="layout" @click="setLayout(2)" :active="layout === 2">
            <i class="ti-align-justify" />
          </div>
        </div>
      </tl-flow>

      <br />
      <tl-grid
        arrangement="auto-fill"
        v-if="layout < 2"
        :minWidth="layout === 0 ? '220' : '110'"
        gap="10"
      >
        <TPFile v-for="f in files" :key="f.id" :file="f" />
      </tl-grid>

      <div class="list" v-else>
        <div
          class="list-item"
          v-for="f in files"
          :key="f.id"
          @click="clicked($event, f)"
          draggable="true"
          @dragstart="drag($event, f)"
        >
          <tl-flow nowrap horizontal="space-between">
            <tl-flow nowrap>
              <div class="preview">
                <img draggable="false" :src="f.src" alt="" />
              </div>
              <div class="title">{{ f.name }}</div>
            </tl-flow>
            <tl-flow nowrap>
              <div class="size">{{ f.fsize }}</div>
              <TPFileActions :file="f" />
            </tl-flow>
          </tl-flow>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import TPCarousel from '@/components/TPCarousel.vue';
import TPFile from '@/components/TPFile.vue';
import TPFileActions from '@/components/TPFileActions.vue';
import TPFolder from '@/components/TPFolder.vue';
import TPPathBar from '@/components/TPPathBar.vue';
import TPTitle from '@/components/TPTitle.vue';
import { TPFileModel } from '@/utils/FileManager';
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';
import { copyToClipboard } from '@/utils/functions';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPFolder,
    TPFile,
    TPTitle,
    TPCarousel,
    TPFileActions,
    TPPathBar,
  },
})
export default class Folder extends Vue {
  public layout = 1;

  async mounted(): Promise<void> {
    if (!this.folder) {
      await FolderManager.loadFolders();
      if (!this.folder) {
        this.$router.push({ name: 'home' });
      }
    }
  }

  get id(): string {
    return this.$route.params.id;
  }

  get folder(): TPFolderModel | null {
    return FolderManager.getFolder(this.id);
  }

  get files(): TPFileModel[] {
    const folder = this.folder;
    if (!folder) return [];
    return folder.files;
  }

  get folders(): TPFolderModel[] {
    const folder = this.folder;
    if (!folder) return [];
    return folder.folders;
  }

  public setLayout(layout: number): void {
    this.layout = layout;
  }

  public clicked(e: MouseEvent, f: TPFileModel): void {
    if (e.shiftKey) {
      copyToClipboard(f.src);
      return;
    }
    this.$router.push({ name: 'file', params: { id: f.id } });
  }

  public copyUrl(): void {
    const folder = this.folder;
    if (!folder) return;
    const url = this.$router.resolve({
      name: 'folder',
      params: { id: folder.id },
    });
    copyToClipboard(window.location.origin + url.href);
  }

  public unpinFolder(): void {
    const folder = this.folder;
    if (!folder) return;
    FolderManager.unpinFolder(folder.id);
  }

  public pinFolder(): void {
    const folder = this.folder;
    if (!folder) return;
    FolderManager.pinFolder(folder.id);
  }

  public editFolder(): void {
    const folder = this.folder;
    if (!folder) return;
    this.$router.push({ name: 'edit-folder', params: { id: folder.id } });
  }

  public deleteFolder(): void {
    const folder = this.folder;
    if (!folder) return;
    FolderManager.deleteFolder(folder.id, folder.parent);
  }

  public drag(e: DragEvent, file: TPFileModel): void {
    e.dataTransfer?.setData('text', JSON.stringify({ file: file }));
  }
}
</script>

<style lang="scss" scoped>
.view-folder {
  .layouts {
    display: grid;
    grid-template-columns: repeat(3, 40px);
    height: 40px;
    position: relative;
    border-radius: #{$border-radius * 1.5};

    background: $container;
    @media #{$isDark} {
      background: $container_dark;
    }

    .box {
      position: absolute;

      border-radius: #{$border-radius};
      width: 30px;
      height: 30px;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: 0.2s ease-in-out;

      background: #fff;
      @media #{$isDark} {
        background: $color;
      }

      &[active='0'] {
        left: calc(100% / 6 * 1);
      }
      &[active='1'] {
        left: calc(100% / 6 * 3);
      }

      &[active='2'] {
        left: calc(100% / 6 * 5);
      }
    }

    .layout {
      position: relative;
      display: grid;
      place-content: center;
      cursor: pointer;
      &[active] {
        transition: 0.2s ease-in-out;
        color: #ff7246;
      }
    }
  }

  .list {
    .list-item {
      cursor: pointer;
      height: 50px;
      padding: 10px;
      width: calc(100% - 20px);
      margin: 10px 0;
      border-radius: #{$border-radius * 1.5};

      background: $paragraph;
      @media #{$isDark} {
        background: $paragraph_dark;
      }

      transition: 0.1s ease-in-out;
      box-shadow: $shadow-light;
      &:hover {
        box-shadow: $shadow;
        transform: scale(1.007);
      }

      .preview {
        height: 50px;
        width: 50px;
        min-height: 50px;
        min-width: 50px;
        margin-right: 10px;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: $border-radius;
        }
      }
      .title {
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
      .size {
        font-weight: bold;
        opacity: 0.5;
        font-size: 14px;
        margin: 0 10px;
        white-space: nowrap;
      }
    }
  }
}
</style>
