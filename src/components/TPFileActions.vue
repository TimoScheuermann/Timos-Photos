<template>
  <tc-action v-if="file" class="tp-file-actions" :dark="$store.getters.dark">
    <tc-action-item icon="share" title="Copy Url" @click="copyUrl" />
    <tc-action-item icon="i-circle" title="Show Details" @click="clicked" />
    <tc-action-item
      v-if="!file.pinned"
      icon="map-pin"
      title="Pin File"
      @click="pinFile"
    />
    <tc-action-item
      v-else
      icon="map-pin"
      title="Unpin File"
      @click="unpinFile"
    />

    <tc-action-item icon="pencil" title="Edit File" @click="editFile" />
    <tc-action-item
      icon="trashcan-alt"
      title="Delete Photo"
      error
      @click="deleteFile"
    />
  </tc-action>
</template>

<script lang="ts">
import { FileManager, TPFileModel } from '@/utils/FileManager';
import { copyToClipboard } from '@/utils/functions';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TPFileActions extends Vue {
  @Prop() file!: TPFileModel;

  public clicked(e: MouseEvent): void {
    if (e.shiftKey) {
      this.copyUrl();
      return;
    }
    this.$router.push({ name: 'file', params: { id: this.file.id } });
  }

  public copyUrl(): void {
    copyToClipboard(this.file.src);
  }

  public unpinFile(): void {
    FileManager.unpinFile(this.file.id);
  }

  public pinFile(): void {
    FileManager.pinFile(this.file.id);
  }

  public editFile(): void {
    this.$router.push({ name: 'edit-file', params: { id: this.file.id } });
  }

  public deleteFile(): void {
    FileManager.deleteFile(this.file.id, this.file.folderId);
  }
}
</script>
