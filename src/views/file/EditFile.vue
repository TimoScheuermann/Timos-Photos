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

      <tl-grid gap="10px 20">
        <tc-input
          icon="anchor"
          :dark="$store.getters.dark"
          :frosted="true"
          title="Name"
          v-model="name"
        />

        <tc-select :dark="$store.getters.dark"></tc-select>
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

      <ul>
        <li>name</li>
        <li>tags</li>
        <li>folderId</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import TPTitle from '@/components/TPTitle.vue';
import { FileManager, TPFileModel } from '@/utils/FileManager';
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
}
</style>
