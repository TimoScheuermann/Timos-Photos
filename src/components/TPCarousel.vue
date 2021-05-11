<template>
  <div class="tp-carousel">
    <div class="tp-carousel__fade" left />
    <div class="tp-carousel__spacer" />
    <slot />
    <div class="tp-carousel__spacer" />
    <div class="tp-carousel__fade" right />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPCarousel extends Vue {}
</script>

<style lang="scss" scoped>
.tp-carousel {
  margin: 0 -5vw;
  display: flex;
  overflow: scroll visible;
  padding-bottom: 20px;
  user-select: none;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  position: relative;
  .tp-carousel__fade {
    position: sticky;
    top: 0;
    bottom: 0;
    z-index: 1000;
    width: 5vw;
    max-width: 45px;
    flex-shrink: 0;
    &[left] {
      left: 0;
      margin-left: -5vw;
      background: linear-gradient(
        to right,
        rgba($background, 1),
        rgba($background, 0)
      );
      @media #{$isDark} {
        background: linear-gradient(
          to right,
          rgba($background_dark, 1),
          rgba($background_dark, 0)
        );
      }
    }
    &[right] {
      right: 0;
      background: linear-gradient(
        to left,
        rgba($background, 1),
        rgba($background, 0)
      );
      @media #{$isDark} {
        background: linear-gradient(
          to left,
          rgba($background_dark, 1),
          rgba($background_dark, 0)
        );
      }
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .tp-carousel__spacer {
    flex-shrink: 0;
    width: 5vw;
  }
  div:not([class^='tp-carousel']),
  a:not([class^='tp-carousel']) {
    margin-left: 10px;
    scroll-snap-align: center;
    flex-shrink: 0;
    width: 150px;
    &:nth-child(3) {
      margin-left: 0px;
    }
  }
}
</style>
