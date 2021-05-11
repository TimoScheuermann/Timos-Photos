<template>
  <div
    class="tp-folder"
    :class="{ create: !folder }"
    @click="clicked"
    @drop="drop"
    @dragover="allowDrop"
    :draggable="!!folder"
    @dragstart="drag"
  >
    <template v-if="folder">
      <i
        :class="'ti-' + (folder.icon || 'folder-open')"
        :style="{ color: folder.color }"
      />
      <div class="title">{{ folder.name }}</div>
    </template>
    <template v-else>
      <i class="ti-folder-plus" op />
      <div class="title">Create new folder</div>
    </template>
  </div>
</template>

<script lang="ts">
import { FileManager } from '@/utils/FileManager';
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';
import { copyToClipboard } from '@/utils/functions';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TPFolder extends Vue {
  @Prop() folder!: TPFolderModel;

  public clicked(e: MouseEvent): void {
    if (this.folder) {
      if (e.shiftKey) {
        this.copyUrl();
        return;
      }
      this.$router.push({ name: 'folder', params: { id: this.folder.id } });
    } else {
      let query = undefined;
      if (this.$route.name === 'folder') {
        query = { parent: this.$route.params.id };
      }
      this.$router.push({ name: 'create-folder', query: query });
    }
  }

  public copyUrl(): void {
    const url = this.$router.resolve({
      name: 'folder',
      params: { id: this.folder.id },
    });
    copyToClipboard(window.location.origin + url.href);
  }

  public unpinFolder(): void {
    FolderManager.unpinFolder(this.folder.id);
  }

  public pinFolder(): void {
    FolderManager.pinFolder(this.folder.id);
  }

  public editFolder(): void {
    this.$router.push({ name: 'edit-folder', params: { id: this.folder.id } });
  }

  public deleteFolder(): void {
    FolderManager.deleteFolder(this.folder.id);
  }

  public allowDrop(e: DragEvent): void {
    if (this.folder) e.preventDefault();
  }

  public drag(e: DragEvent): void {
    e.dataTransfer?.setData('text', JSON.stringify({ folder: this.folder }));
  }

  public drop(e: DragEvent): void {
    e.preventDefault();
    if (this.folder) {
      const data = JSON.parse(e.dataTransfer?.getData('text') || '');
      if (data && data.folder) {
        FolderManager.changeParent(data.folder.id, this.folder.id);
      } else if (data && data.file) {
        FileManager.changeFolderId(data.file.id, this.folder.id);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tp-folder {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: $paragraph;
  @media #{$isDark} {
    background: $paragraph_dark;
  }
  border-radius: $border-radius;
  padding: 10px 20px;
  cursor: pointer;

  transition: 0.1s ease-in-out;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
    transform: scale(1.007);
  }

  &.create {
    @include gradient-bg();
    color: #fff;
  }

  &:not(.create) {
    -webkit-user-drag: element;
    -webkit-user-drop: element;
  }

  [op] {
    opacity: 0.87;
  }

  i {
    font-size: 30px;
  }

  .title {
    font-weight: bold;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
