<template>
  <tc-tabbar class="tp-tabbar" :dark="$store.getters.dark"></tc-tabbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPTabbar extends Vue {}
</script>

<style lang="scss" scoped>
.view-tp-tabbar {
  //
}
</style>
