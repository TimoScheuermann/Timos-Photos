<template>
  <div class="view-file">
    <tl-flow flow="column" mtop v-if="!file">
      <tc-spinner :dark="$store.getters.dark" size="20" />
      <p>Loading data</p>
    </tl-flow>
    <div content v-else>
      <TPPathBar :folderId="file.folderId" />

      <br />
      <TPTitle
        :subtitle="'created ' + file.date + ' (' + file.fsize + ')'"
        :title="file.name"
      />
      <br />

      <img :src="file.src" width="100%" height="100%" alt="" />

      <tl-flow horizontal="space-between" class="actions">
        <button class="action" @click="togglePinFile">
          <i
            class="ti-star"
            :style="{ color: file.pinned ? 'gold' : 'inherit' }"
          />
        </button>
        <button class="action" @click="copyUrl">
          <i class="ti-link" />
        </button>
        <button class="action" @click="download">
          <i class="ti-download" />
        </button>
        <router-link
          :to="{ name: 'edit-file', params: { id: id } }"
          class="action"
        >
          <i class="ti-pencil" />
        </router-link>
        <button class="action" @click="share">
          <i class="ti-share" />
        </button>
        <button class="action" @click="deleteFile">
          <i class="ti-trashcan-alt" />
        </button>
      </tl-flow>

      <template v-if="file.tags && file.tags.length > 0">
        <tc-divider :dark="$store.getters.dark" name="Tags" />
        <div class="tags">
          <div class="tag" v-for="(t, i) in file.tags" :key="i">{{ t }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import TPPathBar from '@/components/TPPathBar.vue';
import TPTitle from '@/components/TPTitle.vue';
import { FileManager, TPFileModel } from '@/utils/FileManager';
import { copyToClipboard } from '@/utils/functions';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
    TPPathBar,
  },
})
export default class File extends Vue {
  async mounted(): Promise<void> {
    if (!this.file) {
      await FileManager.loadFiles();
      if (!this.file) {
        this.$router.push({ name: 'home' });
      }
    }
  }

  get id(): string {
    return this.$route.params.id;
  }

  get file(): TPFileModel | null {
    return FileManager.getFile(this.id);
  }

  public copyUrl(): void {
    const file = this.file;
    if (!file) return;
    copyToClipboard(file.src);
  }

  public download(): void {
    const file = this.file;
    if (!file) return;

    fetch(file.src).then((r) => {
      return r.blob().then((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', file.name);
        a.click();
      });
    });
  }

  public togglePinFile(): void {
    const file = this.file;
    if (!file) return;
    FileManager[file.pinned ? 'unpinFile' : 'pinFile'](file.id);
  }

  public deleteFile(): void {
    const file = this.file;
    if (!file) return;
    FileManager.deleteFile(file.id);
  }

  public share(): void {
    const file = this.file;
    if (!file) return;
    file.share();
  }
}
</script>

<style lang="scss" scoped>
.view-file {
  img {
    border-radius: $border-radius;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: visible;
    margin-top: 10px;
    .tag {
      padding: 5px 10px;
      margin: 0 5px 10px;

      border-radius: $border-radius;
      flex-grow: 1;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      user-select: none;

      background: $container;
      color: rgba($color, 0.75);
      @media #{$isDark} {
        background: $container_dark;
        color: rgba($color_dark, 0.75);
      }

      &:hover {
        color: rgba($color, 0.75);
        @media #{$isDark} {
          color: rgba($color_dark, 1);
        }
        transform: scale(1.0174);
      }
    }
  }

  .actions {
    margin: 15px 0 10px;
    .action {
      color: inherit;
      border: none;
      outline: none;
      text-decoration: none;
      border: none;
      background: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      user-select: none;

      background: #fff;
      @media #{$isDark} {
        background: $color;
      }

      border-radius: #{$border-radius};
      width: 40px;
      height: 40px;
      display: grid;
      place-content: center;

      font-size: 18px;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
