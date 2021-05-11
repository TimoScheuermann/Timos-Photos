<template>
  <div
    class="tp-file"
    v-if="file"
    @click="clicked"
    draggable="true"
    @dragstart="drag"
  >
    <div class="media">
      <img draggable="false" :src="file.src" alt="" />
    </div>
    <div class="container">
      <div class="title">{{ file.name }}</div>
      <tl-flow horizontal="space-between">
        <div class="size">{{ file.fsize }}</div>
        <TPFileActions :file="file" />
      </tl-flow>
    </div>
  </div>
</template>

<script lang="ts">
import { TPFileModel } from '@/utils/FileManager';
import { copyToClipboard } from '@/utils/functions';
import { Vue, Component, Prop } from 'vue-property-decorator';
import TPFileActions from './TPFileActions.vue';

@Component({
  components: {
    TPFileActions,
  },
})
export default class TPFile extends Vue {
  @Prop() file!: TPFileModel;

  public clicked(e: MouseEvent): void {
    if (e.shiftKey) {
      copyToClipboard(this.file.src);
      return;
    }
    this.$router.push({ name: 'file', params: { id: this.file.id } });
  }

  public drag(e: DragEvent): void {
    e.dataTransfer?.setData('text', JSON.stringify({ file: this.file }));
  }
}
</script>

<style lang="scss" scoped>
.tp-file {
  border-radius: $border-radius;
  -webkit-user-drag: element;
  cursor: pointer;

  transition: 0.1s ease-in-out;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
    transform: scale(1.007);
  }

  background: $paragraph;
  @media #{$isDark} {
    background: $paragraph_dark;
  }

  .media {
    height: 160px;
    img,
    video {
      border-radius: $border-radius $border-radius 0 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .container {
    padding: 10px;

    .title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .size {
      font-weight: bold;
      opacity: 0.5;
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>
