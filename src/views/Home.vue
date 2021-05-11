<template>
  <div class="view-home">
    <div content>
      <TPTitle subtitle="home" title="Folders" />
      <br />
      <tl-grid minWidth="130" gap="20">
        <TPFolder />
        <TPFolder v-for="f in homeFolders" :key="f.id" :folder="f" />
      </tl-grid>

      <template v-if="pinnedFolders.length > 0">
        <br />
        <TPTitle subtitle="pinned" title="Folders" />
        <br />
        <tl-grid arrangement="auto-fill" minWidth="130" gap="20">
          <TPFolder v-for="f in pinnedFolders" :key="f.id" :folder="f" />
        </tl-grid>
      </template>

      <br />
      <template v-if="pinnedFiles.length > 0">
        <TPTitle subtitle="pinned" title="Files" />
        <br />
        <tl-grid arrangement="auto-fill" minWidth="150" gap="20">
          <TPFile v-for="f in pinnedFiles" :key="f.id" :file="f" />
        </tl-grid>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import TPTitle from '@/components/TPTitle.vue';
import { Vue, Component } from 'vue-property-decorator';
import { FileManager, TPFileModel } from '@/utils/FileManager';
import TPFolder from '@/components/TPFolder.vue';
import TPFile from '@/components/TPFile.vue';
import TPPathBar from '@/components/TPPathBar.vue';
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';

@Component({
  components: {
    TPTitle,
    TPFolder,
    TPFile,
    TPPathBar,
  },
})
export default class Home extends Vue {
  get homeFolders(): TPFolderModel[] {
    return FolderManager.homeFolders;
  }

  get pinnedFolders(): TPFolderModel[] {
    return FolderManager.pinnedFolders;
  }

  get pinnedFiles(): TPFileModel[] {
    return FileManager.pinnedFiles;
  }
}
</script>
