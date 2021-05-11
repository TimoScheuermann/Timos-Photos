<template>
  <div class="view-edit-file">
    <tl-flow flow="column" mtop v-if="!file">
      <tc-spinner :dark="$store.getters.dark" size="20" />
      <p>Loading data</p>
    </tl-flow>
    <div content v-else>
      <TPTitle subtitle="Edit photo" :title="file.name" />

      <br />

      <img height="100%" width="100%" :src="file.src" alt="" />

      <tl-grid minWidth="100" gap="10px 20">
        <tc-input
          icon="anchor"
          :dark="$store.getters.dark"
          :frosted="true"
          title="Name"
          v-model="name"
        />

        <div class="select">
          <div class="label">Folder</div>
          <tc-select
            :dark="$store.getters.dark"
            @selectedItems="folderSelected"
            background="#ffa642"
          >
            <tc-select-item
              v-for="f in folders"
              :key="f.id"
              :title="f.name"
              :defaultSelected="file.folderId === f.id"
            />
          </tc-select>
        </div>
      </tl-grid>

      <br />
      <tl-flow>
        <tc-button
          icon="reply"
          name="Update File"
          tfbackground="success"
          variant="opaque"
        />
        <tc-button
          icon="repeat"
          name="reset"
          tfbackground="alarm"
          variant="opaque"
          @click="reset"
        />
        <tc-button
          icon="blocked"
          name="cancel"
          tfbackground="error"
          variant="opaque"
          @click="back"
        />
      </tl-flow>
    </div>
  </div>
</template>

<script lang="ts">
import TPTitle from '@/components/TPTitle.vue';
import { FileManager, TPFileModel } from '@/utils/FileManager';
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class EditFile extends Vue {
  public name = '';
  public tags: string[] = [];
  public folderId = '';

  async mounted(): Promise<void> {
    if (!this.file) {
      await FileManager.loadFiles();
      await FolderManager.loadFolders();
      if (!this.file) {
        this.$router.push({ name: 'home' });
      }
    }
    this.reset();
  }

  get id(): string {
    return this.$route.params.id;
  }

  get file(): TPFileModel | null {
    return FileManager.getFile(this.id);
  }

  get folders(): TPFolderModel[] {
    return FolderManager.folders;
  }

  public reset(): void {
    const file = this.file;
    if (file) {
      this.name = file.name;
      this.tags = file.tags;
      this.folderId = file.folderId;
    }
  }

  public back(): void {
    this.$router.push({ name: 'file', params: { id: this.id } });
  }

  public folderSelected(folder: string[]): void {
    if (folder.length > 0) console.log(folder);
  }
}
</script>

<style lang="scss" scoped>
.view-edit-file {
  img {
    border-radius: $border-radius;
  }
  .tl-grid {
    margin-top: 10px;
  }

  .tc-select /deep/ .tc-select-container {
    @include backdrop-blur(darken($paragraph, 10%));
    @media #{$isDark} {
      @include backdrop-blur(lighten($color, 10%));
    }
  }
  .select {
    margin-top: 28px;
    position: relative;
    .label {
      position: absolute;
      font-weight: 700;
      top: -20px;
      left: 7.5px;
    }
  }
}
</style>
