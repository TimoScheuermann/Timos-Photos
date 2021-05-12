<template>
  <div class="tp-title">
    <div class="subtitle">{{ subtitle }}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TPTitle extends Vue {
  @Prop() title!: string;
  @Prop() subtitle!: string;
}
</script>

<style lang="scss" scoped>
.tp-title {
  .subtitle {
    font-size: 12px;
    font-weight: bold;
    opacity: 0.5;
    text-transform: uppercase;
  }
  .title {
    font-size: 25px;
    font-weight: bold;
    overflow-wrap: break-word;
  }
}
</style>
