<template>
  <div id="timos-photos">
    <TPRouter />
    <TPNavbar />
    <!-- <TPTabbar /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TPNavbar from './components/TPNavbar.vue';
import TPRouter from './components/TPRouter.vue';
import TPTabbar from './components/TPTabbar.vue';
import {
  registerMediaQueries,
  unregisterMediaQueries,
} from '@/utils/mediaQueries';
import { FolderManager } from './utils/FolderManager';
import { FileManager } from './utils/FileManager';

@Component({
  components: {
    TPRouter,
    TPNavbar,
    TPTabbar,
  },
})
export default class App extends Vue {
  mounted(): void {
    registerMediaQueries();

    FolderManager.loadFolders();
    FileManager.loadFiles();
  }

  beforeDestroy(): void {
    unregisterMediaQueries();
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

html {
  background: $background;
  color: $color;
  @media #{$isDark} {
    background: $background_dark;
    color: $color_dark;
  }
}

body {
  min-height: 100vh;
  margin: 0;
}

[center] {
  text-align: center;
}

[error] {
  color: $error;
}

[huge] {
  font-size: 40px;
}

[content] {
  padding: calc(70px + env(safe-area-inset-top)) 5vw
    calc(20px + env(safe-area-inset-bottom));

  // @media only screen and (max-width: 630px) {
  //   padding-top: calc(110px + env(safe-area-inset-top));
  // }

  @media #{$isMobile} {
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
  }

  max-width: $max-width;
  margin: 0 auto;
}

[line-break] {
  white-space: pre-line;
}

[nowrap] {
  flex-wrap: nowrap !important;
}
[mtop] {
  margin-top: 100px;
}
</style>
