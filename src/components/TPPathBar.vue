<template>
  <div class="tp-path-bar" :key="$route.params.id">
    <div
      class="path"
      upp
      @click="home"
      @drop="drop($event, null)"
      @dragover="allowDrop"
    >
      Home
    </div>
    <template v-for="p in getPaths()">
      <div class="divider" :key="p.id + '.d'">›</div>
      <div
        class="path"
        :key="p.id"
        @click="goTo(p.id)"
        @drop="drop($event, p.id)"
        @dragover="allowDrop"
      >
        {{ p.name }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { FileManager } from '@/utils/FileManager';
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TPPathBar extends Vue {
  @Prop() folderId!: string;
  public home(): void {
    this.$router.push({ name: 'home' });
  }

  public goTo(folderId: string): void {
    const { params, name } = this.$route;
    if (params.id === folderId && name === 'folder') return;
    this.$router.push({ name: 'folder', params: { id: folderId } });
  }

  public getPaths(
    curr = this.folderId || this.$route.params.id,
    prev: TPFolderModel[] = []
  ): TPFolderModel[] {
    const folder = FolderManager.getFolder(curr);
    if (folder && prev.length === 0) prev = [folder];
    if (folder && folder.parent) {
      const parent = FolderManager.getFolder(folder.parent);
      if (parent) {
        return this.getPaths(folder.parent, [parent, ...prev]);
      }
    }

    return prev;
  }

  public allowDrop(e: DragEvent): void {
    e.preventDefault();
  }

  public drop(e: DragEvent, folderId: string): void {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer?.getData('text') || '');

    if (data && data.folder) {
      FolderManager.changeParent(data.folder.id, folderId);
    } else if (data && data.file && folderId) {
      FileManager.changeFolderId(data.file.id, folderId);
    }
  }
}
</script>

<style lang="scss" scoped>
.tp-path-bar {
  border-bottom: 1px solid rgba($color, 0.1);

  @media #{$isDark} {
    border-color: rgba($color_dark, 0.1);
  }

  padding-bottom: 4px;
  display: flex;
  align-items: center;
  user-select: none;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .path {
    cursor: pointer;

    &[upp] {
      text-transform: uppercase;
    }
    font-weight: bold;
    font-size: 16px;
    &:not(:last-of-type) {
      opacity: 0.5;
    }
    &:last-of-type {
      @include gradient-text();
    }

    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
  .divider {
    @include gradient-text();
    margin: 0 5px;
    cursor: default;
  }
}
</style>
