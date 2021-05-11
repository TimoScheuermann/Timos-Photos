<template>
  <div class="tp-navbar">
    <div class="sections">
      <transition name="section">
        <div v-if="section !== 2" id="0" class="title">Timo's Photos</div>
        <input v-else id="1" type="text" placeholder="Search Drive" />
      </transition>
    </div>

    <div class="actions">
      <!-- <div class="action">
        <i class="ti-plus" />
      </div> -->
      <!-- <router-link
        class="action"
        :to="{ name: 'home' }"
        v-if="$route.name === 'favorites'"
      >
        <i class="ti-house" />
      </router-link>
      <router-link class="action" :to="{ name: 'favorites' }" v-else>
        <i class="ti-star" />
      </router-link>
      <div class="action" @click="setSection(2)">
        <i class="ti-lens" />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPNavbar extends Vue {
  public section = 0;

  mounted(): void {
    this.$router.afterEach(() => {
      this.setSection(0);
    });
  }

  public setSection(section: number): void {
    if (this.section === section) {
      this.section = 0;
      return;
    }
    this.section = section;
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

  display: grid;
  grid-template-columns: 1fr auto;

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    .action {
      &:not(:first-child) {
        margin-left: 10px;
      }

      display: grid;
      place-content: center;
      text-decoration: none;
      color: inherit;
      height: 30px;
      width: 30px;
      border: 1px solid currentColor;
      border-radius: $border-radius;
      opacity: 0.75;
      cursor: pointer;

      transition: 0.2s ease-in;
      &:hover {
        opacity: 1;
      }
    }
  }

  .sections {
    position: relative;

    * {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .title {
      font-weight: 700;
    }

    input {
      background: transparent;
      border: none;
      outline: none;
      font: inherit;
      font-size: inherit;
      color: inherit;
      display: block;
      margin: 0;
      padding: 5px;
      width: calc(90vw - 140px);
      max-width: 300px;
      border-bottom: 1px solid currentColor;

      &::placeholder {
        color: inherit;
        opacity: 0.8;
      }
      -webkit-appearance: none;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  // .title {
  //   height: 50px;
  //   display: grid;
  //   place-content: center;
  //   font-weight: 700;
  //   position: fixed;
  //   top: env(safe-area-inset-top);
  //   left: 5vw;
  // }

  // .search-container {
  //   position: fixed;
  //   top: calc(25px + env(safe-area-inset-top));
  //   @media only screen and (max-width: 630px) {
  //     top: calc(65px + env(safe-area-inset-top));
  //   }

  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   display: grid;
  //   place-content: center;
  // }

  // .search-bar {
  //   @include backdrop-blur($container);
  //   @media #{$isDark} {
  //     @include backdrop-blur($container_dark);
  //   }
  //   border-radius: 100px;
  //   white-space: nowrap;

  //   $pad: 7.5px;
  //   label {
  //     display: inline-grid;
  //     place-content: center;
  //     padding: $pad;
  //     padding-right: 0;
  //   }

  // }
}

.section-enter-active,
.section-leave-active {
  transition: all 0.3s ease;
}
.section-enter,
.section-leave-to {
  margin-left: -5vw;
  opacity: 0;
}
</style>
