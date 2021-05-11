<template>
  <transition name="appear">
    <div
      class="tp-copy-notification"
      v-if="notification > 0"
      :key="notification"
    >
      <div class="anim-wrapper">
        <lottie-animation :loop="false" path="assets/check-anim.json" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { TPEventBus } from '@/utils/TPEventBus';

@Component({
  components: {},
})
export default class TPCopyNotification extends Vue {
  public notification = 0;
  public timeout = 0;

  mounted(): void {
    TPEventBus.$on('copy', this.newNotification);
  }

  beforeDestroy(): void {
    clearTimeout(this.timeout);
  }

  private newNotification(): void {
    clearTimeout(this.timeout);

    this.notification = Date.now();

    this.timeout = setTimeout(() => {
      this.notification = 0;
    }, 2500);
  }
}
</script>

<style lang="scss" scoped>
.tp-copy-notification {
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  border-radius: 30px;
  transform: translate(-50%, -50%);

  @include backdrop-blur($container);
  @media #{$isDark} {
    @include backdrop-blur($container_dark);
  }

  .anim-wrapper {
    padding: 20px;
    height: 120px;
    width: 120px;
  }
}

.appear-enter,
.appear-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.appear-enter-active,
.appear-leave-active {
  transition: 0.25s ease-in-out;
}
</style>
