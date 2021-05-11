<template>
  <div class="tp-upload">
    <label for="file-upload">
      <i class="ti-cloud-upload"></i>
    </label>
    <input type="file" id="file-upload" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPUpload extends Vue {}
</script>

<style lang="scss" scoped>
.tp-upload {
  position: relative;

  label {
    cursor: pointer;
    border-radius: $border-radius;
    background: $paragraph;
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;

    &:hover i {
      font-size: 60px;
    }

    i {
      transition: 0.2s ease-in-out;
      font-size: 50px;
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
