<template>
  <div class="view-file-details">
    <tl-flow flow="column" v-if="!file">
      <tc-spinner :dark="$store.getters.dark" size="20" />
      <p>Loading information</p>
    </tl-flow>
    <div v-else content>
      <TPTitle :subtitle="file.location.join('/')" :title="file.name" />
      <img :src="file.url" width="100%" height="100%" alt="" />

      <div class="interactions">
        <a :href="file.url"><i class="ti-reply" /></a>
        <button><i class="ti-link" /></button>
        <button><i class="ti-download" /></button>
        <button><i class="ti-star" /></button>
        <button><i class="ti-trashcan-alt" /></button>
      </div>

      <tc-divider />

      <b>{{ size }}</b>

      {{ file }}
    </div>
  </div>
</template>

<script lang="ts">
import TPTitle from '@/components/TPTitle.vue';
import { TPFileModel, FileManager } from '@/utils/FileManager';
import { convertSize } from '@/utils/functions';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class FileDetails extends Vue {
  get file(): TPFileModel | null {
    return FileManager.getFile(this.$route.params.id);
  }

  get size(): string {
    const file = this.file;
    if (file) return convertSize(file.size);
    return '';
  }
}
</script>

<style lang="scss" scoped>
.view-file-details {
  .tc-spinner {
    margin-top: 200px;
  }
  img {
    border-radius: $border-radius;
  }

  .interactions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 10px;
    button,
    a {
      padding: 0;
      margin: 0 5px;

      display: inline-grid;
      place-content: center;
      border: none;
      outline: none;
      color: inherit;

      text-decoration: none;

      font-size: 18px;
      cursor: pointer;
      opacity: 0.75;
      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }

      background: rgba($color, 0.1);

      width: 30px;
      height: 30px;
      border-radius: 30px;
    }
  }
}
</style>
