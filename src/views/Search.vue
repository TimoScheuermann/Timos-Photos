<template>
  <div class="view-search">
    <div content>
      <TPTitle subtitle="Results for" :title="query" />

      <tl-flow flow="column" mtop v-if="!results.folders || !results.files">
        <tc-spinner :dark="$store.getters.dark" size="20" />
        <p>Loading results</p>
      </tl-flow>

      <p v-else-if="results.folders.length === 0 && results.files.length === 0">
        Nothing found
      </p>

      <template v-if="results.folders && results.folders.length > 0">
        <br />
        <tl-grid arrangement="auto-fill" minWidth="150" gap="20">
          <TPFolder v-for="f in results.folders" :key="f.id" :folder="f" />
        </tl-grid>
      </template>

      <template v-if="results.files && results.files.length > 0">
        <br />
        <tl-grid arrangement="auto-fill" minWidth="150" gap="20">
          <TPFile v-for="f in results.files" :key="f.id" :file="f" />
        </tl-grid>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import TPFile from '@/components/TPFile.vue';
import TPFolder from '@/components/TPFolder.vue';
import TPTitle from '@/components/TPTitle.vue';
import backend from '@/utils/backend';
import { TPFileModel } from '@/utils/FileManager';
import { TPFolderModel } from '@/utils/FolderManager';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
    TPFolder,
    TPFile,
  },
})
export default class Search extends Vue {
  public results: {
    files: TPFileModel[] | null;
    folders: TPFolderModel[] | null;
  } = { files: null, folders: null };

  public mounted(): void {
    this.search();
  }

  @Watch('query')
  queryChanged(): void {
    if (!this.query) {
      this.$router.back();
    } else {
      this.search();
    }
  }

  get query(): string | null {
    return (this.$route.query.q as string) || null;
  }

  public search(): void {
    if (this.query) {
      this.results = { files: null, folders: null };
      backend.post('photos/search', { q: this.query }).then(({ data }) => {
        this.results.files = data.files.map(
          (x: TPFileModel) => new TPFileModel(x)
        );
        this.results.folders = data.folders.map(
          (x: TPFolderModel) => new TPFolderModel(x)
        );
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.view-search {
  background: $background !important;
  @media #{$isDark} {
    background: $background_dark !important;
  }
}
</style>
