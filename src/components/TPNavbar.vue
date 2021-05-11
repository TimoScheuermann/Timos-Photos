<template>
  <div class="tp-navbar">
    <div class="title" @click="goHome">Timo's <span>Photos</span></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPNavbar extends Vue {
  public goHome(): void {
    if (this.$route.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style lang="scss" scoped>
.tp-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 5vw;
  padding-top: env(safe-area-inset-top);
  height: 50px;
  box-shadow: $shadow;

  @include backdrop-blur($color_dark);
  color: $color;

  @media #{$isDark} {
    @include backdrop-blur($color);
    color: $color_dark;
  }
  display: flex;
  align-items: center;

  .title {
    cursor: pointer;
    font-weight: 700;
    user-select: none;

    span {
      @include gradient-text();
    }
  }
}
</style>
