<template>
  <div
    class="tp-upload"
    v-if="$route.name === 'folder'"
    @drop="drop"
    @dragover="allowDrop"
  >
    <label for="file-upload">
      <i class="ti-cloud-upload"></i>
    </label>
    <input
      type="file"
      id="file-upload"
      multiple
      @change="fileChanged"
      accept="image/*"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPUpload extends Vue {
  public allowDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  public drop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.uploadFiles(e.dataTransfer?.files);
  }

  public fileChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    this.uploadFiles(element.files);
    element.value = '';
  }

  public uploadFiles(files: FileList | null | undefined): void {
    if (files && files[0]) {
      Array.from(files)
        .filter((x) => !!x)
        .forEach((f) => {
          const formData = new FormData();
          formData.append('file', f, f.name);
          // TODO: Post to backend
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.tp-upload {
  position: fixed;
  z-index: 100;
  bottom: calc(20px + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  border-radius: 200px;

  @include gradient-bg();

  width: 100px;
  height: 50px;

  transition: 0.1s ease-in-out;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
    transform: translateX(-50%) scale(1.07);
  }

  label {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;

    i {
      font-size: 40px;
      color: #fff;
      opacity: 0.87;
    }
  }

  input {
    position: absolute;
    z-index: -1;
    transform: scale(0.1);
    opacity: 0;
  }
}
</style>
