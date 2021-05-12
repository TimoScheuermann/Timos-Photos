<template>
  <transition name="appear">
    <div class="tp-error-notification" v-if="text.length > 0" :key="text">
      <div class="anim-wrapper">
        <lottie-animation :loop="false" path="assets/error-anim.json" />
      </div>
      <div class="text">{{ text }}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { TPEventBus } from '@/utils/TPEventBus';

@Component({
  components: {},
})
export default class TPErrorNotification extends Vue {
  public timeout = 0;
  public text = '';

  mounted(): void {
    TPEventBus.$on('error', this.newNotification);
  }

  beforeDestroy(): void {
    clearTimeout(this.timeout);
  }

  private newNotification(text: string): void {
    clearTimeout(this.timeout);

    this.text = text;

    this.timeout = setTimeout(() => {
      this.text = '';
    }, 3500);
  }
}
</script>

<style lang="scss" scoped>
.tp-error-notification {
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

  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .anim-wrapper {
    height: 120px;
    width: 120px;
  }
  .text {
    margin-top: 20px;
    min-width: 200px;
    text-align: center;
    font-weight: 550;
    opacity: 0.75;
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
